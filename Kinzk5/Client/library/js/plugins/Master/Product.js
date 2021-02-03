var groupColumn = 3;
var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);

        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$ddcategory: {
                    CheckDropDownList: true,
                },
                ctl00$ContentPlaceHolder1$ddbrand: {
                    CheckDropDownList: true,
                },
                ctl00$ContentPlaceHolder1$txtproductname: {
                    required: !0,
                    remote: function () {
                        return {
                            url: "../Service/Avalibility.asmx/IsProductAvailable", //URL of asmx file.                                 
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ ProductName: $('#ContentPlaceHolder1_txtproductname').val(), Categoryid: $('#ContentPlaceHolder1_ddcategory').val(), SubcategoryId: $('#ContentPlaceHolder1_ddsubCategory').val(), Brandid: $('#ContentPlaceHolder1_ddbrand').val() }),

                            dataFilter: function (data) {
                                var msg = JSON.parse(data);
                                if (msg.hasOwnProperty('d'))
                                    return msg.d;
                                else
                                    return msg;
                            }
                        }
                    }
                },


            },
            messages: {
                ctl00$ContentPlaceHolder1$ddcategory: {
                    CheckDropDownList: jQuery.validator.format("Select Category"),
                },
                ctl00$ContentPlaceHolder1$ddbrand: {
                    CheckDropDownList: jQuery.validator.format("Select Category"),

                },
                ctl00$ContentPlaceHolder1$txtproductname: {
                    required: jQuery.validator.format("Enter Product Name"),
                    remote: jQuery.validator.format("Product {0} already exists"),
                },


            },
            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
            submitHandler: function (e, event) {
                event.preventDefault();
                var submitButtonName = $(this.submitButton).attr("id");
                var ss = '#' + submitButtonName;
                Save(ss);
            },

            errorPlacement: function (e, r) { r.parent(".input-group").size() > 0 ? e.insertAfter(r.parent(".input-group")) : r.attr("data-error-container") ? e.appendTo(r.attr("data-error-container")) : r.parents(".radio-list").size() > 0 ? e.appendTo(r.parents(".radio-list").attr("data-error-container")) : r.parents(".radio-inline").size() > 0 ? e.appendTo(r.parents(".radio-inline").attr("data-error-container")) : r.parents(".checkbox-list").size() > 0 ? e.appendTo(r.parents(".checkbox-list").attr("data-error-container")) : r.parents(".checkbox-inline").size() > 0 ? e.appendTo(r.parents(".checkbox-inline").attr("data-error-container")) : e.insertAfter(r) },
            highlight: function (e) { $(e).closest(".form-group").removeClass("has-success").addClass("has-error") },
            unhighlight: function (e) { }, success: function (e, r) { var i = $(r).parent(".input-icon").children("i"); $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check") },

        })
        $(".select2me", e).change(function () { e.validate().element($(this)) }), $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0 }), $(".date-picker .form-control").change(function () { e.validate().element($(this)) })
    },


       t = function () {
           jQuery().wysihtml5 && $(".wysihtml5").size() > 0 && $(".wysihtml5").wysihtml5({ stylesheets: ["../library/css/plugins/wysiwyg-color.css"] })
       };
    return {
        init: function () { r(), t() }
    }
}();


