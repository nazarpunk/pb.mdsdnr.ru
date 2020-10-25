document.title = `Подписать`;
{
	const $form        = <HTMLFormElement>document.querySelector(`form`)!;
	$form.autocomplete = `off`;
	const $password    = <HTMLInputElement>$form.querySelector(`[type=password]`)!;
	$password.classList.add(`form-control`);
	const $sec    = <HTMLInputElement>$form.querySelector(`[type=file]`)!;
	$sec.accept   = `.sec`;
	const $submit = <HTMLButtonElement>$form.querySelector(`[type=submit]`)!;
	$submit.classList.add(`btn`, `btn-primary`);
	$form.autocomplete = `off`;
	
	document.querySelectorAll(`.errorSummary`).forEach($elem => $elem.classList.add(`alert`, `alert-danger`));
	
	const b64toBlob = (b64Data: string, contentType = 'application/octet-stream', sliceSize = 512) => {
		let byteCharacters = atob(b64Data);
		let byteArrays     = [];
		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice       = byteCharacters.slice(offset, offset + sliceSize);
			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			let byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}
		return new Blob(byteArrays, {type: contentType});
	}
	
	const indexOfSubmit = `window.parent.$.fn.yiiGridView.update`;
	const params        = new URLSearchParams(window.location.search);
	if (params.has(`clientId`) && params.has(`type`)) {
		const clientId = params.get(`clientId`);
		const types    = JSON.parse(params.get(`type`) || `{}`);
		
		chrome.runtime.sendMessage(
			document.head.dataset.extensionId || ``,
			{getClientSignature: clientId},
			(signature) => {
				let typeCurrent = [2, 0, 1].find(type => types[type].need && !types[type].complete);
				if (typeCurrent === undefined) return;
				$submit.insertAdjacentHTML('beforebegin', `<label class="switch-wrap"><div class="switch"><input type="checkbox" checked autocomplete="off" name="save"><div><span></span></div></div>Сохранить как &laquo;${types[typeCurrent].name}&raquo;</label>`);
				
				// submit
				$form.addEventListener(`submit`, e => {
					const $checkbox  = <HTMLInputElement>$form.querySelector(`[type=checkbox]`);
					const formData   = new FormData($form);
					$submit.disabled = true;
					if ($checkbox === null || !$checkbox.checked || $sec.files!.length === 0) return;
					e.preventDefault();
					
					fetch($form.action, {
						method: $form.method,
						body  : new FormData($form)
					})
						.then(response => response.text())
						.then(data => {
							const isSubmit = data.indexOf(indexOfSubmit) >= 0;
							if (!isSubmit) return $form.submit();
							e.preventDefault();
							const fileReader  = new FileReader();
							fileReader.onload = e => {
								chrome.runtime.sendMessage(
									document.head.dataset.extensionId || ``,
									{
										saveSignature: {
											client  : clientId,
											type    : typeCurrent,
											password: formData.get(`QuickKeysForm[passphrase]`),
											sec     : (e.target!.result as string)
										}
									},
									() => {
										chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {updateData: true});
										window.parent.location.reload();
									});
							}
							fileReader.readAsDataURL($sec.files![0]);
						});
				});
				
				// auto
				const sendList: number[] = [];
				const sendName: string[] = [];
				
				[2, 0, 1].forEach(type => {
					if (!types[type].need || types[type].complete || !signature.hasOwnProperty(type)) return;
					$form.insertAdjacentHTML(`beforeend`, `<button type="button" data-type="${type}" class="btn btn-success">&laquo;${types[type].name}&raquo;</button>`);
					sendList.push(type);
					sendName.push(types[type].name)
				});
				
				if (sendList.length > 1) {
					$form.insertAdjacentHTML(`beforeend`, `<button type="button" data-type="-1" class="btn btn-info">&laquo;${sendName.join(` &rArr; `)}&raquo;</button>`);
				}
				
				async function sign(type: number) {
					const $btn = <HTMLButtonElement>$form.querySelector(`[data-type='${type}']`);
					if ($btn !== null) $btn.disabled = true;
					const delay = () => {
						const sign     = signature[type];
						const formData = new FormData();
						formData.append(`QuickKeysForm[passphrase]`, sign.password)
						formData.append(`QuickKeysForm[key1]`, new Blob([b64toBlob(sign.sec)]), `fuck.sec`);
						return fetch($form.action, {
							method: $form.method,
							body  : formData
						}).then(response => response.text())
					}
					return await delay();
				}
				
				async function signAll() {
					let isError = false;
					for (const type of sendList) await sign(type).then((data) => {
						const isSubmit = data.indexOf(indexOfSubmit) >= 0;
						if (!isSubmit) isError = true;
					}).catch(() => isError = true);
					if (isError) document.body.innerHTML = `<h1 class="error">Ошибка!</h1>`;
					else window.parent.location.reload();
				}
				
				$form.addEventListener(`click`, e => {
					const $btn: HTMLButtonElement | null = (<HTMLElement>e.target).closest(`[data-type]`);
					if ($btn === null) return;
					$btn.disabled = true;
					const type    = +$btn.dataset.type!;
					if (type >= 0) {
						const sign      = signature[type];
						$password.value = sign.password;
						let list        = new DataTransfer();
						list.items.add(new File([b64toBlob(sign.sec)], `${types[type].name}.sec`));
						$sec.files = list.files;
						$form.submit();
					} else signAll();
				}, false);
			});
	}
}