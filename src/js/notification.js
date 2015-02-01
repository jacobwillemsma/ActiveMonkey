var notID = 0;

var notTypes = {
	"standUp" : {
		type : "basic",
		title: "Get Up and Move Around!",
		message: "You've been sitting down for an hour, why don't you go for a quick two minute walk around the office?",
		iconUrl: "../icons/icon128.png",
		buttons: [{ 
			title: "Click here to launch a timer!",
			iconUrl: "../icons/clock150.png"
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
			iconUrl: "../icons/clock150.png"
		}]
	},
}

function buttonClickRedirect20Secs(notID, iBtn) {
	chrome.tabs.create({
		url: 'https://www.google.ca/search?q=timer%2020%20seconds&es_th=1&rct=j',
	}, function() {})
}
function buttonClickRedirect2Mins(notID, iBtn) {
	chrome.tabs.create({
		url: 'https://www.google.ca/search?q=timer%202%20minutes&rct=j',
	}, function() {})
}

function buttonClickClear(notID, iBtn) {
	chrome.notifications.clear(notID, function() {});
}

function createFunctionCallbackRedirect20Secs(notID) {
	setTimeout(function() {
		chrome.notifications.clear(notID, function() {});
	}, 120000);
	chrome.notifications.onButtonClicked.addListener(buttonClickClear);
	chrome.notifications.onButtonClicked.addListener(buttonClickRedirect20Secs);
}

function createFunctionCallbackRedirect2Mins(notID) {
	setTimeout(function() {
		chrome.notifications.clear(notID, function() {});
	}, 120000);
	chrome.notifications.onButtonClicked.addListener(buttonClickClear);
	chrome.notifications.onButtonClicked.addListener(buttonClickRedirect2Mins);
}

function createFunctionCallbackNoRedirect(notID) {
	setTimeout(function() {
		chrome.notifications.clear(notID, function() {});
	}, 10000);
}

function createNotification (notName) {

	if (notName === "standUp") {
		chrome.notifications.create('id' + notID++, notTypes.standUp, createFunctionCallbackRedirect2Mins);
	}
	else if (notName === "getWater") {
		chrome.notifications.create('id' + notID++, notTypes.getWater, createFunctionCallbackNoRedirect);
	}
	else {
		chrome.notifications.create('id' + notID++, notTypes.lookAway, createFunctionCallbackRedirect20Secs);
	}
}