'use strict'

var officeHours = new OfficeHours();
var scheduler = new Scheduler();

setInterval(function() {
	scheduler.shouldSendNotification();
}, 3000);
