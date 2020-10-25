"use strict";
document.title = `Квитанции`;
{
    const $span19 = document.querySelector(`.span-19`);
    $span19.querySelectorAll(`*`).forEach($elem => {
        $elem.style.removeProperty(`height`);
        $elem.style.removeProperty(`float`);
        if ($elem.style.width === `100%`)
            $elem.style.removeProperty(`margin-left`);
    });
    $span19.querySelectorAll(`hr, style, script`).forEach($elem => $elem.remove());
    $span19.querySelectorAll(`:scope > div > div`).forEach($elem => $elem.removeAttribute(`style`));
    $span19.querySelectorAll(`button`).forEach($btn => $btn.classList.add(`btn`, `btn-default`, `btn-block`));
}
