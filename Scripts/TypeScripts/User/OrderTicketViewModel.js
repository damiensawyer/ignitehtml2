/// <reference path="../definitions/NetEvents.d.ts" />
/// <reference path="../definitions/EventModel.ts" />
var OrderTicketViewModel = (function () {
    function OrderTicketViewModel(ticketModel, changeNotification) {
        var _this = this;
        this.ticketModel = ticketModel;
        this.answers = ko.observableArray([]);
        this.cost = ko.observable(0);
        this.discountCode = ko.observable('');
        this.discountCodeId = ko.observable(undefined);
        this.ticketTypeId = ko.observable();
        this.ticketId = ko.observable();
        this.validationErrors = ko.observableArray([]);
        this.name = ko.observable('');
        this.showDiscountCodeBox = ko.pureComputed(function () {
            return _this.ticketModel.discountCodes.length > 0;
        });
        this.discountedPrice = ko.observable(undefined);
        this.discountAmount = ko.pureComputed(function () {
            var dp = _this.discountedPrice();
            if (dp == undefined)
                return 0;
            return _this.ticketModel.cost - dp;
        });
        this.discountValid = ko.pureComputed(function () { return _this.discountedPrice() !== undefined; });
        this.ticketId(NetEvents.Guid.MakeNew().toString());
        var mappingOptions = OrderFunctions.MappingOptionsAnswerList(changeNotification);
        var m = { questions: ticketModel.questions };
        var result = ko.mapping.fromJS(m, mappingOptions);
        var r = result.questions();
        this.answers(r);
        this.cost(ticketModel.cost);
        this.name(ticketModel.name);
        this.ticketTypeId(ticketModel.ticketTypeId);
        setImmediate(function () {
            OrderFunctions.OrderRoot().requestValidation.subscribe(function (x) {
                OrderFunctions.performValidation(_this, _this.validationChecks(), _this.validationErrors);
            });
        });
        this.discountCode.subscribe(function (newValue) {
            var matchedDc = _.find(_this.ticketModel.discountCodes, function (dc) { return dc.discountCodeSHA === NetEvents.calculateSHA(newValue); });
            if (!!matchedDc) {
                _this.discountCodeId(matchedDc.discountCodeId);
                _this.discountedPrice(_this.ticketModel.cost - matchedDc.discount);
            }
            else {
                _this.discountCodeId(undefined);
                _this.discountedPrice(undefined);
            }
        });
    }
    OrderTicketViewModel.prototype.validationChecks = function () {
        var _this = this;
        return [
            function (e) {
                var allQuestionErrors = [];
                _.each(_this.answers(), function (a) {
                    var answerErrors = _.map(a.allTests(), function (vc) { return vc(a); });
                    allQuestionErrors = allQuestionErrors.concat(answerErrors);
                });
                var r = _.filter(allQuestionErrors, function (x) { return !!x.trim(); });
                var r2 = r.length > 0 ? 'Please correct ' + r.length + ' answer errors' : '';
                return r2;
            }
        ];
    };
    return OrderTicketViewModel;
}());
