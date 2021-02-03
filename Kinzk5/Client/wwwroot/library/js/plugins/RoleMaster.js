var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$txtrole: {
                    required: !0,
                    minlength: 2,
                    remote: function () {
                        return {
                            url: "../Service/Avalibility.asmx/IsRoleAvailable", //URL of asmx file.                                 
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ contextKey: $('#ContentPlaceHolder1_txtrole').val() }),
                            dataFilter: function (data) {
                                var msg = JSON.parse(data);
                                if (msg.hasOwnProperty('d'))
                                    return msg.d;
                                else
                                    return msg;
                            }
                        };
                    }
                },

            },
            messages: {

                ctl00$ContentPlaceHolder1$txtrole: {
                    required: jQuery.validator.format("Enter Role Name"),
                    minlength: jQuery.validator.format("Enter Role Name min 2 Char"),
                    remote: jQuery.validator.format("Role {0} already exists"),
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
        //$(".select2me", e).change(function () { e.validate().element($(this)) }), $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0 }), $(".date-picker .form-control").change(function () { e.validate().element($(this)) })
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

        FormValidation.init();
    });

    $("#cancle").click(function () {
        location.reload(true);
    });

    $("#btnupdate").click(function (e) {
        updatePermission($("#ContentPlaceHolder1_HRecordid").val());
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
        return false;
    });


});
function Save() {
    // var recordid = $("#ContentPlaceHolder1_hrecordId").val();
    //alert(recordid);
    //----------Save Role-----------------//
    _param = {};
    _param.StrSqlMode = "AddRole";
    _param.StrRoleType = $("#ContentPlaceHolder1_txtrole").val();
    _param.IntRoleId = $("#ContentPlaceHolder1_hrecordId").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsRoleMaster.asmx/SaveRole',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            SavePermission(data.d);

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
            debugger;
            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });


}
function SavePermission(roleid) {
    var table = $(".role-list tbody");
    table.find("tr").each(function () {
        var Menuid = $(this).find('input:hidden');
        var Views = "#ContentPlaceHolder1_ChkViews" + Menuid.val();
        //if ($(this).find("input[type=checkbox]:checked").length != 0) {
        //if ($(this).find(Views).is(":checked")) {

            var Add = "#ContentPlaceHolder1_ChkAdd" + Menuid.val();
            var Edit = "#ContentPlaceHolder1_ChkEdit" + Menuid.val();
            var Delete = "#ContentPlaceHolder1_ChkDel" + Menuid.val();

            var AddPermission = $(this).find(Add).is(":checked");
            var EditPermission = $(this).find(Edit).is(":checked");
            var DeletePermission = $(this).find(Delete).is(":checked");
            var ViewsPermission = $(this).find(Views).is(":checked");
            _param = {};
            _param.StrModeSql = "AddMainPermission";
            _param.IntRoleId = roleid;
            _param.IntMenuID = Menuid.val();
            _param.BoolView = ViewsPermission;
            _param.BoolAdd = AddPermission;
            _param.BoolEditUpdate = EditPermission;
            _param.BoolDelete = DeletePermission;
            var param_detail = JSON.stringify(_param);
            $.ajax({
                url: '../Service/WsRoleMaster.asmx/SavePermission',
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

       // }

    });
}

function updatePermission(roleid) {
    var table = $(".role-list tbody");
    table.find("tr").each(function () {
        var Menuid = $(this).find('input:hidden');
        var Views = "#ContentPlaceHolder1_ChkViews" + Menuid.val();
        //if ($(this).find("input[type=checkbox]:checked").length != 0) {
       
            var Add = "#ContentPlaceHolder1_ChkAdd" + Menuid.val();
            var Edit = "#ContentPlaceHolder1_ChkEdit" + Menuid.val();
            var Delete = "#ContentPlaceHolder1_ChkDel" + Menuid.val();

            var AddPermission = $(this).find(Add).is(":checked");
            var EditPermission = $(this).find(Edit).is(":checked");
            var DeletePermission = $(this).find(Delete).is(":checked");
            var ViewsPermission = $(this).find(Views).is(":checked");
            _param = {};
            _param.StrModeSql = "AddMainPermission";
            _param.IntRoleId = roleid;
            _param.IntMenuID = Menuid.val();
            _param.BoolView = ViewsPermission;
            _param.BoolAdd = AddPermission;
            _param.BoolEditUpdate = EditPermission;
            _param.BoolDelete = DeletePermission;
            var param_detail = JSON.stringify(_param);
            $.ajax({
                url: '../Service/WsRoleMaster.asmx/UpdatePermission',
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

        

    });
}

function Delete(value, Name) {
    bootbox.confirm({
        message: "Are you sure you want to delete this Role <B>" + Name + "</B>?",
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
                _param.IntRoleId = value;
                _param.StrModeSql = "Delete";
                var param_detail = JSON.stringify(_param);
                $.ajax({
                    url: '../Service/WsRoleMaster.asmx/Delete',
                    method: 'post',
                    contentType: 'application/json;Charset=utf-8',
                    data: '{model:' + param_detail + '}',
                    success: function (data) {
                        var result = data.d;
                        $('#rolemaster').DataTable().ajax.reload();
                    },
                    error: function (xhr, status, error) {

                        alert(error.Message);
                    }
                });

            }

        }
    });

}
function Edit(value, name) {
    // CrearChk();
    activaTab('tab_0');
    $("#ContentPlaceHolder1_txtrole").val(name);
    $("#ContentPlaceHolder1_HRecordid").val(value);

    $("#btnSave").addClass('disabled');
    $("#btnupdate").removeClass('disabled');
    // $("#btnupdate").removeClass('disabled');
    $("#ContentPlaceHolder1_txtrole").prop("readonly", true);


    $.ajax({
        url: '../Service/WsRoleMaster.asmx/GetPermissionList',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        //data: '{model:' + param_detail + '}',
        data: "{Roleid:'" + value + "'}",
        success: function (data) {


            for (var i = 0; i < data.d.length; i++) {

                var Add = "#ContentPlaceHolder1_ChkAdd" + data.d[i].IntMenuid;
                var Edit = "#ContentPlaceHolder1_ChkEdit" + data.d[i].IntMenuid;
                var Delete = "#ContentPlaceHolder1_ChkDel" + data.d[i].IntMenuid;
                var View = "#ContentPlaceHolder1_ChkViews" + data.d[i].IntMenuid;
                //ContentPlaceHolder1_ChkViews1
                //alert(data.d[i].IntMenuid);
                $(View).prop('checked', data.d[i].View);
                $(Add).prop('checked', data.d[i].Add);
                $(Edit).prop('checked', data.d[i].Edit);
                $(Delete).prop('checked', data.d[i].Delete);


            }

        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });


}
function CrearChk() {
    var table = $(".role-list tbody");
    table.find("tr").each(function () {
        var Menuid = $(this).find('input:hidden');
        var Views = "#ContentPlaceHolder1_ChkViews" + Menuid.val();
        //if ($(this).find("input[type=checkbox]:checked").length != 0) {

        var Add = "#ContentPlaceHolder1_ChkAdd" + Menuid.val();
        var Edit = "#ContentPlaceHolder1_ChkEdit" + Menuid.val();
        var Delete = "#ContentPlaceHolder1_ChkDel" + Menuid.val();

        var AddPermission = $(this).find(Add).attr('checked', false);
        var EditPermission = $(this).find(Edit).attr('checked', false);
        var DeletePermission = $(this).find(Delete).attr('checked', false);
        var ViewsPermission = $(this).find(Views).attr('checked', false);




    });
 
}

function Clear() {
    $('#rolemaster').DataTable().ajax.reload();
    $("#ContentPlaceHolder1_txtrole").val('');
    $(":checkbox").attr("checked", false);
    $("#ContentPlaceHolder1_HRecordid").val('0');
    $("#btnupdate").addClass('disabled');
    $("#btnSave").removeClass('disabled');
    $("#ContentPlaceHolder1_txtrole").prop("readonly", false);
}


