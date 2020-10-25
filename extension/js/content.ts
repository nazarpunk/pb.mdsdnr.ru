{
	new MutationObserver(mutations => {
		mutations.forEach(({addedNodes}) => {
			(<NodeListOf<HTMLScriptElement>>addedNodes).forEach((node) => {
				if (node.nodeType === window.Node.COMMENT_NODE) return node.remove();
				if (node.nodeType !== 1 || node.tagName !== 'SCRIPT' || node.text === ``) return;
				return (
					       node.text.indexOf(`$.widget.bridge`) >= 0 ||
					       node.text.indexOf(`function get_name_browser`) >= 0
				       ) ? node.remove() : false;
			})
		})
	}).observe(document, {
		childList: true,
		subtree  : true
	});
	
	const favicon = (path: string) => {
		let favicon = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
		if (!favicon) {
			favicon     = document.createElement('link');
			favicon.rel = 'shortcut icon';
			let $head   = document.querySelector<HTMLHeadElement>('head');
			if ($head !== null) $head.appendChild(favicon);
		}
		favicon.type = 'image/png';
		favicon.href = path;
	}
	
	const js = (path: string) => {
		let $js   = document.createElement(`script`);
		$js.src   = `chrome-extension://${chrome.runtime.id}/${path}`;
		$js.async = false;
		document.head.appendChild($js);
	}
	
	window.addEventListener('DOMContentLoaded', () => {
		document.head.setAttribute(`data-extension-id`, chrome.runtime.id);
		
		favicon(`chrome-extension://${chrome.runtime.id}/img/ico/ext-16.png`);
		js(`page/page.js`);
	});
}