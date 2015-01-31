var notID = 0;

var notTypes = {
	"standUp" : {
		type : "basic",
		title: "Get Up and Move Around!",
		message: "You've been sitting down for an hour, why don't you go for a quick two minute walk around the office?",
		iconUrl: "../icons/icon128.png",
		buttons: [{ 
			title: "Click here to launch a timer!",
			iconUrl: "../icons/clock16.png"
		}]
	},
	"getWater" : {
		type : "basic",
		title: "Go Fill Up Your Water Bottle!",
		message: "Go for a quick walk and get some water to stay hydrated.",
		iconUrl: "../icons/icon128.png",
	},
	"lookAway" : {
		type : "basic",
		title: "Look Away for 20 Seconds!",
		message: "Pick an object 20 feet away and look at for for 20 seconds!",
		iconUrl: "../icons/icon128.png",
		buttons: [{ 
			title: "Click here to launch a timer!",
			iconUrl: "../icons/clock16.png"
		}]
	},
}

function buttonClickRedirect(notID, iBtn, url) {
	console.log("The notification '" + notID + " had button " + iBtn + " clicked");
	console.log("Redirection to different page");
	chrome.tabs.create({
		url: 'https://www.google.ca/search?q=timer%202%20minutes&rct=j',
	}, function() {})
}

function buttonClickClear(notID, iBtn) {
	chrome.notifications.clear(notID, function(wasCleared) {
		console.log("Notification " + notID + " cleared: " + wasCleared);
	});
}

function createFunctionCallbackRedirect(notID) {
	console.log(notID);
	chrome.notifications.onButtonClicked.addListener(buttonClickClear);
	chrome.notifications.onButtonClicked.addListener(buttonClickRedirect);
}

function createFunctionCallbackNoRedirect(notID) {
	console.log(notID);
	setTimeout(function() {
		chrome.notifications.clear(notID, function(wasCleared) {
			console.log("Notification " + notID + " cleared: " + wasCleared);
		});
	}, 10000);
}

function createNotification (notName) {

	if (notName === "standUp") {
		chrome.notifications.create('id' + notID++, notTypes.standUp, createFunctionCallbackRedirect);
	}
	else if (notName === "getWater") {
		chrome.notifications.create('id' + notID++, notTypes.getWater, createFunctionCallbackNoRedirect);
	}
	else {
		chrome.notifications.create('id' + notID++, notTypes.lookAway, createFunctionCallbackRedirect);
	}
}