'use strict';
{
	document.title = `ЕСВ (работники) - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`esv-prepdr-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}