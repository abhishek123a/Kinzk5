var roleList = null;
var branchList = null;
var UserIds = null;
var ProductCateList = null;
var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$txtfname: {
                    required: !0,
                },
                ctl00$ContentPlaceHolder1$txtlast: {
                    required: true,
                },
                ctl00$ContentPlaceHolder1$txtlogin: {
                    required: !0,
                    remote: function () {
                        return {
                            url: "../Service/Avalibility.asmx/IsUserNameAvailable", //URL of asmx file.                                 
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            // data: JSON.stringify({UserAval: $('#ctl00_ContentPlaceHolder1_txtfile').val() }),      
                            data: JSON.stringify({ contextKey: $('#ContentPlaceHolder1_txtlogin').val() }),
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
                ctl00$ContentPlaceHolder1$ListRole: {
                    required: !0,
                    // integer: true,
                },
                ctl00$ContentPlaceHolder1$listBranchList: {
                    required: !0,
                    // integer: true,
                },

                ctl00$ContentPlaceHolder1$txtPass: {
                    required: !0,
                    // integer: true,
                },
                ctl00$ContentPlaceHolder1$txtrepass: {
                    required: !0,
                    noSpace: true,
                    CompareTwovalues: "#ContentPlaceHolder1_txtPass"
                    // integer: true,
                },
                ctl00$ContentPlaceHolder1$ddbranchdefault: {
                    CheckDropDownList: true,
                    // integer: true,
                },


            },
            messages: {
                ctl00$ContentPlaceHolder1$txtfname: {
                    required: jQuery.validator.format("Enter First Name"),
                },
                ctl00$ContentPlaceHolder1$txtlast: {
                    required: jQuery.validator.format("Enter Last Name"),

                },
                ctl00$ContentPlaceHolder1$txtlogin: {
                    required: jQuery.validator.format("Enter Login Name"),
                    remote: jQuery.validator.format("User {0} already exists"),
                },
                ctl00$ContentPlaceHolder1$ListRole: {
                    required: jQuery.validator.format("Select Role"),
                    // integer: jQuery.validator.format("Enter number only"),
                },
                ctl00$ContentPlaceHolder1$listBranchList: {
                    required: jQuery.validator.format("Select Branch"),
                    // integer: jQuery.validator.format("Enter number only"),
                },
                ctl00$ContentPlaceHolder1$txtPass: {
                    required: jQuery.validator.format("Enter Password"),
                    // integer: jQuery.validator.format("Enter number only"),
                },
                ctl00$ContentPlaceHolder1$txtrepass: {
                    required: jQuery.validator.format("Retype  Password"),
                    CompareTwovalues: jQuery.validator.format("Retype  Password not match Enter password"),
                    // integer: jQuery.validator.format("Enter number only"),
                },

                ctl00$ContentPlaceHolder1$ddbranchdefault: {
                    CheckDropDownList: jQuery.validator.format("Select Default Branch"),

                },



                // integer


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

jQuery(document).ready(function () {
    $("#btnSave").click(function (e) {
        FormValidation.init()
    });

    GetBranch();
    GetRoleList();
    FillAllbranch();
    //GetProductCategory();
    GetsubCategory();
    $("#btnupdate").click(function (e) {
        UpdateUser();
        return false;
    });
});
function GetBranch() {
    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetAllBranch",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=listBranchList]");
            //ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetRoleList() {
    $.ajax({
        type: "POST",
        url: "../Service/WsRoleMaster.asmx/GetRols",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ListRole]");
            //ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}

function GetProductCategory() {
    $.ajax({
        type: "POST",
        url: "../Service/WsCategory.asmx/GetProductCategory",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=dduserproductcategory]");
            //ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function Save(e) {
    roleList = "";
    branchList = ""
    ProductCateList = "";
    roleList = $("#ContentPlaceHolder1_ListRole").val();
    branchList = $("#ContentPlaceHolder1_listBranchList").val();
    ProductCateList = $("#ContentPlaceHolder1_dduserproductcategory").val();
    //alert(rold);
    //alert(Branck);
    _param = {};
    _param.StrFirstName = $("#ContentPlaceHolder1_txtfname").val();
    _param.StrLastName = $("#ContentPlaceHolder1_txtlast").val();
    _param.StrUserName = $("#ContentPlaceHolder1_txtlogin").val();
    _param.Strpassword = $("#ContentPlaceHolder1_txtPass").val();
    _param.IntUserDefaultBranch = $("#ContentPlaceHolder1_ddbranchdefault").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserMaster.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            UserIds = result;

            SaveUserRole(UserIds, roleList.toString());
            SaveUserBranch(UserIds, branchList.toString());
            SaveUserProductCat(UserIds, ProductCateList.toString());
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

            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });

}
function Clear()
{
    $('#UserTable').DataTable().ajax.reload();
    $("#ContentPlaceHolder1_txtfname").val('');
    $("#ContentPlaceHolder1_txtlast").val('');
    $("#ContentPlaceHolder1_txtlogin").val('');
    $("#ContentPlaceHolder1_txtPass").val('');
    $("#ContentPlaceHolder1_ddbranchdefault").select2().val(0).trigger("change");
    $("#ContentPlaceHolder1_ListRole").val('').trigger('change');
    $("#ContentPlaceHolder1_listBranchList").val('').trigger('change');
    $("#ContentPlaceHolder1_dduserproductcategory").val('').trigger('change');
    $("#ContentPlaceHolder1_txtrepass").val('');

    $("#btnupdate").addClass('disabled');
    $("#btnSave").removeClass('disabled');
    $("#ContentPlaceHolder1_txtlogin").prop("readonly", false);
    $("#ContentPlaceHolder1_Hrecordid").val('0');
}
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('#UserTable').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_txtfname").val('');
        $("#ContentPlaceHolder1_txtlast").val('');
        $("#ContentPlaceHolder1_txtlogin").val('');
        $("#ContentPlaceHolder1_txtPass").val('');
        $("#ContentPlaceHolder1_ddbranchdefault").select2().val(0).trigger("change");
        $("#ContentPlaceHolder1_ListRole").val('').trigger('change');
        $("#ContentPlaceHolder1_listBranchList").val('').trigger('change');
        $("#ContentPlaceHolder1_dduserproductcategory").val('').trigger('change');
        $("#ContentPlaceHolder1_txtrepass").val('');

        $("#btnupdate").addClass('disabled');
        $("#btnSave").removeClass('disabled');
        $("#ContentPlaceHolder1_txtlogin").prop("readonly", false);
        $("#ContentPlaceHolder1_Hrecordid").val('0');
        //$('#mySelect2').val(null).trigger('change');


    }

}
function SaveUserRole(Userid, Rolelist) {

    _param = {};
    _param.IntUserId = Userid;
    _param.StrRoleList = Rolelist;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserRoles.asmx/Save',
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
function SaveUserBranch(Userid, branchList) {
    _param = {};
    _param.IntUserId = Userid;
    _param.StrBranchList = branchList;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserBranch.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;

        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });
}
function SaveUserProductCat(Userid, branchList) {
    _param = {};
    _param.IntUserId = Userid;
    _param.StrCategoryName = branchList;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserProductCategory.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;

        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });
}
function FillAllbranch() {
    // var end = this.value;
    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetAllBranch",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddbranchdefault]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}


function UpdateUser() {
    roleList = "";
    branchList = ""
    ProductCateList = "";
    roleList = $("#ContentPlaceHolder1_ListRole").val();
    branchList = $("#ContentPlaceHolder1_listBranchList").val();
    ProductCateList = $("#ContentPlaceHolder1_dduserproductcategory").val();
    _param = {};
    _param.StrFirstName = $("#ContentPlaceHolder1_txtfname").val();
    _param.StrLastName = $("#ContentPlaceHolder1_txtlast").val();
    _param.StrUserName = $("#ContentPlaceHolder1_txtlogin").val();
    _param.Strpassword = $("#ContentPlaceHolder1_txtPass").val();
    _param.IntUserDefaultBranch = $("#ContentPlaceHolder1_ddbranchdefault").val();
    _param.IntUserId = $("#ContentPlaceHolder1_Hrecordid").val();

    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserMaster.asmx/Update',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            SaveUserBranch($("#ContentPlaceHolder1_Hrecordid").val(), branchList.toString());
            UpdateUserRole($("#ContentPlaceHolder1_Hrecordid").val(), roleList.toString());
            UpdateUserProductCat($("#ContentPlaceHolder1_Hrecordid").val(), ProductCateList.toString());

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

            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });
}

function UpdateUserRole(Userid, Rolelist) {

    _param = {};
    _param.IntUserId = Userid;
    _param.StrRoleList = Rolelist;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserRoles.asmx/update',
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

function UpdateUserProductCat(Userid, branchList) {
    _param = {};
    _param.IntUserId = Userid;
    _param.StrCategoryName = branchList;
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsUserProductCategory.asmx/Update',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;

        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });
}


function GetsubCategory() {
    $.ajax({
        type: "POST",
        url: "../Service/WsSubCategory.asmx/SubCategoryPermission",
        // url: "../Service/WsItemMaster.asmx/GetAllItemName",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=dduserproductcategory]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}

