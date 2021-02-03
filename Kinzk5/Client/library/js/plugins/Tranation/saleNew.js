var counter = 0;
var i = 1;
function Load() {
    for (counter = 0; counter < 120; counter++) {
        $('.addrow').click();
    }
}
jQuery(document).ready(function () {
    FormValidation.init();

    FillUserClint2();
    FillDefultbranch();
    FillUserClint();
    GetInvice();
    $(".addrow").on("click", function () {
        var newRow = $("<tr class=\"rowE\">");
        var cols = "";
        var tabIndexs = ""
        tabIndexs = i;

        var tabinex
        var TextboxItem = "";
        cols += '<td>' + i + '</td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '" onfocus="this.select();"   autocomplete="off" id="item' + counter + '" class="form-control input-sm  item" name="item' + counter + '"/><input type="hidden" class="hitemid" id="hitemid' + counter + '" name="hitemid' + counter + '" ><input type="hidden" class="hColor" id="hColor' + counter + '" name="hColor' + counter + '" ></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"   autocomplete="off" id="issueQty' + counter + '" onkeypress="return isNumberKey(event)"  class="form-control input-sm Qty" title="Enter qty" name="qty' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"   autocomplete="off" class="form-control input-sm Rate" id="rate' + counter + '"  name="rate' + counter + '"/></td>';
        cols += '<td class="tdE"><input type="text" tabindex="' + tabIndexs + '"   autocomplete="off"  id="avlQty' + counter + '" class="form-control input-sm avlQty disabled" disabled="disabled" name="avlQty' + counter + '"/></td>';

        cols += '<td><button type="button" tabindex="' + tabIndexs + '"  class="btn btn-outline btn-circle dark btn-sm red ibtnDel"><i class="fa fa-trash-o"></i></button></td>';
        cols += '<td><a class="my-tool-tip" tabindex="' + tabIndexs + '"  id="toottip' + counter + '" data-toggle="tooltip"  data-placement="top"  ><i class="glyphicon glyphicon-info-sign"></i></a></td>';
        newRow.append(cols);
        $("table.order-list").append(newRow);
        var TextboxItem = "item" + counter;
        var itemidname = "[id*=" + TextboxItem + "]";

        var Avl = "#avlQty" + counter;
        var TextIssueqty = "#issueQty" + counter;
        var itemid = "#hitemid" + counter;
        var itemColor = '#hColor' + counter;
        var issueQty = "#issueQty" + counter;
        var rate = "#rate" + counter;
        var tooltip = "#toottip" + counter;
        // var rate = "#rate" + counter;

        $(rate).on("input", function (evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, ''));
            if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                evt.preventDefault();
            }
        });
        $(TextIssueqty).blur(function () {
            var AvQty = $(Avl).val();
            var IssueQty = $(TextIssueqty).val();
            if (ComapreQty(AvQty, IssueQty)) {
                alert('Sale Qty should be less then or Equal to Balance Qty');
                this.value = '';
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
        var a = new Bloodhound({
            datumTokenizer: function (e) { return e.tokens },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: '../Service/WsProduct.asmx/GetItemNamesSales',
                prepare: function (query, settings) {
                    settings.type = "POST";
                    settings.contentType = "application/json";
                    settings.DataType = "json";
                    settings.processData = false;
                    settings.data = JSON.stringify({ "Branch": $('#ContentPlaceHolder1_ddunit').val(), "name": query });
                    return settings;
                },
                filter: function (data) {
                    if (substringMatcher(data)) {
                        return $.map(data.d, function (object) {
                            return { Id: object.IntProductId, Value: object.ItemName, color: object.IntColorId, qty: object.IntQty };
                        });
                    }
                },

            }
        });
        a.initialize(),

        $(itemidname).typeahead(null, {
            //  displayKey: "Value",
            displayKey: function (suggestions) { return suggestions.Value },
            showHintOnFocus: true,
            //hint: true,
            autoselect: true,
            highlight: true,
            minLength: 1,
            limit: Infinity,
            source: a.ttAdapter(),

            templates: {

                empty: [
                       '<div class="empty-message">',
                       '',
                       '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile(["<div class='tt-suggestion tt-selectable'>{{Value}}</div>"].join("")),
                pending: '<div>Loading...</div>',

            }
        }).bind("typeahead:selected", function (obj, datum, name) {
            if (MatchTxt(datum.Value) == 2) {
                
                alert("Item Exits in List");
                $(itemidname).val("");
                return ;
            }
         
            $(this).data("seletectedId", datum.Id);
            $(itemid).val(datum.Id);
            $(itemColor).val(datum.color);
            $(Avl).val(datum.qty);
            GetRate($('#ContentPlaceHolder1_ddclint').val(), datum.Id, rate, datum.color)


            $(tooltip).on('click', function (e) {
                SetToolTip(this, datum.Id);
                e.stopPropagation();
                e.preventDefault();
            });

        }).bind('typeahead:autocompleted', function (obj, datum) {
           if (MatchTxt(datum.Value) == 2) {
               alert("Item Exits in List");
               $(itemidname).val("");
                return;
            }
           
            event.preventDefault()
            $(itemid).val(datum.Id);
            $(itemColor).val(datum.color);
            $(Avl).val(datum.qty);
            GetRate($('#ContentPlaceHolder1_ddclint').val(), datum.Id, rate, datum.color)

        });


        i++;

    });
    Load();
    FillData();
    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $("#button-filter").on("click", function () {
        FillData();
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



})
function OPEN_POPUP(src) {

    $('#myModal .modal-body').load(src, function (result) { });
    $('#myModal').modal('show');
}

function OPEN_Add(src) {

    $('#AddModel .modal-body').load(src, function (result) { });
    $('#AddModel').modal('show');
}
function FillDefultbranch() {

    $.ajax({
        type: "POST",
        url: "../Service/Wscompanymaster.asmx/GetUserDefaultBranch",
        contentType: "application/json; charset=utf-8",
        async: false,

        dataType: "json",
        success: function (r) {

            var ddlCustomers = $("[id*=ddunit]");

            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function FillUserClint() {
    var Branch = $("#ContentPlaceHolder1_ddunit").val();
    $.ajax({
        type: "POST",
        url: "../Service/WsClintMaster.asmx/GetClient",
        contentType: "application/json; charset=utf-8",

        data: "{\"unit\":\"" + Branch + "\"}",
        dataType: "json",
        success: function (r) {

            var ddlCustomers = $("[id*=ddclint]");
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

        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: true,
                },
                ctl00$ContentPlaceHolder1$ddclint: {
                    CheckDropDownList: true,
                },

            },
            messages: {
                ctl00$ContentPlaceHolder1$ddunit: {
                    CheckDropDownList: jQuery.validator.format("Select Unit"),
                },
                ctl00$ContentPlaceHolder1$ddclint: {
                    CheckDropDownList: jQuery.validator.format("Select Vendor"),
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
            highlight: function (e) {
                $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                $(e).closest(".tdE").removeClass("has-success").addClass("has-error")
            },
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
function ComapreQty(orderQty, RecQty) {

    if (parseInt(RecQty) > parseInt(orderQty)) {
        return true;
    }
    else {
        return false;
    }

}
function FillBtachNo(itemid, branchid, ddid) {
    $.ajax({
        type: "POST",
        url: "../Service/WsProduct.asmx/GetBalnace",
        contentType: "application/json; charset=utf-8",
        async: false,
        data: "{intbranch:'" + branchid + "',productId:'" + itemid + "'}",
        dataType: "json",
        success: function (r) {
            var ddlCustomers = $(ddid);
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function Getbalance(itemid, branchid, txtid, issueQty) {

    $.ajax({
        url: '../Service/data.asmx/GetBalnce',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: "{branchid:'" + branchid + "',ItemId:'" + itemid + "',StrBtach:'" + '' + "'}",
        success: function (data) {
            var result = data.d;
            $(txtid).val(result);
            if (result != "0") {
                $(issueQty).val(1);
            }

        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });


}

function GetRate(vendorid, productId, txtrate, Color) {

    $.ajax({
        url: '../Service/WsUpdatedRateList.asmx/GetRate',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',

        data: "{Clientid:'" + vendorid + "',productId:'" + productId + "',color:'" + Color + "'}",
        success: function (data) {

            var result = data.d;
            $(txtrate).val(result);
        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });


}
function Save(e) {

    var jj = GetInviceNew();
    var table = $(".order-list tbody");
    var arr = Array();

    table.find("tr").each(function () {
        var ItemId = $(this).find(".hitemid").val();
        var itemColor = $(this).find(".hColor").val();
        var qty = $(this).find('.Qty').val();
        var BatchNo = $('.batchno').find('option:selected').text();
        var rate = $(this).find('.Rate').val();
        _param = {};
        _param.StrModeSql = "Insert";
        _param.IntSaleId = 0;
        _param.IntColorId = itemColor;
        _param.IntItemId = ItemId;
        _param.FromBranchId = $("#ContentPlaceHolder1_ddunit").val();
        _param.IntVendorId = $("#ContentPlaceHolder1_ddclint").val();
        _param.DtSaleDate = $("#ContentPlaceHolder1_dddate").val() == "" ? "01/01/1900" : DmyToMdy($("#ContentPlaceHolder1_dddate").val());
        _param.StrInvoiceNo = jj;
        _param.IntQty = qty == "" ? "0" : qty;
        _param.IntAvgCost = rate == "" ? "0" : rate;
        _param.StrBatchNo = BatchNo;
        _param.StrRemak = "";
        _param.StrSalNo = "";
        _param.DecSalecost = qty * rate;
        //var param_detail = JSON.stringify(_param);
        // $(e).attr('disabled', 'disabled');
        if (ItemId != "" && qty != "") {

            arr.push(_param);

        }
    });


    $.ajax({
        url: '../Service/WsSales.asmx/SaveSale',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        async: false,
        data: '{model:' + JSON.stringify(arr) + '}',
        success: function (data) {
            var result = data.d;
            // UpdateProDuctQtyOnline(ItemId, qty);
            //  $(e).removeAttr('disabled');
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
                //callback: mycallbackfunc
            });


        },
        error: function (xhr, status, error) {
            App.alert({
                container: "",
                place: "Append",
                type: "Danger",
                message: error.Message,
                close: true,
                reset: true,
                focus: true,
                icon: "",
                closeInSeconds: 5,
                //callback: mycallbackfunc
            });

            //alert(error.Message);
        }
    });

    if (jj) {
        PrintData1(jj);
        $('table tr .Qty').prop('required', false);
        //$('table tr .Qty').removeClass("{required:true,messages:{required:'required field'}}")
        //$('table tr .Qty').rules('remove', 'required')

        $('.order-list input[type="text"]').val('');



        //$("table tr .Qty").rules("remove", "required"); //Only this line did not worked in my case



        $('#saleList').DataTable().ajax.reload();
        GetInvice();
        return false;
    }
    //location.reload(true);
}
function mycallbackfunc(v) {
    if (v.target.textContent == "Ok") {
        $('.order-list input[type="text"]').val('');
        $('#saleList').DataTable().ajax.reload();
        GetInvice();
        $("#RateClint").DataTable().ajax.reload();
        $('#myModal').modal('hide');
        $('#AddModel').modal('hide');
    }
}
function GetInvice() {
    var Vendorid = $('#ContentPlaceHolder1_ddunit').val();
    $.ajax({
        url: '../Service/WsSales.asmx/GetInvoice',
        method: 'post',
        contentType: 'application/json;Charset=utf-8',
        data: "{unit:'" + Vendorid + "'}",
        success: function (data) {
            var result = data.d;
            $('#ContentPlaceHolder1_txtInvoceNo').val(data.d);
        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });

}


function changeTypeahead(obj, datum, itemid, itemColor, Avl) {


    $(itemid).val(datum.Id);
    $(itemColor).val(datum.color);


    $(Avl).val(datum.qty);
};

function FillUserClint2() {
    $.ajax({
        type: "POST",
        url: "../Service/UserClient.asmx/GetUserClient",
        contentType: "application/json; charset=utf-8",
        async: false,

        dataType: "json",
        success: function (r) {

            var ddlCustomers = $("[id*=ClintList]");
            ddlCustomers.empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r.d, function () {
                ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
            });
        }
    });
}
function FillData() {
    $("#saleList").dataTable().fnDestroy();
    $('#saleList').DataTable({
        "processing": true,
        "serverSide": false,
        lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
        pageLength: 50,
        ajax: {
            url: '../Service/data.asmx/GetAllSale',
            type: "POST",
            "data": {
                "Clintid": typeof ($("#ClintList").val()) == "undefined" ? 0 : $("#ClintList").val(),
                "View": 0,
                "Add": $('#ContentPlaceHolder1_Hadd').val(),
                "Edit": $('#ContentPlaceHolder1_HEdit').val(),
                "Delete": $('#ContentPlaceHolder1_HDelete').val(),
                "Fromdate": DmyToMdy($('#ContentPlaceHolder1_txtFromdate').val()),
                "Todate": DmyToMdy($('#ContentPlaceHolder1_txttodate').val()),
            }
        },
        columns: [
               {
                   data: null, "width": "7%",
                   'render': function (data, type, full, meta) {

                       return '<button data-toggle="modal" type="button" onclick="OPEN_POPUP(\'EditSale.aspx?InvoiceNo=' + data.StrInvoiceNo + '&Delete=' + data.Delete + '&FrobranchId=' + data.FromBranchId + '&Tovendor=' + 0 + '&ClientName=' + encodeURIComponent(data.StrClintName) + '\');" class="btn btn-outline btn-circle btn-sm purple ' + data.Edit + '"><i class="fa fa-edit"></i>' + '</button>'
                       + '<button data-toggle="modal" type="button" onclick="OPEN_Add(\'AddSale.aspx?InvoiceNo=' + data.StrInvoiceNo + '&FrobranchId=' + data.FromBranchId + '&Tovendor=' + data.IntClintId + '&Date=' + data.DtSaleDate + '&ClientName=' + encodeURIComponent(data.StrClintName) + '\');" class="btn btn-outline btn-circle btn-sm purple ' + data.Add + '"><i class="fa fa-plus"></i>' + '</button>';


                       return data;
                   },
                   className: "dt-body-center"
               },
                { data: "SNO", "width": "2%" },
                { data: "StrClintName", "searchable": true, "width": "22%" },
                { data: "IntQty", "searchable": true, "width": "3%" },
                { data: "StrInvoiceNo", "searchable": true, "width": "3%" },
                { data: "DecSalecost", "searchable": true, "width": "4%" },
                { data: "DtSaleDate", "width": "3%", render: function (data, type, full, meta) { return moment(data).format("DD/MM/YYYY"); } },
                {
                    data: "IntSaleId", "width": "3%",
                    "render": function (data, type, full, meta) {
                        let ctrl = '<a class="btn btn-outline btn-circle btn-sm blue" onclick="PrintData(' + "'ModeSql=" + "PrintInternal" + "&reportpath=Rept/Invoice.rdlc" + '&FromBranch=' + full.FromBranchId + '&InvoiceNo=' + full.StrInvoiceNo + '&spname=PlPrintSaleInvoice' + '&Clentid=' + full.IntClintId + "'" + ')"><i class="fa fa-print"></i>' + '</a>';

                        return ctrl;
                    }
                },
                  {
                      data: "IntSaleId", "width": "3%",
                      "render": function (data, type, full, meta) {
                          let ctrl = '<a class="btn btn-outline btn-circle btn-sm blue" onclick="downloadinvoice(' + "'PrintInternal'" + ',' + "'~/Rept/Invoice.rdlc'" + ',' + full.FromBranchId + ',' + "'" + full.StrInvoiceNo + "'" + ',' + "'" + full.IntClintId + "'" + ')"><i class="fa fa-download"></i>' + '</a>';
                          return ctrl;
                      }
                  },

        ]
    });
}
function downloadinvoice(mode, reportpath, branch, invoiceno, Clentid) {
    var fileName = "";
    $.ajax({
        url: '../Service/WsInvoiceServices.asmx/DownloadFile',
        method: 'post',
        data: '{ "modesql":' + mode + ', "reptptah":' + reportpath + ', "unit":' + branch + ', "invoiceno":' + invoiceno + ', "clintid":' + Clentid + ' }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ modesql: mode, reptptah: reportpath, unit: branch, invoiceno: invoiceno, clintid: Clentid }),
        success: function (r) {
            fileName = invoiceno + ".pdf";
            var bytes = Base64ToBytes(r.d);

            //Convert Byte Array to BLOB.
            var blob = new Blob([bytes], { type: "application/octetstream" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = $("<a />");
                a.attr("download", fileName);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }


        },
        error: function (xhr, status, error) {

            alert(error.Message);
        }
    });
    return false;

}
function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};


function PrintData1(Invoice) {

    var strUrl = new StringBuilder();
    strUrl.append("../Rept/InvoiceDetals.aspx?");
    strUrl.append("ModeSql=");
    strUrl.append("PrintInternal");
    strUrl.append("&reportpath=");
    strUrl.append("Rept/Invoice.rdlc");
    strUrl.append("&FromBranch=");
    strUrl.append($("#ContentPlaceHolder1_ddunit").val());
    strUrl.append("&InvoiceNo=");
    strUrl.append(Invoice);
    strUrl.append("&Clentid=");
    strUrl.append($("#ContentPlaceHolder1_ddclint").val());

    strUrl.append("&spname=PlPrintSaleInvoice");
    MaximizedPOPUP(strUrl.toString());
    return false;
}
function PrintData(Mode) {
    var strUrl = new StringBuilder();
    // strUrl.append("../Rept/rptpopup.aspx?");
    strUrl.append("../Rept/InvoiceDetals.aspx?");

    strUrl.append(Mode);
    MaximizedPOPUP(strUrl.toString());
    return false;
}
function GetInviceNew() {
    var result = "";
    var Vendorid = $('#ContentPlaceHolder1_ddunit').val();
    $.ajax({
        url: '../Service/WsSales.asmx/GetInvoice',
        method: 'post',
        async: false,
        contentType: 'application/json;Charset=utf-8',
        data: "{unit:'" + Vendorid + "'}",
        success: function (data) {
            result = data.d;
        },
        error: function (xhr, status, error) {
            alert(error.Message);
        }
    });
    return result;
}
function SetToolTip(tooltip, id) {
    $(tooltip).tooltip({
        title: fetchData(id),
        effect: "fade",
        opacity: 0.7,
        trigger: 'hover',
        html: true,
        container: 'body',
        trigger: 'hover focus'
    });
}
function fetchData(id) {
    var fetch_data = ''
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../Service/WsProduct.asmx/GetItemTooldate",
        contentType: 'application/json;Charset=utf-8',
        data: "{id:'" + id + "'}",
        async: false,
        success: function (data) {
            $.each(data.d, function (i, item) {
                fetch_data = '<table width="200"><tr><td>"' + item.Decprice + '"</td><td>"' + item.DecSellingprice1 + '"</td><td>"' + item.DecSellingprice2 + '"</td><td>"' + item.DecSellingprice3 + '"</td></tr></table>'
            });
        }
    });
    return fetch_data;
}
function UpdateProDuctQtyOnline(id, qty) {
    _param = {};
    _param.ItemId = id;
    _param.IntAprovedQty = qty
    var param_detail = JSON.stringify(_param);
    $.ajax({
        url: '../Service/PhpService.asmx/SaleQty',
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
function MatchTxt(textMatch) {
    txtcount = 0;
    $("#myTable tbody tr td .item").filter(function () {
        if (this.value != "") {
            if (textMatch == this.value) {
                txtcount += 1
                
            }
        }

    });
    return txtcount;
}
