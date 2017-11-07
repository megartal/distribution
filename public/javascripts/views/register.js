
$(document).ready(function(){
	
    var am = new AlertManager();
	
	$('#registerForm').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			var pass = $("#pass").val();
			var rePass = $("#rePass").val();
			var s = ""
			var list = {
				password: pass,
				email: $("#email").val(),
				username: $("#username").val(),
				phone: $("#phone").val()
			};
			Object.keys(list).forEach(function(key){
				if (list[key] == "") s = s.concat("<li>" + key + "</li>");
			});
			if (s !== "") {
				am.showAlert("we need below item(s)", s, "close");
				return false;
			}
			if(pass !== rePass){
				am.showAlert("ooops!", "Password is not the same!", "close");
				return false;
			} 
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') am.showAlert("Registration is successful!","Please click OK to return the login page.", "OK", '/');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    am.showAlert("Email is already taken!", "Please choose a new one.", "OK");
			}	else if (e.responseText == 'username-taken'){
			    am.showAlert("Username is already taken!", "Please choose a new one.", "OK");
			}
		}
	});
	$('#username').focus();
});