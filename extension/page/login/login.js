"use strict";
document.title = `Вход`;
{
    const $wrapper = document.querySelector(`.wrapper`);
    const $loginBox = document.querySelector(`.login-box`);
    document.body.appendChild($loginBox);
    $wrapper.remove();
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
    $submit.setAttribute(`class`, `btn btn-primary btn-block`);
    const $submitRow = $loginBox.querySelector(`.row.submit`);
    const $key = document.getElementById(`UserLogin_key`);
    $key.accept = `.key`;
    chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, { getClients: true }, (data) => {
        if (data === null)
            return;
        $submitRow.insertAdjacentHTML('beforebegin', `<label class="switch-wrap"><div class="switch"><input type="checkbox" checked autocomplete="off" name="save"><div><span></span></div></div>Сохранить в моём профиле</label>`);
        const $form = document.getElementById(`login-form`);
        const $checkbox = $form.querySelector(`[type=checkbox]`);
        const { clients, token } = data;
        $form.addEventListener(`submit`, e => {
            if ($key.files.length == 0 || !$checkbox.checked)
                return;
            e.preventDefault();
            const formData = new FormData($form);
            fetch($form.action, { method: $form.method, body: formData })
                .then(response => {
                if (!response.redirected)
                    return $form.submit();
                const fileReader = new FileReader();
                fileReader.onload = e => {
                    const saveClient = {
                        token: token,
                        login: formData.get(`UserLogin[username]`),
                        password: formData.get(`UserLogin[password]`),
                        key: e.target.result
                    };
                    chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, { saveClient: saveClient }, () => { return $form.submit(); });
                };
                fileReader.readAsText($key.files[0]);
            })
                .catch(() => $form.submit());
        });
        if (clients.length === 0)
            return;
        const $login_box_body = $loginBox.querySelector(`.login-box-body`);
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
        const $username = document.getElementById(`UserLogin_username`), $password = document.getElementById(`UserLogin_password`), $select = document.getElementById(`login-client-select`), $content = document.getElementById(`clients-content`);
        const $submit_client = document.getElementById(`login-client-btn`);
        const login_hash_prev = localStorage.getItem(`login_hash_prev`);
        const clients_data = {};
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
            $select.insertAdjacentHTML(`beforeend`, `<option value="${client.login_hash}" ${selected}>${client.name} (${client.login})</option>`);
        }
        $submit_client.addEventListener(`click`, () => {
            const login_hash = $select.value;
            if (!clients_data.hasOwnProperty(login_hash))
                return;
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
            if (!(e.target instanceof HTMLElement))
                return;
            const $item = e.target.closest(`.client-item`);
            if (!$item)
                return;
            if (e.target.dataset.toggle) {
                $item.classList.toggle(e.target.dataset.toggle);
                return;
            }
            if (e.target.dataset.remove) {
                $item.style.maxHeight = `${$item.scrollHeight}px`;
                window.getComputedStyle($item).getPropertyValue('max-height');
                $item.classList.add(`removing`);
                $select.querySelector(`[value='${e.target.dataset.remove}']`)?.remove();
                chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {
                    userClientRemove: e.target.dataset.remove
                }, () => {
                    chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, { updateData: true });
                });
            }
        });
    });
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEVBQUU7b0JBQ3hDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07aUJBQ3pDLEVBQUUsR0FBRyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDekYsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBSUosQ0FBQyxDQUNELENBQUM7Q0FDRiIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9wYWdlLmQudHNcIiAvPlxuZG9jdW1lbnQudGl0bGUgPSBg0JLRhdC+0LRgO1xue1xuXHRjb25zdCAkd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGAud3JhcHBlcmApITtcblx0Y29uc3QgJGxvZ2luQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYC5sb2dpbi1ib3hgKSE7XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkbG9naW5Cb3gpO1xuXHQkd3JhcHBlciEucmVtb3ZlKCk7XG5cblx0JGxvZ2luQm94Lmluc2VydEFkamFjZW50SFRNTChgYWZ0ZXJiZWdpbmAsIGA8c3ZnIGlkPVwicGF5LWJ1dHRvbi1zdmdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgPGZpbHRlciBpZD1cImdvb2V5XCI+XG4gICAgICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPVwiU291cmNlR3JhcGhpY1wiIHN0ZERldmlhdGlvbj1cIjVcIiByZXN1bHQ9XCJibHVyXCIgLz5cbiAgICAgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cImJsdXJcIiB0eXBlPVwibWF0cml4XCIgdmFsdWVzPVwiMSAwIDAgMCAwICAwIDEgMCAwIDAgIDAgMCAxIDAgMCAgMCAwIDAgMTkgLTlcIiByZXN1bHQ9XCJoaWdoQ29udHJhc3RHcmFwaGljXCIgLz5cbiAgICAgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiaGlnaENvbnRyYXN0R3JhcGhpY1wiIG9wZXJhdG9yPVwiYXRvcFwiIC8+XG4gICAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgPC9kZWZzPlxuICAgIDwvc3ZnPlxuXG4gICAgPGEgaWQ9XCJwYXktYnV0dG9uXCIgaHJlZj1cImh0dHBzOi8vc2VuZC5tb25vYmFuay51YS9qYXIvM1NMNzVpUzlhY1wiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICDQn9C+0LzQvtGH0Ywg0L/RgNC+0LXQutGC0YNcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidWJibGVzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1YmJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnViYmxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidWJibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1YmJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnViYmxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidWJibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1YmJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnViYmxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidWJibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1YmJsZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYT5gKTtcblxuXHRjb25zdCAkc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN1Ym1gKTtcblx0JHN1Ym1pdCEuc2V0QXR0cmlidXRlKGBjbGFzc2AsIGBidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrYCk7XG5cblx0Y29uc3QgJHN1Ym1pdFJvdyA9ICRsb2dpbkJveCEucXVlcnlTZWxlY3RvcihgLnJvdy5zdWJtaXRgKSE7XG5cblx0Y29uc3QgJGtleSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVc2VyTG9naW5fa2V5YCk7XG5cdCRrZXkuYWNjZXB0ID0gYC5rZXlgO1xuXG5cdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuXHRcdGRvY3VtZW50LmhlYWQuZGF0YXNldC5leHRlbnNpb25JZCB8fCBgYCxcblx0XHR7Z2V0Q2xpZW50czogdHJ1ZX0sXG5cdFx0KGRhdGE6IFVzZXJEYXRhKSA9PiB7XG5cdFx0XHRpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdFx0Ly8gPGVkaXRvci1mb2xkIGRlc2M9XCJMb2dpbiBNYW51YWxcIj5cblxuXHRcdFx0JHN1Ym1pdFJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgYDxsYWJlbCBjbGFzcz1cInN3aXRjaC13cmFwXCI+PGRpdiBjbGFzcz1cInN3aXRjaFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkIGF1dG9jb21wbGV0ZT1cIm9mZlwiIG5hbWU9XCJzYXZlXCI+PGRpdj48c3Bhbj48L3NwYW4+PC9kaXY+PC9kaXY+0KHQvtGF0YDQsNC90LjRgtGMINCyINC80L7RkdC8INC/0YDQvtGE0LjQu9C1PC9sYWJlbD5gKTtcblx0XHRcdGNvbnN0ICRmb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbG9naW4tZm9ybWApO1xuXHRcdFx0Y29uc3QgJGNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+JGZvcm0ucXVlcnlTZWxlY3RvcihgW3R5cGU9Y2hlY2tib3hdYCk7XG5cdFx0XHRjb25zdCB7Y2xpZW50cywgdG9rZW59ID0gZGF0YTtcblx0XHRcdCRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIGUgPT4ge1xuXHRcdFx0XHRpZiAoJGtleS5maWxlcyEubGVuZ3RoID09IDAgfHwgISRjaGVja2JveC5jaGVja2VkKSByZXR1cm47XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoJGZvcm0pO1xuXHRcdFx0XHRmZXRjaCgkZm9ybS5hY3Rpb24sIHttZXRob2Q6ICRmb3JtLm1ldGhvZCwgYm9keTogZm9ybURhdGF9KVxuXHRcdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdGlmICghcmVzcG9uc2UucmVkaXJlY3RlZCkgcmV0dXJuICRmb3JtLnN1Ym1pdCgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHRmaWxlUmVhZGVyLm9ubG9hZCA9IGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzYXZlQ2xpZW50ID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRva2VuICAgOiB0b2tlbixcblx0XHRcdFx0XHRcdFx0XHRsb2dpbiAgIDogZm9ybURhdGEuZ2V0KGBVc2VyTG9naW5bdXNlcm5hbWVdYCksXG5cdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmQ6IGZvcm1EYXRhLmdldChgVXNlckxvZ2luW3Bhc3N3b3JkXWApLFxuXHRcdFx0XHRcdFx0XHRcdGtleSAgICAgOiAoZS50YXJnZXQhLnJlc3VsdCBhcyBzdHJpbmcpXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGRvY3VtZW50LmhlYWQuZGF0YXNldC5leHRlbnNpb25JZCB8fCBgYCwge3NhdmVDbGllbnQ6IHNhdmVDbGllbnR9LCAoKSA9PiB7cmV0dXJuICRmb3JtLnN1Ym1pdCgpO30pO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGZpbGVSZWFkZXIucmVhZEFzVGV4dCgka2V5LmZpbGVzIVswXSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKCkgPT4gJGZvcm0uc3VibWl0KCkpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyA8L2VkaXRvci1mb2xkPlxuXG5cdFx0XHRpZiAoY2xpZW50cy5sZW5ndGggPT09IDApIHJldHVybjtcblx0XHRcdC8vIDxlZGl0b3ItZm9sZCBkZXNjPVwiTG9naW4gQXV0b1wiPlxuXHRcdFx0Y29uc3QgJGxvZ2luX2JveF9ib2R5ID0gJGxvZ2luQm94LnF1ZXJ5U2VsZWN0b3IoYC5sb2dpbi1ib3gtYm9keWApITtcblx0XHRcdCRsb2dpbl9ib3hfYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYFxuPGRpdiBjbGFzcz1cImxvZ2luLWJveC1ib2R5XCI+XG5cdDxkaXYgY2xhc3M9XCJsb2dpbi1ib3gtc2VsZWN0LXdyYXBcIj5cblx0XHQ8c2VsZWN0IGlkPVwibG9naW4tY2xpZW50LXNlbGVjdFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+PGEgaHJlZj1cIiNjbGllbnRzXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1jb2dcIj48L3NwYW4+PC9hPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cInJvdyBzdWJtaXRcIj5cblx0XHQ8YnV0dG9uIGlkPVwibG9naW4tY2xpZW50LWJ0blwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIj7QktC+0LnRgtC4PC9idXR0b24+XG5cdDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgaWQ9XCJjbGllbnRzXCIgY2xhc3M9XCJteS1tb2RhbC13cmFwcGVyXCI+XG48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj48aSBjbGFzcz1cImZhIGZhLWNsb3NlXCI+PC9pPjwvYT5cbjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJteS1tb2RhbC1vdXRzaWRlXCI+PC9hPlxuXHQ8ZGl2IGlkPVwiY2xpZW50cy1jb250ZW50XCI+PC9kaXY+XG48L2Rpdj5gKTtcblxuXHRcdFx0Y29uc3QgJHVzZXJuYW1lID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYFVzZXJMb2dpbl91c2VybmFtZWApXG5cdFx0XHRcdCwgJHBhc3N3b3JkID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYFVzZXJMb2dpbl9wYXNzd29yZGApXG5cdFx0XHRcdCwgJHNlbGVjdCAgID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsb2dpbi1jbGllbnQtc2VsZWN0YClcblx0XHRcdFx0LCAkY29udGVudCAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2xpZW50cy1jb250ZW50YCkhO1xuXG5cdFx0XHRjb25zdCAkc3VibWl0X2NsaWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsb2dpbi1jbGllbnQtYnRuYCkhO1xuXHRcdFx0Y29uc3QgbG9naW5faGFzaF9wcmV2ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYGxvZ2luX2hhc2hfcHJldmApO1xuXHRcdFx0Y29uc3QgY2xpZW50c19kYXRhOiB7IFtrZXk6IHN0cmluZ106IENsaWVudCB9ID0ge307XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2xpZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBjbGllbnQgPSBjbGllbnRzW2ldO1xuXHRcdFx0XHRjbGllbnRzX2RhdGFbY2xpZW50LmxvZ2luX2hhc2hdID0gY2xpZW50O1xuXHRcdFx0XHRjb25zdCBzZWxlY3RlZCA9IGxvZ2luX2hhc2hfcHJldiA9PT0gY2xpZW50LmxvZ2luX2hhc2ggPyBgc2VsZWN0ZWRgIDogYGA7XG5cblx0XHRcdFx0aWYgKGkgPCAzMDApIHtcblx0XHRcdFx0XHQkY29udGVudC5pbnNlcnRBZGphY2VudEhUTUwoYGJlZm9yZWVuZGAsIGA8ZGl2IGNsYXNzPVwiY2xpZW50LWl0ZW1cIj5cblx0PGRpdiBjbGFzcz1cImNsaWVudC1uYW1lXCI+JHtjbGllbnQubmFtZX08L2Rpdj5cblx0PGRpdiBjbGFzcz1cImNsaWVudC1hY3Rpb25cIj5cblx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS10b2dnbGU9XCJyZW1vdmVkXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT48L2J1dHRvbj5cblx0XHQ8ZGl2IGNsYXNzPVwiY2xpZW50LXJlbW92ZVwiPlxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtcmVtb3ZlPVwiJHtjbGllbnQubG9naW5faGFzaH1cIj7Qo9CU0JDQm9CY0KLQrCE8L2J1dHRvbj5cblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS10b2dnbGU9XCJyZW1vdmVkXCI+PGkgY2xhc3M9XCJmYSBmYS1jbG9zZVwiPjwvaT48L2J1dHRvbj5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG48L2Rpdj5gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCRzZWxlY3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuXHRcdFx0XHRcdGBiZWZvcmVlbmRgLFxuXHRcdFx0XHRcdGA8b3B0aW9uIHZhbHVlPVwiJHtjbGllbnQubG9naW5faGFzaH1cIiAke3NlbGVjdGVkfT4ke2NsaWVudC5uYW1lfSAoJHtjbGllbnQubG9naW59KTwvb3B0aW9uPmBcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0JHN1Ym1pdF9jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxvZ2luX2hhc2ggPSAkc2VsZWN0LnZhbHVlO1xuXHRcdFx0XHRpZiAoIWNsaWVudHNfZGF0YS5oYXNPd25Qcm9wZXJ0eShsb2dpbl9oYXNoKSkgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBjbGllbnQgPSBjbGllbnRzX2RhdGFbbG9naW5faGFzaF07XG5cblx0XHRcdFx0JHVzZXJuYW1lLnZhbHVlID0gY2xpZW50LmxvZ2luO1xuXHRcdFx0XHQkcGFzc3dvcmQudmFsdWUgPSBjbGllbnQucGFzc3dvcmQ7XG5cdFx0XHRcdGxldCBsaXN0ID0gbmV3IERhdGFUcmFuc2ZlcigpO1xuXHRcdFx0XHRsaXN0Lml0ZW1zLmFkZChuZXcgRmlsZShbY2xpZW50LnRva2VuXSwgYNCk0LDQudC70LjQui5rZXlgKSk7XG5cdFx0XHRcdCRrZXkuZmlsZXMgPSBsaXN0LmZpbGVzO1xuXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBsb2dpbl9oYXNoX3ByZXZgLCBsb2dpbl9oYXNoKTtcblxuXHRcdFx0XHQkZm9ybS5zdWJtaXQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkY29udGVudC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGUgPT4ge1xuXHRcdFx0XHRpZiAoIShlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHRcdGNvbnN0ICRpdGVtID0gZS50YXJnZXQuY2xvc2VzdDxIVE1MRWxlbWVudD4oYC5jbGllbnQtaXRlbWApO1xuXHRcdFx0XHRpZiAoISRpdGVtKSByZXR1cm47XG5cblx0XHRcdFx0aWYgKGUudGFyZ2V0LmRhdGFzZXQudG9nZ2xlKSB7XG5cdFx0XHRcdFx0JGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShlLnRhcmdldC5kYXRhc2V0LnRvZ2dsZSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGUudGFyZ2V0LmRhdGFzZXQucmVtb3ZlKSB7XG5cdFx0XHRcdFx0JGl0ZW0uc3R5bGUubWF4SGVpZ2h0ID0gYCR7JGl0ZW0uc2Nyb2xsSGVpZ2h0fXB4YDtcblx0XHRcdFx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgkaXRlbSkuZ2V0UHJvcGVydHlWYWx1ZSgnbWF4LWhlaWdodCcpO1xuXHRcdFx0XHRcdCRpdGVtLmNsYXNzTGlzdC5hZGQoYHJlbW92aW5nYCk7XG5cdFx0XHRcdFx0JHNlbGVjdC5xdWVyeVNlbGVjdG9yKGBbdmFsdWU9JyR7ZS50YXJnZXQuZGF0YXNldC5yZW1vdmV9J11gKT8ucmVtb3ZlKCk7XG5cdFx0XHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5oZWFkLmRhdGFzZXQuZXh0ZW5zaW9uSWQgfHwgYGAsIHtcblx0XHRcdFx0XHRcdFx0dXNlckNsaWVudFJlbW92ZTogZS50YXJnZXQuZGF0YXNldC5yZW1vdmVcblx0XHRcdFx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZG9jdW1lbnQuaGVhZC5kYXRhc2V0LmV4dGVuc2lvbklkIHx8IGBgLCB7dXBkYXRlRGF0YTogdHJ1ZX0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyA8L2VkaXRvci1mb2xkPlxuXG5cdFx0fVxuXHQpO1xufSJdfQ==
