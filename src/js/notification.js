'use strict'

var notId = 0;

function notificationBtnClick(notID, iBtn) {
	console.log("The notification '" + notID + "' had button " + iBtn + " clicked");
	chrome.tabs.create( {
		url: 'https://www.google.ca/search?q=timer%202%20minutes&rct=j',
	}, function() {} );
}

window.addEventListener("load", function() { 
	chrome.notifications.onButtonClicked.addListener(notificationBtnClick);
});

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

	chrome.notifications.create('id' + notId++, options , function() {});
}

var button = document.getElementById('updateButton');

button.addEventListener('click', function() {
	createNotification();
});


