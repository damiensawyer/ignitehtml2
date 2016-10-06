/// <reference path="../orderfunctions.ts" />
/// <reference path="../../definitions/netevents.d.ts" />
/// <reference path="ianswersavevalidation.ts" />
var AnswerBaseVM = (function () {
    function AnswerBaseVM(changeNotification, data) {
        var _this = this;
        this.validationErrors = ko.observableArray([]);
        this.validationRun = ko.observable(false); // used to stop fields showing 'green' before validation run... 
        this.hasErrors = ko.computed(function () {
            var c = _this.validationErrors().length;
            return c > 0;
        });
        this.allTests = ko.computed(function () {
            var result = _this.validationChecks().concat(_this.baseTests);
            return result;
        });
        this.questionType = ko.observable(null);
        this.questionText = ko.observable(null);
        this.questionId = ko.observable(null);
        this.mandatory = ko.observable(false);
        this.answerText = ko.observable('');
        this.baseTests = [
            // question
            function (a) { return (a.mandatory() && !a.answerText() && _this.questionType() != QuestionTypes[QuestionTypes.flagField]) ? 'An answer for this question is required' : ''; }
        ];
        if (!!data) {
            this.questionId(data.questionId);
            this.questionText(data.questionText);
            this.questionType(data.questionType);
            this.mandatory(data.mandatory);
        }
        setImmediate(function () {
            changeNotification(_this);
            OrderFunctions.OrderRoot().requestValidation.subscribe(function (x) {
                _this.validationRun(true);
                OrderFunctions.performValidation(_this, _this.allTests(), _this.validationErrors);
            });
        });
    }
    AnswerBaseVM.prototype.validationChecks = function () {
        return []; // do not implement here... 
    };
    return AnswerBaseVM;
}());
