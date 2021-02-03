var FormValidation = function (formId) {
    var e = function () {
        var e = $("#login-form"),
      // var e =   $("#" + formId),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        e.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: !1, ignore: "",
            messages: {
                select_multi: {
                    maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
                    minlength: jQuery.validator.format("At least {0} items must be selected")
                },
                UserName: {

                    minlength: jQuery.validator.format("At least {0} items must be selected")
                }
            },
            rules: {
                UserName: { minlength: 2, required: !0 },
                Email: { required: !0, email: !0 },
                password: { required: !0 },
            },
            invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
            errorPlacement: function (e, r) { var i = $(r).parent(".input-group"); i ? i.after(e) : r.after(e) },
            highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
            unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
            success: function (e) { e.closest(".form-group").removeClass("has-error") },
            submitHandler: function (e) { i.show(), r.hide() }
        })
    }, r = function () {
        var e = $("#login-form"),
           // var e = $("#" + formId),
            r = $(".alert-danger", e),
            i = $(".alert-success", e); e.validate({
                errorElement: "span", errorClass: "help-block help-block-error",
                focusInvalid: !1, ignore: "", rules: {
                    UserName: { minlength: 2, required: !0 },
                    password: { required: !0 },
                    Email: { required: !0, email: !0 },

                }, invalidHandler: function (e, t) { i.hide(), r.show(), App.scrollTo(r, -200) },
                errorPlacement: function (e, r) {
                    var i = $(r).parent(".input-icon").children("i");
                    i.removeClass("fa-check").addClass("fa-warning"),
                    i.attr("data-original-title",
                    e.text()).tooltip({ container: "body" })
                },
                highlight: function (e) { $(e).closest(".form-group").removeClass("has-success").addClass("has-error") },
                unhighlight: function (e) { },
                success: function (e, r) {
                    var i = $(r).parent(".input-icon").children("i");
                    $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check")
                },
                submitHandler: function (e) { i.show(), r.hide(), e[0].submit() }
            })
    }
    ,

  t = function () {
      jQuery().wysihtml5 && $(".wysihtml5").size() > 0 && $(".wysihtml5").wysihtml5({ stylesheets: ["../library/css/plugins/wysiwyg-color.css"] })
  };
    return { init: function () { t(), e(), r() } }
}(); jQuery(document).ready(function () { FormValidation.init() });