sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Label',
    'sap/m/MessageToast',
    'sap/m/Text',
    'sap/m/TextArea',
    'sap/m/ButtonType',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator",
    'sap/m/MessageBox'
],
    function (Controller, Button, Dialog, Label, MessageToast, Text, TextArea, ButtonType, Filter, FilterOperator, BusyIndicator, MessageBox) {
        "use strict";

        return Controller.extend("com.emami.fmfodeviation.controller.Home", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteHome").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {

                // return;

                const DateNow = new Date();
                let aData = [
                    {
                        "Erdat": DateNow,
                        "Uzeit": "",
                        "Kwmeng": "12",
                        "Meins": "INR",
                        "Vbeln": "180034",
                        "Posnr": "10",
                        "Werks": "H120",
                        "Matnr": "902020",
                        "Maktx": "Painter",
                        "Message": "Production",
                        "AddInfo": "Helli Test2"
                    },
                    {
                        "Erdat": DateNow,
                        "Uzeit": "",
                        "Kwmeng": "26",
                        "Meins": "INR",
                        "Vbeln": "180134",
                        "Posnr": "20",
                        "Werks": "H220",
                        "Matnr": "912020",
                        "Maktx": "Cobalt",
                        "Message": "Trial",
                        "AddInfo": "Hello Text"
                    },
                    {
                        "Erdat": DateNow,
                        "Uzeit": "",
                        "Kwmeng": "216",
                        "Meins": "INR",
                        "Vbeln": "180134",
                        "Posnr": "20",
                        "Werks": "H2210",
                        "Matnr": "9120120",
                        "Maktx": "Cobalt",
                        "Message": "Trial",
                        "AddInfo": "Hello Text"
                    },
                    {
                        "Erdat": DateNow,
                        "Uzeit": "",
                        "Kwmeng": "26",
                        "Meins": "INR",
                        "Vbeln": "1801134",
                        "Posnr": "20",
                        "Werks": "H221",
                        "Matnr": "912020",
                        "Maktx": "Cobalt",
                        "Message": "Trial",
                        "AddInfo": "Hello Text"
                    }
                ];

                // this.getView().getModel("jsonMyApprovalsModel").setData(aData);
                this.fnGetMyApprovalsData();

            },
            fnGetMyApprovalsData: function () {
                const that = this;
                const ODataModel = this.getView().getModel();
                BusyIndicator.show();
                ODataModel.read("/PoSet", {
                    success: function (oSuccess) {
                        that.getView().getModel("jsonMyApprovalsModel").setData(null);
                        that.getView().getModel("jsonMyApprovalsModel").setData(oSuccess.results);
                        BusyIndicator.hide();
                    },

                    error: function (oError) {

                    }
                });
            },
            fnHistoryApprovedData: function () {
                const that = this;
                const ODataModel = this.getView().getModel();
                var aFilters = [
                    new sap.ui.model.Filter("Status", FilterOperator.EQ, "A")
                ];
                BusyIndicator.show();
                ODataModel.read("/PoSet", {
                    filters: aFilters,
                    success: function (oSuccess) {
                        that.getView().getModel("jsonApprovedModel").setData(null);
                        that.getView().getModel("jsonApprovedModel").setData(oSuccess.results);
                        BusyIndicator.hide();
                    },

                    error: function (oError) {

                    }
                });
            },
            fnHistoryRejectedData: function () {
                const that = this;
                const ODataModel = this.getView().getModel();
                var aFilters = [
                    new sap.ui.model.Filter("Status", FilterOperator.EQ, "R")
                ];
                BusyIndicator.show();
                ODataModel.read("/PoSet", {
                    filters: aFilters,
                    success: function (oSuccess) {
                        that.getView().getModel("jsonRejectedModel").setData(null);
                        that.getView().getModel("jsonRejectedModel").setData(oSuccess.results);
                        BusyIndicator.hide();
                    },

                    error: function (oError) {

                    }
                });
            },
            onPressHeaderIconTabBar: function (oEvent) {
                const selectedKey = oEvent.getParameter('selectedKey');
                if (selectedKey === "My Approvals") {
                    this.fnGetMyApprovalsData();
                } else {
                    this.fnHistoryApprovedData();
                }

            },
            onPressItemIconTabBar: function (oEvent) {
                const selectedKey = oEvent.getParameter('selectedKey');
                if (selectedKey === "Rejected") {
                    this.fnHistoryRejectedData();
                } else {
                    this.fnHistoryApprovedData();
                }
            },

            onPressLineItemMyApprovals: function (oEvent) {
                const CurrentItem = oEvent.getSource().oBindingContexts.jsonMyApprovalsModel.getObject();
                this.getView().getModel("jsonDetailsModel").setData(CurrentItem);

                var that = this;
                if (!that.DetailDialog) {
                    that.DetailDialog = sap.ui.xmlfragment("com.emami.fmfodeviation.view.fragments.DetailDialog", that);
                    that.getView().addDependent(that.DetailDialog);
                }
                that.DetailDialog.open();
            },
            onCloseDetailDialog: function () {
                var that = this;
                that.DetailDialog.close();
                that.DetailDialog.destroy();
                that.DetailDialog = null;
            },
            onPressLineItemHistoryApproved: function (oEvent) {
                const CurrentItem = oEvent.getSource().oBindingContexts.jsonApprovedModel.getObject();
                this.getView().getModel("jsonDetailsModel").setData(CurrentItem);

                var that = this;
                if (!that.DetailDialog) {
                    that.DetailDialog = sap.ui.xmlfragment("com.emami.fmfodeviation.view.fragments.DetailDialog", that);
                    that.getView().addDependent(that.DetailDialog);
                }
                that.DetailDialog.open();
            },
            onPressLineItemHistoryRejected: function (oEvent) {
                const CurrentItem = oEvent.getSource().oBindingContexts.jsonRejectedModel.getObject();
                this.getView().getModel("jsonDetailsModel").setData(CurrentItem);

                var that = this;
                if (!that.DetailDialog) {
                    that.DetailDialog = sap.ui.xmlfragment("com.emami.fmfodeviation.view.fragments.DetailDialog", that);
                    that.getView().addDependent(that.DetailDialog);
                }
                that.DetailDialog.open();
            },
            onPressAccept: function (oEvent) {

                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonMyApprovalsModel.getObject();
                var that = this;
                var dialog = new Dialog({
                    title: 'Accept Comment',
                    type: 'Message',
                    content: [
                        // new Label({ text: 'Are you sure you want to submit your shopping cart?', labelFor: 'submitDialogTextarea'}),
                        new TextArea('submitDialogTextarea', {
                            liveChange: function (oEvent) {
                                var sText = oEvent.getParameter('value');
                                var parent = oEvent.getSource().getParent();

                                parent.getBeginButton().setEnabled(sText.length > 0);
                            },
                            width: '100%',
                            placeholder: 'Required'
                        })
                    ],
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'Submit',
                        enabled: false,
                        press: function () {
                            var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
                            MessageToast.show('Note is: ' + sText);
                            that.fnHandleAccept(sText, CurrentItem);
                            dialog.close();
                        }
                    }),
                    endButton: new Button({
                        text: 'Cancel',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            fnHandleAccept: function (sComment, CurrentItem) {
                let { ...payload } = CurrentItem;
                payload.Comment = sComment;
                payload.Action = 'A';

                const ODataModel = this.getView().getModel();
                const that = this;
                BusyIndicator.show();
                ODataModel.create("/PoSet", payload, {
                    success: function (oSuccess) {
                        BusyIndicator.hide();

                        MessageBox.success("Accepted", {
                            onClose: function () {
                                that.fnGetMyApprovalsData();
                            }
                        });
                    },
                    error: function (oError) {

                    }
                });
            },

            onPressReject: function (oEvent) {
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonMyApprovalsModel.getObject();
                var that = this;
                var dialog = new Dialog({
                    title: 'Reject Comment',
                    type: 'Message',
                    content: [
                        // new Label({ text: 'Are you sure you want to submit your shopping cart?', labelFor: 'submitDialogTextarea'}),
                        new TextArea('submitDialogTextarea', {
                            liveChange: function (oEvent) {
                                var sText = oEvent.getParameter('value');
                                var parent = oEvent.getSource().getParent();

                                parent.getBeginButton().setEnabled(sText.length > 0);
                            },
                            width: '100%',
                            placeholder: 'Required'
                        })
                    ],
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'Submit',
                        enabled: false,
                        press: function () {
                            var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
                            MessageToast.show('Note is: ' + sText);
                            that.fnHandleReject(sText, CurrentItem);
                            dialog.close();
                        }
                    }),
                    endButton: new Button({
                        text: 'Cancel',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            fnHandleReject: function (sComment, CurrentItem) {
                let { ...payload } = CurrentItem;
                payload.Comment = sComment;
                payload.Action = 'R';

                const ODataModel = this.getView().getModel();
                const that = this;
                BusyIndicator.show();
                ODataModel.create("/PoSet", payload, {
                    success: function (oSuccess) {
                        BusyIndicator.hide();

                        MessageBox.success("Rejected", {
                            onClose: function () {
                                that.fnGetMyApprovalsData();
                            }
                        });
                    },
                    error: function (oError) {

                    }
                });
            },
            onPressShowError: function (oEvent) {
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonMyApprovalsModel.getObject();

                var dialog = new Dialog({
                    title: 'Error',
                    type: 'Message',
                    state: 'Error',
                    content: new Text({
                        text: CurrentItem.Message
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            onHandleLinkPressDepotCommentMyApprovals: function (oEvent) {

                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonMyApprovalsModel.getObject();

                var dialog = new Dialog({
                    title: 'Depot Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.AddInfo
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },

            onHandleLinkPressDepotCommentRejected : function(oEvent){
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonRejectedModel.getObject();

                var dialog = new Dialog({
                    title: 'Depot Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.AddInfo
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK', 
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            onHandleLinkPressDepotCommentApproved : function(oEvent){
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonApprovedModel.getObject();

                var dialog = new Dialog({
                    title: 'Depot Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.AddInfo
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },

            onHandleLinkPressInitiatorMyApprovals : function(oEvent){
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonMyApprovalsModel.getObject();

                var dialog = new Dialog({
                    title: 'Initiator Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.InitRem
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            onHandleLinkPressInitiatorRejected : function(oEvent){
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonRejectedModel.getObject();

                var dialog = new Dialog({
                    title: 'Initiator Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.InitRem
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            },
            onHandleLinkPressInitiatorApproved : function(oEvent){
                const CurrentItem = oEvent.getSource().getParent().getParent().getParent().getParent().oBindingContexts.jsonApprovedModel.getObject();

                var dialog = new Dialog({
                    title: 'Initiator Comment',
                    type: 'Message',
                    state: 'Information',
                    content: new Text({
                        text: CurrentItem.InitRem
                    }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });

                dialog.open();
            }

        });
    });
