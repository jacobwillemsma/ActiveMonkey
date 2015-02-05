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
		enterTimeSpan.innerText = obj.startTime;
	});
	chrome.storage.local.get("endTime", function(obj) {
		exitTimeSpan.innerText = obj.endTime;
	});

	lunchButton.addEventListener('click', function() {
		scheduler.updateLunchMode();
	});
	
	update.addEventListener('click', function() {
		var newEnterTime, newExitTime;
		if (enterTextField.value) {
			var newStartMoment = officeHours.getMomentFromString(enterTextField.value);
			console.log(newStartMoment.hour());
			if (newStartMoment.hour() > 12) {
				newEnterTime = (newStartMoment.hour() - 12) + ":" + newStartMoment.format("mm") + " pm";
				officeHours.startTime = newEnterTime;
				chrome.storage.local.set({"startTime" : officeHours.startTime});
			}
			else if (newStartMoment.hour() === 12 || newStartMoment.hour() === 0) {
                if (newStartMoment.hour() === 12) {
                    newEnterTime = "12:" + newStartMoment.format("mm") + " am";
				    officeHours.startTime = newEnterTime;
                    chrome.storage.local.set({"startTime" : officeHours.startTime});
                }
                else {
                    newEnterTime = "12:" + newStartMoment.format("mm") + " pm";
				    officeHours.startTime = newEnterTime;
				    chrome.storage.local.set({"startTime" : officeHours.startTime});
                }
            }
			else {
                newEnterTime = newStartMoment.hour() + ":" + newStartMoment.format("mm") + " am";
                officeHours.startTime = newEnterTime;
                chrome.storage.local.set({"startTime" : officeHours.startTime});
            }
            enterTimeSpan.innerText = newEnterTime;
		}
		if (exitTextField.value != "") {
			var newEndMoment = officeHours.getMomentFromString(exitTextField.value);
			console.log(newEndMoment.hour());
			if (newEndMoment.hour() > 12) {
				newExitTime = (newEndMoment.hour() - 12) + ":" + newEndMoment.format("mm") + " pm";
				officeHours.endTime = newExitTime;
				chrome.storage.local.set({"endTime" : officeHours.endTime});
			}
			else if (newEndMoment.hour() === 12 || newEndMoment.hour() === 0) {
                if (newEndMoment.hour() === 12) {
                    newExitTime = "12:" + newEndMoment.format("mm") + " am";
				    officeHours.endTime = newExitTime;
                    chrome.storage.local.set({"endTime" : officeHours.endTime});
                }
                else {
                    newExitTime = "12:" + newEndMoment.format("mm") + " pm";
				    officeHours.endTime = newExitTime;
				    chrome.storage.local.set({"endTime" : officeHours.endTime});
                }
            }
			else {
                newExitTime = newEndMoment.hour() + ":" + newEndMoment.format("mm") + " am";
                officeHours.endTime = newExitTime;
                chrome.storage.local.set({"endTime" : officeHours.endTime});
			}
            exitTimeSpan.innerText = newExitTime;
		}
		
		enterTextField.value="";
		exitTextField.value="";
	});
});
