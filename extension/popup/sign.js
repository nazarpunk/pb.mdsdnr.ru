'use strict';
chrome.storage.local.get(['token'], data => {
	if (data.hasOwnProperty(`token`)) return document.getElementById(`sign-wrap`).style.display = `none`;

	let manifest = chrome.runtime.getManifest();
	//console.log(manifest.version);
	//console.log(manifest.homepage_url);

	document
		.querySelectorAll(`#sign-form-in,#sign-form-up`)
		.forEach($form => {
			const $submit = $form.querySelector(`input[type=submit]`);
			const $group  = $form.querySelectorAll(`.sign-form-group`);

			$form.addEventListener('submit', e => {
				e.preventDefault();
				$submit.disabled = true;
				$group.forEach($this => delete $this.dataset.error);

				fetch(manifest.homepage_url + $form.dataset.action, {
					method: 'POST',
					body  : new FormData($form),
				})
					.then(response => {
						if (!response.ok) throw response;
						return response.json()
					})
					.then(data => {
						$submit.disabled = false;
						if (data.hasOwnProperty(`token`)) {
							chrome.storage.local.set(data, () => {
								window.location.reload();
							});
						} else {
							for (let k in data) {
								if (!data.hasOwnProperty(k)) continue;
								let $input = $form.querySelector(`[name=${k}]`);
								if ($input === null || data[k] === true) continue;
								$input.parentElement.dataset.error = data[k];
							}
						}
					})
					.catch(err => {
						$submit.disabled                    = false;
						$submit.parentElement.dataset.error = err.status !== undefined ? `${err.status} - ${err.statusText}` : err;
					});
			});
		});
});