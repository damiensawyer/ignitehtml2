/// <reference path="../../../definitions/netevents.d.ts" />
//$('#myModal').modal('toggle');
//$('#myModal').modal('show');
//$('#myModal').modal('hide');
var Dialog = (function () {
    function Dialog() {
    }
    Dialog.prototype.show = function () {
        $('#NEModal').modal('show');
        return null;
    };
    Dialog.prototype.hide = function () {
        $('#NEModal').modal('hide');
        return null;
    };
    Dialog.prototype.toggle = function () {
        $('#NEModal').modal('toggle');
        return null;
    };
    return Dialog;
}());
//class FormDialog extends CardViewModel implements IPopupDialog {
//    template = 'FormDialog';
//    title = ko.observable(rootVm.branding);
//    fields: KnockoutObservableArray<any>;
//    bodyCss = ko.observable<any>(null);
//    okLabel = ko.observable(labels.ok);
//    deleteLabel = ko.observable(labels.deleteButton);
//    okCss = ko.observable('btn-primary');
//    isLoading = ko.observable(false);
//    canDelete = ko.observable(false);
//    canCancel = ko.observable(false);
//    canSave = ko.observable(true);
//    cancelLabel = ko.observable(labels.cancel);
//    cancelCss = ko.observable('');
//    canDismiss = this.canCancel;
//    message = ko.observable('');
//    messageCss = ko.observable('alert-danger');
//    id = $.nextId();
//    constructor(fieldList: IField[], okLabel?: string, isDangerous = false, commandBus?: Commands.ICommandBus) {
//        super(commandBus);
//        FormDialog.prototype.saveChanges = undefined;
//        this.addFields(fieldList);
//        if (okLabel) {
//            this.okLabel(okLabel);
//        }
//        if (isDangerous) {
//            this.okCss('btn-danger');
//            this.cancelCss('btn-primary');
//        }
//    }
//    show(): JQueryDeferred<boolean> {
//        this.beginEdit();
//        return null;
//    }
//    performDelete() {
//        // Override
//    }
//    ok() {
//        if (typeof this.saveChanges === 'undefined') {
//            this.close(true);
//        } else {
//            this.saveAndClose();
//        }
//    }
//    saveAndClose() {
//        var s = this.save();
//        if (!!s) {
//            this.isLoading(true);
//            s.done(_ => this.close(true))
//                .always(_ => this.isLoading(false));
//        } else {
//            this.close(true);
//        }
//    }
//    close(result: boolean) {
//        rootVm.closeDialog(this, result);
//    }
//    cancel() {
//        rootVm.closeDialog(this, null);
//    }
//    handleServerError(e: any): boolean {
//        // Hide the loading animation and show our fields again so that validation shows for them.
//        this.isLoading(false);
//        if (!super.handleServerError(e) && !!e) {
//            this.messageCss('alert-danger');
//            this.message(Diagnostics.getErrorString(e));
//        }
//        return true;
//    }
//} 
