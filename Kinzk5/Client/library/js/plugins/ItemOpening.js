var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$txtitemName: {
                    required: !0,
                },
                ctl00$ContentPlaceHolder1$Qty: {
                    required: !0,
                    digits: !0,

                },
                ctl00$ContentPlaceHolder1$txtAvg: { integer: !0, },
                ctl00$ContentPlaceHolder1$txttoalcost: { integer: !0, },
                //txttoalcost
                // Qty
            },
            messages: {
                ctl00$ContentPlaceHolder1$txtitemName: {
                    required: jQuery.validator.format("Enter Item Name"),
                },
                ctl00$ContentPlaceHolder1$Qty: {
                    required: jQuery.validator.format("Enter Item Name"),
                    digits: jQuery.validator.format("Enter number only"),
                },
                ctl00$ContentPlaceHolder1$Qty: {

                    integer: jQuery.validator.format("Enter Decimal only"),
                },
                ctl00$ContentPlaceHolder1$txttoalcost: {
                    integer: jQuery.validator.format("Enter Decimal only"),
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

jQuery(document).ready(function () { FormValidation.init() });
function Save(e) {

    _param = {};
    _param.IntItemopningId = $("#ContentPlaceHolder1_HRecordid").val();
    _param.StrModeSql = "insert";
    _param.IntBranchId = $("#ContentPlaceHolder1_ddunit").val();
   // _param.IntCompanyId = $("#ContentPlaceHolder1_ddcompany").val();
    _param.IntItemId = $("#ContentPlaceHolder1_HItemId").val();
    _param.Qty = $("#ContentPlaceHolder1_Qty").val();
    _param.IntAvgCost = $("#ContentPlaceHolder1_txtAvg").val();
    //_param.TotalCost = $("#ContentPlaceHolder1_txttoalcost").val();
    _param.datItemopening = $("#ContentPlaceHolder1_txtdate").val() == "" ? "01/01/1900" : DmyToMdy($("#ContentPlaceHolder1_txtdate").val());


    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/WsItemOpening.asmx/Save',
        method: 'POST',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
            var result = data.d;
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
        $('#Itemopening').DataTable().ajax.reload();
        $("#ContentPlaceHolder1_HRecordid").val('0');
        $("#ContentPlaceHolder1_HItemId").val('0');
        $("#ContentPlaceHolder1_Qty").val('');

        $("#ContentPlaceHolder1_txtAvg").val('');
        $("#ContentPlaceHolder1_txttoalcost").val('');
        $("#ContentPlaceHolder1_txtitemName").val('');
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
            $('#ContentPlaceHolder1_HItemId').val(map[item].id);
            $('#ContentPlaceHolder1_txtEmpSerch').val('');
            $('#ContentPlaceHolder1_txtitemName').val(map[item].name);

            return item;

        }

    });
});
function GetCompanyList() {
    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetUserCompany",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddcompany]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}

function FillAllbranch() {
    // var end = this.value;
    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetUserDefaultBranch",
        contentType: "application/json; charset=utf-8",
        //data: "{\"company\":\"" + end + "\"}",
        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = $("[id*=ddunit]");
          //  ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
jQuery(document).ready(function () {
    FillAllbranch();
    //$("#ContentPlaceHolder1_ddcompany").change(function () {

    //    var end = this.value;
    //    $.ajax({
    //        type: "POST",
    //        url: "../Service/Wscompanymaster.asmx/GetUserBranch",
    //        contentType: "application/json; charset=utf-8",
    //        data: "{\"company\":\"" + end + "\"}",
    //        dataType: "json",
    //        success: function (r) {
    //            // alert(r.d);
    //            var ddlCustomers = $("[id*=ddunit]");
    //            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
    //            $.each(r.d, function () {
    //                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
    //            });
    //        }
    //    });
    //});
});
$(document).ready(function () {
    $('#Itemopening').DataTable({
        "processing": true,
        "serverSide": false,
        lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
        pageLength: 50,
        ajax: {
            url: '../Service/data.asmx/GetItemopning',
            type: "POST",

            "data": {
                "View": 0,
                "Edit": $('#ContentPlaceHolder1_HEdit').val(),
                "Delete": $('#ContentPlaceHolder1_HDelete').val()
            }
        },
        columns: [
               {
                   data: null,
                   'render': function (data, type, full, meta) {
                       return '<a onclick="Delete(' + data.IntItemopningId + "," + "'" + data.ItemName + "'" + ')" class="btn btn-outline btn-circle dark btn-sm red ' + data.Edit + '" > <i class="fa fa-trash-o"></i>' + '</a>'
                       +
                       '<a onclick="Edit(' + data.IntItemopningId + ')" class="btn btn-outline btn-circle btn-sm purple ' + data.Delete + '"> <i class="fa fa-edit"></i>' + '</a>';
                       return data;
                   },
                   className: "dt-body-center"
               },
                { data: "SNO" },
                { data: "StrUnitName", "searchable": true },
                { data: "ItemName", "searchable": true },
                { data: "Qty", "searchable": true },
                { data: "IntAvgCost", "searchable": true },
                { data: "TotalCost", "searchable": true },


        ]
    });
});
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
                _param.IntItemopningId = value;
                _param.StrModeSql = "Delete";
                var param_detail = JSON.stringify(_param);
                $.ajax({
                    url: '../Service/WsItemOpening.asmx/Delete',
                    method: 'post',
                    contentType: 'application/json;Charset=utf-8',
                    data: '{model:' + param_detail + '}',
                    success: function (data) {
                        var result = data.d;
                        $('#Itemopening').DataTable().ajax.reload();
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
    _param.IntItemopningId = value;
    _param.StrModeSql = "ItemSelect";
    var param_detail = JSON.stringify(_param);

    $.ajax({
        url: '../Service/WsItemOpening.asmx/FillItemopening',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {
           
            var result = data.d;
            if (result != "-1") {
                $("#ContentPlaceHolder1_txtitemName").val(data.d.ItemName);
                $("#ContentPlaceHolder1_Qty").val(data.d.Qty);
                $("#ContentPlaceHolder1_ddcompany").select2().val(data.d.IntCompanyId).trigger("change");

                var date = data.d.datItemopening;
                var nowDate = new Date(parseInt(date.substr(6)));
                var today = nowDate.format("dd/MM/yyyy");

                $("#ContentPlaceHolder1_txtdate").val(today);
                $("#ContentPlaceHolder1_txtAvg").val(data.d.Avgcost);
                $("#ContentPlaceHolder1_txttoalcost").val(data.d.Totalcost);
                $("#ContentPlaceHolder1_ddunit").select2().val(data.d.IntBranchId).trigger("change");

            }
        },
        error: function (xhr, status, error) {

            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });


}

