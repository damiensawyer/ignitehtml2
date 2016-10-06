var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderModel = (function () {
    function OrderModel() {
        this.orderId = null;
        this.orderNumber = 0;
        this.orderDateUTC = null;
        this.creditCardFullName = null;
        this.companyName = null;
        this.eventId = null;
        this.stripeTokenId = null;
        this.stripeChargeId = null;
        this.email = null;
        this.invoiceRequested = false;
        this.amount = 0;
        this.eventName = null;
        this.tickets = [];
        this.orderStatus = 0;
        this.rowNumber = null;
    }
    return OrderModel;
}());
var OrderTicket = (function () {
    function OrderTicket() {
        this.name = null;
        this.discountCode = null;
        this.discountCodeId = null;
        this.ticketTypeId = null;
        this.cost = 0;
        this.discountedPrice = 0;
        this.discountValid = false;
        this.ticketNumber = null;
        this.answers = [];
        this.priceTheyPaid = 0;
        this.ticketId = null;
    }
    return OrderTicket;
}());
var AnswerBase = (function () {
    function AnswerBase() {
        this.answerText = null;
        this.answerTextExcel = null;
        this.answerTextEmail = null;
        this.questionType = null;
        this.questionId = null;
    }
    return AnswerBase;
}());
var AnswerText = (function (_super) {
    __extends(AnswerText, _super);
    function AnswerText() {
        _super.apply(this, arguments);
        this.value = null;
    }
    return AnswerText;
}(AnswerBase));
var AnswerFlag = (function (_super) {
    __extends(AnswerFlag, _super);
    function AnswerFlag() {
        _super.apply(this, arguments);
        this.value = false;
        this.answerText = null;
    }
    return AnswerFlag;
}(AnswerBase));
var AnswerEmail = (function (_super) {
    __extends(AnswerEmail, _super);
    function AnswerEmail() {
        _super.apply(this, arguments);
        this.value = null;
    }
    return AnswerEmail;
}(AnswerBase));
var AnswerDate = (function (_super) {
    __extends(AnswerDate, _super);
    function AnswerDate() {
        _super.apply(this, arguments);
        this.answerTextExcel = null;
        this.answerTextEmail = null;
        this.value = null;
    }
    return AnswerDate;
}(AnswerBase));
var AnswerSelectList = (function (_super) {
    __extends(AnswerSelectList, _super);
    function AnswerSelectList() {
        _super.apply(this, arguments);
        this.value = null;
    }
    return AnswerSelectList;
}(AnswerBase));
