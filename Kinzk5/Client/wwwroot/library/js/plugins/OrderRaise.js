var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$ddvendor: {
                    CheckDropDownList: !0,
                },
                ctl00$ContentPlaceHolder1$ddbranch: {
                    CheckDropDownList: !0,
                },
                item: {
                    required: !0,
                },
                ctl00$ContentPlaceHolder1$txtqty: {
                    required: !0,
                    integer: true,
                },

                ctl00$ContentPlaceHolder1$dduom: {
                    CheckDropDownList: !0,
                },
                ctl00$ContentPlaceHolder1$dditemtype: {
                    CheckDropDownList: !0,
                },
                ctl00$ContentPlaceHolder1$txtrate: {
                    required: !0,
                    IntergerDecimai: true,
                },
                ctl00$ContentPlaceHolder1$txtvat: {
                    IntergerDecimai: true,
                },
                ctl00$ContentPlaceHolder1$txttotal: {
                    IntergerDecimai: true,
                },

                // alphanumeric

            },
            messages: {
                ctl00$ContentPlaceHolder1$ddvendor: {
                    CheckDropDownList: jQuery.validator.format("Select Vendor"),
                },
                ctl00$ContentPlaceHolder1$ddbranch: {
                    CheckDropDownList: jQuery.validator.format("Select Branch"),
                },
                item: {
                    required: jQuery.validator.format("Enter Item Name"),
                },
                ctl00$ContentPlaceHolder1$txtqty: {
                    required: jQuery.validator.format("Enter Qty"),
                    integer: jQuery.validator.format("Enter numeric value"),
                },
                ctl00$ContentPlaceHolder1$dduom: {
                    CheckDropDownList: jQuery.validator.format("Select UOM"),
                },
                ctl00$ContentPlaceHolder1$dditemtype: {
                    CheckDropDownList: jQuery.validator.format("Select Item type"),
                },
                ctl00$ContentPlaceHolder1$txtrate: {
                    required: jQuery.validator.format("Enter rate"),
                    IntergerDecimai: jQuery.validator.format("Enter Alpha numeric"),
                },
                ctl00$ContentPlaceHolder1$txtvat: {

                    IntergerDecimai: jQuery.validator.format("Enter Alpha numeric"),
                },
                ctl00$ContentPlaceHolder1$txttotal: {

                    IntergerDecimai: jQuery.validator.format("Enter Alpha numeric"),
                },



            },
            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
            submitHandler: function (e) {
                Save(e);
            },
            // errorPlacement: function (e, r) {var i = $(r).parent(".input-icon").children("i");i.removeClass("fa-check").addClass("fa-warning"),i.attr("data-original-title",e.text()).tooltip({ container: "body" })},
            errorPlacement: function (e, r) { r.parent(".input-group").size() > 0 ? e.insertAfter(r.parent(".input-group")) : r.attr("data-error-container") ? e.appendTo(r.attr("data-error-container")) : r.parents(".radio-list").size() > 0 ? e.appendTo(r.parents(".radio-list").attr("data-error-container")) : r.parents(".radio-inline").size() > 0 ? e.appendTo(r.parents(".radio-inline").attr("data-error-container")) : r.parents(".checkbox-list").size() > 0 ? e.appendTo(r.parents(".checkbox-list").attr("data-error-container")) : r.parents(".checkbox-inline").size() > 0 ? e.appendTo(r.parents(".checkbox-inline").attr("data-error-container")) : e.insertAfter(r) },
            highlight: function (e) { $(e).closest(".form-group").removeClass("has-success").addClass("has-error") },
            unhighlight: function (e) { }, success: function (e, r) { var i = $(r).parent(".input-icon").children("i"); $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check") },

        })
        $(".select2me", e).change(function () { e.validate().element($(this)) }),
        $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0 }), $(".date-picker .form-control").change(function () { e.validate().element($(this)) })
    },
    //},

       t = function () {
           jQuery().wysihtml5 && $(".wysihtml5").size() > 0 && $(".wysihtml5").wysihtml5({ stylesheets: ["../library/css/plugins/wysiwyg-color.css"] })
       };
    return {
        init: function () { r(), t() }
    }
}();
jQuery(document).ready(function () { FormValidation.init() });
function Save(e) {
    _param = {};
    _param.IntVendorId = $("#ContentPlaceHolder1_ddvendor").val();
    if ($("#ContentPlaceHolder1_Hraiseno").val() == "0") {
        _param.StrModeSql = "insertIst";
    }
    else {
        _param.StrModeSql = "insertNxt";
    }

    _param.IntOrderNo = $("#ContentPlaceHolder1_Hraiseno").val();
    _param.IntOrderId = 0;
    _param.IntItemId = $("#ContentPlaceHolder1_hitems").val();
    _param.ItemName = $("#item").val();
    _param.IntQty = $("#ContentPlaceHolder1_txtqty").val();
    _param.DatOrder = $("#ContentPlaceHolder1_txtAvg").val();
    _param.IntorderPlaceId = $("#ContentPlaceHolder1_ddbranch").val();
    _param.IntBranchId = $("#ContentPlaceHolder1_ddbranch").val();
    _param.StrItemtype = $("#ContentPlaceHolder1_dditemtype").val();
    _param.StrUsePlane = $("#ContentPlaceHolder1_txtusePlane").val();
    _param.StrJobDesc = $("#ContentPlaceHolder1_txtitemdesc").val();
    _param.IntQty = $("#ContentPlaceHolder1_txtqty").val();
    _param.IntUOM = $("#ContentPlaceHolder1_dduom").val();
    _param.Vat = $("#ContentPlaceHolder1_txtvat").val();
    _param.IntAvgCost = $("#ContentPlaceHolder1_txtrate").val();
    _param.TotalCost = $("#ContentPlaceHolder1_txttotal").val();
    _param.DatExpDel = $("#ContentPlaceHolder1_txtdeliverydate").val() == "" ? DmyToMdy(GetValue($("#ContentPlaceHolder1_txtdeliverydate"))) : "01/01/1900";
    // $("#ContentPlaceHolder1_txtdeliverydate").val();

    _param.IntSession = $("#ContentPlaceHolder1_ddyear").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsOrderRaise.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {

            var result = data.d;
            $("#ContentPlaceHolder1_Hraiseno").val(data.d);
            bootbox.dialog({
                message: 'Your Data Saved Successfully?',
                buttons: {
                    confirm: { label: "Ok", className: "btn-success", callback: mycallbackfunc },
                    // cancel: { label: 'No', className: "btn-danger", callback: mycallbackfunc }
                }
            });
        },
        error: function (xhr, status, error) {
            debugger;
            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });
}

