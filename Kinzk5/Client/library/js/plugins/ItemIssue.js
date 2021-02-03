function FillAllbranch() {
   // var end = this.value;
    $.ajax({
        type: "POST",
        url: "../Service/WsItemIssue.asmx/GetUserBranchs",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddUnit]");
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
                ctl00$ContentPlaceHolder1$dditemtype: {
                    CheckDropDownList: true,
                },
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
                ctl00$ContentPlaceHolder1$dditemtype: {
                    CheckDropDownList: jQuery.validator.format("Select ItemType"),
                },
                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: jQuery.validator.format("Select Unit Name"),

                },
                ctl00$ContentPlaceHolder1$txtitem: {
                    required: jQuery.validator.format("Enter ItemName"),

                },
                ctl00$ContentPlaceHolder1$txtissueqty: {
                    required: jQuery.validator.format("Enter issue qty"),
                    integer: jQuery.validator.format("Enter number only"),
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
   //getdata();
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
    _param.FromBranchId = $("#ContentPlaceHolder1_ddfrombr").val();
    _param.ToBranchId = $("#ContentPlaceHolder1_ddUnit").val();
    _param.IntQty = $("#ContentPlaceHolder1_txtissueqty").val();
    _param.IntIssueNo = $("#ContentPlaceHolder1_HIssueno").val();
    _param.StrIssueToName = $("#ContentPlaceHolder1_txtissueto").val();
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsItemIssue.asmx/Save',
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
        $('#datatable_ajax').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_txtitem").val('');
        $("#ContentPlaceHolder1_hitems").val('0');
        $("#ContentPlaceHolder1_txtitemname").val('');
        $("#ContentPlaceHolder1_txtissueqty").val('');
        $("#ContentPlaceHolder1_txtavqty").val('');

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
    var branchid = $('#ContentPlaceHolder1_ddfrombr').val();
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
