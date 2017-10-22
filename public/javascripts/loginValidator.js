
function LoginValidator()
{
// bind a simple alert window to this controller to display any errors //
	this.loginErrors = $('#alert');
	
	this.showLoginError = function(t, m)
	{
		$('#alert-header').text(t);
		$('#alert-body').html(m);
		this.loginErrors.modal('show');
	}
}

LoginValidator.prototype.validateForm = function()
{
	if ($('#email').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid email');
		return false;
	}	else if ($('#password').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid password');
		return false;
	}	else{
		return true;
	}
}