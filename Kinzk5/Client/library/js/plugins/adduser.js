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
                    required: !0, minlength: 2,
                },
                ctl00$ContentPlaceHolder1$txtlast: {
                    required: !0, minlength: 2,
                },
                ctl00$ContentPlaceHolder1$txtPass: {
                    required: !0, minlength: 2,
                },
                ctl00$ContentPlaceHolder1$txtrepass: {
                    required: !0, minlength: 2,
                },
                ctl00$ContentPlaceHolder1$txtlogin: {
                    required: !0, minlength: 2,
                    remote: function () {
                        return {
                            url: "../Service/CheckAvailability.asmx/CheckUserExits", //URL of asmx file.                                 
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ contextKey: $('#ctl00$ContentPlaceHolder1$txtlogin').val() }),
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
                ctl00$ContentPlaceHolder1$txtfname: {
                    required: jQuery.validator.format("Enter First Name"),
                    minlength: jQuery.validator.format("Enter First Name min 2 Char"),
                },
                ctl00$ContentPlaceHolder1$txtlast: {
                    required: jQuery.validator.format("Enter Last Name"),
                    minlength: jQuery.validator.format("Enter Last Name min 2 Char"),

                },
                ctl00$ContentPlaceHolder1$txtlogin: {
                    required: jQuery.validator.format("Enter Login Name"),
                    minlength: jQuery.validator.format("Enter Login Name min 2 Char"),
                    remote: jQuery.format("User {0} already exists"),
                },
                ctl00$ContentPlaceHolder1$txtPass: {
                    required: jQuery.validator.format("Enter Password"),
                   

                },
                ctl00$ContentPlaceHolder1$txtrepass: {
                    required: jQuery.validator.format("Enter Retype Password"),


                },
            },
            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
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