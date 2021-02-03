function FillAllbranch() {
    var end = this.value;
    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetUserDefaultBranch",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddunit]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}

var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {

                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: true,
                },
                ctl00$ContentPlaceHolder1$txtitem: {
                    required: !0,
                },
                ctl00$ContentPlaceHolder1$txtissueqty: {
                    required: !0,
                    integer: true,
                },




            },
            messages: {

                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: jQuery.validator.format("Select Unit Name"),

                },
                ctl00$ContentPlaceHolder1$txtitem: {
                    required: jQuery.validator.format("Enter ItemName"),

                },

                ctl00$ContentPlaceHolder1$txtissueqty: {
                    required: jQuery.validator.format("Enter qty"),
                    integer: jQuery.validator.format("Enter Integer only"),
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
    FormValidation.init()
    FillAllbranch();
    // FillIssueList($("#ContentPlaceHolder1_ddunit").val());
    $("#ContentPlaceHolder1_ddunit").change(function () {
        var end = this.value;
        FillIssueList(this.value);
        $.ajax({
            type: "POST",
            url: "../Service/WsDepartment.asmx/GetDepartment",
            contentType: "application/json; charset=utf-8",
            data: "{\"branch\":\"" + end + "\"}",
            dataType: "json",
            success: function (r) {

                var ddlCustomers = $("[id*=dddepartment]");
                ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
                $.each(r.d, function () {
                    ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
                });
                $("#IssueDepart").dataTable().fnDestroy();
                $('#IssueDepart').DataTable({
                    "processing": true,
                    "serverSide": false,
                    lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                    pageLength: 50,
                    ajax: {
                        url: '../Service/data.asmx/GetAllItemIssueToDepartment',
                        type: "POST",

                        "data": {
                            "View": 0,
                            "Edit": $('#ContentPlaceHolder1_HEdit').val(),
                            "Delete": $('#ContentPlaceHolder1_HDelete').val(),
                            "Forbranch": $('#ContentPlaceHolder1_ddunit').val(),
                        }
                    },
                    columns: [
                           {
                               data: null,
                               'render': function (data, type, full, meta) {
                                   return '<a onclick="Delete(' + data.IntDeptIssueId + "," + "'" + data.ItemName + "'" + ')" class="btn btn-outline btn-circle dark btn-sm red ' + data.Edit + '" > <i class="fa fa-trash-o"></i>' + '</a>'
                                   +
                                   '<a onclick="Edit(' + data.IntDeptIssueId + ')" class="btn btn-outline btn-circle btn-sm purple ' + data.Delete + '"> <i class="fa fa-edit"></i>' + '</a>';
                                   return data;
                               },
                               className: "dt-body-center"
                           },
                            { data: "SNO" },
                            {
                            data: "DatIssue",
                            render: function (d) {
                                return moment(d).format("DD/MM/YYYY");
                            }
                            },
                            { data: "IntDeptIssueNo" },
                            { data: "StrDepartmentName", "searchable": true },
                            { data: "ItemName", "searchable": true },
                            { data: "IntQty", "searchable": true },


                    ]
                });
            }
        });
    });



});

function Save(e) {
    _param = {};
    _param.IntItemId = $("#ContentPlaceHolder1_hitems").val();
    if ($("#ContentPlaceHolder1_HIssueno").val() == "0") {
        _param.StrModeSql = "insert";
    }
    else {
        _param.StrModeSql = "insertNext";
    }
    _param.FromBranchId = $("#ContentPlaceHolder1_ddunit").val();
    _param.IntDepartmentId = $("#ContentPlaceHolder1_dddepartment").val();
    _param.IntQty = $("#ContentPlaceHolder1_txtissueqty").val();
    _param.IntDeptIssueNo = $("#ContentPlaceHolder1_HIssueno").val();
    _param.StrIssuerName = $("#ContentPlaceHolder1_txtname").val();
    _param.StrRemksIssue = $("#ContentPlaceHolder1_comment").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsIssueTodept.asmx/Save',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
            $("#ContentPlaceHolder1_HIssueno").val(data.d);
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

function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('#IssueDepart').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_txtitem").val('');
        $("#ContentPlaceHolder1_hitems").val('0');
        $("#ContentPlaceHolder1_txtitemname").val('');
        $("#ContentPlaceHolder1_txtissueqty").val('');
        $("#ContentPlaceHolder1_txtavqty").val('');
        $("#ContentPlaceHolder1_comment").val('');

    }

}
$(function () {
    $('.basicAutoComplete').typeahead({
        hint: true,
        // highlight: true,
        minLength: 3
                      , source: function (request, response) {
                          $.ajax({
                              url: "../Service/WsItemMaster.asmx/GetItemNames",
                              // data: "{ 'VehicleNo': '" + request + "'}",
                              data: "{name:'" + request + "'}",
                              dataType: "json",
                              type: "POST",
                              contentType: "application/json; charset=utf-8",
                              success: function (data) {
                                  items = [];
                                  map = {};
                                  $.each(data.d, function (i, item) {

                                      var id = item.IntItemId;
                                      var name = item.ItemName;

                                      map[name] = { id: id, name: name };
                                      items.push(name);
                                  });
                                  response(items);
                                  $(".dropdown-menu").css("height", "auto");
                              },
                              error: function (response) {
                                  alert(response.responseText);
                              },
                              failure: function (response) {
                                  alert(response.responseText);
                              },

                          });
                      },
        updater: function (items) {

            // $('#ContentPlaceHolder1_HItemId').val(map[item].id);
            return items;
        },
        afterSelect: function (item) {
            $('#ContentPlaceHolder1_hitems').val(map[item].id);
            $('#ContentPlaceHolder1_txtitemname').val(map[item].name);
            GetAvaibleItem(map[item].id);
            return item;

        }

    });
});

function GetAvaibleItem(itemid) {
    var branchid = $('#ContentPlaceHolder1_ddunit').val();
    $.ajax({
        url: '../Service/data.asmx/GetAvilableQty',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: "{branchid:'" + branchid + "',ItemId:'" + itemid + "'}",
        // data: '{branchid:' + 1 + 'ItemId:' + itemid + '}',
        success: function (data) {
            var result = data.d;
            $('#ContentPlaceHolder1_txtavqty').val(data.d);

        },
        error: function (xhr, status, error) {
            debugger;
            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });

}
