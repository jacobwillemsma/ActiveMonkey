/* Add model code here */

function startOfDay() {
	this.moment = moment("0:00", "HH:mm");
}
startOfDay = new startOfDay();

function OfficeHours() {
	this.startTime = moment("9", "HH");
	this.endTime = moment("17", "HH");
	chrome.storage.local.get("startTime", function(obj) {
		console.dir(obj);
		if (obj.startTime !== undefined) {
			console.log("start");
			this.startTime = getMomentFromString(obj.startTime);
			var enterTimeSpan = document.getElementById('enterTimeSpan');
			enterTimeSpan.innerText = this.startTime;
		} else {
			var enterTimeSpan = document.getElementById('enterTimeSpan');
			enterTimeSpan.innerText = moment("9", "HH").format("h:mm a");
		}
	});
	chrome.storage.local.get("endTime", function(obj) {
		console.dir(obj);
		if (obj.endTime !== undefined) {
			console.log("end");
			this.endTime = getMomentFromString(obj.endTime);
			var exitTimeSpan = document.getElementById('exitTimeSpan');
			exitTimeSpan.innerText = this.endTime;
		}  else {
			var exitTimeSpan = document.getElementById('exitTimeSpan');
			exitTimeSpan.innerText = moment("17", "HH").format("h:mm a");
		}
	});
}

_.extend(OfficeHours.prototype, {

	makeOfficeHours: function(startTime, endTime) {
		this.startTime = moment(startTime);
		this.endTime = moment(endTime);
	},

	getStartTime: function() {
		return this.startTime;
	},

	getEndTime: function() {
		return this.endTime;
	},

	updateStartTime: function(momentObj) {
		this.startTime = momentObj;
	},

	updateEndTime: function(momentObj) {
		this.endTime = momentObj;
	},

	getMomentFromString: function(timeString) {
		var d = new Date();
		var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
		console.log(time);
		d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
		d.setMinutes( parseInt(time[2]) || 0 );
		d.setSeconds(0);
		console.dir(d);
		var mom = moment(d);
		console.dir(mom);

		return mom;
	}
});

function Scheduler() {
	this.standingNotificationMoment = moment().add(1, 'h');
	this.eyeNotificationMoment = moment().add(20, 'm');
	this.waterNotificationMoment = moment().add(1, 'h').add(30, 'm');
	this.lunchMode = moment();
	this.inLunchMode = false;

	chrome.storage.local.get("lunchModeOn", function(obj) {
		console.dir(obj);
		if (obj.lunchModeOn != undefined) {
			console.log("lunch");
			this.inLunchMode = obj.lunchModeOn;
			var lunchButton = document.getElementById('lunchButton');
			lunchButton.innerHTML = "Lunch Mode <b>On</b>";
		}
	});
}

_.extend(Scheduler.prototype, {

	scheduleNewStandingNotification: function() {
		this.standingNotificationMoment = moment().add(1, 'h');
	},

	scheduleNewEyeNotification: function() {
		this.eyeNotificationMoment = moment().add(20, 'm');
	},

	scheduleNewWaterNotification: function() {
		this.waterNotificationMoment = moment().add(1, 'h').add(30, 'm');
	},	

	shouldSendNotification: function() {
		var currentMoment = moment();

		// Lunch Mode handler
		if (this.inLunchMode) {
			if (currentMoment.isAfter(this.lunchMode)) {
				this.inLunchMode = false;
				chrome.storage.local.set({"lunchModeOn" : false});
				console.log('lunchMode off');
				var button = document.getElementById('lunchButton');
				button.innerText = "Turn Lunch Mode On";
			}
		}


		if (currentMoment.isBetween(officeHours.startTime, officeHours.endTime)) {
			var calledStanding = false, calledEye = false, calledWater = false;
			if (currentMoment.isAfter(this.standingNotificationMoment)) {
				// Send new standing notification
				createNotification("standUp");
				calledStanding = true;
				this.scheduleNewStandingNotification();
			} else if (currentMoment.isAfter(this.eyeNotificationMoment)) {
				if (!calledStanding) {
					createNotification("relaxEyes");				
				}
				calledEye = true;
				this.scheduleNewEyeNotification();
			} else if (currentMoment.isAfter(this.waterNotificationMoment)) {
				if (!calledEye && !calledStanding) {
					createNotification("getWater");
				}
				calledWater = true;
				this.scheduleNewWaterNotification();
			}
		}
	},

	updateLunchMode: function() {
		if (!this.inLunchMode) {
			// Initate Lunch Mode
			console.log('lunchMode on');
			this.inLunchMode = true;
			chrome.storage.local.set({"lunchModeOn" : true});
			var button = document.getElementById('lunchButton');
			button.innerHTML = "Lunch Mode <b>On</b>";
			this.lunchMode = moment().add(1, 'h');
			this.standingNotificationMoment = moment().add(2, 'h');
			this.eyeNotificationMoment = moment().add(1, 'h').add(20, 'm');
			this.waterNotificationMoment = moment().add(2, 'h').add(30, 'm');
		}
	}
});