function GetProductCategory() {
    $.ajax({
        type: "POST",
        url: "../Service/WsCategory.asmx/GetProductCategory",

        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (r) {

            var ddlCustomers = $("[id*=ddcategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetBrand() {
    $.ajax({
        type: "POST",
        url: "../Service/WsBrand.asmx/GetBrand",

        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (r) {

            var ddlCustomers = $("[id*=ddbrand]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetSubCategory(category) {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/GetSubCategory",

        contentType: "application/json; charset=utf-8",
        data: "{\"IntCatgoryId\":\"" + category + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddsubCategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetSubCategory(category, SubCatId) {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/GetSubCategory",

        contentType: "application/json; charset=utf-8",
        data: "{\"IntCatgoryId\":\"" + category + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddsubCategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });

            $("#ContentPlaceHolder1_ddsubCategory").val(SubCatId);

        }
    });
}
jQuery(document).ready(function () {

    $("#btnSave").click(function (e) {
        FormValidation.init()
    });

    $("#btnupdate").click(function (evt) {
        var btn = $(this);
        evt.preventDefault();
        UpdateProduct(btn);
        return false;
    });

    GetProductCategory();
    GetBrand();
    GetBrand2();
    GetProductCategory2();
    Binddata();
    $('#button-filter').on('click', function () {
        Binddata();
    });


});
function Binddata() {
    $("#Product").dataTable().fnDestroy();
    $('#Product').DataTable({
        "processing": true,
        "serverSide": false,
        dom: 'Bfrtip',

        "autoWidth": false,

        buttons: [
        {
            extend: 'copy',
            text: '<i class="fa fa-files-o"></i>',
            titleAttr: 'Copy'
        },
        {
            extend: 'excel',
            text: '<i class="fa fa-file-excel-o" style="color:#008000;"></i>',
            titleAttr: 'Excel'
        },
        {
            extend: 'csv',
            text: '<i class="fa fa-file-text-o"></i>',
            titleAttr: 'CSV'
        },
        {
            extend: 'pdf',
            text: '<i class="fa fa-file-pdf-o"  style="color:red;"></i>',
            titleAttr: 'PDF'
        },
        {
            extend: 'print',
            text: '<i class="fa fa-print"></i>',
            titleAttr: 'Print'
        }
        ],
        lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
        pageLength: 10,
        ajax: {
            url: '../Service/data.asmx/GetAllProduct',
            type: "POST",
            "data":
                {
                    "View": 0,
                    "Edit": $('#ContentPlaceHolder1_HEdit').val(),
                    "Delete": $('#ContentPlaceHolder1_HDelete').val(),
                    "Groupid": $('#input-Category').val(),
                    "SubGroupId": $('#input-SubCategory').val(),
                    "Brand": $('#input-Brand').val(),
                }
        },
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                       '<tr class="group"><td colspan="6" style="text-align:left;color: #D56633"">' + group + '</td></tr>'
                    );

                    last = group;
                }
            });
        },

        columns: [
           {

               data: null, "width": "7%",
               'render': function (data, type, full, meta) {
                   return '<a onclick="Delete(' + data.IntCatgoryId + "," + "'" + data.StrProductName + "'" + ')" class="btn btn-outline btn-circle dark btn-sm red ' + data.Delete + '" > <i class="fa fa-trash-o"></i>' + '</a>'
                   +
                   '<a onclick="Edit(' + data.IntCatgoryId + ')" class="btn btn-outline btn-circle btn-sm purple ' + data.Edit + '"> <i class="fa fa-edit"></i>' + '</a>';
                   return data;
               },
               className: "dt-body-center"
           },
            { data: "SNO", "width": "3%" },
             { data: "StrProductName", "searchable": true, "width": "15%" },
            { data: "StrCatgoryName", "searchable": true, "width": "15%" },
            { data: "StrSubCategoryName", "searchable": true, "width": "15%" },
            { data: "StrBrandName", "searchable": true, "width": "15%" },
            { data: "StrAliashName", "searchable": true, "width": "15%" },

        ],
        columnDefs: [{
            targets: [3],
            visible: false
        }]

    });
}
$(function () {
    $("#ContentPlaceHolder1_ddcategory").change(function () {
        // alert($(this).val());
        GetSubCategory($(this).val());

    });
});
function UpdateProduct(e) {
    _param = {};
    _param.IntCatgoryId = $("#ContentPlaceHolder1_ddcategory").val();
    _param.IntBrandId = $("#ContentPlaceHolder1_ddbrand").val();
    _param.IntProductId = $("#ContentPlaceHolder1_Hrecordid").val();
    _param.IntSubCategoryId = $("#ContentPlaceHolder1_ddsubCategory").val();
    _param.StrAliashName = $("#ContentPlaceHolder1_txtaliashname").val();
    _param.StrModeSql = "Update";
    _param.StrProductName = $("#ContentPlaceHolder1_txtproductname").val();
    var param_detail = JSON.stringify(_param);
    $(e).html('Wait...');
    $(e).attr('disabled', 'disabled');
    $.ajax({
        url: '../Service/WsProduct.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            SaveLive($("#ContentPlaceHolder1_Hrecordid").val());
            $(e).html('Update');
            $(e).removeAttr('disabled');
            $("#ContentPlaceHolder1_HIssueno").val(data.d);
            Clear();
            App.alert({
                container: "",
                place: "Append",
                type: "success",
                message: "Your Data Update Successfully",
                close: true,
                reset: true,
                focus: true,
                icon: "",
                closeInSeconds: 5,
                callback: mycallbackfunc
            });
        },
        error: function (xhr, status, error) {
            $(e).html('Update');
            $(e).removeAttr('disabled');
            alert(error.Message);
        }
    })
}
function Save(e) {
    _param = {};
    _param.IntCatgoryId = $("#ContentPlaceHolder1_ddcategory").val();
    _param.IntBrandId = $("#ContentPlaceHolder1_ddbrand").val();
    _param.IntSubCategoryId = $("#ContentPlaceHolder1_ddsubCategory").val();

    _param.StrModeSql = "Insert";
    _param.StrProductName = $("#ContentPlaceHolder1_txtproductname").val();
    _param.StrAliashName = $("#ContentPlaceHolder1_txtaliashname").val();
    var param_detail = JSON.stringify(_param);

    $(e).attr('disabled', 'disabled');
    $(e).html('Wait..');

    $.ajax({
        url: '../Service/WsProduct.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            $(e).removeAttr('disabled');
            $(e).html('Save');
            $("#ContentPlaceHolder1_HIssueno").val(data.d);
            SaveLive(result);

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
            $(e).removeAttr('disabled');
            $(e).html('Save');

            alert(error.Message);
        }
    });
}
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('#Product').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_txtproductname").val('');
        $("#ContentPlaceHolder1_txtaliashname").val('');

        $("#ContentPlaceHolder1_Hrecordid").val('0');

        $("#btnupdate").addClass('disabled');
        $("#btnSave").removeClass('disabled');
        activaTab('tab_1');
    }
}
function Clear() {
    $('#Product').DataTable().ajax.reload();
    $("#ContentPlaceHolder1_txtproductname").val('');
    $("#ContentPlaceHolder1_txtaliashname").val('');

    $("#ContentPlaceHolder1_Hrecordid").val('0');

    $("#btnupdate").addClass('disabled');
    $("#btnSave").removeClass('disabled');
    activaTab('tab_1');
}
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
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
                _param.IntProductId = value;
                _param.StrModeSql = "Delete";
                var param_detail = JSON.stringify(_param);
                $.ajax({
                    url: '../Service/WsProduct.asmx/Delete',
                    method: 'post',
                    contentType: 'application/json;Charset=utf-8',
                    data: '{model:' + param_detail + '}',
                    success: function (data) {
                        var result = data.d;
                        DeleteOnline(value);
                        $('#Product').DataTable().ajax.reload();
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
    $("#btnSave").addClass('disabled');
    $("#btnupdate").removeClass('disabled');
    $("#ContentPlaceHolder1_Hrecordid").val(value);
    _param = {};
    _param.IntProductId = value;
    _param.StrModeSql = "FillById";
    var param_detail = JSON.stringify(_param);

    $.ajax({
        url: '../Service/WsProduct.asmx/Edit',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            if (result != "-1") {

                $("#ContentPlaceHolder1_ddcategory").select2().val(data.d.IntCatgoryId).trigger("change");
                $("#ContentPlaceHolder1_ddbrand").select2().val(data.d.IntBrandId).trigger("change");
                $("#ContentPlaceHolder1_txtproductname").val(data.d.StrProductName);
                $("#ContentPlaceHolder1_txtaliashname").val(data.d.StrAliashName);
                $("#ContentPlaceHolder1_Hrecordid").val(data.d.IntProductId);

                GetSubCategory(data.d.IntCatgoryId, data.d.IntSubCategoryId)

                $("#btnSave").addClass('disabled');
                $("#btnupdate").removeClass('disabled');


            }
        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });


}
function SaveLive(result) {

    _param = {};
    var category = $("#ContentPlaceHolder1_ddcategory :selected");
    var BrandName = $("#ContentPlaceHolder1_ddbrand :selected");
    var SubCategory = $("#ContentPlaceHolder1_ddsubCategory :selected");


    _param.ItemId = result;
    _param.strCategoryname = GetDropDownText(category);
    _param.strBrandname = GetDropDownText(BrandName);
    _param.StrSubCategory = GetDropDownText(SubCategory);

    _param.ItemName = $("#ContentPlaceHolder1_txtproductname").val();

    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/SaveProduct',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {

        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });
}
function UpdateProDuctNameOnline(id, Name) {
    _param = {};
    _param.ItemId = id;
    _param.ItemName = Name;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/UpdateProductName',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {

        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });
}
function DeleteOnline(id) {
    _param = {};
    _param.ItemId = id;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/DeleteProduct',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {

        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });
}
function GetProductCategory2() {
    $.ajax({
        type: "POST",
        url: "../Service/WsCategory.asmx/GetUserProductCategory",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=input-Category]");
            ddlCustomers.empty().append('<option selected="selected" value="0">ALL</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
$(function () {
    $("#input-Category").change(function () {

        GetSubCategory2($(this).val());

    });
});
function GetSubCategory(category) {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/GetSubCategory",

        contentType: "application/json; charset=utf-8",
        data: "{\"IntCatgoryId\":\"" + category + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddsubCategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetSubCategory(category, SubCatId) {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/GetSubCategory",

        contentType: "application/json; charset=utf-8",
        data: "{\"IntCatgoryId\":\"" + category + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddsubCategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });

            $("#ContentPlaceHolder1_ddsubCategory").val(SubCatId);

        }
    });
}
function GetSubCategory2(category) {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/GetUserSubCategory",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        data: "{\"Subcategoryid\":\"" + category + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=input-SubCategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">ALL</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetBrand2() {
    $.ajax({
        type: "POST",
        url: "../Service/WsBrand.asmx/GetBrand",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=input-Brand]");
            ddlCustomers.empty().append('<option selected="selected" value="0">ALL</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}




