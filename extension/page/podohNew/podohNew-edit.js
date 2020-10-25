'use strict';
{
	document.title = `Подоходный (новая) - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`podoh-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}