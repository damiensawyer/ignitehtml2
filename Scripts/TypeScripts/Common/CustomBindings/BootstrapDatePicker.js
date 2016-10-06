/// <reference path="../../admin/adminfunctions.ts" />
/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.boostrapDatePicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions ||
            {
                format: 'dd-M-yyyy',
                clearBtn: true,
                todayBtn: 'linked',
                autoclose: true,
                startView: 2 //https://eternicode.github.io/bootstrap-datepicker
            };
        var clearButton = $('<button class="btn btn-xs btn-info" type="button">X</button>');
        clearButton.insertAfter($(element));
        //$(element).insertAfter(clearButton);
        $(element).datepicker(options);
        ko.utils.registerEventHandler(element, "clearDate", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value('');
            }
        });
        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "changeDate", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                if (!event.date || event.date.getFullYear() < 1971)
                    return;
                var r = DateFunctions.isoDateAtMidnight(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());
                value(r);
            }
        });
        var clearFunction = function () { return function () { valueAccessor()(''); }; }; //http://stackoverflow.com/a/18143227/494635
        ko.bindingHandlers.click.init(clearButton, clearFunction, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var d = ko.unwrap(valueAccessor());
        var m = moment(d).isValid() ? moment(d).format('D MMM YYYY') : 'click to enter date';
        $(element).html(m);
        var widget = $(element).data("datepicker");
        //when the view model is updated, update the widget
        if (widget) {
            var d = ko.utils.unwrapObservable(valueAccessor());
        }
    }
};
//ko.virtualElements.allowedBindings['datePicker'] = false; // need to attach to an element... I think. 
//interface KnockoutExtenders {
//    formattedDate(target: any): KnockoutComputed<string>;
//}
//declare var longDate: (date: Date) => string;
//declare var shortDate: (date: Date) => string;
//ko.extenders.formattedDate = (target) => {
//    var result = ko.computed<string>({
//        read: () => {
//            var d = target();
//            var result = shortDate(new Date(d));
//            return result;
//        },
//        write: target
//    });
//    return result;
//}; 
