var counter = 0;
var i = 1;
function Load() {
    for (counter = 0; counter < 50; counter++) {
        $('.addrow').click();
    }
}
jQuery(document).ready(function () {
    FormValidation.init();
    getProductGroup();
    FillData();
    $(".addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";
        var tabIndexs = ""
        tabIndexs = i;
        var TextboxItem = "";
        cols += '<td>' + i + '</td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off"    id="item' + counter + '" placeholder="Item Name"  class="form-control input-sm basicAutoComplete item" name="item' + counter + '"/><input type="hidden" class="hitemid" id="hitemid' + counter + '" name="hitemid' + counter + '" ></td>';
       // cols += '<td class="tdE"><select name="ddcolor" tabindex="' + tabIndexs + '"  id="ddcolor' + counter + '" class="form-control color input-sm"></td>';
        cols += '<td class="tdE"><select name="ddcolor" tabindex="' + tabIndexs + '"  id="ddcolor' + counter + '" class="form-control color input-sm">' + _colorGroup + '</select></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '" id="SellRate1' + counter + '" title="Enter SellRate1"  autocomplete="off" placeholder="SellRate1"   onkeyup="checkDec(this);"  class="form-control input-sm SellRate1" name="SellRate1' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  id="SellRate2' + counter + '" title="Enter SellRate2"  autocomplete="off" placeholder="SellRate2" onkeyup="checkDec(this);"  class="form-control input-sm SellRate2" name="SellRate2' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '" id="SellRate3' + counter + '" title="Enter SellRate3"  autocomplete="off" placeholder="SellRate3" onkeyup="checkDec(this);"  class="form-control input-sm SellRate3" name="SellRate3' + counter + '"/></td>';
        // cols += '<td><input type="text" autocomplete="off" class="form-control input-sm batchno" name="batchno' + counter + '"/></td>';
        cols += '<td><button type="button" tabindex="' + tabIndexs + '" class="btn btn-outline btn-circle dark btn-sm red ibtnDel"><i class="fa fa-trash-o"></i></button></td>';

        newRow.append(cols);
        $("table.order-list").append(newRow);
        var TextboxItem = "item" + counter;
        var itemid = "#hitemid" + counter;
        var itemidname = "[id*=" + TextboxItem + "]";
        var ddcolor = "#ddcolor" + counter;

        var saleRate1 = "#SellRate1" + counter;
        var saleRate2 = "#SellRate2" + counter;
        var saleRate3 = "#SellRate3" + counter;

        var a = new Bloodhound({
            datumTokenizer: function (e) { return e.tokens },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: '../Service/WsProduct.asmx/GetItemNames',
                prepare: function (query, settings) {
                    settings.type = "POST";
                    settings.contentType = "application/json";
                    settings.DataType = "json";
                    settings.processData = false;
                    settings.data = JSON.stringify({ "name": query });
                    return settings;
                },
                filter: function (data) {
                    if (data) {
                        return $.map(data.d, function (object) {
                            return { Id: object.IntProductId, Value: object.ItemName };
                        });
                    }
                },
            }
        });
        a.initialize(),
        $(itemidname).typeahead(null, {
            displayKey: "Value",
            hint: true,
            highlight: true,
            minLength: 2,
            limit: 20,
            source: a.ttAdapter(),
            templates: {
                empty: [
                       '<div class="empty-message">',
                       'Sorry no Item found !',
                       '</div>'
                ].join('\n'),
                empty: [
                      '<div class="empty-message">',
                      'No Item found',
                      '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile(["<div class='tt-suggestion tt-selectable'>{{Value}}</div>"].join("")),
                pending: '<div>Loading...</div>',
            }
        }).bind("typeahead:selected", function (obj, datum, name) {
            $(this).data("seletectedId", datum.Id);
            $(itemid).val(datum.Id);

            //$(saleRate1).rules("add", {
            //    required: true
            //});
            //$(saleRate2).rules("add", {
            //    required: true
            //});
            //$(saleRate3).rules("add", {
            //    required: true
            //});

           // FillColor($(ddcolor));

        })


        i++;
    });
    Load();


});

var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);

        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",

            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
            submitHandler: function (e, event) {
                event.preventDefault();
                var res = confirm('Are u Sure To Save data');
                if (res) {
                    var submitButtonName = $(this.submitButton).attr("id");
                    Save(submitButtonName);
                }
               
            },
            // errorPlacement: function (e, r) {var i = $(r).parent(".input-icon").children("i");i.removeClass("fa-check").addClass("fa-warning"),i.attr("data-original-title",e.text()).tooltip({ container: "body" })},
            errorPlacement: function (e, r) { r.parent(".input-group").size() > 0 ? e.insertAfter(r.parent(".input-group")) : r.attr("data-error-container") ? e.appendTo(r.attr("data-error-container")) : r.parents(".radio-list").size() > 0 ? e.appendTo(r.parents(".radio-list").attr("data-error-container")) : r.parents(".radio-inline").size() > 0 ? e.appendTo(r.parents(".radio-inline").attr("data-error-container")) : r.parents(".checkbox-list").size() > 0 ? e.appendTo(r.parents(".checkbox-list").attr("data-error-container")) : r.parents(".checkbox-inline").size() > 0 ? e.appendTo(r.parents(".checkbox-inline").attr("data-error-container")) : e.insertAfter(r) },
            highlight: function (e) { $(e).closest(".form-group").removeClass("has-success").addClass("has-error"); $(e).closest(".tdE").removeClass("has-success").addClass("has-error") },
            unhighlight: function (e) { }, success: function (e, r) { var i = $(r).parent(".input-icon").children("i"); $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), $(r).closest(".tdE").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check") },

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

