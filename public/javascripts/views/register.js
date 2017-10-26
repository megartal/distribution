
$(document).ready(function(){
	
	// var av = new AccountValidator();
    var am = new AlertManager();
	
	$('#registerForm').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			// return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') am.showAlert("Registration is successful!","Please click OK to return the login page.", "OK", '/');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#username').focus();
	
// customize the account signup form //
	
	// $('#account-form h2').text('Signup');
	// $('#account-form #sub1').text('Please tell us a little about yourself');
	// $('#account-form #sub2').text('Choose your username & password');
	// $('#account-form-btn1').html('Cancel');
	// $('#account-form-btn2').html('Submit');
	// $('#account-form-btn2').addClass('btn-primary');
	
});