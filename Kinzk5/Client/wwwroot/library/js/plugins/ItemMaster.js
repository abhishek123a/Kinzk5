var FormValidation = function () {
    r = function () {
        var e = $("#form"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        //e.on("submit", function () { for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement() }),
        e.validate({
            errorElement: "span", errorClass: "help-block help-block-error", focusInvalid: !1, ignore: "",
            rules: {
                ctl00$ContentPlaceHolder1$txtitemname: {
                    required: !0,
                    //validDDMMDate: !0,
                },
                ctl00$ContentPlaceHolder1$txtitemcode: {
                    required: !0,
                    //validDDMMDate: !0,
                },
                ctl00$ContentPlaceHolder1$ddgroup: {
                    required: !0,
                    //validDDMMDate: !0,
                },

                ctl00$ContentPlaceHolder1$txtrate: {
                    required: !0,
                    digits: !0,
                },

                ctl00$ContentPlaceHolder1$txtdangerlevel: {
                    required: !0,
                    digits: !0,
                },
            },
            messages: {
                ctl00$ContentPlaceHolder1$txtitemname: {
                    required: jQuery.validator.format("Enter Item Name"),
                },
                ctl00$ContentPlaceHolder1$txtitemcode: {
                    required: jQuery.validator.format("Enter Item Code"),

                },

                ctl00$ContentPlaceHolder1$ddgroup: {
                    required: jQuery.validator.format("Select Item Group"),

                },


                ctl00$ContentPlaceHolder1$txtrate: {
                    required: jQuery.validator.format("Enter Rate"),
                    digits: jQuery.validator.format("Enter Rate Digits only"),
                },

                ctl00$ContentPlaceHolder1$txtdangerlevel: {
                    required: jQuery.validator.format("Enter danger level"),
                    digits: jQuery.validator.format("Enter Digits only"),
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

