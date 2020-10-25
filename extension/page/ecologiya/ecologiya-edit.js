'use strict';
{
	document.title = `Экология - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`ecologiya-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}