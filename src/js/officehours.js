function OfficeHours() {
	// Why strings? Google. That's why.
	
    chrome.storage.local.get("startTime", function(obj) {      
        if (obj.startTime === undefined) {
            // Get failed, so we need to just set the defaults.
            this.startTime = "9:00 am";
			chrome.storage.local.set({"startTime" : this.startTime});
        } else {
			// Get was successful.
            this.startTime = obj.startTime;
        }
    });
	chrome.storage.local.get("endTime", function(obj) {      
        if (obj.endTime === undefined) {
            // Get failed, so we need to just set the defaults.
            this.endTime = "5:00 pm";
			chrome.storage.local.set({"endTime" : this.endTime});
        } else {
            // Get was successful.
            this.endTime = obj.endTime;
        }
    });
}

_.extend(OfficeHours.prototype, {
	// Helper function to generate a moment object (which does some nice math), from an inputted time string.
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