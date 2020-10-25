'use strict';
chrome.storage.local.get([`token`, `email`], data => {
	if (!data.hasOwnProperty(`token`)) return document.getElementById(`user-wrap`).style.display = `none`;
	document.getElementById(`user-header`).innerText = data.email;

	document.getElementById(`user-sign-out`).addEventListener(`click`, () => {
		chrome.storage.local.clear(() => {
			window.location.reload();
		})
	});
});