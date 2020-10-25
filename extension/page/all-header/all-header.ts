/// <reference path="../page.d.ts" />
(($header: HTMLElement) => {
    if ($header === null) return;
    if (!window.isClientLogged) return $header.remove();

    document.body.prepend($header);

    const $navbar = <HTMLElement>document.querySelector(`.main-header nav.navbar`);
    if ($navbar === null) return;
    $header.querySelectorAll<HTMLElement>(`
        .dropdown.messages-menu,
        .dropdown.notifications-menu,
        .dropdown.tasks-menu,
        li:empty,
        .sidebar-toggle,
        .logo`
    )
        .forEach($elem => $elem.remove());

    $navbar.querySelectorAll(`br`).forEach($br => $br.remove());
    $navbar.querySelectorAll(`.user-body .col-xs-4`).forEach($div => {
        $div.removeAttribute(`class`)
        $div.removeAttribute(`style`);
        $div.querySelectorAll(`a`).forEach($a => $a.className = `btn btn-primary btn-block`);
    });
    $navbar.querySelector<HTMLElement>(`.user-footer .btn-default`)!.className = `btn btn-danger btn-block`;

    // manifest
    chrome.runtime.sendMessage(
        document.head.dataset.extensionId || ``,
        {getManifest: true},
        (manifest) => {
            $navbar.dataset.version = `v${manifest.version}`;
        });

    // relogin
    chrome.runtime.sendMessage(
        document.head.dataset.extensionId || ``,
        {getClients: true},
        (data: UserData) => {
            if (data === null) return;
            const {clients} = data;
            if (clients.length === 0) return;

            const $select = document.createElement(`select`);
            $navbar.append($select);

            const clientsData: ClientsData = {};
            let isCatch = false;
            clients.forEach(client => {
                clientsData[client.login] = client;
                const selected = window.clientId === client.login ? `selected` : ``;
                if (selected !== ``) isCatch = true;
                $select.insertAdjacentHTML(`beforeend`, `<option value="${client.login}" ${selected}>${client.name} (${client.login})</option>`);
            });
            if (!isCatch) {
                $select.insertAdjacentHTML(`afterbegin`, `<option value="0" style="display: none">-- Выбрать</option>`);
                $select.value = `0`;
            }

            document.body.insertAdjacentHTML(`beforeend`, `<form id="main-header-login-form" enctype="multipart/form-data" action="/privcab/index.php" method="post" style="display: none"><input type="text" name="UserLogin[username]"><input type="text" name="UserLogin[password]"><input name="UserLogin[key]" type="file"><input type="submit"></form>`);
            const $form = <HTMLFormElement>document.getElementById(`main-header-login-form`);
            const $username = <HTMLInputElement>$form.querySelector(`[name='UserLogin[username]']`);
            const $password = <HTMLInputElement>$form.querySelector(`[name='UserLogin[password]']`);
            const $key = <HTMLInputElement>$form.querySelector(`[name='UserLogin[key]']`);
            const logout = `/privcab/index.php?r=/site/logout`;

            $select.addEventListener(`change`, () => {
                if (!clientsData.hasOwnProperty($select.value)) {
                    window.location.replace(logout);
                    return;
                }
                const client: Client = clientsData[$select.value];
                fetch(logout).then(() => {
                    $username.value = client.login;
                    $password.value = client.password;
                    let list = new DataTransfer();
                    list.items.add(new File([client.token], `Файлик.key`));
                    $key.files = list.files;

                    localStorage.setItem(`loginHashPrev`, client.loginHash);

                    $form.submit();
                });

            }, false);
        }
    );

})(document.querySelector<HTMLElement>(`.wrapper > .main-header`)!)


