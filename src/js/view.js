'use strict'

/* Add view code here */

window.addEventListener('load', function() {
	var officeHours = new OfficeHours();
	var scheduler = new Scheduler();

	var update = document.getElementById('updateButton');
	var enterTextField = document.getElementById('enterTextField');
	var exitTextField = document.getElementById('exitTextField');
	update.addEventListener('click', function() {

		console.log(enterTextField.value);
		if (enterTextField.value != "") {
			var startMoment = officeHours.getMomentFromString(enterTextField.value);
			officeHours.updateStartTime(startMoment);
		}
		if (exitTextField.value != "") {
			var endMoment = officeHours.getMomentFromString(exitTextField.value);
			officeHours.updateEndTime(endMoment);
		}

		console.dir(officeHours);

		enterTextField.value="";
		exitTextField.value="";
	});

	setInterval(function() {
		scheduler.shouldSendNotification();
	}, 1000); // Change to 30 second interval
});