'use strict';
document.title = `Упрощённый (новая) - просмотр`;
{
	const $content = document.querySelector(`.tabcontents`);
	$content.querySelectorAll(`:scope > :not(div),#view1>div[style]:first-child, .r8 br`).forEach($elem => $elem.remove());
}