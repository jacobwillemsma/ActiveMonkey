'use strict'

/* Add model code here */

function startOfDay() {
	this.moment = moment("0:00", "HH:mm");
}
startOfDay = new startOfDay();
console.dir(startOfDay);

function OfficeHours() {
	this.startTime = moment();
	this.endTime = moment();
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
	this.standingNotificationMoment = moment();
}

_.extend(Scheduler.prototype, {

	scheduleNewStandingNotification: function() {
		this.standingNotificationMoment = moment().add(1, 'h');
	},

	shouldSendNotification: function() {
		var currentMoment = moment();
		if (currentMoment.isAfter(this.standingNotificationMoment)) {
			// Send new standing notification
			createNotification();
			this.scheduleNewStandingNotification();
		}
	}
});