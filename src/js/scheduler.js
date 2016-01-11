var DEBUGMODE = false;


function Scheduler() {
	if (DEBUGMODE) {
		this.standingNotificationMoment = moment().add(5, 's');
		this.eyeNotificationMoment = moment().add(15, 's');
		this.waterNotificationMoment = moment().add(25, 's');
	} else {
		this.standingNotificationMoment = moment().add(1, 'h');
		this.eyeNotificationMoment = moment().add(20, 'm');
		this.waterNotificationMoment = moment().add(1, 'h').add(30, 'm');
	}
}

_.extend(Scheduler.prototype, {
	newStandingNotification: function() {
		this.standingNotificationMoment = moment().add(1, 'h');
	},

	newEyeNotification: function() {
		this.eyeNotificationMoment = moment().add(20, 'm');
	},

	newWaterNotification: function() {
		this.waterNotificationMoment = moment().add(1, 'h').add(30, 'm');
	},	

	shouldSendNotification: function() {
		var currentMoment = moment();
		
		var dayStart, dayEnd;
		// Note: Here I chained the API calls together in callbacks, alternatively, I could use a promise library to make this a bit nicer.
		chrome.storage.local.get("startTime", function(obj) { 
			dayStart = officeHours.getMomentFromString(obj.startTime);
			
			chrome.storage.local.get("endTime", function(obj) { 
				dayEnd = officeHours.getMomentFromString(obj.endTime); 

				if (DEBUGMODE) {
					if (currentMoment.isAfter(scheduler.standingNotificationMoment)) {
						createNotification("standUpNotification");
						scheduler.newStandingNotification();			
					} if (currentMoment.isAfter(scheduler.waterNotificationMoment)) {
						createNotification("getWaterNotification");
						scheduler.newWaterNotification();						
					} if (currentMoment.isAfter(scheduler.eyeNotificationMoment)) {
						createNotification("lookAwayNotification");
						scheduler.newEyeNotification();
					}
				} else {
					if (currentMoment.isBetween(dayStart, dayEnd) && ((currentMoment.day() !== 0 || currentMoment.day() !== 6))) { // Make sure we're in a valid timeslot (i.e. Our given time and the weekday.)
						if (currentMoment.isAfter(scheduler.standingNotificationMoment)) {
							createNotification("standUpNotification");
							scheduler.newStandingNotification();			
						} if (currentMoment.isAfter(scheduler.waterNotificationMoment)) {
							createNotification("getWaterNotification");
							scheduler.newWaterNotification();						
						} if (currentMoment.isAfter(scheduler.eyeNotificationMoment)) {
							createNotification("lookAwayNotification");
							scheduler.newEyeNotification();
						}
					}	
				}			
			});  
		}); 
	}
});