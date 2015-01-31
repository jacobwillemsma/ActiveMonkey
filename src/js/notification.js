'use strict'

var notID = 0;

function buttonClickRedirect(notID, iBtn) {
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

window.addEventListener("load", function() { 
	
	//chrome.notifications.onButtonClicked.addListener(buttonClickRedirect);
});

function createFunctionCallback(notID) {
	console.log(notID);
	chrome.notifications.onButtonClicked.addListener(buttonClickClear);
	chrome.notifications.onButtonClicked.addListener(buttonClickRedirect);
}

function createNotification () {

	var options = {
		type : "basic",
		title: "Get Up and Move Around!",
		message: "You've been sitting down for an hour, why don't you go for a quick two minute walk around the office?",
		iconUrl: "../icons/icon128.png",
		buttons: [{ 
			title: "Click here to launch a timer!",
			iconUrl: "../icons/clock16.png"
		}]
	}

	chrome.notifications.create('id' + notID++, options , createFunctionCallback);
}