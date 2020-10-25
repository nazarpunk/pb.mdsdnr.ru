'use strict';
{
	document.title = `Оборот - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`decl-nal-oborot-form`);

	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});

	$form.querySelectorAll(`#view2 > table`).forEach($table => $table.removeAttribute(`style`));
}