'use strict';
{
	document.title = `Прибыль 01.01.2020 - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`declprib-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}