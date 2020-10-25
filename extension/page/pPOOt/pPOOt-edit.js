'use strict';
{
	document.title = `Касса - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`ppoot-form`);

	$form.querySelectorAll(`[type=text]`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});

	document.querySelectorAll(`[type=submit]`).forEach($submit => $submit.classList.add(`btn`, `btn-primary`));
}