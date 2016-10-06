/// <reference path="../definitions/NetEvents.d.ts" />
/// <reference path="../definitions/EventModel.ts" />
/// <reference path="./OrderTicketViewModel.ts" />
/// <reference path="./OrderViewModel.ts" />
/** A container for all the tickets of a class. */
var OrderTicketClassViewModel = (function () {
    function OrderTicketClassViewModel(ticketModel, palette, changeNotification) {
        var _this = this;
        this.ticketModel = ticketModel;
        this.maxTicketCount = ko.observable(10);
        this.couponCodeSHA = ko.observable('');
        this.ticketName = ko.observable('');
        this.ticketCount = ko.observable(0);
        this.Cost = ko.observable(0);
        this.palette = ko.observable();
        /**Used to populate the option list */
        this.ticketCountOptions = ko.computed(function () {
            var j = _this.maxTicketCount();
            var result = [];
            for (var index = 0; index < j; index++) {
                result.push(index);
            }
            return result;
        });
        this.ticketsToPurchase = ko.observableArray([]);
        this.Cost(ticketModel.cost);
        this.ticketName(ticketModel.name);
        this.couponCodeSHA(ticketModel.couponCodeSHA);
        this.palette(palette);
        this.ticketCount.subscribe(function (newCount) {
            var cl = _this.ticketsToPurchase().length;
            if (newCount < cl) {
                var r = _.slice(_this.ticketsToPurchase(), 0, newCount);
                _this.ticketsToPurchase(r);
            }
            else if (newCount > cl) {
                for (var index = 0; index < (newCount - cl); index++) {
                    var newTicket = new OrderTicketViewModel(_this.ticketModel, changeNotification);
                    _this.ticketsToPurchase.push(newTicket);
                }
            }
        });
        //this.ticketCount(3);
        //setInterval(() => { this.palette(Math.floor((Math.random() * 10) + 1)); }, 1500);
        //this.ticketsToPurchase()[0].discountCode('dog');
        //this.ticketsToPurchase()[1].discountCode('cat');
    }
    return OrderTicketClassViewModel;
}());
