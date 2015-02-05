/* Model */

function OfficeHours() {
    chrome.storage.local.get("startTime", function(obj) {      
        if (obj.startTime === undefined) {
            // Get failed, so we need to just set the defaults.
            this.startTime = "9:00 am";
			chrome.storage.local.set({"startTime" : this.startTime});
        }
        else {
			// Get was successful.
            this.startTime = obj.startTime;
        }
    });
	chrome.storage.local.get("endTime", function(obj) {      
        if (obj.endTime === undefined) {
            // Get failed, so we need to just set the defaults.
            this.endTime = "5:00 pm";
			chrome.storage.local.set({"endTime" : this.endTime});
        }
        else {
            // Get was successful.
            this.endTime = obj.endTime;
        }
    });
}

_.extend(OfficeHours.prototype, {
	getMomentFromString: function(timeString) {
		var d = new Date();
		var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
		d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
		d.setMinutes( parseInt(time[2]) || 0 );
		d.setSeconds(0);
		var mom = moment(d);

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
		
		var startMoment, endMoment;
		chrome.storage.local.get("startTime", function(obj) { 
			startMoment = officeHours.getMomentFromString(obj.startTime);
			
			chrome.storage.local.get("endTime", function(obj) { 
				endMoment = officeHours.getMomentFromString(obj.endTime); 
				
              if (currentMoment.isBetween(startMoment, endMoment) && (currentMoment.day() !== 0 || currentMoment.day() !== 6)) {
                    if (currentMoment.isAfter(scheduler.standingNotificationMoment) && currentMoment.isAfter(scheduler.eyeNotificationMoment)) {
						createNotification("standUpNotification");
						scheduler.scheduleNewStandingNotification();
                        scheduler.scheduleNewEyeNotification();
					} if (currentMoment.isAfter(scheduler.standingNotificationMoment)) {
                        createNotification("standUpNotification");
						scheduler.scheduleNewStandingNotification();     
                    } if (currentMoment.isAfter(scheduler.eyeNotificationMoment)) {
                        createNotification("lookAwayNotification");
						scheduler.scheduleNewEyeNotification();
					} if (currentMoment.isAfter(scheduler.waterNotificationMoment)) { 	
                        createNotification("getWaterNotification");
						scheduler.scheduleNewWaterNotification();
					}
				}
			});  
		}); 
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