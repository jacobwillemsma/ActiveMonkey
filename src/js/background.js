officeHours = new OfficeHours();
scheduler = new Scheduler();

if (DEBUGMODE) {
	setInterval(function() {
		scheduler.shouldSendNotification();
	}, 1000); // For testing one that checks ever second
} else {
	setInterval(function() {
		scheduler.shouldSendNotification();
	}, 120000); // Checks every two minutes if it has any pending notifications it needs to send out.
}


