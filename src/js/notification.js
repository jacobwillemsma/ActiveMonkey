'use strict'

/* Add notification code here */
function createNotification () {
	chrome.notifications.create('Hello', {
	        type: 'basic',
	        iconUrl: '../icons/icon128.png',
	        title: 'Hello World',
	        message: 'My first ever chrome popup'
	     }, function() {})
}

var button = document.getElementById('timeSubmitButton');

button.addEventListener('click', function() {
	createNotification();
});
