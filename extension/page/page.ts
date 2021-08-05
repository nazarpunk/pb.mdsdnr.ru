/// <reference path="page.d.ts" />
{
	// fix content
	while (true) {
		const $content = document.getElementById(`content`);
		if ($content === null) break;
		$content.removeAttribute(`id`);
	}

	// client
	window.isClientLogged = false;
	window.clientId = ``;
	const $user = document.querySelector(`.user.user-menu > .dropdown-toggle > .hidden-xs:last-child`);
	if ($user !== null) {
		window.clientId = $user.innerHTML;
		window.isClientLogged = window.clientId !== `Guest`;
	}

	const js = (path: string) => {
		const $js = document.createElement(`script`);
		$js.type = `text/javascript`;
		$js.src = `chrome-extension://${document.head.dataset.extensionId}${path}.js`;
		document.head.appendChild($js);
	};

	const css = (path: string) => {
		const $css = document.createElement(`link`);
		$css.rel = `stylesheet`;
		$css.href = `chrome-extension://${document.head.dataset.extensionId}${path}.css`;
		document.head.appendChild($css);
	};

	// source
	const source = (path: string) => {
		const root = `/page/${path}/${path}`;
		js(root);
		css(root);
		return path;
	};
	source(`all-sidebar`);
	source(`all-header`);


	// page
	const page = (): string => {
		const param = new URLSearchParams(window.location.search);
		const r = param.get('r');

		if (document.title.replace(/\s+/g, ``) === `-Error`) return source(`error`);
		if ((r === null || r === `user/login`) && document.querySelectorAll(`.login-box, .wrapper`).length === 2) return source(`login`);
		if (r === null) return ``;

		const split = r.replace(/^\//, ``).split(`/`);
		if (split.length !== 2) return ``;

		if (split[0] === `esvYear` && ['admin2', 'create2', 'update2', 'view2'].includes(split[1])) {
			split[0] += `2`;
			split[1] = split[1].replace(/2$/, ``);
		}
		document.body.dataset[`page`] = split[0];

		window.isSubpageCreate = split[1] === `create`;
		window.isSubpageUpdate = split[1] === `update`;
		if (['create', 'update'].includes(split[1])) {
			document.body.dataset[`subpageReal`] = split[1];
			split[1] = `edit`;
		}
		document.body.dataset[`subpage`] = split[1];

		let root = `/page/${split[0]}/${split[0]}-${split[1]}`;
		if ([`admin`, `edit`].includes(split[1])) source(`all-${split[1]}`);
		if ([`mykeys`, `viewsved`].includes(split[1])) source(`all-${split[1]}`);
		else {
			js(root);
			css(root);
		}
		return split[0];
	};

	window.pageName = page();

	// --- fix
	document.querySelectorAll(`.span-3-5, .tabs, .tabcontents`).forEach($elem => $elem.removeAttribute(`style`));
	document.querySelectorAll(`.span-19 > div > br, [name=pageSize]`).forEach($elem => $elem.remove());
	document.querySelectorAll(`.skrolling`).forEach($elem => $elem.classList.remove(`skrolling`));
	document.querySelectorAll(`[action='index.php?r=${window.pageName}/index']`).forEach($form => $form.classList.add(`xml-upload-form`));

	// broke 30min limit
	const fuck30min = () => fetch(`${window.location.origin}/privcab/index.php?ajax=ppoot-grid&pageSize=100&r=pPOOt%2Fadmin`, {method: 'GET'});
	setInterval(fuck30min, 1000 * 60);
	fuck30min();

	// tabs
	js(`/page/_/tabs`);

	// jQuery dialog fix
	try {
		jQuery('#cru-dialog')[`dialog`]({
			                                title: 'Подписать',
			                                autoOpen: false,
			                                modal: true,
			                                width: 400,
			                                height: 600,
			                                close: () => window.location.reload()
		                                });
	} catch (e) {}

	// update
	const $login = <HTMLElement>document.querySelector(`.sidebar .info p`);
	const $name = <HTMLElement>document.querySelector(`.dropdown-menu .user-header p`);

	function update() {
		const extensionId = <string>document.head.dataset.extensionId;
		chrome.runtime.sendMessage(extensionId, {updateData: true});
		if ($login !== null && $name !== null) {
			chrome.runtime.sendMessage(extensionId, {
				login           : $login.innerText.trim(),
				updateClientName: $name.innerText.trim()
			});
		}
	}

	update();
}
