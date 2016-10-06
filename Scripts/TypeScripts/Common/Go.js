/// <reference path="../Definitions/lodash.d.ts" />
/// <reference path="../Definitions/jquery.d.ts" />
/// <reference path="../Definitions/knockout.d.ts" />
var GoViewModel = (function () {
    function GoViewModel() {
        //this.contact = new GoFormViewModel();
        var _this = this;
        this.contact = new GoFormViewModel();
        this.success = ko.observable(false);
        this.checkValidations = ko.observable(false);
        this.nameValid = ko.computed(function () { return _this.validateRequired(_this.contact.Name()); });
        this.skypeValid = ko.computed(function () { return true; });
        this.phoneValid = ko.computed(function () { return !!_this.validatePhone(_this.contact.Phone().trim()); });
        this.emailValid = ko.computed(function () { return !!_this.validateEmail(_this.contact.Email().trim()); });
        this.allValid = ko.computed(function () { return _this.nameValid() && _this.skypeValid() && _this.phoneValid() && _this.emailValid(); });
        this.errorThrown = ko.observable(false);
        this.showSpinner = ko.observable(false);
    }
    GoViewModel.prototype.submitForm = function () {
        var _this = this;
        this.errorThrown(false);
        if (!this.allValid()) {
            this.checkValidations(true);
        }
        else {
            var s = ko.toJSON(this.contact);
            // http://api.jquery.com/jQuery.ajax/#jqXHR
            this.showSpinner(true);
            $.post('go/SubmitGoForm', s)
                .fail(function () {
                _this.success(false);
                _this.errorThrown(true);
            })
                .always(function () { _this.showSpinner(false); })
                .done(function (r) {
                _this.success(true);
                console.log(r);
            }); // note, using a lambda in the done caused a jquery error.	
        }
    };
    GoViewModel.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    GoViewModel.prototype.validatePhone = function (p) {
        return !!p.trim();
        //var re = new RegExp('^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?');
        //return re.test(p);
    };
    GoViewModel.prototype.validateRequired = function (text) {
        return !!text.trim();
    };
    return GoViewModel;
}());
var GoFormViewModel = (function () {
    function GoFormViewModel() {
        this.Name = ko.observable('');
        this.Email = ko.observable('');
        this.Phone = ko.observable('');
        this.Skype = ko.observable('');
    }
    return GoFormViewModel;
}());
