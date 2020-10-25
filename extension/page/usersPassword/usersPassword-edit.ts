document.title = `Изменить пароль`;
{
	const $form = document.getElementById(`users-password-form`)!;
	$form.querySelectorAll(`[type=password]`).forEach($input => $input.classList.add(`form-control`));
	$form.querySelectorAll(`br`).forEach($elem => $elem.remove());
	$form.querySelector<HTMLElement>(`[type=submit]`)!.classList.add(`btn`, `btn-primary`);
}