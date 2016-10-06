/// <reference path="../definitions/netevents.d.ts" />
var DateFunctions;
(function (DateFunctions) {
    /**eg 2016-06-29T00:00:00.000Z*/
    function isoDateAtMidnight(year, month, day) {
        var result = moment.utc(Date.UTC(year, month, day)).toISOString(); // this converts to utc iso date with time at midnight http://stackoverflow.com/a/28641878
        return result;
    }
    DateFunctions.isoDateAtMidnight = isoDateAtMidnight;
})(DateFunctions || (DateFunctions = {}));
