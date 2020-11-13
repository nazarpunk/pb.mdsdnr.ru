{
	const onMessage = (request: any, sender: any, sendResponse: any) => {
		const manifest: chrome.runtime.Manifest = chrome.runtime.getManifest();
		
		// <editor-fold desc="setClientSidebar">
		if (request.hasOwnProperty(`setClientSidebar`)) {
			chrome.storage.local.get(['token'], result => {
				if (!result.hasOwnProperty(`token`)) return;
				fetch(`${manifest.homepage_url}/mindnr.php?user|updateClientSidebar`, {
					method: `post`,
					body  : JSON.stringify({
						                       client : request.setClientSidebar,
						                       sidebar: request.sidebar,
						                       token  : result.token
					                       })
				})
					.then(r => r.json())
					.then(data => sendResponse(data))
					.catch(e => sendResponse({error: e.message}));
			});
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="getClientSidebar">
		if (request.hasOwnProperty(`getClientSidebar`)) {
			chrome.storage.local.get([`ID`, `clients`], result => {
				const out: {
					ID: number,
					sidebar: string[]
				} = {
					ID     : 0,
					sidebar: []
				};
				if (result.hasOwnProperty(`ID`) && result.hasOwnProperty(`clients`)) {
					result.clients.some((client: {
						login: string,
						sidebar: string
					}) => {
						if (client.login !== request.getClientSidebar) return false;
						out.ID = result.ID;
						out.sidebar = client.sidebar === null ? [] : client.sidebar.split(`,`);
						return true;
					});
				}
				sendResponse(out);
			});
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="getVersion">
		if (request.hasOwnProperty(`getManifest`)) {
			sendResponse(manifest);
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="getClients">
		if (request.hasOwnProperty(`getClients`)) {
			chrome.storage.local.get(['ID', 'clients', 'token'], result => sendResponse(result));
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="updateData">
		if (request.hasOwnProperty(`updateData`)) {
			chrome.storage.local.get(['token'], result => {
				if (!result.hasOwnProperty(`token`)) return;
				fetch(`${manifest.homepage_url}/mindnr.php?user|getData`, {
					method: `POST`,
					body  : result.token
				})
					.then(r => r.json())
					.then(data => {
						if (data.hasOwnProperty(`error`)) return chrome.storage.local.clear();
						if (data.hasOwnProperty(`ID`)) chrome.storage.local.set(data);
					})
					.catch(e => console.warn(e));
			});
		}
		// </editor-fold>
		
		// <editor-fold desc="getClientSignature">
		if (request.hasOwnProperty(`getClientSignature`)) {
			let out: {
				[key: string]: {}
			} = {};
			chrome.storage.local.get([`signature`], result => {
				result.signature.forEach((item: {
					login: string,
					type: string
				}) => {
					if (item.login === request.getClientSignature) out[item.type] = item;
				});
				sendResponse(out);
			});
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="saveClient">
		if (request.hasOwnProperty(`saveClient`)) {
			fetch(`${manifest.homepage_url}/mindnr.php?user|saveClient`, {
				method : `POST`,
				headers: {
					'Accept'      : 'application/json',
					'Content-Type': 'application/json'
				},
				body   : JSON.stringify(request.saveClient)
			})
				.then(r => r.json())
				.then(data => sendResponse(data))
				.catch(e => sendResponse({error: e.message}));
			return true;
		}
		// </editor-fold>
		
		// <editor-fold desc="saveSignature">
		if (request.hasOwnProperty(`saveSignature`)) {
			chrome.storage.local.get(['token'], result => {
				if (!result.hasOwnProperty(`token`)) return;
				request.saveSignature.token = result.token;
				fetch(`${manifest.homepage_url}/mindnr.php?user|saveSignature`, {
					method : `POST`,
					headers: {
						'Accept'      : 'application/json',
						'Content-Type': 'application/json'
					},
					body   : JSON.stringify(request.saveSignature)
				})
					.then(r => r.json())
					.then(data => sendResponse(data))
					.catch(e => sendResponse({error: e.message}));
				return true;
			});
		}
		// </editor-fold>
		
		// <editor-fold desc="updateClientName">
		if (request.hasOwnProperty(`updateClientName`)) {
			chrome.storage.local.get(['token'], result => {
				if (!result.hasOwnProperty(`token`)) return;
				fetch(`${manifest.homepage_url}/mindnr.php?user|updateClientName`, {
					method : `POST`,
					headers: {
						'Accept'      : 'application/json',
						'Content-Type': 'application/json'
					},
					body   : JSON.stringify({token: result.token, login: request.login, name: request.updateClientName})
				})
					.then(r => r.json())
					.then(data => sendResponse(data))
					.catch(e => sendResponse({error: e.message}));
				return true;
			});
		}
		// </editor-fold>
		
		sendResponse({});
		return true;
	}
	chrome.runtime.onMessageExternal.addListener(onMessage);
}