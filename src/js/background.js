'use strict'


var scheduler = new Scheduler();

setInterval(function() {
	scheduler.shouldSendNotification();
}, 1000);
