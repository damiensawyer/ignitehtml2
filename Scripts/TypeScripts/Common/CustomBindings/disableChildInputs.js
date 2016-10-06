/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.disableChildInputs = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        var setting = ko.utils.unwrapObservable(value);
        $(element).find(":input").prop('disabled', setting);
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        var setting = ko.utils.unwrapObservable(value);
        $(element).find(":input").prop('disabled', setting);
    }
};
ko.virtualElements.allowedBindings['disableChildInputs'] = true;
