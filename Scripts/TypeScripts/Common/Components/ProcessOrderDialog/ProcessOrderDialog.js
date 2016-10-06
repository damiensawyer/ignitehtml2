/// <reference path="../../../definitions/netevents.d.ts" />
/// <reference path="../../custombindings/modaldialog.ts" />
var ProcessOrderDialog = (function () {
    function ProcessOrderDialog(orderModel) {
        var _this = this;
        this.orderModel = orderModel;
        this.timer = ko.observable(0);
        this.order = ko.observable();
        this.showDialog = ko.observable(false);
        this.invoiceMe = ko.observable(false);
        this.modalTemplate = ko.observable('ProcessOrderDialog');
        this.ccNumber = ko.observable('');
        this.ccExpMonth = ko.observable('');
        this.ccExpYear = ko.observable('');
        this.ccCVC = ko.observable('');
        this.email = ko.observable('');
        this.fullCreditCardName = ko.observable('');
        this.companyName = ko.observable('');
        this.monthOptions = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        this.yearOptions = ko.observableArray([]);
        this.validationRun = ko.observable(false);
        this.generalErrorList = ko.observableArray([]);
        this.ccErrorList = ko.observableArray([]);
        this.ccNameErrorList = ko.observableArray([]);
        this.emailErrorList = ko.observableArray([]);
        this.cvcErrorList = ko.observableArray([]);
        this.serverError = ko.observable('');
        this.showDebugMode = ko.observable(NE.debugMode); // will display buttons to populate dev
        this.processingSuccessful = ko.observable(false);
        this.emailText = ko.pureComputed(function () {
            var im = _this.invoiceMe();
            var result = 'Email address ' + (im ? '(for invoice)' : '(for receipt)');
            return result;
        });
        this.minimumBillingAmount = 0.50;
        this.processStripe = ko.pureComputed(function () {
            var im = _this.invoiceMe();
            var c = _this.grandTotal();
            return !im && c >= _this.minimumBillingAmount; // 50c 
        });
        this.showInvoiceMe = ko.pureComputed(function () {
            var c = _this.grandTotal();
            return c >= _this.minimumBillingAmount; // 50c 
        });
        this.notSaving = ko.computed(function () {
            var r = window.NE.saving();
            return !r;
        });
        this.isSaving = ko.computed(function () {
            var r = window.NE.saving();
            return r;
        });
        this.groupedTickets = ko.computed(function () {
            if (!_this.order())
                return undefined;
            var t = _this.order().allTickets();
            var r = _.countBy(t, function (x) { return x.name(); });
            var p = _.toPairs(r);
            var costs = _.map(_this.order().allTicketTypes(), function (t) { return { name: t.ticketName(), cost: t.Cost() }; });
            var result = _.map(p, function (x) {
                return {
                    'name': x[0],
                    'count': x[1],
                    'cost': _.find(costs, function (c) { return c.name === x[0]; }).cost,
                    'extcost': _.find(costs, function (c) { return c.name === x[0]; }).cost * x[1]
                };
            });
            return result;
        });
        this.totalDiscountsApplied = ko.pureComputed(function () {
            var discountedTickets = _this.order().allTickets().filter(function (t) { return !!t.discountAmount(); });
            var result = _.sumBy(discountedTickets, function (dt) { return dt.discountAmount(); });
            return result;
        });
        this.totalOrderCostBeforeDiscounts = ko.pureComputed(function () {
            if (!_this.order())
                return undefined;
            _this.tickets = _this.order().allTickets();
            var totalCost = _.sumBy(_this.tickets, function (t) { return t.cost(); });
            return totalCost;
        });
        this.grandTotal = ko.pureComputed(function () {
            return _this.totalOrderCostBeforeDiscounts() - _this.totalDiscountsApplied();
        });
        this.ccError = ko.computed(function () { return _this.ccErrorList().length > 0; });
        this.cvcError = ko.computed(function () { return _this.cvcErrorList().length > 0; });
        this.emailError = ko.computed(function () { return _this.emailErrorList().length > 0; });
        this.hasErrors = ko.computed(function () {
            return _this.generalErrorList().length > 0;
        });
        this.monthOptions(this.numberRange(1, 12));
        this.yearOptions(this.numberRange(new Date().getFullYear(), 20));
        this.order(orderModel);
        //if (this.totalOrderCost() <= this.minimumBillingAmount) this.invoiceMe(true); // to set the right label on cardholder name
        Rx.Observable.interval(500).subscribe(function (x) {
            _this.timer(_this.timer() + 1);
        });
        this.invoiceMe.subscribe(function (value) {
            setImmediate(function () {
                if (!!_this.validationRun())
                    _this.runValidations();
            });
        });
        if (this.grandTotal() < this.minimumBillingAmount && this.grandTotal() > 0) {
            this.invoiceMe(true); // This is a funny situation. The ticket is too cheap for Stripe.... but > 0... so, I guess, force them to be invoiced.
        }
        //setImmediate(() => {
        //    // Needed to do this because observables of inheritting children are not yet set up... eg, optionsList in Que4stionSelectListVM
        //    //NetEvents.SubscribeToErrorValidation(this, this.ccValidationChecks(), this.ccValidationErrors);
        //});
    }
    ProcessOrderDialog.prototype.resetOrder = function () {
        this.orderModel.resetOrder.onNext(true); // force a new Id and reset form
    };
    ProcessOrderDialog.prototype.show = function () {
        this.showDialog(true);
        return null;
    };
    ProcessOrderDialog.prototype.hide = function () {
        this.showDialog(true);
        return null;
    };
    ProcessOrderDialog.prototype.toggle = function () {
        this.showDialog(!this.showDialog());
        return null;
    };
    ProcessOrderDialog.prototype.numberRange = function (start, count) {
        var result = [];
        for (var i = start; i < start + count; i++) {
            result.push(i);
        }
        return result;
    };
    /** Break up the validations so that you can colour individual fields */
    ProcessOrderDialog.prototype.performValidation = function (checks, errorMessages) {
        var _this = this;
        var result = [];
        _.each(checks, function (c) {
            var r = c(_this);
            if (!!r)
                result.push(r);
        });
        errorMessages(result);
        this.validationRun(true);
    };
    ProcessOrderDialog.prototype.ccValidationChecks = function () {
        var _this = this;
        return !!this.invoiceMe()
            ? []
            : [
                // To do... use Stripe library to validate cards.
                (function (q) { return q.ccNumber() == '123' && _this.processStripe() ? 'not 123 cc' : ''; }),
                (function (q) { return !q.ccNumber().trim() && _this.processStripe() ? 'Credit Card Number Required' : ''; }),
                (function (q) { return !Stripe.card.validateCardNumber(q.ccNumber().trim()) && _this.processStripe() ? 'Credit Card Number Appears Invalid. Please check or try another card' : ''; })
            ];
    };
    ProcessOrderDialog.prototype.ccNameValidationChecks = function () {
        var _this = this;
        return [
            (function (q) { return !q.fullCreditCardName().trim()
                ? (!!_this.invoiceMe() ? 'Please enter your name' : 'Cardholder Name Required')
                : ''; })
        ];
    };
    ProcessOrderDialog.prototype.cvcValidationChecks = function () {
        var _this = this;
        return !!this.invoiceMe()
            ? []
            : [
                (function (q) { return q.ccCVC() == '222' && _this.processStripe() ? 'not 222 cvc' : ''; }),
                (function (q) { return !q.ccCVC().trim() && _this.processStripe() ? 'cvc number required' : ''; }),
                (function (q) { return !Stripe.card.validateExpiry(q.ccExpMonth(), q.ccExpYear()) && _this.processStripe() ? 'Credit Card Expiry Appears invalid. Please check or try another card' : ''; })
            ];
    };
    ProcessOrderDialog.prototype.emailValidationChecks = function () {
        return [
            (function (q) { return !(!!q.email().trim() && NetEvents.validateEmail(q.email().trim())) ? 'Please provide a valid email address' : ''; })
        ];
    };
    ProcessOrderDialog.prototype.generalValidationChecks = function () {
        var _this = this;
        return [
            (function (q) { return q.cvcErrorList().length > 0 ? 'Fix cvc errors' : ''; }),
            (function (q) { return q.ccErrorList().length > 0 ? 'Fix credit card number errors' : ''; }),
            (function (q) { return q.ccNameErrorList().length > 0 ? 'Fix name errors' : ''; }),
            (function (q) { return q.emailErrorList().length > 0 ? 'Fix email errors' : ''; }),
            (function (q) { return q.serverError().trim() ? 'Processing Error: ' + _this.serverError() : ''; })
        ];
    };
    ProcessOrderDialog.prototype.getStripeToken = function () {
        var dfd = $.Deferred();
        dfd.fail(function (response, t) {
            t.serverError((response.error ? response.error : { message: 'server error' }).message);
            t.runValidations();
            //response.error;
        });
        if (!this.processStripe()) {
            var r = { id: 'No Stripe' };
            dfd.resolve(r);
        }
        else {
            Stripe.setPublishableKey(NE.viewModel().stripePublicKey());
            Stripe.card.createToken({
                number: this.ccNumber(),
                cvc: this.ccCVC(),
                exp_month: this.ccExpMonth(),
                exp_year: this.ccExpYear()
            }, function (status, response) {
                if (response.error) {
                    dfd.reject(response, this);
                }
                else {
                    dfd.resolve(response);
                }
            }.bind(this));
        }
        return dfd;
    };
    ProcessOrderDialog.prototype.runValidations = function () {
        this.performValidation(this.ccValidationChecks(), this.ccErrorList);
        this.performValidation(this.ccNameValidationChecks(), this.ccNameErrorList);
        this.performValidation(this.cvcValidationChecks(), this.cvcErrorList);
        this.performValidation(this.emailValidationChecks(), this.emailErrorList);
        this.performValidation(this.generalValidationChecks(), this.generalErrorList);
    };
    ProcessOrderDialog.prototype.save = function () {
        var _this = this;
        this.serverError('');
        this.runValidations();
        if (this.hasErrors()) {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd;
        }
        return NetEvents.Saving(this.getStripeToken().done(function (response) {
            var strip = {
                orderId: _this.orderModel.orderID,
                eventId: _this.orderModel.eventModel.id,
                stripeTokenId: response.id,
                email: _this.email(),
                amount: _this.grandTotal(),
                invoiceRequested: _this.invoiceMe(),
                eventName: _this.orderModel.eventModel.eventName,
                creditCardFullName: _this.fullCreditCardName(),
                companyName: _this.companyName(),
                tickets: _.map(_this.orderModel.allTickets(), function (t) { return ko.toJS(t); })
            };
            var d = ko.toJSON({ info: ko.toJSON(strip) });
            console.log('saving');
            return NetEvents.Saving($.ajax({
                async: true,
                type: "POST",
                dataType: "text",
                url: "NE/Home/SaveOrderAsync",
                data: d
            }).done(function (r) {
                var ro = JSON.parse(r);
                if (!ro.errorMessage.trim()) {
                    _this.processingSuccessful(true);
                }
                else {
                    _this.serverError(ro.errorMessage);
                    _this.runValidations();
                }
            }));
        }));
    };
    ProcessOrderDialog.prototype.loadSampleData = function (version) {
        this.email('damiensawyer@gmail.com');
        this.fullCreditCardName('Pete Mitchel');
        this.companyName('Maverick Air Pty Ltd');
        switch (version) {
            case 1:
                this.ccNumber('4242424242424242');
                this.ccExpMonth('5');
                this.ccExpYear('2017');
                this.ccCVC('433');
                break;
            case 2:
                this.ccNumber('5555555555554444');
                this.ccExpMonth('8');
                this.ccExpYear('2020');
                this.ccCVC('999');
                break;
            case 3:
                this.ccNumber('378282246310005');
                this.ccExpMonth('8');
                this.ccExpYear('2020');
                this.ccCVC('999');
                break;
            case 4:
                this.ccNumber('4000000000000127');
                this.ccExpMonth('8');
                this.ccExpYear('2020');
                this.ccCVC('999');
                break;
            case 5:
                this.ccNumber('1298377');
                this.ccExpMonth('8');
                this.ccExpYear('2020');
                this.ccCVC('999');
                break;
            default:
                break;
        }
    };
    return ProcessOrderDialog;
}());
