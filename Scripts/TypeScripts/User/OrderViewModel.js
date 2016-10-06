/// <reference path="../definitions/NetEvents.d.ts" />
/// <reference path="../definitions/EventModel.ts" />
/// <reference path="orderticketclassviewmodel.ts" />
var OrderViewModel = (function () {
    function OrderViewModel(eventModel) {
        var _this = this;
        this.eventModel = eventModel;
        this.eventModelJS = ko.observable(); // will contain a POJO... no observables
        this.finishedLoading = ko.observable(false);
        this.serverErrorMessage = ko.observable('');
        this.newCouponCode = ko.observable(''); // users type in this. It wll be observerd and, when a match is found, that match will be added to the enteredCouponCodes collection
        this.colorCount = 10;
        this.colors = ko.observableArray();
        this.changeToken = new Rx
            .Subject();
        // ko.observable(); // This will hold nothing..however there will be a throttled computed which watches it and determines whether to check for changes
        this.validationErrors = ko.observableArray([]);
        this.enteredCouponCodes = ko.observableArray([]); // entered codes will go here and cause the tickets to be visible.
        this.allTicketTypes = ko.computed(function () {
            var em = _this.eventModelJS();
            if (!em || !em.tickets)
                return [];
            var color = 0;
            //var ss = this.colors()[(color++ % this.colorCount) + 1];
            var result = _.map(em.tickets, function (f) { return new OrderTicketClassViewModel(f, _this.colors()[(color++ % _this.colorCount)], _this.getBinder()); });
            return result;
        });
        this.eventSoldOut = ko.computed(function () {
            var result = _this.allTicketTypes().length == 0;
            return result;
        });
        this.regularTicketTypes = ko.computed(function () {
            var allTickets = _this.allTicketTypes();
            var filteredList = _.filter(allTickets, function (x) { return !x.couponCodeSHA().trim() || _.some(_this.enteredCouponCodes(), function (cc) { return _this.couponCodeMatchesSHA(cc, x.couponCodeSHA()); }); });
            return filteredList;
        });
        this.allTickets = ko.computed(function () {
            var allTicketTypes = _this.allTicketTypes();
            var allTickets = !!allTicketTypes
                ? _.flatten(_.map(allTicketTypes, function (x) { return x.ticketsToPurchase(); }))
                : [];
            return allTickets;
        });
        this.resetOrder = new Rx.Subject();
        this.dialog = ko.observable(new ProcessOrderDialog(this));
        this.showEnterCouponCodeBox = ko.computed(function () {
            var result = _this.allSHATokens().length > _this.enteredCouponCodes().length;
            return result;
        });
        this.validForSave = ko.pureComputed(function () { return _this.validationErrors().length === 0; });
        this.hasErrors = ko.computed(function () {
            var r = _this.validationErrors().length > 0;
            return r;
        });
        this.genPaletteArray();
        this.eventModelJS(eventModel);
        this.finishedLoading(true); // probably don't need this.
        var ss = 1243;
        setImmediate(function () {
            OrderFunctions.OrderRoot().requestValidation.subscribe(function (x) {
                OrderFunctions.performValidation(_this, _this.validationChecks(), _this.validationErrors);
            });
            //this.placeOrder();
        });
        this.resetOrder.subscribe(function (x) {
            //this.resetAllTickets();
            if (_this.finishedLoading()) {
                location.reload();
            }
        });
        //this.resetOrder.onNext(true);
        this.orderID = NetEvents.Guid.MakeNew().toString();
        // Check their coupon codes
        this.newCouponCode.subscribe(function (newValue) {
            if (_.some(_this.enteredCouponCodes(), function (cc) { return cc == newValue; }))
                return;
            var result = _.some(_this.allSHATokens(), function (s) { return _this.couponCodeMatchesSHA(newValue, s); });
            if (result) {
                _this.enteredCouponCodes.push(newValue);
                _this.newCouponCode('');
            }
        });
    }
    OrderViewModel.prototype.couponCodeMatchesSHA = function (coupon, sha) {
        return NetEvents.calculateSHA(coupon) === sha;
    };
    OrderViewModel.prototype.genPaletteArray = function () {
        var list = [];
        var low = 1;
        for (var i = low; i <= this.colorCount; i++) {
            list.push(i);
        }
        //var random = NetEvents.shuffle(list);
        //this.colors(random);
        this.colors(list); // no more random :-(
    };
    OrderViewModel.prototype.resetAllTickets = function () {
        //var allTicketTypes = this.allTicketTypes();
        //_.each(allTicketTypes, tt => {
        //    tt.ticketsToPurchase.removeAll();
        //    tt.ticketCount(0);
        //    this.validationErrors([]);
        //});
    };
    OrderViewModel.prototype.allSHATokens = function () {
        var em = this.eventModelJS();
        if (!em)
            return [];
        var shas = _.filter(_.map(em.tickets, function (x) { return x.couponCodeSHA.trim(); }), function (sha) { return !!sha.trim(); });
        return shas;
    };
    OrderViewModel.prototype.somethingChanged = function () {
        if (this.finishedLoading()) {
            this.serverErrorMessage('');
            this.changeToken.onNext(true);
        }
    };
    OrderViewModel.prototype.getBinder = function () {
        return this.bindSubscribeToChildrenObservables.bind(this);
    };
    OrderViewModel.prototype.bindSubscribeToChildrenObservables = function (target) {
        var _this = this;
        var result = [];
        for (var property in target) {
            if (target.hasOwnProperty(property)) {
                if (ko.isObservable(target[property])) {
                    result.push(target[property].subscribe(function () { return _this.somethingChanged(); }));
                }
            }
        }
        return result;
    };
    OrderViewModel.prototype.placeOrder = function () {
        console.log('placing order');
        OrderFunctions.OrderRoot().requestValidation.onNext(true);
        if (this.hasErrors()) {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd;
        }
        this.dialog(new ProcessOrderDialog(this));
        this.dialog().show();
    };
    OrderViewModel.prototype.validationChecks = function () {
        var _this = this;
        return [
            // Check that they've bought tickets
            function (e) {
                var allTicketTypes = _this.allTicketTypes();
                var allTickets = !!allTicketTypes
                    ? _.flatten(_.map(allTicketTypes, function (x) { return x.ticketsToPurchase(); }))
                    : [];
                return allTickets.length > 0 ? '' : 'Please select tickets you wish to purchase';
            },
            // Check all tickets and questions
            function (e) {
                var allTicketErrors = [];
                _.each(_this.allTickets(), function (t) {
                    var ticketErrors = _.map(t.validationChecks(), function (vc) { return vc(t); });
                    allTicketErrors = allTicketErrors.concat(ticketErrors);
                });
                var r = _.filter(allTicketErrors, function (x) { return !!x.trim(); });
                var r2 = r.length > 0 ? 'Please correct ' + r.length + ' ticket errors' : '';
                return r2;
            }
        ];
    };
    return OrderViewModel;
}());
