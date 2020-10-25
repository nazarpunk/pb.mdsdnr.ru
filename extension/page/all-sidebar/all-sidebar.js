"use strict";
(($wrap) => {
    const pages = {
        news: [`/news/index`, `Новости`],
        pPOOt: [`pPOOt/admin`, `Касса`],
        uprochenNewJF0100103: [`uprochenNewJF0100103/admin`, `Упрощённый <sup>новая</sup>`],
        podohNew: [`podohNew/admin`, `Подоходный <sup>новая</sup>`],
        declNalOborot: [`declNalOborot/admin`, `Оборот`],
        declprib20: [`declprib20/admin`, `Прибыль <sup>01.01.2020</sup>`],
        esvPrepdr: [`esvPrepdr/admin`, `ЕСВ <sup>работники</sup>`],
        esvYear2: [`esvYear/admin2`, `ЕСВ <sup>прибыль</sup>`],
        esvYear: [`esvYear/admin`, `ЕСВ <sup>год</sup>`],
        nalRaschetVinograd: [`nalRaschetVinograd/admin`, `Хмель`],
        declVodaNew: [`declVodaNew/admin`, `Вода`],
        ecologiya: [`ecologiya/admin`, `Экология`],
        zemDecl: [`zemDecl/admin`, `Земля`],
        dogovorSign: [`dogovorSign/admin`, `Договор ЭД`],
        actSver: [`actSver/admin`, `Акт сверки`]
    };
    if ($wrap === null)
        return;
    if (!isClientLogged)
        return $wrap.remove();
    document.body.prepend($wrap);
    $wrap.querySelectorAll(`br`).forEach($br => $br.remove());
    const $sidebar = $wrap.querySelector(`.sidebar`);
    $sidebar.querySelectorAll(`.sidebar-menu a`).forEach($a => {
        if ($a.getAttribute(`href`) === `#`)
            return;
        $sidebar.append($a);
    });
    $sidebar.querySelector(`.sidebar-menu`).remove();
    const $linkDocument = $sidebar.querySelector(`[href='index.php?r=dOCS/admin'] span`);
    if ($linkDocument !== null)
        $linkDocument.innerHTML = `Документы`;
    chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, { getClientSidebar: clientId }, ({ ID, sidebar }) => {
        Object.entries(pages).forEach(([k, v]) => {
            const isActive = k === pageName ? `active` : ``;
            const isShow = sidebar.indexOf(k) < 0 ? `true` : `false`;
            $sidebar.insertAdjacentHTML(`beforeend`, `<a href="/privcab/index.php?r=${v[0]}" class="${isActive}" data-show="${isShow}" data-name="${k}"><div><i class="fa fa-files-o"></i><span>${v[1]}</span></div></a>`);
        });
        if (ID > 0) {
            const $header = document.querySelector(`.main-header`);
            if ($header === null)
                return;
            $sidebar.insertAdjacentHTML(`beforeend`, `<div class="text-center"><button id="all-sidebar-setting-btn" class="btn btn-xs btn-primary">Настроить</button></div>`);
            const $showBtn = document.getElementById(`all-sidebar-setting-btn`);
            $showBtn.addEventListener(`click`, (e) => {
                e.preventDefault();
                $showBtn.style.display = `none`;
                document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
                document.body.style.overflow = `hidden`;
                document.body.insertAdjacentHTML(`afterbegin`, `<div id="sidebar-setting-wrap" style="top:${$header.offsetHeight}px"></div>`);
                const $wrap = document.getElementById(`sidebar-setting-wrap`);
                $wrap.style.animation = `sidebar-fade-in 400ms both`;
                const $inner = document.createElement(`div`);
                $wrap.insertAdjacentElement(`beforeend`, $inner);
                Object.entries(pages).forEach(([k, v]) => {
                    const isChecked = sidebar.indexOf(k) < 0 ? `checked` : ``;
                    $inner.insertAdjacentHTML(`beforeend`, `<label><label class="rocker"><input type="checkbox" ${isChecked} data-name="${k}" autocomplete="off"><span class="switch-left"><i class="fa fa-check"></i></span><span class="switch-right"><i class="fa fa-close"></i></span></label><span>${v[1]}</span></label>`);
                });
                $wrap.addEventListener(`change`, () => {
                    const sidebar = [];
                    $wrap.querySelectorAll(`[type=checkbox]`).forEach($checkbox => {
                        if (!$checkbox.checked)
                            sidebar.push($checkbox.dataset.name);
                        const $a = $sidebar.querySelector(`[data-name='${$checkbox.dataset.name}']`);
                        if ($a !== null)
                            $a.dataset.show = $checkbox.checked ? `true` : `false`;
                    });
                    chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, {
                        setClientSidebar: clientId, sidebar: sidebar.join(`,`)
                    }, () => {
                        chrome.runtime.sendMessage(document.head.dataset.extensionId || ``, { updateData: true });
                    });
                });
                $wrap.insertAdjacentHTML(`afterend`, `<button id="sidebar-setting-close-button" type="button" class="btn btn-danger btn-default"  style="top:${$header.offsetHeight}px"><i class="fa fa-close"></i></button>`);
                const $closeBtn = document.getElementById(`sidebar-setting-close-button`);
                $closeBtn.addEventListener(`click`, () => {
                    $closeBtn.remove();
                    $wrap.addEventListener(`animationend`, () => {
                        document.body.removeAttribute(`style`);
                        $wrap.remove();
                        $showBtn.style.removeProperty(`display`);
                    });
                    $wrap.style.animation = `sidebar-fade-out 400ms both`;
                });
            });
        }
    });
})(document.querySelector(`.wrapper > .main-sidebar`));
