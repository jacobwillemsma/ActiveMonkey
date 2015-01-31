'use strict'

/* Add model code here */

function startOfDay() {
	this.date = new Date(2015, 1, 1, 0, 0, 0, 0);
}
startOfDay = new startOfDay();

function OfficeHours() {
	this.startTime = new Date();
	this.endTime = new Date();
}

_.extend(OfficeHours.prototype, {

	updateStartTime: function(timeString) {
		console.log();
		var date = new Date(2015, 1, 1, parseInt(timeString), 0, 0, 0);
		this.startTime = date;

		console.dir(this.startTime);
	},

	updateEndTime: function(timeString) {
		console.log();
		var date = new Date(2015, 1, 1, parseInt(timeString), 0, 0, 0);
		this.endTime = date;

		console.dir(this.endTime);
	}

});