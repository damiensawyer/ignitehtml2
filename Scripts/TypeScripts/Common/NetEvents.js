/// <reference path="../definitions/netevents.d.ts" />
var NetEvents;
(function (NetEvents) {
    var savingCount = 0;
    // Set up a root object. This is fired from a script in the head of _Layout.cshtml
    function InitialiseNE() {
        var uniqueId = 0;
        $.extend({
            nextId: function (label) {
                uniqueId++;
                return (label || 'collapse') + uniqueId;
            }
        });
        $.ajaxSetup({
            //url: "/xmlhttp/",
            global: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "json" // note that there are some places where I use text instead of json, to facility custom
        });
        console.log('ajax init');
        window.NE = {
            say: 'hello',
            saving: ko.observable(false)
        };
    }
    NetEvents.InitialiseNE = InitialiseNE;
    //http://stackoverflow.com/a/2450976/494635
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    NetEvents.shuffle = shuffle;
    function test185() {
        // this is an TS1.8 feature. Leave it in to ensure the environment is running the right ts
        function assign(target, source) {
            for (var id in source) {
                target[id] = source[id];
            }
            return target;
        }
        var x = { a: 1, b: 2, c: 3, d: 4 };
        assign(x, { b: 10, d: 20 });
        //assign(x, { e: 0 });  // Error
    }
    function isInteger(n) {
        var n1 = parseFloat(n.toString());
        return Number(n1) === n1 && n1 % 1 === 0;
    }
    NetEvents.isInteger = isInteger;
    function Saving(watch) {
        StartSaving();
        return watch.always(function () {
            StopSaving();
        });
    }
    NetEvents.Saving = Saving;
    function StartSaving() {
        savingCount++;
        updateBusy();
    }
    NetEvents.StartSaving = StartSaving;
    function StopSaving() {
        savingCount--;
        if (savingCount < 0) {
            savingCount = 0;
        }
        updateBusy();
    }
    NetEvents.StopSaving = StopSaving;
    function updateBusy() {
        var div = $('#savinggrowl');
        var visible = $("#savinggrowl").is(":visible");
        if (savingCount > 0 && !visible) {
            div.fadeIn('fast');
            window.NE.saving(true);
        }
        else if (savingCount == 0 && visible) {
            div.fadeOut('fast');
            window.NE.saving(false);
        }
    }
    function calculateSHA(input) {
        var shaObj = new jsSHA("SHA-1", "TEXT"); // note, I only included the jssha library for sha 1.... it was smaller
        shaObj.update(input.toUpperCase());
        var hash = shaObj.getHash("B64");
        return hash;
    }
    NetEvents.calculateSHA = calculateSHA;
    function formatCurrency(value) {
        return "$" + value.toFixed(2);
    }
    NetEvents.formatCurrency = formatCurrency;
    var Guid = (function () {
        function Guid(guid) {
            this.guid = guid;
            this._guid = guid;
        }
        Guid.prototype.toString = function () {
            return this.guid;
        };
        // Static member
        Guid.MakeNew = function () {
            var result;
            var i;
            var j;
            result = "";
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return new Guid(result);
        };
        return Guid;
    }());
    NetEvents.Guid = Guid;
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    NetEvents.validateEmail = validateEmail;
    // duplicted in admin... remove the other
    function SubscribeToErrorValidation(target, checks, errorList) {
        ko.computed(function () {
            var result = [];
            _.each(checks, function (c) {
                var r = c(target);
                if (!!r)
                    result.push(r);
            });
            errorList(result);
        });
    }
    NetEvents.SubscribeToErrorValidation = SubscribeToErrorValidation;
})(NetEvents || (NetEvents = {}));
