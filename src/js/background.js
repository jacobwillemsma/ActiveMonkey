officeHours = new OfficeHours();
scheduler = new Scheduler();

setInterval(function() {
	scheduler.shouldSendNotification();
}, 1000);

function foo() {
	console.log('in foo');
}
