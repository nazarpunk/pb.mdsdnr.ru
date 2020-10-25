'use strict';
{
	document.title = `Вода - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`decl-voda-new-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}