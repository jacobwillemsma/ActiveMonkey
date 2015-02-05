officeHours = new OfficeHours();
scheduler = new Scheduler();

setInterval(function() {
	scheduler.shouldSendNotification();
}, 30000);