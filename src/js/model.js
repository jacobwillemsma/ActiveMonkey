'use strict'

/* Add model code here */

function startOfDay() {
	this.moment = moment("0:00", "HH:mm");
}
startOfDay = new startOfDay();
console.dir(startOfDay);

function OfficeHours() {
	this.startTime = moment("9", "HH");
	this.endTime = moment("17", "HH");
}

_.extend(OfficeHours.prototype, {

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
	this.lunchEndMoment = moment();
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
		if (moment().isAfter(lunchEndMoment)) {
			lunchModeIsOn = false;
		}
	},
});
