'use strict';
{
	document.title = `ЕСВ (год) - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`esv-year-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}