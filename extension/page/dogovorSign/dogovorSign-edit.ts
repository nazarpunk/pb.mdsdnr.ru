/// <reference path="../page.d.ts" />
{
	document.title = `Договор ЭД - ${isSubpageCreate ? `создание` : `редактирование`}`;
	const $form    = document.getElementById(`dogovor-sign-privcab-form`)!;
	
	$form.querySelectorAll(`[type=text],select`).forEach($input => {
		$input.classList.add(`form-control`);
		$input.removeAttribute(`style`);
	});
	
	$form.querySelector(`[type=submit]`)!.classList.add(`btn`, `btn-primary`);
}