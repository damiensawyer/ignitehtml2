/// <reference path="../definitions/rx-lite.d.ts" />
/// <reference path="../definitions/knockout.d.ts" />
/// <reference path="../definitions/EventModel.ts" />
/// <reference path="../definitions/NetEvents.d.ts" />
/// <reference path="../definitions/genVM.ts" />
/// <reference path="orderticketclassviewmodel.ts" />
/// <reference path="../Common/Components/Dialog/Dialog.ts" />
var EventRegisterPage = (function () {
    function EventRegisterPage() {
        var _this = this;
        this.eventModelJS = ko.observable(); // will contain a POJO... no observables
        this.eventDateRaw = ko.observable();
        this.eventEndDateRaw = ko.observable();
        this.eventDate = ko.observable().extend({ formatDate: undefined });
        this.eventEndDate = ko.observable().extend({ formatDate: undefined });
        this.eventDateRange = ko.pureComputed(function () {
            var sd = _this.eventDate();
            var ed = _this.eventEndDate();
            var single = !_this.eventEndDateRaw() || moment(_this.eventEndDateRaw()).isSame(moment(_this.eventDateRaw()));
            var result = single ? sd : sd + ' - ' + ed;
            return result;
        });
        this.order = ko.observable();
        this.requestValidation = new Rx.Subject();
        this.stripePublicKey = ko.observable();
        this.showContact = ko.pureComputed(function () {
            return !!_this.eventModelJS().contactName || _this.eventModelJS().contactNumber;
        });
    }
    EventRegisterPage.prototype.loadModel = function (eventModel) {
        this.eventModelJS(eventModel);
        this.eventDateRaw(eventModel.eventDate);
        this.eventEndDateRaw(eventModel.eventEndDate);
        this.eventDate(eventModel.eventDate);
        this.eventEndDate(eventModel.eventEndDate);
        this.order(new OrderViewModel(eventModel));
    };
    return EventRegisterPage;
}());
