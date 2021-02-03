var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$txtvendorName: {
                    required: !0,

                },
                ctl00$ContentPlaceHolder1$txtVendorcode: {
                    required: !0,

                },
                ctl00$ContentPlaceHolder1$txtconcatPerson: {
                    required: !0,

                },
                ctl00$ContentPlaceHolder1$ListCategory: {
                    required: !0,
                    // integer: true,
                },

            },
            messages: {
                ctl00$ContentPlaceHolder1$txtvendorName: {
                    required: jQuery.validator.format("Vendor Name required"),
                },
                ctl00$ContentPlaceHolder1$txtVendorcode: {
                    required: jQuery.validator.format("Vendor Code required"),

                },
                ctl00$ContentPlaceHolder1$txtconcatPerson: {
                    required: jQuery.validator.format("Contact Persion required"),

                },
                ctl00$ContentPlaceHolder1$ListCategory: {
                    required: jQuery.validator.format("Select Category"),

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
        $(".select2me", e).change(function () { e.validate().element($(this)) }), $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0 }), $(".date-picker .form-control").change(function () { e.validate().element($(this)) })
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
    CategoryList = "";
    CategoryList = $("#ContentPlaceHolder1_ListCategory").val();

    _param = {};
    _param.IntVendorId = $("#ContentPlaceHolder1_HRecordid").val();
    _param.StrModeSql = "insert";
    _param.VendorName = $("#ContentPlaceHolder1_txtvendorName").val();
    _param.VendorCode = $("#ContentPlaceHolder1_txtVendorcode").val();
    _param.VendorAddress = $("#ContentPlaceHolder1_txtadd1").val();
    _param.VendorAddress2 = $("#ContentPlaceHolder1_txtadd2").val();
    _param.VendorPin = $("#ContentPlaceHolder1_txtpin").val();
    _param.VendorCity = $("#ContentPlaceHolder1_txtcity").val();
    _param.VendorState = $("#ContentPlaceHolder1_txtstate").val();
    _param.VendorTelePhone = $("#ContentPlaceHolder1_txtcontactno").val();
    _param.VendorTelePhone1 = $("#ContentPlaceHolder1_txtcontactno2").val();
    _param.VendorFax = $("#ContentPlaceHolder1_txtfaxNo").val();
    _param.VendorSaleTaxNo = $("#ContentPlaceHolder1_txtslaestxtno").val();
    _param.VendorContactPerson = $("#ContentPlaceHolder1_txtconcatPerson").val();
    // _param.Vendorlocation = $("#ContentPlaceHolder1_txtconcatPerson").val();
    _param.VendorCreditPeriod = $("#ContentPlaceHolder1_txtcPeriod").val();
    _param.VendorDiscount = $("#ContentPlaceHolder1_txtcCashDiscount").val();
    _param.VendorPopularName = $("#ContentPlaceHolder1_txtpopularname").val();
    _param.VendorGst = $("#ContentPlaceHolder1_txtgstno").val();

    _param.Vendorlocation = typeof ($("#ContentPlaceHolder1_rdvendorlocation input:radio:checked").val()) == "undefined" ? '' : $("#ContentPlaceHolder1_rdvendorlocation input:radio:checked").val();
    _param.VendorOtherCharges = typeof ($("#ContentPlaceHolder1_rdvendorothercharges input:radio:checked").val()) == "undefined" ? '' : $("#ContentPlaceHolder1_rdvendorothercharges input:radio:checked").val();
    _param.VendorModeOfpayment = typeof ($("#ContentPlaceHolder1_rdvendorpaymode input:radio:checked").val()) == "undefined" ? '' : $("#ContentPlaceHolder1_rdvendorpaymode input:radio:checked").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsVendormaster.asmx/Savendor',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            SaveVendorCategory(data.d, CategoryList.toString());
            Clear();
            App.alert({
                container: "",
                place: "Append",
                type: "success",
                message: "Your Data Saved Successfully",
                close: true,
                reset: true,
                focus: true,
                icon: "",
                closeInSeconds: 5,
                callback: mycallbackfunc
            });
        },
        error: function (xhr, status, error) {
            //debugger;
            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });
}
function Clear()
{
    $('#vendor').DataTable().ajax.reload();
    $("#ContentPlaceHolder1_txtvendorName").val('');
    $("#ContentPlaceHolder1_ListCategory").val('').trigger('change');
    // $("#ContentPlaceHolder1_ListCategory").val('');
    $("#ContentPlaceHolder1_txtVendorcode").val('');
    $("#ContentPlaceHolder1_txtpopularname").val('');
    $("#ContentPlaceHolder1_txtconcatPerson").val('');
    $("#ContentPlaceHolder1_txtconcatPerson").val('');
    $("#ContentPlaceHolder1_txtslaestxtno").val('');
    $("#ContentPlaceHolder1_txtgstno").val('');
    $("#ContentPlaceHolder1_txtcontactno").val('');
    $("#ContentPlaceHolder1_txtcontactno2").val('');
    $("#ContentPlaceHolder1_txtcPeriod").val('');
    $("#ContentPlaceHolder1_txtcCashDiscount").val('');
    $("#ContentPlaceHolder1_txtadd1").val('');
    $("#ContentPlaceHolder1_txtadd2").val('');
    $("#ContentPlaceHolder1_txtcity").val('');
    $("#ContentPlaceHolder1_txtstate").val('');
    $("#ContentPlaceHolder1_txtpin").val('');
    $("#ContentPlaceHolder1_txtfaxNo").val('');
    $("#btnupdate").addClass('disabled');
    $("#btnSave").removeClass('disabled');
}
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('#vendor').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_txtvendorName").val('');
        $("#ContentPlaceHolder1_ListCategory").val('').trigger('change');
       // $("#ContentPlaceHolder1_ListCategory").val('');
        $("#ContentPlaceHolder1_txtVendorcode").val('');
        $("#ContentPlaceHolder1_txtpopularname").val('');
        $("#ContentPlaceHolder1_txtconcatPerson").val('');
        $("#ContentPlaceHolder1_txtconcatPerson").val('');
        $("#ContentPlaceHolder1_txtslaestxtno").val('');
        $("#ContentPlaceHolder1_txtgstno").val('');
        $("#ContentPlaceHolder1_txtcontactno").val('');
        $("#ContentPlaceHolder1_txtcontactno2").val('');
        $("#ContentPlaceHolder1_txtcPeriod").val('');
        $("#ContentPlaceHolder1_txtcCashDiscount").val('');
        $("#ContentPlaceHolder1_txtadd1").val('');
        $("#ContentPlaceHolder1_txtadd2").val('');
        $("#ContentPlaceHolder1_txtcity").val('');
        $("#ContentPlaceHolder1_txtstate").val('');
        $("#ContentPlaceHolder1_txtpin").val('');
        $("#ContentPlaceHolder1_txtfaxNo").val('');
        $("#btnupdate").addClass('disabled');
        $("#btnSave").removeClass('disabled');
    }

}

