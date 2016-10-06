/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.slideVisible = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        $(element).hide();
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).slideDown('fast') : $(element).slideUp('fast');
    }
};
ko.virtualElements.allowedBindings['slideVisible'] = true;
