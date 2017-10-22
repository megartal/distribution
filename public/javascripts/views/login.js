
$(document).ready(function () {

    var lv = new LoginValidator();

    // main login form //

    $('#loginForm').ajaxForm({
        // beforeSubmit: function (formData, jqForm, options) {
        //     if (lv.validateForm() == false) {
        //         return false;
        //     } else {
        //         // append 'remember-me' option to formData to write local cookie //
        //         formData.push({ name: 'remember-me', value: $('.button-rememember-me-glyph').hasClass('glyphicon-ok') });
        //         return true;
        //     }
        // },
        // success: function (responseText, status, xhr, $form) {
        //     console.log("hellooooooooo");
        //     if (status == 'success') window.location.href = '/home';
        // },
        // error: function (e) {
        //     lv.showLoginError('Login Failure', 'Please check your username and/or password');
        // }
        function(){
            alert("hellloooooo!");
        }
    });
    $('#user-tf').focus();

});
