/// <reference path="../page.d.ts" />
document.title = `Вход`;
{
	const $wrapper = document.querySelector<HTMLElement>(`.wrapper`)!;
	const $loginBox = document.querySelector<HTMLElement>(`.login-box`)!;

	document.body.appendChild($loginBox);
	$wrapper!.remove();

	const $submit = document.getElementById(`subm`);
	$submit!.setAttribute(`class`, `btn btn-primary btn-block`);

	const $submitRow = $loginBox!.querySelector(`.row.submit`)!;

	const $key = <HTMLInputElement>document.getElementById(`UserLogin_key`);
	$key.accept = `.key`;

	chrome.runtime.sendMessage(
		document.head.dataset.extensionId || ``,
		{getClients: true},
		(data: UserData) => {
			if (data === null) return;
			// <editor-fold desc="Login Manual">

			$submitRow.insertAdjacentHTML('beforebegin', `<label class="switch-wrap"><div class="switch"><input type="checkbox" checked autocomplete="off" name="save"><div><span></span></div></div>Сохранить в моём профиле</label>`);
			const $form = <HTMLFormElement>document.getElementById(`login-form`);
			const $checkbox = <HTMLInputElement>$form.querySelector(`[type=checkbox]`);
			const {clients, token} = data;
			$form.addEventListener(`submit`, e => {
				if ($key.files!.length == 0 || !$checkbox.checked) return;
				e.preventDefault();
				const formData = new FormData($form);
				fetch($form.action, {method: $form.method, body: formData})
					.then(response => {
						if (!response.redirected) return $form.submit();
						const fileReader = new FileReader();
						fileReader.onload = e => {
							const saveClient = {
								token   : token,
								login   : formData.get(`UserLogin[username]`),
								password: formData.get(`UserLogin[password]`),
								key     : (e.target!.result as string)
							};
							chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {saveClient: saveClient}, () => {return $form.submit();});
						};
						fileReader.readAsText($key.files![0]);
					})
					.catch(() => $form.submit());
			});
			// </editor-fold>

			if (clients.length === 0) return;
			// <editor-fold desc="Login Auto">
			const $login_box_body = $loginBox.querySelector(`.login-box-body`)!;
			$login_box_body.insertAdjacentHTML('afterend', `<div class="login-box-body">
	<div class="login-box-select-wrap">
		<select id="login-client-select" class="form-control"></select><a href="#clients" type="button" class="btn btn-default"><span class="fa fa-cog"></span></a>
	</div>
	<div class="row submit">
		<button id="login-client-btn" type="button" class="btn btn-primary btn-block">Войти</button>
	</div>
</div>
<div id="clients" class="my-modal-wrapper">
	<div class="my-modal-body">
		<a href="#" class="btn btn-danger"><i class="fa fa-close"></i></a>
		<code>В разработке</code>
	</div>
	<a href="#" class="my-modal-outside"></a>
</div>`);

			const $username = <HTMLInputElement>document.getElementById(`UserLogin_username`)
				, $password = <HTMLInputElement>document.getElementById(`UserLogin_password`)
				, $select   = <HTMLSelectElement>document.getElementById(`login-client-select`);

			const $submit_client = document.getElementById(`login-client-btn`)!;
			const login_hash_prev = localStorage.getItem(`login_hash_prev`);
			const clients_data: { [key: string]: Client } = {};

			clients.forEach(client => {
				clients_data[client.login_hash] = client;
				const selected = login_hash_prev === client.login_hash ? `selected` : ``;
				$select.insertAdjacentHTML(
					`beforeend`,
					`<option value="${client.login_hash}" ${selected}>${client.name} (${client.login})</option>`
				);
			});

			$submit_client.addEventListener(`click`, () => {
				const login_hash = $select.value;
				if (!clients_data.hasOwnProperty(login_hash)) return;
				const client = clients_data[login_hash];

				$username.value = client.login;
				$password.value = client.password;
				let list = new DataTransfer();
				list.items.add(new File([client.token], `Файлик.key`));
				$key.files = list.files;

				localStorage.setItem(`login_hash_prev`, login_hash);

				$form.submit();
			});
			// </editor-fold>

		}
	);
}