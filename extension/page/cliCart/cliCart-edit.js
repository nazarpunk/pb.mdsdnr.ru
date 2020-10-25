document.title = `Карта плательщика`;

document.querySelectorAll(`.main-sidebar .sidebar > a`).forEach($a => {
	if ($a.getAttribute(`href`).indexOf(`r=cliCart`) > 0) return $a.classList.add(`active`);
});

document.querySelectorAll(`.tabcontents [type=button]`).forEach($input => $input.classList.add(`btn`, `btn-default`))