function Delete(value, Name) {
    toastr.options.positionClass = 'toast-top-right';
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
                _param.IntRecordId = value;
                _param.StrModeSql = "Delete";
                var param_detail = JSON.stringify(_param);
                $.ajax({
                    url: '../Service/WsUpdatedRateList.asmx/Delete',
                    method: 'post',
                    contentType: 'application/json;Charset=utf-8',
                    data: '{model:' + param_detail + '}',
                    success: function (data) {
                        var result = data.d;
                        toastr.success("Delete Sucessfully");
                        $('#UpdateRateList').DataTable().ajax.reload();
                    },
                    error: function (xhr, status, error) {
                        toastr.error(error.Message);

                    }
                });

            }

        }
    });

}
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function FillColor(id) {
    var Branch = 0;
    //debugger;
    $.ajax({
        type: "POST",
        url: "../Service/WsColor.asmx/GetColorList",
        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (r) {
            // alert(r.d);
            var ddlCustomers = id;
            ddlCustomers.empty().append('<option selected="selected" value="0">None</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}

function Save(e) {
    toastr.options.positionClass = 'toast-top-right';
    var table = $(".order-list tbody");
    table.find("tr").each(function () {
        var ItemId = $(this).find('.hitemid').val();
        var SellRate1 = $(this).find('.SellRate1').val();
        var SellRate2 = $(this).find('.SellRate2').val();
        var SellRate3 = $(this).find('.SellRate3').val();
        var color = $(this).find('.color').val();
        _param = {};
        _param.IntProductId = ItemId;
        _param.DecSellingprice1 = SellRate1 == "" ? "0" : SellRate1;
        _param.DecSellingprice2 = SellRate2 == "" ? "0" : SellRate2;
        _param.DecSellingprice3 = SellRate3 == "" ? "0" : SellRate3;;
        _param.IntColorId = color;
        _param.DatRate = $("#ContentPlaceHolder1_txtdate").val() == "" ? "01/01/1900" : DmyToMdy($("#ContentPlaceHolder1_txtdate").val());
        var param_detail = JSON.stringify(_param);
        if (ItemId != "") {
            $.ajax({
                url: '../Service/WsUpdatedRateList.asmx/Save',
                method: 'post',
                contentType: 'application/json;Charset=utf-8',
                data: '{model:' + param_detail + '}',
                beforeSend: function () {

                    $('#btnsave').attr('disabled', 'disabled');
                },
                success: function (data) {
                    var result = data.d;
                    $('#btnsave').removeAttr('disabled');
                },
                error: function (xhr, status, error) {
                    $('#btnsave').removeAttr('disabled');
                    toastr.error("Error while contacting server, please try again");
                }
            });
        }

    });
    $('.order-list input[type="text"]').val('');
    $('.order-list').find("select").each(function () { // there is no such thing as input[type=select] 
        this.selectedIndex = 0; // this is a <select>
    });
    $('#UpdateRateList').DataTable().ajax.reload();
    toastr.success("Rate Save Sucessfully");
  

}
function checkDec(el) {
    var ex = /^[0-9]+\.?[0-9]*$/;
    if (ex.test(el.value) == false) {
        el.value = el.value.substring(0, el.value.length - 1);
    }
}

function UpdateOnlieRte(ProductId, Sellprice1, SellPrice2, SellPrice3) {
    _param = {};
    _param.ItemId = ProductId;
    _param.SellPric1 = Sellprice1;
    _param.SellPric2 = SellPrice2;
    _param.SellPric3 = SellPrice3;

    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/UpdateProductrate',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + param_detail + '}',
        success: function (data) {

        },
        error: function (xhr, status, error) {
            //debugger;
            //var err = JSON.parse(xhr.responseText);
            alert(error.Message);
        }
    });
}

var _colorGroup = '';
function getProductGroup() {
    $.ajax({
        type: "POST",
        url: "../Service/WsColor.asmx/GetColorList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            _productGroup = '';
            $.each(data.d, function (index, item) {

                _colorGroup = '<option value="' + item.Value + '">' + item.Text + '</option>' + _colorGroup;
            });
            _colorGroup = '<option value="' + '0' + '">' + 'None' + '</option>' + _colorGroup;
        }
    });
}