/// <reference path="../../definitions/EventModel.ts" />
/// <reference path="answerbasevm.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerEmailVM = (function (_super) {
    __extends(AnswerEmailVM, _super);
    function AnswerEmailVM(changeNotification, data) {
        _super.call(this, changeNotification, data);
    }
    AnswerEmailVM.prototype.validationChecks = function () {
        return [
            function (q) { return !(!q.answerText().trim() || NetEvents.validateEmail(q.answerText())) ? 'Please enter a valid email address' : ''; },
        ];
    };
    return AnswerEmailVM;
}(AnswerBaseVM));
