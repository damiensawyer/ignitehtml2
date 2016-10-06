/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        $(element).hide();
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn('slow') : $(element).fadeOut('fast');
    }
};
ko.virtualElements.allowedBindings['fadeVisible'] = true;
