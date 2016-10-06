var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AdminHomeModel = (function () {
    function AdminHomeModel() {
        this.events = [];
    }
    return AdminHomeModel;
}());
var EventModel = (function () {
    function EventModel() {
        this.id = null;
        this.orderCount = 0;
        this.idInt = 0;
        this.editable = false;
        this.archived = false;
        this.eventName = null;
        this.emailForInvoiceRequests = null;
        this.additionalTextForReceiptEmail_Stripe = null;
        this.additionalTextForReceiptEmail_Invoice = null;
        this.shortEventName = null;
        this.location = null;
        this.mastheadImage = null;
        this.soldOutMessage = null;
        this.contactName = null;
        this.contactNumber = null;
        this.eventDate = null;
        this.eventEndDate = null;
        this.blurb = null;
        this.ticketsPurchased = [];
        this.hashCode = null;
        this.tickets = [];
        this.checksum = null;
    }
    return EventModel;
}());
var EventTicket = (function () {
    function EventTicket() {
        this.name = null;
        this.ticketTypeId = null;
        this.numberAvailable = 0;
        this.cost = 0;
        this.startDate = null;
        this.cutoffDate = null;
        this.couponCode = null;
        this.ticketDescription = null;
        this.couponCodeSHA = null;
        this.questions = [];
        this.expandTicket = false;
        this.discountCodes = [];
    }
    return EventTicket;
}());
var QuestionBase = (function () {
    function QuestionBase() {
        this.questionText = null;
        this.questionType = null;
        this.mandatory = false;
        this.questionId = null;
        this.systemQuestion = false;
    }
    return QuestionBase;
}());
var QuestionText = (function (_super) {
    __extends(QuestionText, _super);
    function QuestionText() {
        _super.apply(this, arguments);
    }
    return QuestionText;
}(QuestionBase));
var QuestionFlag = (function (_super) {
    __extends(QuestionFlag, _super);
    function QuestionFlag() {
        _super.apply(this, arguments);
    }
    return QuestionFlag;
}(QuestionBase));
var QuestionEmail = (function (_super) {
    __extends(QuestionEmail, _super);
    function QuestionEmail() {
        _super.apply(this, arguments);
    }
    return QuestionEmail;
}(QuestionBase));
var QuestionDate = (function (_super) {
    __extends(QuestionDate, _super);
    function QuestionDate() {
        _super.apply(this, arguments);
    }
    return QuestionDate;
}(QuestionBase));
var QuestionSelectList = (function (_super) {
    __extends(QuestionSelectList, _super);
    function QuestionSelectList() {
        _super.apply(this, arguments);
        this.optionsCSV = null;
    }
    return QuestionSelectList;
}(QuestionBase));
var DiscountCodeModel = (function () {
    function DiscountCodeModel() {
        this.discountCode = null;
        this.discountCodeId = null;
        this.discountCodeSHA = null;
        this.discount = 0;
        this.numberAvailable = 0;
        this.numberAlreadySold = 0;
        this.comment = null;
    }
    return DiscountCodeModel;
}());
var EventHeaderModel = (function () {
    function EventHeaderModel() {
        this.id = null;
        this.shortEventName = null;
        this.idInt = 0;
        this.eventName = null;
        this.eventDate = null;
        this.eventEndDate = null;
        this.checksum = null;
        this.archived = false;
        this.orderCount = 0;
        this.jsonCompressed = [];
        this.damien = null;
        this.formattedStartDate = null;
    }
    return EventHeaderModel;
}());
var QuestionTypes;
(function (QuestionTypes) {
    QuestionTypes[QuestionTypes["textField"] = 0] = "textField";
    QuestionTypes[QuestionTypes["flagField"] = 1] = "flagField";
    QuestionTypes[QuestionTypes["selectListField"] = 2] = "selectListField";
    QuestionTypes[QuestionTypes["dateField"] = 3] = "dateField";
    QuestionTypes[QuestionTypes["emailField"] = 4] = "emailField";
})(QuestionTypes || (QuestionTypes = {}));
