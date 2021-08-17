/// <reference path="../page.d.ts" />
document.title = `Вход`;
{
	const $wrapper = document.querySelector<HTMLElement>(`.wrapper`)!;
	const $loginBox = document.querySelector<HTMLElement>(`.login-box`)!;

	document.body.appendChild($loginBox);
	$wrapper!.remove();

	$loginBox.insertAdjacentHTML(`afterbegin`, `<svg id="pay-button-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
                <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
            </filter>
        </defs>
    </svg>

    <a id="pay-button" href="https://send.monobank.ua/jar/3SL75iS9ac" target="_blank">
        Помочь проекту
        <span class="bubbles">
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
        </span>
    </a>`);

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
			$login_box_body.insertAdjacentHTML('afterend', `
<div class="login-box-body">
	<div class="login-box-select-wrap">
		<select id="login-client-select" class="form-control"></select><a href="#clients" type="button" class="btn btn-default"><span class="fa fa-cog"></span></a>
	</div>
	<div class="row submit">
		<button id="login-client-btn" type="button" class="btn btn-primary btn-block">Войти</button>
	</div>
</div>

<div id="clients" class="my-modal-wrapper">
<a href="#" class="btn btn-danger"><i class="fa fa-close"></i></a>
<a href="#" class="my-modal-outside"></a>
	<div id="clients-content"></div>
</div>`);

			const $username = <HTMLInputElement>document.getElementById(`UserLogin_username`)
				, $password = <HTMLInputElement>document.getElementById(`UserLogin_password`)
				, $select   = <HTMLSelectElement>document.getElementById(`login-client-select`)
				, $content  = document.getElementById(`clients-content`)!;

			const $submit_client = document.getElementById(`login-client-btn`)!;
			const login_hash_prev = localStorage.getItem(`login_hash_prev`);
			const clients_data: { [key: string]: Client } = {};

			for (let i = 0; i < clients.length; i++) {
				const client = clients[i];
				clients_data[client.login_hash] = client;
				const selected = login_hash_prev === client.login_hash ? `selected` : ``;

				if (i < 300) {
					$content.insertAdjacentHTML(`beforeend`, `<div class="client-item">
	<div class="client-name">${client.name}</div>
	<div class="client-action">
		<button type="button" class="btn btn-danger" data-toggle="removed"><i class="fa fa-trash"></i></button>
		<div class="client-remove">
			<button type="button" class="btn btn-danger" data-remove="${client.login_hash}">УДАЛИТЬ!</button>
			<button type="button" class="btn btn-default" data-toggle="removed"><i class="fa fa-close"></i></button>
		</div>
	</div>
</div>`);
				}

				$select.insertAdjacentHTML(
					`beforeend`,
					`<option value="${client.login_hash}" ${selected}>${client.name} (${client.login})</option>`
				);
			}

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

			$content.addEventListener(`click`, e => {
				if (!(e.target instanceof HTMLElement)) return;

				const $item = e.target.closest<HTMLElement>(`.client-item`);
				if (!$item) return;

				if (e.target.dataset.toggle) {
					$item.classList.toggle(e.target.dataset.toggle);
					return;
				}

				if (e.target.dataset.remove) {
					$item.style.maxHeight = `${$item.scrollHeight}px`;
					window.getComputedStyle($item).getPropertyValue('max-height');
					$item.classList.add(`removing`);
					$select.querySelector(`[value='${e.target.dataset.remove}']`)?.remove();
					chrome.runtime.sendMessage(
						document.head.dataset.extensionId || ``, {
							userClientRemove: e.target.dataset.remove
						}, () => {
							chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {updateData: true});
						});
				}
			});

			// </editor-fold>

		}
	);
}