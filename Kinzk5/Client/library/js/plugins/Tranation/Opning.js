var counter = 0;
var i = 1;
function Load() {
    for (counter = 0; counter < 50; counter++) {
        $('.addrow').click();
    }
}
jQuery(document).ready(function () {
    getProductGroup();
    FormValidation.init();
    GetInvice();
    FillAllbranch('ddunit');
    FillAllbranch2('ddunitList');

    LoadData();
    $(".addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";
        var tabIndexs = ""
        tabIndexs = i;
        var TextboxItem = "";
        cols += '<td>' + i + '</td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" onfocus="this.select();"    id="item' + counter + '" placeholder="Item Name"  class="form-control input-sm basicAutoComplete item" name="item' + counter + '"/><input type="hidden" id="hitemid' + counter + '" name="hitemid' + counter + '" ></td>';
        cols += '<td class="tdE"><select name="ddcolor" tabindex="' + tabIndexs + '"  id="ddcolor' + counter + '" class="form-control color input-sm">' + _colorGroup + '</select></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '" autocomplete="off" title="Enter qty" placeholder="Qty"  onkeypress="return isNumberKey(event)"  id="qty' + counter + '" class="form-control input-sm Qty" name="qty' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" title="Enter RBMAmount" placeholder="RBM" onkeyup="checkDec(this);"  id="rbmamount' + counter + '"  class="form-control input-sm rbmamount" name="rbmamount' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" title="Enter Price" placeholder="Price" onkeyup="checkDec(this);"   id="rate' + counter + '"  class="form-control input-sm Rate" name="rate' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" placeholder="SellRate1"   onkeyup="checkDec(this);"  class="form-control input-sm SellRate1" id="SellRate1' + counter + '" name="SellRate1' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" placeholder="SellRate2" onkeyup="checkDec(this);"  class="form-control input-sm SellRate2" id="SellRate2' + counter + '" name="SellRate2' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"  autocomplete="off" placeholder="SellRate3" onkeyup="checkDec(this);"  class="form-control input-sm SellRate3" id="SellRate3' + counter + '" name="SellRate3' + counter + '"/></td>';

        cols += '<td><button type="button" tabindex="' + tabIndexs + '" class="btn btn-outline btn-circle dark btn-sm red ibtnDel"><i class="fa fa-trash-o"></i></button></td>';

        newRow.append(cols);
        $("table.order-list").append(newRow);
        var TextboxItem = "item" + counter;
        var itemid = "#hitemid" + counter;
        var itemidname = "[id*=" + TextboxItem + "]";
        var ddcolor = "#ddcolor" + counter;

        var qty = "#qty" + counter;
        var rate = "#rate" + counter;

        var Rbmamount = "#rbmamount" + counter;
        var SalePrce1 = "#SellRate1" + counter;
        var SalePrce2 = "#SellRate2" + counter;
        var SalePrce3 = "#SellRate3" + counter;
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
                    if (substringMatcher(data)) {
                        return $.map(data.d, function (object) {
                            return { Id: object.IntProductId, Value: object.ItemName };
                        });
                    }
                },
            }
        });
        var substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push(str);
                    }
                });

                cb(matches);
            };
        };
        a.initialize(),
        $(itemidname).typeahead(null, {
            displayKey: "Value",
            hint: true,
           // infinity:true,
           // limit: 100,
            // limit: infinity,
            limit: Infinity,
            highlight: true,
            minLength: 1,
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
            $(qty).val(0);
            $(rate).val(0);

            $(Rbmamount).val(0);
            $(SalePrce1).val(0);
            $(SalePrce2).val(0);
            $(SalePrce3).val(0);
            //$(qty).rules("add", {
            //    required: true
            //});
            //$(rate).rules("add", {
            //    required: true
            //});

          

        }).bind('typeahead:autocompleted', function (obj, datum) {
           // $(this).data("seletectedId", datum.Id);
            $(itemid).val(datum.Id);
            $(qty).val(0);
            $(rate).val(0);

            $(Rbmamount).val(0);
            $(SalePrce1).val(0);
            $(SalePrce2).val(0);
            $(SalePrce3).val(0);

        });

        $(rate).on("input", function (evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, ''));
            if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                evt.preventDefault();
            }
        });

        i++;
    });

    Load();
    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $(".filterList").on("click", function () {
        LoadData();
        return false;
    });

    $('#btnupdate').on('click', function () {

        var check = $('#RateClint').find('input[type=checkbox]:checked').length;
        if (check == 0) {
            alert('Select Record to Update');
        }
        else {
            Update();

        }
        return false;

    });

});

