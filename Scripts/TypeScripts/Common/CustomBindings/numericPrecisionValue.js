/// <reference path="../../Definitions/netevents.d.ts" />
// Will force a number field to restrain to n decimal places. Defaults to 2. This feels a bit hacky.
ko.bindingHandlers.numericPrecisionValue = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        //var v = ko.utils.unwrapObservable(valueAccessor()).toString();
        var value = ko.utils.unwrapObservable(valueAccessor()).toString();
        var passedPrecision = ko.utils.unwrapObservable(allBindingsAccessor().precision);
        var precision = passedPrecision === undefined
            ? ko.bindingHandlers.numericPrecisionValue.defaultPrecision
            : passedPrecision;
        if (precision === 0) {
            valueAccessor()(Math.floor(value));
            return;
        }
        var afterDecimal = (value % 1).toFixed(precision);
        var formattedValue = parseFloat(parseFloat(value).toFixed(precision));
        // Call ParseFloat twice to remove insignificant 0's from back of string
        // This will allow precisions less than the max... 
        if (afterDecimal
            .toString()
            .length -
            2 ===
            precision &&
            parseFloat(afterDecimal) !== 0) {
            valueAccessor()(formattedValue);
        }
    },
    defaultPrecision: 2
};
ko.virtualElements.allowedBindings['numericPrecisionValue'] = false;
