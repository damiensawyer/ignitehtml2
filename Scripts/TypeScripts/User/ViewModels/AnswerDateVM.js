/// <reference path="../../definitions/EventModel.ts" />
/// <reference path="answerbasevm.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerDateVM = (function (_super) {
    __extends(AnswerDateVM, _super);
    function AnswerDateVM(changeNotification, data) {
        _super.call(this, changeNotification, data);
    }
    return AnswerDateVM;
}(AnswerBaseVM));
