
$(document).ready(function () {

    var am = new AlertManager();

    // main login form //

    $('#loginForm').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            if ($('#email').val() == ''){
                am.showAlert('Whoops!', 'Please enter a valid email', 'Close')
                return false;
            }	else if ($('#pass').val() == ''){
                am.showAlert('Whoops!', 'Please enter a valid password', 'Close');
                return false;
            }	else{
                // append 'remember-me' option to formData to write local cookie //
                formData.push({ name: 'remember-me', value: $('.button-rememember-me-glyph').hasClass('glyphicon-ok') });
                return true;
            }
        },
        success: function (responseText, status, xhr, $form) {
            if (status == 'success') window.location.href = '/home';
        },
        error: function (e) {
            am.showAlert('Login Failure', 'Please check your username and/or password', 'Close');
        }
    });
    $('#user').focus();

});
