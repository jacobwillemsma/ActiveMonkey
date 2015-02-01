/* Add view code here */

window.addEventListener('load', function() {

	var update = document.getElementById('updateButton');
	var enterTextField = document.getElementById('enterTextField');
	var exitTextField = document.getElementById('exitTextField');
	var lunchButton = document.getElementById('lunchButton');
	var enterTimeSpan = document.getElementById('enterTimeSpan');
	var exitTimeSpan = document.getElementById('exitTimeSpan');

	enterTimeSpan.innerText = officeHours.startTime.format("h:mm a");
	exitTimeSpan.innerText = officeHours.endTime.format("h:mm a");

	lunchButton.addEventListener('click', function() {
		scheduler.updateLunchMode();
	});
	
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

		enterTimeSpan.innerText = officeHours.startTime.format("h:mm a");
		exitTimeSpan.innerText = officeHours.endTime.format("h:mm a");

		enterTextField.value="";
		exitTextField.value="";
	});
});
