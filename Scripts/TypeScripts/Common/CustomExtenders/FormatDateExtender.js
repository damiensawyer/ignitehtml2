/// <reference path="../../Definitions/netevents.d.ts" />
ko.extenders.formatDate = function (target, precision) {
    //create a writable computed observable to intercept writes to our observable
    var result = ko.pureComputed({
        read: target,
        write: function (newValue) {
            var current = target(), 
            // http://momentjs.com/docs/#/displaying/
            valueToWrite = moment(newValue).format('D MMMM YYYY');
            //only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            }
            else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
        }
    }).extend({ notify: 'always' });
    //initialize with current value to make sure it is rounded appropriately
    result(target());
    //return the new computed observable
    return result;
};
