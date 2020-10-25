/// <reference path="../page.d.ts" />
document.title = `Упрощённый ${document.title}`;
{
	const $form   = document.getElementById(`uprochen-new-form`)!;
	const $submit = $form.querySelector(`.row.buttons input`);
	if ($submit !== null) {
		$submit.removeAttribute(`style`);
		$submit.classList.add(`btn`, `btn-primary`, `btn-block`);
	}
	
	//<editor-fold desc="view 1">
	{
		const $type_decl    = <HTMLSelectElement>document.getElementById(`UprochenNewJF0100103_type_decl`)!;
		const $type_period  = <HTMLSelectElement>document.getElementById(`UprochenNewJF0100103_type_period`)!;
		const $month_report = <HTMLSelectElement>document.getElementById(`UprochenNewJF0100103_month_report`)!;
		const $row1         = <HTMLInputElement>document.getElementById(`UprochenNewJF0100103_row1`)!;
		const $view1        = document.getElementById(`view1`)!;
		$view1.querySelectorAll(`:scope > *`).forEach($elem => $view1.append($elem));
		$view1.querySelectorAll(`[type=text], select`).forEach($input => {
			$input.classList.add(`form-control`);
			$input.removeAttribute(`style`);
		});
		
		const $row2 = <HTMLInputElement>document.getElementById(`UprochenNewJF0100103_row2`)!;
		$row2.closest<HTMLElement>(`tr`)!.insertAdjacentHTML(`beforebegin`, `<tr><td></td><td id="saldo-row2-td-1" class="text-right"></td><td id="saldo-row2-td-2"></td></tr>`);
		const $row2_td1 = <HTMLElement>document.getElementById(`saldo-row2-td-1`)!;
		const $row2_td2 = <HTMLElement>document.getElementById(`saldo-row2-td-2`)!;
		$row2_td2.addEventListener(`click`, e => {
			const $btn = (<HTMLElement>e.target).closest(`button`);
			if ($btn !== null) $row1.value = $btn.innerText;
		});
		$row2.readOnly = true;
		$row2.removeAttribute(`onkeyup`);
		$row2.addEventListener(`input`, () => {
			if (!$row2.readOnly) return;
			const row2 = parseInt($row2_1.value) + parseInt($row2_2.value) - parseInt($row2_3.value);
			if (isNaN(row2)) return;
			$row2.value = row2.toString();
			
			$row2_td1.innerHTML = ``;
			$row2_td2.innerHTML = ``;
			if ((+$type_decl.value !== 1 && +$type_decl.value !== 2) || +$type_period.value !== 1) return;
			const month = parseInt($month_report.value);
			let row1    = parseInt($row1.value);
			if (isNaN(month) || isNaN(row1)) return;
			if (month === 1) row1 = 0;
			$row2_td1.innerHTML = `Новая сумма за год: <b>${row1}</b> + <b>${row2}</b> = &nbsp;`;
			$row2_td2.innerHTML = `<button type="button" class="btn btn-primary btn-sm btn-block">${row1 + row2}</button>`;
			//@ts-ignore
			window.decl1($form);
		});
		$type_decl.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
		$type_period.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
		$month_report.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
		
		const $row2_1 = <HTMLInputElement>document.getElementById(`UprochenNewJF0100103_row2_1`)!;
		const $row2_2 = <HTMLInputElement>document.getElementById(`UprochenNewJF0100103_row2_2`)!;
		const $row2_3 = <HTMLInputElement>document.getElementById(`UprochenNewJF0100103_row2_3`)!;
		[$row2_1, $row2_2, $row2_3].forEach($row => {
			$row.removeAttribute(`onkeyup`);
			$row.addEventListener(`input`, () => $row2.dispatchEvent(new InputEvent(`input`)));
		});
		
		[`UprochenNewJF0100103_row4`, `UprochenNewJF0100103_row5`].forEach(id => {
			const $select = document.getElementById(id);
			if ($select === null) return;
			$select.insertAdjacentHTML(`beforebegin`, `<div class="input-group"><span class="input-group-addon">%</span>`);
			$select.nextElementSibling!.remove();
			$select.previousElementSibling!.insertAdjacentElement(`afterbegin`, $select);
		});
		
		// manually
		const $manually = $view1.querySelector(`[onclick='EditAll()']`);
		if ($manually !== null) {
			$manually.classList.add(`btn`, `btn-default`);
			$manually.removeAttribute(`onclick`);
			$manually.addEventListener(`click`, () => {
				if (!confirm(`Отключить ручное редактирование возможно только после обновления страницы. Продолжить?`)) return;
				$manually.insertAdjacentHTML(`afterend`, `<div class="alert alert-warning">Включено ручное редактирование!</div>`);
				$row2.readOnly = false;
				$manually.remove();
				//@ts-ignore;
				window.EditAll();
			});
		}
	}
	//</editor-fold>
}