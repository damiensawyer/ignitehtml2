/// <reference path="../definitions/netevents.d.ts" />
/// <reference path="../definitions/neteventsuser.d.ts" />
var OrderFunctions;
(function (OrderFunctions) {
    function OrderRoot() {
        var r = NE.viewModel();
        return r;
    }
    OrderFunctions.OrderRoot = OrderRoot;
    function performValidation(target, validationChecks, validationErrors) {
        var result = [];
        _.each(validationChecks, function (c) {
            var r = c(target);
            if (!!r)
                result.push(r);
        });
        validationErrors(result);
    }
    OrderFunctions.performValidation = performValidation;
    function MappingOptionsAnswerList(changeNotification) {
        var ticketMappingOptions = {
            'questions': {
                create: function (i) {
                    switch (i.data.questionType) {
                        case QuestionTypes[QuestionTypes.textField]:
                            return new AnswerTextVM(changeNotification, i.data); // notice that we're instantiating with a question...
                        case QuestionTypes[QuestionTypes.flagField]:
                            return new AnswerFlagVM(changeNotification, i.data);
                        case QuestionTypes[QuestionTypes.emailField]:
                            return new AnswerEmailVM(changeNotification, i.data);
                        case QuestionTypes[QuestionTypes.selectListField]:
                            return new AnswerSelectListVM(changeNotification, i.data);
                        case QuestionTypes[QuestionTypes.dateField]:
                            return new AnswerDateVM(changeNotification, i.data);
                        default:
                            return new AnswerTextVM(changeNotification, i.data);
                    }
                }
            }
        };
        return ticketMappingOptions;
    }
    OrderFunctions.MappingOptionsAnswerList = MappingOptionsAnswerList;
    function AnswerTypeDetails(questionType) {
        switch (questionType) {
            case QuestionTypes[QuestionTypes.textField]:
                return { Key: questionType, Template: 'AnswerText' };
            case QuestionTypes[QuestionTypes.flagField]:
                return { Key: questionType, Template: 'AnswerFlag' };
            case QuestionTypes[QuestionTypes.emailField]:
                return { Key: questionType, Template: 'AnswerEmail' };
            case QuestionTypes[QuestionTypes.selectListField]:
                return { Key: questionType, Template: 'AnswerSelectList' };
            case QuestionTypes[QuestionTypes.dateField]:
                return { Key: questionType, Template: 'AnswerDate' };
            default:
                throw "no friendly name for " + questionType;
        }
    }
    OrderFunctions.AnswerTypeDetails = AnswerTypeDetails;
})(OrderFunctions || (OrderFunctions = {}));
