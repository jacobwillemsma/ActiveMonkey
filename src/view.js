'use strict'

/* Add view code here */

window.addEventListener('load', function() {
	var officeHours = new OfficeHours();

	var update = document.getElementById('updateButton');
	var enterTextField = document.getElementById('enterTextField');
	var exitTextField = document.getElementById('exitTextField');
	update.addEventListener('click', function() {
		officeHours.updateStartTime(enterTextField.value);
		officeHours.updateEndTime(exitTextField.value);
		console.dir(officeHours);
		enterTextField.value="";
		exitTextField.value="";
	});
});