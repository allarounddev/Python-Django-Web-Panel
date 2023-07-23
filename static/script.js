var indexID = 0;

function updateView(servers) {
	// $.ajax({
	// 	url: '/get_servers/',
	// 	// data: JSON.stringify(data),
	// 	type: 'POST',
	// 	contentType: 'application/json',
	// 	success: function (response) {

			$("#serverTbody").empty();
			
			servers = JSON.parse(servers);
			console.log(servers);
			for (var i=0; i<servers.length; i++) {
				console.log(servers[i].fields);

				td_status_ip = '';
				td_status_domain = '';
				td_status_email = '';

				if (servers[i].fields.status_ip == true) {
					td_status_ip = '<td><span style="background-color: green; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				} else {
					td_status_ip = '<td><span style="background-color: red; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				}
				if (servers[i].fields.status_domain == true) {
					td_status_domain = '<td><span style="background-color: green; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				} else {
					td_status_domain = '<td><span style="background-color: red; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				}
				if (servers[i].fields.status_email == true) {
					td_status_email = '<td><span style="background-color: green; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				} else {
					td_status_email = '<td><span style="background-color: red; width: 22px; height: 22px; border-radius: 50%;display: inline-block;"></span></td>';
				}

				$("#serverTbody").append(
					'<tr>' + 
						td_status_ip +
						td_status_domain +
						td_status_email +
						'<td data-id="' + servers[i].pk + '">' + servers[i].fields.domain + '</td>' +
						'<td>' + servers[i].fields.ip + '</td>' + 
						'<td>' + servers[i].fields.root_user + '</td>' +
						'<td>' + servers[i].fields.root_pass + '</td>' +
						'<td>' + servers[i].fields.email_port + '</td>' +
						'<td>' + servers[i].fields.email_user + '</td>' +
						'<td>' + servers[i].fields.email_password + '</td>' +
						'<td>' + servers[i].fields.fromemail + '</td>' +
						'<td>' + servers[i].fields.some_notes + '</td>' +
						'<td>' +
							'<button type="button" class="btn btn-primary btn-xs dt-edit">' +
								'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
							'</button>' +
							'<button type="button" class="btn btn-danger btn-xs dt-delete">' +
								'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
							'</button>' +
                    	'</td>' +
					'</tr>'
				);
			}
	// 	},
	// 	error: function (error) {
	// 		console.log(error);
	// 	}
	// });

}

function pingStatus() {
	$.ajax({
		url: '/ping_status/',
		// data: JSON.stringify(data),
		type: 'POST',
		contentType: 'application/json',
		success: function (response) {
			console.log(response);
			updateView(response);
		},
		error: function (error) {
			console.log(error);
		}
	});
	pingTimer();
}
function pingTimer() {
    setTimeout(function () { pingStatus() }, 60000);
}

function emailStatus() {
	$.ajax({
		url: '/email_status/',
		// data: JSON.stringify(data),
		type: 'POST',
		contentType: 'application/json',
		success: function (response) {
			// console.log("Email: ", response);
			updateView(response);
		},
		error: function (error) {
			console.log(error);
		}
	});
	emailTimer();
}
function emailTimer() {
    setTimeout(function () { emailStatus() }, 600000);
}

function initialize() {
	//Edit row buttons
		 
	$('body').on('click', '.dt-edit',function (evt) {

		$this = $(this);
		var dtRow = $this.parents('tr');
		indexID = dtRow[0].cells[3].dataset.id;

		$('div.updateModal').innerHTML = '';
		$('div.updateModal').append('<form>');
		$('div.updateModal').append('<div class="form-group"><label for="domain" class="col-form-label">Domain:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[3].innerHTML + '" id="domain"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="ip" class="col-form-label">IP:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[4].innerHTML + '" id="ip"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="root_user" class="col-form-label">Root User:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[5].innerHTML + '" id="root_user"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="root_pass" class="col-form-label">Root Pass:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[6].innerHTML + '" id="root_pass"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="email_port" class="col-form-label">Email Port:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[7].innerHTML + '" id="email_port"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="email_user" class="col-form-label">Email User:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[8].innerHTML + '" id="email_user"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="email_password" class="col-form-label">Email Pass:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[9].innerHTML + '" id="email_password"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="fromemail" class="col-form-label">From@Email:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[10].innerHTML + '" id="fromemail"></div>');
		$('div.updateModal').append('<div class="form-group"><label for="some_notes" class="col-form-label">Some Notes:</label><input type="text" class="form-control" value= "' + dtRow[0].cells[11].innerHTML + '" id="some_notes"></div>');
		$('div.updateModal').append('</form>');
		$('#myModal').modal('show');

	});

	$('body').on('click', '.dt-add',function (evt) {
		$('#myModal1').modal('show');
	});
	
	$('body').on('click', '.run_bashcode',function (evt) {

		if (document.getElementById("bash_code").value == '') {
			alert('Please input bash code!');
		} else {
			var data = {
				"bash_code": document.getElementById("bash_code").value
			}

			$.ajax({
				url: '/run_bashcode/',
				data: JSON.stringify(data),
				type: 'POST',
				contentType: 'application/json',
				success: function (response) {
					console.log("Bash: ", response);

				},
				error: function (error) {
					console.log(error);
				}
			});
	
		}
	
	});

	initializeCreate();
	initializeDelete();
	initializeUpdate();
}

function initializeDelete() {

	//Delete buttons
	// $('.dt-delete').each(function () {
	$('body').on('click', '.dt-delete',function (evt) {
		$this = $(this);
		var dtRow = $this.parents('tr');
		if (confirm("Are you sure to delete this row?")) {
			var data = {
				"id": dtRow[0].cells[3].dataset.id
			}

			$.ajax({
				url: '/delete_server/',
				// dataType: 'json',
				data: JSON.stringify(data),
				type: 'POST',
				contentType: 'application/json',
				success: function (response) {
					console.log("sucessfully updated!");
					$('#myModal').modal('hide');
					console.log(response);
					updateView(response);
				},
				error: function (error) {
					console.log(error);
				}
			});
		}
	});
	// });
}

function initializeCreate() {

	// $('.server_create').each(function () {
	$('body').on('click', '.server_create',function (evt) {

		$this = $(this);

		var data = {
			"domain": document.getElementById("domain").value,
			"ip": document.getElementById("ip").value,
			"root_user": document.getElementById("root_user").value,
			"root_pass": document.getElementById("root_pass").value,
			"email_port": document.getElementById("email_port").value,
			"email_user": document.getElementById("email_user").value,
			"email_password": document.getElementById("email_password").value,
			"fromemail": document.getElementById("fromemail").value,
			"some_notes": document.getElementById("some_notes").value
		}

		$.ajax({
			url: '/add_server/',
			data: JSON.stringify(data),
			type: 'POST',
			contentType: 'application/json',
			success: function (response) {
				console.log("sucessfully updated!");
				$('#myModal1').modal('hide');
				console.log(response);
				// location.reload();
				updateView(response);
				
			},
			error: function (error) {
				console.log(error);
			}
		});

	});
}
function initializeUpdate() {

	$('body').on('click', '.server_update',function (evt) {
		$this = $(this);

		var data = {
			"id": indexID,
			"domain": document.getElementById("domain").value,
			"ip": document.getElementById("ip").value,
			"root_user": document.getElementById("root_user").value,
			"root_pass": document.getElementById("root_pass").value,
			"email_port": document.getElementById("email_port").value,
			"email_user": document.getElementById("email_user").value,
			"email_password": document.getElementById("email_password").value,
			"fromemail": document.getElementById("fromemail").value,
			"some_notes": document.getElementById("some_notes").value
		}

		$.ajax({
			url: '/update_server/',
			// dataType: 'json',
			data: JSON.stringify(data),
			type: 'POST',
			contentType: 'application/json',
			success: function (response) {
				console.log("sucessfully updated!");
				$('#myModal').modal('hide');
				// response = JSON.parse(response);
				console.log(response);
				// location.reload();
				updateView(response);
			},
			error: function (error) {
				console.log(error);
			}
		});

	});

}

$(document).ready(function () {

	var sheet = document.createElement('style');
	sheet.innerHTML = "body {margin: 2em;}" +
		"td:last-child { text-align: center;}" +
		"form {	display: grid;" +
		"grid-template-columns: 1fr 1fr;" +
		"gap: 20px;}" +
		"form h3,form h4,form p,form button {grid-column: span 2;}" +
		".form-group {display: flex;flex-direction: column;}";

	document.body.appendChild(sheet); // append in body
	document.head.appendChild(sheet); // append in head

	document.title = 'Simple DataTable';

	// DataTable initialisation
	$('#example').DataTable(
		{
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"paging": false,
			"autoWidth": true,
			"columnDefs": [
				{ "orderable": false, "targets": 5 }
			],
			"buttons": [
				// { extend: 'create', editor },
				// { extend: 'edit', editor },
				// { extend: 'remove', editor }

			]
		}
	);

	initialize();
	pingStatus();
	emailStatus();

	$('#myModal').on('hidden.bs.modal', function (evt) {
		console.log('modal hidden');
		$('.modal .updateModal').empty();
	});

	// $('#myModal1').on('hidden.bs.modal', function (evt) {
	// 	$('.modal .modal-body').empty();
	// });

});