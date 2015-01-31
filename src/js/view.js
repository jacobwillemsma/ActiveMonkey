/* Add view code here */

window.addEventListener('load', function() {

	var update = document.getElementById('updateButton');
	var enterTextField = document.getElementById('enterTextField');
	var exitTextField = document.getElementById('exitTextField');
	var lunchButton = document.getElementById('lunchButton');

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

		enterTextField.value="";
		exitTextField.value="";
	});
});
