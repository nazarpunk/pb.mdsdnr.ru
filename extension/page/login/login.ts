/// <reference path="../page.d.ts" />
document.title = `Вход`;
{
	const $wrapper  = document.querySelector<HTMLElement>(`.wrapper`)!;
	const $loginBox = document.querySelector<HTMLElement>(`.login-box`)!;
	
	document.body.appendChild($loginBox);
	$wrapper!.remove();
	
	const $submit = document.getElementById(`subm`);
	$submit!.setAttribute(`class`, `btn btn-primary btn-block`);
	
	const $submitRow = $loginBox!.querySelector(`.row.submit`)!;
	
	const $key  = <HTMLInputElement>document.getElementById(`UserLogin_key`);
	$key.accept = `.key`;
	
	chrome.runtime.sendMessage(
		document.head.dataset.extensionId || ``,
		{getClients: true},
		(data: UserData) => {
			if (data === null) return;
			// <editor-fold desc="Login Manual">
			
			$submitRow.insertAdjacentHTML('beforebegin', `<label class="switch-wrap"><div class="switch"><input type="checkbox" checked autocomplete="off" name="save"><div><span></span></div></div>Сохранить в моём профиле</label>`);
			const $form            = <HTMLFormElement>document.getElementById(`login-form`);
			const $checkbox        = <HTMLInputElement>$form.querySelector(`[type=checkbox]`);
			const {clients, token} = data;
			$form.addEventListener(`submit`, e => {
				if ($key.files!.length == 0 || !$checkbox.checked) return;
				e.preventDefault();
				const formData = new FormData($form);
				fetch($form.action, {method: $form.method, body: formData})
					.then(response => {
						if (!response.redirected) return $form.submit();
						const fileReader  = new FileReader();
						fileReader.onload = e => {
							const saveClient = {
								token   : token,
								login   : formData.get(`UserLogin[username]`),
								password: formData.get(`UserLogin[password]`),
								key     : (e.target!.result as string)
							}
							chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {saveClient: saveClient}, () => {return $form.submit()})
						}
						fileReader.readAsText($key.files![0]);
					})
					.catch(() => $form.submit());
			});
			// </editor-fold>
			// <editor-fold desc="Login Auto">
			if (clients.length === 0) return;
			const $loginBoxBody = $loginBox.querySelector(`.login-box-body`)!;
			
			$loginBoxBody.insertAdjacentHTML('afterend', `<div class="login-box-body"><div class="form-group"><select id="login-client-select" class="form-control"></select></div><div class="row submit"><button id="login-client-btn" type="button" class="btn btn-primary btn-block">Войти</button></div></div>`);
			
			const $username                              = <HTMLInputElement>document.getElementById(`UserLogin_username`);
			const $password                              = <HTMLInputElement>document.getElementById(`UserLogin_password`);
			const $select                                = <HTMLSelectElement>document.getElementById(`login-client-select`);
			const $submitClient                          = document.getElementById(`login-client-btn`)!;
			const clientsData: { [key: string]: Client } = {};
			const loginHashPrev                          = localStorage.getItem(`loginHashPrev`);
			
			clients.forEach(client => {
				clientsData[client.loginHash] = client;
				const selected                = loginHashPrev === client.loginHash ? `selected` : ``;
				$select.insertAdjacentHTML(
					`beforeend`,
					`<option value="${client.loginHash}" ${selected}>${client.name} (${client.login})</option>`
				);
			});
			
			$submitClient.addEventListener(`click`, () => {
				const loginHash = $select.value
				if (!clientsData.hasOwnProperty(loginHash)) return;
				const client = clientsData[loginHash];
				
				$username.value = client.login;
				$password.value = client.password;
				let list        = new DataTransfer();
				list.items.add(new File([client.token], `Файлик.key`));
				$key.files = list.files;
				
				localStorage.setItem(`loginHashPrev`, loginHash);
				
				$form.submit();
			});
			// </editor-fold>
		}
	);
}