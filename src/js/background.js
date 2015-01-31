'use strict'

var officeHours = new OfficeHours();
var scheduler = new Scheduler();
var lunchModeIsOn = false;

setInterval(function() {
	scheduler.shouldSendNotification();
}, 3000);
