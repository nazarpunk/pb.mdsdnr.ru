chrome.webRequest.onBeforeRequest.addListener(
	details => {
		const url = details.url.replace(`https://pb.mdsdnr.ru/`, ``);
		const ext = url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2);
		if ([`css`, `js`, `map`, `png`, `gif`, `jpg`, `jpeg`, `eot`, `woff`, `woff2`, `svg`].includes(ext)) return {redirectUrl: chrome.extension.getURL(url)}
	},
	{urls: [`*://pb.mdsdnr.ru/*`]},
	[`blocking`]
);