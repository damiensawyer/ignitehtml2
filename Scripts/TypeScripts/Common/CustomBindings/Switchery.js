/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.switchery = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var options = (allBindingsAccessor().options ||
            {
                size: 'small'
            });
        var v = valueAccessor();
        $(element).prop('checked', v());
        var e = new Switchery(element, options);
        element.onchange = function () {
            if (ko.isObservable(v)) {
                v(element.checked);
            }
        };
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.unwrap(valueAccessor());
        var currentValue = element.checked;
        if (currentValue != value) {
            //e.setPosition(value); // didn't seem to work... so just send it a click.
            $(element).trigger('click');
        }
    }
};
//ko.virtualElements.allowedBindings['switchery'] = false;
