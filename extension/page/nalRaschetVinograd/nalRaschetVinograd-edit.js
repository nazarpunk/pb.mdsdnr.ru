'use strict';
{
	document.title = `Хмель - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`nal-raschet-vinograd-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
}