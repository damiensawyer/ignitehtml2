/// <reference path="../../definitions/EventModel.ts" />
/// <reference path="answerbasevm.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerSelectListVM = (function (_super) {
    __extends(AnswerSelectListVM, _super);
    function AnswerSelectListVM(changeNotification, data) {
        _super.call(this, changeNotification, data);
        this.options = ko.observableArray([]);
        if (!!data) {
            var d = (data.optionsCSV || '').split(',');
            this.options(d);
        }
    }
    return AnswerSelectListVM;
}(AnswerBaseVM));
