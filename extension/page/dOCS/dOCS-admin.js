'use strict';

document.title = `Документы`;

document.querySelectorAll(`.main-sidebar .sidebar > a`).forEach($a => {
	if ($a.getAttribute(`href`).indexOf(`r=dOCS/admin`) > 0) return $a.classList.add(`active`);
});

document.getElementById(`docs-grid`).classList.add(`table-scroll-wrap`);