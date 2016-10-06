/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.confirmButton = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var options = allBindingsAccessor().confirmButtonOptions ||
            {
                text: 'Delete',
                action: function () { }
            };
        var id = $.nextId('confirmButton');
        var confirmButton = $('<button>').attr('id', id).attr('class', 'btn btn-xs btn-danger').html('Confirm Delete').hide();
        var cancelButton = $('<button>').attr('id', id).attr('class', 'btn btn-xs btn-success').html('Do Not Delete').hide();
        $(element).after(confirmButton).after(cancelButton);
        var buttonClicked = function () {
            $(element).hide();
            confirmButton.fadeIn();
            cancelButton.fadeIn();
        };
        var restoreState = function () {
            $(element).show();
            confirmButton.hide();
            cancelButton.hide();
        };
        var confirmDelete = function () {
            ko.unwrap(valueAccessor())();
            restoreState();
        };
        var value = ko.unwrap(valueAccessor());
        ko.bindingHandlers.click.init(element, function () { return buttonClicked; }, allBindingsAccessor, viewModel, bindingContext);
        ko.bindingHandlers.click.init(cancelButton, function () { return restoreState; }, allBindingsAccessor, viewModel, bindingContext);
        ko.bindingHandlers.click.init(confirmButton, function () { return confirmDelete; }, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    }
};
ko.virtualElements.allowedBindings['fadeVisible'] = true;
