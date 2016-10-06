var SearchResultOrder = (function () {
    function SearchResultOrder() {
        this.orderId = null;
        this.orderNumber = 0;
        this.orderDateUTC = null;
        this.companyName = null;
        this.stripeTokenId = null;
        this.invoiceRequested = false;
        this.amount = 0;
    }
    return SearchResultOrder;
}());
var SearchParams = (function () {
    function SearchParams() {
        this.eventId = null;
        this.pageIndex = 0;
        this.pageSize = 0;
        this.searchTerm = null;
    }
    return SearchParams;
}());
