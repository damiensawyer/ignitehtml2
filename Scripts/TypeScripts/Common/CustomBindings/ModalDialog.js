/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.modalDialog = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        return { controlsDescendantBindings: true };
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = (ko.unwrap(valueAccessor()));
        ko.bindingHandlers.template.update(element, function () { return { name: value.modalTemplate(), data: value }; }, allBindingsAccessor, viewModel, bindingContext);
        var newDialog = $(element).children('.modal');
        if (ko.utils.unwrapObservable(value.showDialog)) {
            $(newDialog).modal('show');
        }
        else {
            $(newDialog).modal('hide');
        }
        $(newDialog).on('hide.bs.modal', function () {
            value.showDialog(false);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(newDialog).modal("destroy");
        });
    }
};
ko.virtualElements.allowedBindings['modalDialog'] = false;
