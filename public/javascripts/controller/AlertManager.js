
function AlertManager() {
	// bind a simple alert window to this controller to display any errors //	
	this.showAlert = function (header, body, button, redir) {
		$('#alert-header').text(header);
		$('#alert-body').html(body);
		$('#button').html(button);
		$('#alert').modal('show');
		if (redir) {
			$('#alert').click(function () {
				window.location.href = redir;
			})
		}
	}
}