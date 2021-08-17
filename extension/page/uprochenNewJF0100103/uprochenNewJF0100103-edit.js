"use strict";
document.title = `Упрощённый ${document.title}`;
{
    const $form = document.getElementById(`uprochen-new-form`);
    const $submit = $form.querySelector(`.row.buttons input`);
    if ($submit !== null) {
        $submit.removeAttribute(`style`);
        $submit.classList.add(`btn`, `btn-primary`, `btn-block`);
    }
    {
        const $type_decl = document.getElementById(`UprochenNewJF0100103_type_decl`);
        const $type_period = document.getElementById(`UprochenNewJF0100103_type_period`);
        const $month_report = document.getElementById(`UprochenNewJF0100103_month_report`);
        const $row1 = document.getElementById(`UprochenNewJF0100103_row1`);
        const $view1 = document.getElementById(`view1`);
        $view1.querySelectorAll(`:scope > *`).forEach($elem => $view1.append($elem));
        $view1.querySelectorAll(`[type=text], select`).forEach($input => {
            $input.classList.add(`form-control`);
            $input.removeAttribute(`style`);
        });
        const $row2 = document.getElementById(`UprochenNewJF0100103_row2`);
        $row2.closest(`tr`).insertAdjacentHTML(`beforebegin`, `<tr><td></td><td id="saldo-row2-td-1" class="text-right"></td><td id="saldo-row2-td-2"></td></tr>`);
        const $row2_td1 = document.getElementById(`saldo-row2-td-1`);
        const $row2_td2 = document.getElementById(`saldo-row2-td-2`);
        $row2_td2.addEventListener(`click`, e => {
            const $btn = e.target.closest(`button`);
            if ($btn !== null)
                $row1.value = $btn.innerText;
        });
        $row2.readOnly = true;
        $row2.removeAttribute(`onkeyup`);
        $row2.addEventListener(`input`, () => {
            if (!$row2.readOnly)
                return;
            const row2 = parseInt($row2_1.value) + parseInt($row2_2.value) - parseInt($row2_3.value);
            if (isNaN(row2))
                return;
            $row2.value = row2.toString();
            $row2_td1.innerHTML = ``;
            $row2_td2.innerHTML = ``;
            if ((+$type_decl.value !== 1 && +$type_decl.value !== 2) || +$type_period.value !== 1)
                return;
            const month = parseInt($month_report.value);
            let row1 = parseInt($row1.value);
            if (isNaN(month) || isNaN(row1))
                return;
            if (month === 1)
                row1 = 0;
            $row2_td1.innerHTML = `Новая сумма за год: <b>${row1}</b> + <b>${row2}</b> = &nbsp;`;
            $row2_td2.innerHTML = `<button type="button" class="btn btn-primary btn-sm btn-block">${row1 + row2}</button>`;
            window.decl1($form);
        });
        $type_decl.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
        $type_period.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
        $month_report.addEventListener(`change`, () => $row2.dispatchEvent(new InputEvent(`input`)));
        const $row2_1 = document.getElementById(`UprochenNewJF0100103_row2_1`);
        const $row2_2 = document.getElementById(`UprochenNewJF0100103_row2_2`);
        const $row2_3 = document.getElementById(`UprochenNewJF0100103_row2_3`);
        [$row2_1, $row2_2, $row2_3].forEach($row => {
            $row.removeAttribute(`onkeyup`);
            $row.addEventListener(`input`, () => $row2.dispatchEvent(new InputEvent(`input`)));
        });
        [`UprochenNewJF0100103_row4`, `UprochenNewJF0100103_row5`].forEach(id => {
            const $select = document.getElementById(id);
            if ($select === null)
                return;
            $select.insertAdjacentHTML(`beforebegin`, `<div class="input-group"><span class="input-group-addon">%</span>`);
            $select.nextElementSibling.remove();
            $select.previousElementSibling.insertAdjacentElement(`afterbegin`, $select);
        });
        const $manually = $view1.querySelector(`[onclick='EditAll()']`);
        if ($manually !== null) {
            $manually.classList.add(`btn`, `btn-default`);
            $manually.removeAttribute(`onclick`);
            $manually.addEventListener(`click`, () => {
                if (!confirm(`Отключить ручное редактирование возможно только после обновления страницы. Продолжить?`))
                    return;
                $manually.insertAdjacentHTML(`afterend`, `<div class="alert alert-warning">Включено ручное редактирование!</div>`);
                $row2.readOnly = false;
                $manually.remove();
                window.EditAll();
            });
        }
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuc2lvbi9wYWdlL3Vwcm9jaGVuTmV3SkYwMTAwMTAzL3Vwcm9jaGVuTmV3SkYwMTAwMTAzLWVkaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFFBQVEsQ0FBQyxLQUFLLEdBQUcsY0FBYyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEQ7SUFDQyxNQUFNLEtBQUssR0FBSyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFFLENBQUM7SUFDOUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFELElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtRQUNyQixPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDekQ7SUFHRDtRQUNDLE1BQU0sVUFBVSxHQUF5QixRQUFRLENBQUMsY0FBYyxDQUFDLGdDQUFnQyxDQUFFLENBQUM7UUFDcEcsTUFBTSxZQUFZLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0NBQWtDLENBQUUsQ0FBQztRQUN0RyxNQUFNLGFBQWEsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQ0FBbUMsQ0FBRSxDQUFDO1FBQ3ZHLE1BQU0sS0FBSyxHQUE2QixRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFFLENBQUM7UUFDOUYsTUFBTSxNQUFNLEdBQVUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8s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QztRQUdILE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNoRSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsd0ZBQXdGLENBQUM7b0JBQUUsT0FBTztnQkFDL0csU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSx3RUFBd0UsQ0FBQyxDQUFDO2dCQUNuSCxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdkIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVuQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7U0FDSDtLQUNEO0NBRUQiLCJmaWxlIjoiZXh0ZW5zaW9uL3BhZ2UvdXByb2NoZW5OZXdKRjAxMDAxMDMvdXByb2NoZW5OZXdKRjAxMDAxMDMtZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9wYWdlLmQudHNcIiAvPlxuZG9jdW1lbnQudGl0bGUgPSBg0KPQv9GA0L7RidGR0L3QvdGL0LkgJHtkb2N1bWVudC50aXRsZX1gO1xue1xuXHRjb25zdCAkZm9ybSAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVwcm9jaGVuLW5ldy1mb3JtYCkhO1xuXHRjb25zdCAkc3VibWl0ID0gJGZvcm0ucXVlcnlTZWxlY3RvcihgLnJvdy5idXR0b25zIGlucHV0YCk7XG5cdGlmICgkc3VibWl0ICE9PSBudWxsKSB7XG5cdFx0JHN1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoYHN0eWxlYCk7XG5cdFx0JHN1Ym1pdC5jbGFzc0xpc3QuYWRkKGBidG5gLCBgYnRuLXByaW1hcnlgLCBgYnRuLWJsb2NrYCk7XG5cdH1cblx0XG5cdC8vPGVkaXRvci1mb2xkIGRlc2M9XCJ2aWV3IDFcIj5cblx0e1xuXHRcdGNvbnN0ICR0eXBlX2RlY2wgICAgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYFVwcm9jaGVuTmV3SkYwMTAwMTAzX3R5cGVfZGVjbGApITtcblx0XHRjb25zdCAkdHlwZV9wZXJpb2QgID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVcHJvY2hlbk5ld0pGMDEwMDEwM190eXBlX3BlcmlvZGApITtcblx0XHRjb25zdCAkbW9udGhfcmVwb3J0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVcHJvY2hlbk5ld0pGMDEwMDEwM19tb250aF9yZXBvcnRgKSE7XG5cdFx0Y29uc3QgJHJvdzEgICAgICAgICA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBVcHJvY2hlbk5ld0pGMDEwMDEwM19yb3cxYCkhO1xuXHRcdGNvbnN0ICR2aWV3MSAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdmlldzFgKSE7XG5cdFx0JHZpZXcxLnF1ZXJ5U2VsZWN0b3JBbGwoYDpzY29wZSA+ICpgKS5mb3JFYWNoKCRlbGVtID0+ICR2aWV3MS5hcHBlbmQoJGVsZW0pKTtcblx0XHQkdmlldzEucXVlcnlTZWxlY3RvckFsbChgW3R5cGU9dGV4dF0sIHNlbGVjdGApLmZvckVhY2goJGlucHV0ID0+IHtcblx0XHRcdCRpbnB1dC5jbGFzc0xpc3QuYWRkKGBmb3JtLWNvbnRyb2xgKTtcblx0XHRcdCRpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoYHN0eWxlYCk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0Y29uc3QgJHJvdzIgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgVXByb2NoZW5OZXdKRjAxMDAxMDNfcm93MmApITtcblx0XHQkcm93Mi5jbG9zZXN0PEhUTUxFbGVtZW50PihgdHJgKSEuaW5zZXJ0QWRqYWNlbnRIVE1MKGBiZWZvcmViZWdpbmAsIGA8dHI+PHRkPjwvdGQ+PHRkIGlkPVwic2FsZG8tcm93Mi10ZC0xXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+PC90ZD48dGQgaWQ9XCJzYWxkby1yb3cyLXRkLTJcIj48L3RkPjwvdHI+YCk7XG5cdFx0Y29uc3QgJHJvdzJfdGQxID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzYWxkby1yb3cyLXRkLTFgKSE7XG5cdFx0Y29uc3QgJHJvdzJfdGQyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzYWxkby1yb3cyLXRkLTJgKSE7XG5cdFx0JHJvdzJfdGQyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZSA9PiB7XG5cdFx0XHRjb25zdCAkYnRuID0gKDxIVE1MRWxlbWVudD5lLnRhcmdldCkuY2xvc2VzdChgYnV0dG9uYCk7XG5cdFx0XHRpZiAoJGJ0biAhPT0gbnVsbCkgJHJvdzEudmFsdWUgPSAkYnRuLmlubmVyVGV4dDtcblx0XHR9KTtcblx0XHQkcm93Mi5yZWFkT25seSA9IHRydWU7XG5cdFx0JHJvdzIucmVtb3ZlQXR0cmlidXRlKGBvbmtleXVwYCk7XG5cdFx0JHJvdzIuYWRkRXZlbnRMaXN0ZW5lcihgaW5wdXRgLCAoKSA9PiB7XG5cdFx0XHRpZiAoISRyb3cyLnJlYWRPbmx5KSByZXR1cm47XG5cdFx0XHRjb25zdCByb3cyID0gcGFyc2VJbnQoJHJvdzJfMS52YWx1ZSkgKyBwYXJzZUludCgkcm93Ml8yLnZhbHVlKSAtIHBhcnNlSW50KCRyb3cyXzMudmFsdWUpO1xuXHRcdFx0aWYgKGlzTmFOKHJvdzIpKSByZXR1cm47XG5cdFx0XHQkcm93Mi52YWx1ZSA9IHJvdzIudG9TdHJpbmcoKTtcblx0XHRcdFxuXHRcdFx0JHJvdzJfdGQxLmlubmVySFRNTCA9IGBgO1xuXHRcdFx0JHJvdzJfdGQyLmlubmVySFRNTCA9IGBgO1xuXHRcdFx0aWYgKCgrJHR5cGVfZGVjbC52YWx1ZSAhPT0gMSAmJiArJHR5cGVfZGVjbC52YWx1ZSAhPT0gMikgfHwgKyR0eXBlX3BlcmlvZC52YWx1ZSAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCgkbW9udGhfcmVwb3J0LnZhbHVlKTtcblx0XHRcdGxldCByb3cxICAgID0gcGFyc2VJbnQoJHJvdzEudmFsdWUpO1xuXHRcdFx0aWYgKGlzTmFOKG1vbnRoKSB8fCBpc05hTihyb3cxKSkgcmV0dXJuO1xuXHRcdFx0aWYgKG1vbnRoID09PSAxKSByb3cxID0gMDtcblx0XHRcdCRyb3cyX3RkMS5pbm5lckhUTUwgPSBg0J3QvtCy0LDRjyDRgdGD0LzQvNCwINC30LAg0LPQvtC0OiA8Yj4ke3JvdzF9PC9iPiArIDxiPiR7cm93Mn08L2I+ID0gJm5ic3A7YDtcblx0XHRcdCRyb3cyX3RkMi5pbm5lckhUTUwgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGJ0bi1ibG9ja1wiPiR7cm93MSArIHJvdzJ9PC9idXR0b24+YDtcblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0d2luZG93LmRlY2wxKCRmb3JtKTtcblx0XHR9KTtcblx0XHQkdHlwZV9kZWNsLmFkZEV2ZW50TGlzdGVuZXIoYGNoYW5nZWAsICgpID0+ICRyb3cyLmRpc3BhdGNoRXZlbnQobmV3IElucHV0RXZlbnQoYGlucHV0YCkpKTtcblx0XHQkdHlwZV9wZXJpb2QuYWRkRXZlbnRMaXN0ZW5lcihgY2hhbmdlYCwgKCkgPT4gJHJvdzIuZGlzcGF0Y2hFdmVudChuZXcgSW5wdXRFdmVudChgaW5wdXRgKSkpO1xuXHRcdCRtb250aF9yZXBvcnQuYWRkRXZlbnRMaXN0ZW5lcihgY2hhbmdlYCwgKCkgPT4gJHJvdzIuZGlzcGF0Y2hFdmVudChuZXcgSW5wdXRFdmVudChgaW5wdXRgKSkpO1xuXHRcdFxuXHRcdGNvbnN0ICRyb3cyXzEgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgVXByb2NoZW5OZXdKRjAxMDAxMDNfcm93Ml8xYCkhO1xuXHRcdGNvbnN0ICRyb3cyXzIgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgVXByb2NoZW5OZXdKRjAxMDAxMDNfcm93Ml8yYCkhO1xuXHRcdGNvbnN0ICRyb3cyXzMgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgVXByb2NoZW5OZXdKRjAxMDAxMDNfcm93Ml8zYCkhO1xuXHRcdFskcm93Ml8xLCAkcm93Ml8yLCAkcm93Ml8zXS5mb3JFYWNoKCRyb3cgPT4ge1xuXHRcdFx0JHJvdy5yZW1vdmVBdHRyaWJ1dGUoYG9ua2V5dXBgKTtcblx0XHRcdCRyb3cuYWRkRXZlbnRMaXN0ZW5lcihgaW5wdXRgLCAoKSA9PiAkcm93Mi5kaXNwYXRjaEV2ZW50KG5ldyBJbnB1dEV2ZW50KGBpbnB1dGApKSk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0W2BVcHJvY2hlbk5ld0pGMDEwMDEwM19yb3c0YCwgYFVwcm9jaGVuTmV3SkYwMTAwMTAzX3JvdzVgXS5mb3JFYWNoKGlkID0+IHtcblx0XHRcdGNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHRpZiAoJHNlbGVjdCA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdFx0JHNlbGVjdC5pbnNlcnRBZGphY2VudEhUTUwoYGJlZm9yZWJlZ2luYCwgYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj4lPC9zcGFuPmApO1xuXHRcdFx0JHNlbGVjdC5uZXh0RWxlbWVudFNpYmxpbmchLnJlbW92ZSgpO1xuXHRcdFx0JHNlbGVjdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5pbnNlcnRBZGphY2VudEVsZW1lbnQoYGFmdGVyYmVnaW5gLCAkc2VsZWN0KTtcblx0XHR9KTtcblx0XHRcblx0XHQvLyBtYW51YWxseVxuXHRcdGNvbnN0ICRtYW51YWxseSA9ICR2aWV3MS5xdWVyeVNlbGVjdG9yKGBbb25jbGljaz0nRWRpdEFsbCgpJ11gKTtcblx0XHRpZiAoJG1hbnVhbGx5ICE9PSBudWxsKSB7XG5cdFx0XHQkbWFudWFsbHkuY2xhc3NMaXN0LmFkZChgYnRuYCwgYGJ0bi1kZWZhdWx0YCk7XG5cdFx0XHQkbWFudWFsbHkucmVtb3ZlQXR0cmlidXRlKGBvbmNsaWNrYCk7XG5cdFx0XHQkbWFudWFsbHkuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB7XG5cdFx0XHRcdGlmICghY29uZmlybShg0J7RgtC60LvRjtGH0LjRgtGMINGA0YPRh9C90L7QtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCy0L7Qt9C80L7QttC90L4g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L7QsdC90L7QstC70LXQvdC40Y8g0YHRgtGA0LDQvdC40YbRiy4g0J/RgNC+0LTQvtC70LbQuNGC0Yw/YCkpIHJldHVybjtcblx0XHRcdFx0JG1hbnVhbGx5Lmluc2VydEFkamFjZW50SFRNTChgYWZ0ZXJlbmRgLCBgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj7QktC60LvRjtGH0LXQvdC+INGA0YPRh9C90L7QtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1ITwvZGl2PmApO1xuXHRcdFx0XHQkcm93Mi5yZWFkT25seSA9IGZhbHNlO1xuXHRcdFx0XHQkbWFudWFsbHkucmVtb3ZlKCk7XG5cdFx0XHRcdC8vQHRzLWlnbm9yZTtcblx0XHRcdFx0d2luZG93LkVkaXRBbGwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHQvLzwvZWRpdG9yLWZvbGQ+XG59Il19
