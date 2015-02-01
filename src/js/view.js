/* Add view code here */

window.addEventListener('load', function() {

	var update = document.getElementById('updateButton');
	var enterTextField = document.getElementById('enterTextField');
	var exitTextField = document.getElementById('exitTextField');
	var lunchButton = document.getElementById('lunchButton');
	var enterTimeSpan = document.getElementById('enterTimeSpan');
	var exitTimeSpan = document.getElementById('exitTimeSpan');

	if (scheduler.inLunchMode) {
		console.log('inLunchMode');
		lunchButton.style = "background: rgb(231, 142, 47);";
	}

	chrome.storage.local.get("startTime", function(obj) {
		var startTime = obj.startTime;
		console.dir(startTime);
		var startTimeMoment = officeHours.getMomentFromString(startTime);
		officeHours.updateStartTime(startTimeMoment);
		enterTimeSpan.innerText = officeHours.startTime.format("h:mm a");
	});
	chrome.storage.local.get("endTime", function(obj) {
		var endTime = obj.endTime;
		console.dir(endTime);
		var endTimeMoment = officeHours.getMomentFromString(endTime);
		officeHours.updateEndTime(endTimeMoment);
		exitTimeSpan.innerText = officeHours.endTime.format("h:mm a");
	});

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

		chrome.storage.local.set({"startTime" : officeHours.getStartTime().format("h:mm a")});
		chrome.storage.local.set({"endTime" : officeHours.getEndTime().format("h:mm a")});

		enterTimeSpan.innerText = officeHours.startTime.format("h:mm a");
		exitTimeSpan.innerText = officeHours.endTime.format("h:mm a");

		enterTextField.value="";
		exitTextField.value="";
	});
});
