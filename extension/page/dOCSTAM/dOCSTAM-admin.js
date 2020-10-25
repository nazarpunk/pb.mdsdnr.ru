"use strict";
document.title = `Таможенные документы ${document.title}`;
document.querySelectorAll(`[href='index.php?r=dOCSTAM/admin']`).forEach($a => $a.classList.add(`active`));
document.getElementById(`docstam-grid`).classList.add(`table-scroll-wrap`);
