/// <reference path="../../Definitions/netevents.d.ts" />
ko.bindingHandlers.tooltip = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element)
            .attr('data-toggle', 'tooltip')
            .attr('data-placement', 'top');
        //.attr('title', 'hello world');
        var tooltipMessage = _.map(valueAccessor(), function (x) { return '* ' + x; }).join('\r\n');
        $(element).tooltip({ html: true, title: tooltipMessage, container: 'body' });
        //$(element).find('.tooltip-inner').html('thq cuik askdhkasd jsd');
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    }
};
//ko.virtualElements.allowedBindings['tooltip'] = false;