function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('#OrderRaise').DataTable().ajax.reload();
        //$("#ContentPlaceHolder1_HRecordid").val('0');
        $("#ContentPlaceHolder1_hitems").val('0');
        $("#ContentPlaceHolder1_ddbranch").select2().val(0).trigger("change");
        $("#ContentPlaceHolder1_dduom").select2().val(0).trigger("change");
        $("#ContentPlaceHolder1_dditemtype").select2().val(0).trigger("change");
        $("#ContentPlaceHolder1_txtrate").val('');
        $("#ContentPlaceHolder1_txtvat").val('');
        $("#ContentPlaceHolder1_txtqty").val('');
        $("#ContentPlaceHolder1_item").val('');
        $("#ContentPlaceHolder1_txttotal").val('');
        $("#ContentPlaceHolder1_txtusePlane").val('');
        $("#ContentPlaceHolder1_txtitemdesc").val('');
    }

};
function Delete(value, Name) {
    bootbox.confirm({
        message: "Are you sure you want to delete this Items <B>" + Name + "</B>?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                _param = {};
                _param.IntOrderId = value;
                _param.StrModeSql = "Delete";
                var param_detail = JSON.stringify(_param);
                $.ajax({
                    url: '../Service/WsOrderRaise.asmx/Delete',
                    method: 'post',
                    contentType: 'application/json;Charset=utf-8',
                    data: '{model:' + param_detail + '}',
                    success: function (data) {
                        var result = data.d;
                        $('#OrderRaise').DataTable().ajax.reload();
                    },
                    error: function (xhr, status, error) {

                        alert(error.Message);
                    }
                });

            }

        }
    });

}
function Edit(value) {
    activaTab('tab_0');

    $("#ContentPlaceHolder1_HRecordid").val(value);
    _param = {};
    _param.IntOrderId = value;
    _param.StrModeSql = "FillLstOdrDatalist";
    var param_detail = JSON.stringify(_param);

    $.ajax({
        url: '../Service/WsOrderRaise.asmx/Edit',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            // debugger;
            var result = data.d;
            if (result != "-1") {

                $("#ContentPlaceHolder1_ddvendor").select2().val(data.d.IntVendorId).trigger("change");
                $("#ContentPlaceHolder1_hitems").val(data.d.IntItemId);
                $("#item").val(data.d.ItemName);
                $("#ContentPlaceHolder1_txtqty").val(data.d.IntQty);
                $("#ContentPlaceHolder1_txtAvg").val(data.d.IntAvgCost);
                $("#ContentPlaceHolder1_ddbranch").select2().val(data.d.IntorderPlaceId).trigger("change");

                $("#ContentPlaceHolder1_dditemtype").select2().val(data.d.StrItemtype).trigger("change");
                $("#ContentPlaceHolder1_txtusePlane").val(data.d.StrUsePlane);
                $("#ContentPlaceHolder1_txtitemdesc").val(data.d.StrJobDesc);
                $("#ContentPlaceHolder1_txtqty").val(data.d.IntQty);
                $("#ContentPlaceHolder1_dduom").select2().val(data.d.IntUOM).trigger("change");
                $("#ContentPlaceHolder1_txtvat").val(data.d.Vat);
                $("#ContentPlaceHolder1_txtrate").val(data.d.IntAvgCost);
                $("#ContentPlaceHolder1_txttotal").val(data.d.TotalCost);
                //var now = data.d.DatExpDel;
                //var today = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
                //alert(today);
                var date = data.d.DatExpDel;
                var nowDate = new Date(parseInt(date.substr(6)));
                var today = nowDate.format("dd/MM/yyyy");
                //var today = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();


                $("#ContentPlaceHolder1_txtdeliverydate").val(today);
                $("#ContentPlaceHolder1_ddyear").select2().val(data.d.IntSession).trigger("change");

            }
        },
        error: function (xhr, status, error) {

            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });


}
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}



