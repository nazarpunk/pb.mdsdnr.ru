"use strict";
{
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = `tabs-${urlParams.get('r') || `tabs`}`;
    const hideContent = ($tabs) => {
        $tabs.querySelectorAll(`a[href]`).forEach(($a) => {
            if ($a === null)
                return;
            $a.parentElement?.classList.remove(`selected`);
            const href = $a.getAttribute(`href`) || ``;
            if (href === ``)
                return;
            document.querySelectorAll(href).forEach($elem => $elem.style.display = `none`);
        });
    };
    document.querySelectorAll(`.tabs`).forEach($tabs => {
        hideContent($tabs);
        $tabs.addEventListener(`click`, e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const $a = e.target.closest(`a[href]`);
            if ($a === null)
                return;
            hideContent($tabs);
            $a.parentElement?.classList.add(`selected`);
            const href = $a.getAttribute(`href`) || ``;
            document.querySelectorAll(href).forEach($elem => $elem.style.display = `block`);
            sessionStorage.setItem(itemName, href);
        }, true);
        const href = sessionStorage.getItem(itemName) || ``;
        ($tabs.querySelector(`a[href='${href}']`) || $tabs.querySelector(`a[href]`)).click();
    });
}
