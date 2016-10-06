/// <reference path="../../definitions/EventModel.ts" />
/// <reference path="answerbasevm.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerTextVM = (function (_super) {
    __extends(AnswerTextVM, _super);
    function AnswerTextVM(changeNotification, data) {
        _super.call(this, changeNotification, data);
    }
    AnswerTextVM.prototype.validationChecks = function () {
        return [
            function (q) { return q.answerText() == 'dog' ? 'dog is not an answer!!' : ''; },
            function (q) { return q.answerText() == 'cat' ? 'cat is not an answer!!' : ''; }
        ];
    };
    return AnswerTextVM;
}(AnswerBaseVM));
