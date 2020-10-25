'use strict';
{
	document.title = `Земля - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`zem-decl-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}