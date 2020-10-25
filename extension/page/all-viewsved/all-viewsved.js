"use strict";
document.title = `К сведению`;
document.querySelectorAll(`.span-19 *`).forEach($elem => $elem.removeAttribute(`style`));
document.querySelector(`.span-19 button`).classList.add(`btn`, `btn-default`);
