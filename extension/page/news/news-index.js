document.title = `Новости`;

document.querySelector(`.span-19`).removeAttribute(`class`);

document.querySelectorAll(`#cont > br,.span-3-5.last`).forEach($elem => $elem.remove());
document.querySelectorAll(`#cont *`).forEach($elem => $elem.removeAttribute(`style`));

document.querySelectorAll(`#cont > div,#cont > h1`).forEach($div => {
	$div.removeAttribute(`style`);
});
