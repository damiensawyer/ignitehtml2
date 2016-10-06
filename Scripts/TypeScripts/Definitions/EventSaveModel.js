var EventSaveModel = (function () {
    function EventSaveModel() {
        this.hashCode = null;
        this.errorMessages = [];
        this.ticketsPurchased = [];
    }
    return EventSaveModel;
}());
var TicketPurchased = (function () {
    function TicketPurchased() {
        this.ticketTypeId = null;
        this.count = 0;
    }
    return TicketPurchased;
}());
