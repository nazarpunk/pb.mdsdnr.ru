"use strict";
document.title = `Вход`;
{
    const $wrapper = document.querySelector(`.wrapper`);
    const $loginBox = document.querySelector(`.login-box`);
    document.body.appendChild($loginBox);
    $wrapper.remove();
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
        const $username = document.getElementById(`UserLogin_username`), $password = document.getElementById(`UserLogin_password`), $select = document.getElementById(`login-client-select`);
        const $submit_client = document.getElementById(`login-client-btn`);
        const login_hash_prev = localStorage.getItem(`login_hash_prev`);
        const clients_data = {};
        clients.forEach(client => {
            clients_data[client.login_hash] = client;
            const selected = login_hash_prev === client.login_hash ? `selected` : ``;
            $select.insertAdjacentHTML(`beforeend`, `<option value="${client.login_hash}" ${selected}>${client.name} (${client.login})</option>`);
        });
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
    });
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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a0JBQWtCLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssWUFBWSxDQUM1RixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM3QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFBRSxPQUFPO1lBQ3JELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4QyxTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDL0IsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFeEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVwRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFHSixDQUFDLENBQ0QsQ0FBQztDQUNGIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3BhZ2UuZC50c1wiIC8+XG5kb2N1bWVudC50aXRsZSA9IGDQktGF0L7QtGA7XG57XG5cdGNvbnN0ICR3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYC53cmFwcGVyYCkhO1xuXHRjb25zdCAkbG9naW5Cb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgLmxvZ2luLWJveGApITtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCRsb2dpbkJveCk7XG5cdCR3cmFwcGVyIS5yZW1vdmUoKTtcblxuXHRjb25zdCAkc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN1Ym1gKTtcblx0JHN1Ym1pdCEuc2V0QXR0cmlidXRlKGBjbGFzc2AsIGBidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrYCk7XG5cblx0Y29uc3QgJHN1Ym1pdFJvdyA9ICRsb2dpbkJveCEucXVlcnlTZWxlY3RvcihgLnJvdy5zdWJtaXRgKSE7XG5cblx0Y29uc3QgJGtleSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVc2VyTG9naW5fa2V5YCk7XG5cdCRrZXkuYWNjZXB0ID0gYC5rZXlgO1xuXG5cdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuXHRcdGRvY3VtZW50LmhlYWQuZGF0YXNldC5leHRlbnNpb25JZCB8fCBgYCxcblx0XHR7Z2V0Q2xpZW50czogdHJ1ZX0sXG5cdFx0KGRhdGE6IFVzZXJEYXRhKSA9PiB7XG5cdFx0XHRpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdFx0Ly8gPGVkaXRvci1mb2xkIGRlc2M9XCJMb2dpbiBNYW51YWxcIj5cblxuXHRcdFx0JHN1Ym1pdFJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgYDxsYWJlbCBjbGFzcz1cInN3aXRjaC13cmFwXCI+PGRpdiBjbGFzcz1cInN3aXRjaFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkIGF1dG9jb21wbGV0ZT1cIm9mZlwiIG5hbWU9XCJzYXZlXCI+PGRpdj48c3Bhbj48L3NwYW4+PC9kaXY+PC9kaXY+0KHQvtGF0YDQsNC90LjRgtGMINCyINC80L7RkdC8INC/0YDQvtGE0LjQu9C1PC9sYWJlbD5gKTtcblx0XHRcdGNvbnN0ICRmb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbG9naW4tZm9ybWApO1xuXHRcdFx0Y29uc3QgJGNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+JGZvcm0ucXVlcnlTZWxlY3RvcihgW3R5cGU9Y2hlY2tib3hdYCk7XG5cdFx0XHRjb25zdCB7Y2xpZW50cywgdG9rZW59ID0gZGF0YTtcblx0XHRcdCRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIGUgPT4ge1xuXHRcdFx0XHRpZiAoJGtleS5maWxlcyEubGVuZ3RoID09IDAgfHwgISRjaGVja2JveC5jaGVja2VkKSByZXR1cm47XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoJGZvcm0pO1xuXHRcdFx0XHRmZXRjaCgkZm9ybS5hY3Rpb24sIHttZXRob2Q6ICRmb3JtLm1ldGhvZCwgYm9keTogZm9ybURhdGF9KVxuXHRcdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdGlmICghcmVzcG9uc2UucmVkaXJlY3RlZCkgcmV0dXJuICRmb3JtLnN1Ym1pdCgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHRmaWxlUmVhZGVyLm9ubG9hZCA9IGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzYXZlQ2xpZW50ID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRva2VuICAgOiB0b2tlbixcblx0XHRcdFx0XHRcdFx0XHRsb2dpbiAgIDogZm9ybURhdGEuZ2V0KGBVc2VyTG9naW5bdXNlcm5hbWVdYCksXG5cdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmQ6IGZvcm1EYXRhLmdldChgVXNlckxvZ2luW3Bhc3N3b3JkXWApLFxuXHRcdFx0XHRcdFx0XHRcdGtleSAgICAgOiAoZS50YXJnZXQhLnJlc3VsdCBhcyBzdHJpbmcpXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGRvY3VtZW50LmhlYWQuZGF0YXNldC5leHRlbnNpb25JZCB8fCBgYCwge3NhdmVDbGllbnQ6IHNhdmVDbGllbnR9LCAoKSA9PiB7cmV0dXJuICRmb3JtLnN1Ym1pdCgpO30pO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGZpbGVSZWFkZXIucmVhZEFzVGV4dCgka2V5LmZpbGVzIVswXSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKCkgPT4gJGZvcm0uc3VibWl0KCkpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyA8L2VkaXRvci1mb2xkPlxuXG5cdFx0XHRpZiAoY2xpZW50cy5sZW5ndGggPT09IDApIHJldHVybjtcblx0XHRcdC8vIDxlZGl0b3ItZm9sZCBkZXNjPVwiTG9naW4gQXV0b1wiPlxuXHRcdFx0Y29uc3QgJGxvZ2luX2JveF9ib2R5ID0gJGxvZ2luQm94LnF1ZXJ5U2VsZWN0b3IoYC5sb2dpbi1ib3gtYm9keWApITtcblx0XHRcdCRsb2dpbl9ib3hfYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJsb2dpbi1ib3gtYm9keVwiPlxuXHQ8ZGl2IGNsYXNzPVwibG9naW4tYm94LXNlbGVjdC13cmFwXCI+XG5cdFx0PHNlbGVjdCBpZD1cImxvZ2luLWNsaWVudC1zZWxlY3RcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PjxhIGhyZWY9XCIjY2xpZW50c1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPjxzcGFuIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9zcGFuPjwvYT5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJyb3cgc3VibWl0XCI+XG5cdFx0PGJ1dHRvbiBpZD1cImxvZ2luLWNsaWVudC1idG5cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXCI+0JLQvtC50YLQuDwvYnV0dG9uPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBpZD1cImNsaWVudHNcIiBjbGFzcz1cIm15LW1vZGFsLXdyYXBwZXJcIj5cblx0PGRpdiBjbGFzcz1cIm15LW1vZGFsLWJvZHlcIj5cblx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj48aSBjbGFzcz1cImZhIGZhLWNsb3NlXCI+PC9pPjwvYT5cblx0XHQ8Y29kZT7QkiDRgNCw0LfRgNCw0LHQvtGC0LrQtTwvY29kZT5cblx0PC9kaXY+XG5cdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJteS1tb2RhbC1vdXRzaWRlXCI+PC9hPlxuPC9kaXY+YCk7XG5cblx0XHRcdGNvbnN0ICR1c2VybmFtZSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVc2VyTG9naW5fdXNlcm5hbWVgKVxuXHRcdFx0XHQsICRwYXNzd29yZCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVc2VyTG9naW5fcGFzc3dvcmRgKVxuXHRcdFx0XHQsICRzZWxlY3QgICA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbG9naW4tY2xpZW50LXNlbGVjdGApO1xuXG5cdFx0XHRjb25zdCAkc3VibWl0X2NsaWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsb2dpbi1jbGllbnQtYnRuYCkhO1xuXHRcdFx0Y29uc3QgbG9naW5faGFzaF9wcmV2ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYGxvZ2luX2hhc2hfcHJldmApO1xuXHRcdFx0Y29uc3QgY2xpZW50c19kYXRhOiB7IFtrZXk6IHN0cmluZ106IENsaWVudCB9ID0ge307XG5cblx0XHRcdGNsaWVudHMuZm9yRWFjaChjbGllbnQgPT4ge1xuXHRcdFx0XHRjbGllbnRzX2RhdGFbY2xpZW50LmxvZ2luX2hhc2hdID0gY2xpZW50O1xuXHRcdFx0XHRjb25zdCBzZWxlY3RlZCA9IGxvZ2luX2hhc2hfcHJldiA9PT0gY2xpZW50LmxvZ2luX2hhc2ggPyBgc2VsZWN0ZWRgIDogYGA7XG5cdFx0XHRcdCRzZWxlY3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuXHRcdFx0XHRcdGBiZWZvcmVlbmRgLFxuXHRcdFx0XHRcdGA8b3B0aW9uIHZhbHVlPVwiJHtjbGllbnQubG9naW5faGFzaH1cIiAke3NlbGVjdGVkfT4ke2NsaWVudC5uYW1lfSAoJHtjbGllbnQubG9naW59KTwvb3B0aW9uPmBcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkc3VibWl0X2NsaWVudC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHtcblx0XHRcdFx0Y29uc3QgbG9naW5faGFzaCA9ICRzZWxlY3QudmFsdWU7XG5cdFx0XHRcdGlmICghY2xpZW50c19kYXRhLmhhc093blByb3BlcnR5KGxvZ2luX2hhc2gpKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IGNsaWVudCA9IGNsaWVudHNfZGF0YVtsb2dpbl9oYXNoXTtcblxuXHRcdFx0XHQkdXNlcm5hbWUudmFsdWUgPSBjbGllbnQubG9naW47XG5cdFx0XHRcdCRwYXNzd29yZC52YWx1ZSA9IGNsaWVudC5wYXNzd29yZDtcblx0XHRcdFx0bGV0IGxpc3QgPSBuZXcgRGF0YVRyYW5zZmVyKCk7XG5cdFx0XHRcdGxpc3QuaXRlbXMuYWRkKG5ldyBGaWxlKFtjbGllbnQudG9rZW5dLCBg0KTQsNC50LvQuNC6LmtleWApKTtcblx0XHRcdFx0JGtleS5maWxlcyA9IGxpc3QuZmlsZXM7XG5cblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oYGxvZ2luX2hhc2hfcHJldmAsIGxvZ2luX2hhc2gpO1xuXG5cdFx0XHRcdCRmb3JtLnN1Ym1pdCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyA8L2VkaXRvci1mb2xkPlxuXG5cdFx0fVxuXHQpO1xufSJdfQ==
