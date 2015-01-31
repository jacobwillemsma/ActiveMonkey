'use strict'

var notId = 0;

/* Add notification code here */
function createNotification () {

	var options = {
		type : "basic",
		title: "Get Up and Move Around!",
		message: "You've been sitting down for an hour, why don't you go for a quick two minute walk around the office?",
		iconUrl: "../icons/icon128.png",
		buttons: [{ 
			title: "Click here to launch a timer!" 
		}]
	}

	chrome.notifications.create('id' + notId++, options , function() {})
}

var button = document.getElementById('updateButton');

button.addEventListener('click', function() {
	createNotification();
});