function Save(e) {
    var pp=GetInvicenew();
    toastr.options.positionClass = 'toast-top-right';
    var table = $(".order-list tbody");
    var arr = Array();
    table.find("tr").each(function () {
      
        var itemName = $(this).find('.basicAutoComplete').val();

        var ItemId = $(this).find("input[type='hidden']").val();
        var qty = $(this).find('.Qty').val();
        var BatchNo = '';
        var price = $(this).find('.Rate').val();
        var rbmamount = $(this).find('.rbmamount').val();
       
        var SellRate1 = $(this).find('.SellRate1').val();
        var SellRate2 = $(this).find('.SellRate2').val();
        var SellRate3 = $(this).find('.SellRate3').val();
        var color = $(this).find('.color').val();
        _param = {};
        _param.IntBranchId = $("#ContentPlaceHolder1_ddunit").val();
        _param.IntItemId = ItemId;
        _param.Qty = qty == "" ? 0 : qty;
        _param.StrBatchNo = BatchNo;
        _param.datItemopening = $("#ContentPlaceHolder1_dddate").val() == "" ? "01/01/1900" : DmyToMdy($("#ContentPlaceHolder1_dddate").val());
        _param.Decprice = price == "" ? 0 : price;
        _param.DecRbmAmount = rbmamount == "" ? 0 : rbmamount;
        _param.DecSellingprice1 = SellRate1 == "" ? 0 : SellRate1;
        _param.DecSellingprice2 = SellRate2 == "" ? 0 : SellRate2;
        _param.DecSellingprice3 = SellRate3 == "" ? 0 : SellRate3;
        _param.StrInvoiceNo =pp;
        //$("#ContentPlaceHolder1_txtinvoice").val();
        _param.IntColorId = color;

        //var param_detail = JSON.stringify(_param);
        $(e).attr('disabled', 'disabled');

        if (ItemId != "" && qty != "") {
            arr.push(_param);
        
        }

    });

    $.ajax({
        url: '../Service/WsItemOpening.asmx/SaveOpening',
        method: 'post',
        async: false,
        contentType: 'application/json;Charset=utf-8',
        data: '{model:' + JSON.stringify(arr) + '}',

        success: function (data) {
            var result = data.d;
           // UpdateOnlieRte(ItemId, SellRate1, SellRate2, SellRate3);
            //UpdateProDuctQtyOnline(ItemId, qty);
            $(e).removeAttr('disabled');
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
                closeInSeconds: 5
            });
        },
        error: function (xhr, status, error) {
            $(e).removeAttr('disabled');
            toastr.error("Error while contacting server, please try again");
        }
    });



}

function UpdateProDuctQtyOnline(id, qty) {
    _param = {};
    _param.ItemId = id;
    _param.IntAprovedQty = qty
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/UpdateQty',
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
var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);

        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: true,
                },

            },
            messages: {
                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: jQuery.validator.format("Select Unit"),
                },
            },
            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
            submitHandler: function (e, event) {
                event.preventDefault();
                var submitButtonName = $(this.submitButton).attr("id");
                var ss = '#' + submitButtonName;
                var res = confirm('Are u Sure To Save data');
                if (res) {
                    Save(ss);
                }

            },

            errorPlacement: function (e, r) { r.parent(".input-group").size() > 0 ? e.insertAfter(r.parent(".input-group")) : r.attr("data-error-container") ? e.appendTo(r.attr("data-error-container")) : r.parents(".radio-list").size() > 0 ? e.appendTo(r.parents(".radio-list").attr("data-error-container")) : r.parents(".radio-inline").size() > 0 ? e.appendTo(r.parents(".radio-inline").attr("data-error-container")) : r.parents(".checkbox-list").size() > 0 ? e.appendTo(r.parents(".checkbox-list").attr("data-error-container")) : r.parents(".checkbox-inline").size() > 0 ? e.appendTo(r.parents(".checkbox-inline").attr("data-error-container")) : e.insertAfter(r) },
            highlight: function (e) { $(e).closest(".form-group").removeClass("has-success").addClass("has-error"); $(e).closest(".tdE").removeClass("has-success").addClass("has-error") },
            unhighlight: function (e) { }, success: function (e, r) { var i = $(r).parent(".input-icon").children("i"); $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), $(r).closest(".tdE").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check") },

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
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function checkDec(el) {
    var ex = /^[0-9]+\.?[0-9]*$/;
    if (ex.test(el.value) == false) {
        el.value = el.value.substring(0, el.value.length - 1);
    }
}
function Delete(value, Name) {
    bootbox.confirm({
        message: "Are you sure you want to delete this ItemName: <B>" + Name + "</B>?",
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
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('.order-list input[type="text"]').val('');
        $('.order-list').find("select").each(function () {
            this.selectedIndex = 0;
        });
        $('#Itempaking').DataTable().ajax.reload();
        GetInvice();
        $('#myModal').modal('hide');
        

    }
}
function Clear()
{
    $('.order-list input[type="text"]').val('');
    $('.order-list').find("select").each(function () {
        this.selectedIndex = 0;
    });
    $('#Itempaking').DataTable().ajax.reload();
    GetInvice();
    $('#myModal').modal('hide');
}
function FillColor(id) {

    $.ajax({
        type: "POST",
        url: "../Service/WsColor.asmx/GetColorList",
        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (r) {

            var ddlCustomers = id;
            ddlCustomers.empty().append('<option selected="selected" value="0">None</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function GetInvice() {
    $.ajax({
        url: '../Service/WsItemOpening.asmx/GetInvoice',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        success: function (data) {
            var result = data.d;
            $('#ContentPlaceHolder1_txtinvoice').val(data.d);
        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });
}
function GetInvicenew() {
  
        var result = "";
        $.ajax({
            url: '../Service/WsItemOpening.asmx/GetInvoice',
            method: 'post',
            async: false,
            contentType: 'application/json;Charset=utf-8',
            success: function (data) {
               
                result = data.d;
                //$('#ContentPlaceHolder1_txtinvoice').val(data.d);
            },
            error: function (xhr, status, error) {
                alert(error.Message);
            }
        });
       
        return result;
        

}
function UpdateOnlieRte(ProductId, Sellprice1, SellPrice2, SellPrice3) {
    _param = {};
    _param.ItemId = ProductId;
    _param.SellPric1 = Sellprice1 == "" ? 0 : Sellprice1;
    _param.SellPric2 = SellPrice2 == "" ? 0 : SellPrice2;
    _param.SellPric3 = SellPrice3 == "" ? 0 : SellPrice3;

    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/UpdateProductrate',
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

function OPEN_Add(src) {

    $('#AddModel .modal-body').load(src, function (result) { });
    $('#AddModel').modal('show');
}
function OPEN_POPUP(src) {

    $('#myModal .modal-body').load(src, function (result) { });
    $('#myModal').modal('show');
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