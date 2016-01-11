/* Notifications */

var notificationId = 0;
var whichTimer = 2;  // 2 for 2 Minutes, 20 for 20 Seconds.
var notificationTypes = {
	"standUp" : {
		type : "basic",
		title: "Get Up and Move Around!",
		message: "You've been sitting down for an hour, why don't you go for a quick two minute walk around the office?",
		iconUrl: "../images/icon128.png",
		buttons: [{
			title: "Click here to launch a timer!",
			iconUrl: "../images/clock150.png"
		}]
	},
	"getWater" : {
		type : "basic",
		title: "Go Fill Up Your Water Bottle!",
		message: "Go for a quick walk and get some water to stay hydrated.",
		iconUrl: "../images/icon128.png"
	},
	"lookAway" : {
		type : "basic",
		title: "Look Away for 20 Seconds!",
		message: "Pick an object 20 feet away and look at for for 20 seconds!",
		iconUrl: "../images/icon128.png",
		buttons: [{
			title: "Click here to launch a timer!",
			iconUrl: "../images/clock150.png"
		}]
	}
};

function createNotificationCallback(notificationId) {
	setTimeout(function() {
        chrome.notifications.clear(notificationId, function() {});
	}, 120000);
}

function createNotification(notificationName) {
	if (notificationName === "standUpNotification") {
        notificationId = 1;
		whichTimer = 2;
		chrome.notifications.create('id' + notificationId, notificationTypes.standUp, createNotificationCallback);
	} else if (notificationName === "lookAwayNotification") {
        notificationId = 2;
		whichTimer = 20;
		chrome.notifications.create('id' + notificationId, notificationTypes.lookAway, createNotificationCallback);
	} else {
        notificationId = 3;
		chrome.notifications.create('id' + notificationId, notificationTypes.getWater, createNotificationCallback);
	}
}



function clickButtonHandler(notificationId) {
	chrome.notifications.clear(notificationId, function() {
		if (whichTimer === 20) {
            // Create 20 second Timer
			chrome.tabs.create({
				url: 'https://www.google.ca/search?q=timer%2020%20seconds&es_th=1&rct=j'
			});
		} else {
			// Create 2 minute Timer
			chrome.tabs.create({
				url: 'https://www.google.ca/search?q=timer%202%20minutes&rct=j'
			});
		}
	});
}


chrome.notifications.onButtonClicked.addListener(clickButtonHandler);