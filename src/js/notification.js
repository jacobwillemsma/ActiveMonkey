/* Notifications */

var notID = 0;
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

function createNotificationCallback(notID) {
	console.log("Created notification with ID " + notID);
	chrome.notifications.onButtonClicked.addListener(clickButtonHandler);
	setTimeout(function() {
		chrome.notifications.clear(notID, function() {});
	}, 120000);
}

function clickButtonHandler(notID) {
	chrome.notifications.clear(notID, function() {
		if (whichTimer === 20) {
			// Create 20 second Timer
			chrome.tabs.create({
				url: 'https://www.google.ca/search?q=timer%2020%20seconds&es_th=1&rct=j'
			}, function() {
				whichTimer = 0;
			});
		} else if (whichTimer === 2) {
				// Create 2 minute Timer
				chrome.tabs.create({
					url: 'https://www.google.ca/search?q=timer%202%20minutes&rct=j'
				}, function() {
					whichTimer = 0;
				});
		} else {
			console.log("Error Case.  The Timer is not being set properly.");
		}
	});
}

function createNotification(notName) {
	notID = notID + 1;
	if (notName === "standUpNotification") {
		whichTimer = 2;
		chrome.notifications.create('id' + notID, notificationTypes.standUp, createNotificationCallback);
	} else if (notName === "lookAwayNotification") {
		whichTimer = 20;
		chrome.notifications.create('id' + notID, notificationTypes.lookAway, createNotificationCallback);
	} else {
		chrome.notifications.create('id' + notID, notificationTypes.getWater, createNotificationCallback);
	}
}