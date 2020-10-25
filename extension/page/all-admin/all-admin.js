"use strict";
document.title = `- таблица`;
document.querySelectorAll(`.grid-view table.items a`).forEach($a => {
    let title = $a.title.trim();
    if (title === `К сведению`)
        $a.innerHTML = `<img src="images/info.png" alt="${title}">`;
    if ($a.classList.contains(`copy`) || $a.title === `Подписать`) {
        let type = {
            0: { need: false, complete: false, name: `Директор` },
            1: { need: false, complete: false, name: `Печать` },
            2: { need: false, complete: false, name: `Бухгалтер` }
        };
        const $tr = $a.closest(`tr`);
        $tr?.querySelectorAll(`[style='color:gray'],[style='color:gray;']`).forEach($span => {
            const index = 'ДПБ'.indexOf($span.innerHTML.trim());
            type[index].need = true;
        });
        $tr?.querySelectorAll(`[style='color:red'],[style='color:red;']`).forEach($span => {
            const index = 'ДПБ'.indexOf($span.innerHTML.trim());
            type[index].need = true;
            type[index].complete = true;
        });
        $a.href += `&${new URLSearchParams({ clientId: window.clientId, type: JSON.stringify(type) }).toString()}`;
    }
});
