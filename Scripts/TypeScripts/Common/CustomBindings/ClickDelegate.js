/// <reference path="../../Definitions/netevents.d.ts" />
/// fast binding of click event to selection of elements
ko.bindingHandlers.clickDelegate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var eventName = 'click';
        var process = function (action) {
            $(element).on(eventName, action.selector, function (e) {
                var item = ko.contextFor(this);
                var actionScope = ko.unwrap(action.scope);
                var scope = ko.unwrap(_.isObject(actionScope) ? actionScope : item[actionScope || '$data']);
                var data = ko.unwrap(item[action.data || '$data']);
                if (typeof scope[action.method] === 'function') {
                    if (action.parameter) {
                        scope[action.method](ko.unwrap(item[action.parameter]), data, e);
                    }
                    else {
                        scope[action.method](data, this, e);
                    }
                }
                if (action.preventDefault) {
                    e.preventDefault();
                }
                if (action.stopPropagation) {
                    e.stopPropagation();
                }
            });
        };
        var action = ko.unwrap(valueAccessor());
        if (_.isArray(action)) {
            _.each(action, function (a) { process(a); });
        }
        else {
            process(action);
        }
    }
};
