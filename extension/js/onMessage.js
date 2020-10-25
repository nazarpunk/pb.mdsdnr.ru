"use strict";
{
    const onMessage = (request, sender, sendResponse) => {
        const manifest = chrome.runtime.getManifest();
        if (request.hasOwnProperty(`setClientSidebar`)) {
            chrome.storage.local.get(['token'], result => {
                if (!result.hasOwnProperty(`token`))
                    return;
                fetch(`${manifest.homepage_url}/mindnr.php?user|updateClientSidebar`, {
                    method: `POST`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client: request.setClientSidebar,
                        sidebar: request.sidebar,
                        token: result.token
                    })
                })
                    .then(r => r.json())
                    .then(data => sendResponse(data))
                    .catch(e => sendResponse({ error: e.message }));
            });
            return true;
        }
        if (request.hasOwnProperty(`getClientSidebar`)) {
            chrome.storage.local.get([`ID`, `clients`], result => {
                const out = { ID: 0, sidebar: [] };
                if (result.hasOwnProperty(`ID`) && result.hasOwnProperty(`clients`)) {
                    result.clients.some(client => {
                        if (client.login !== request.getClientSidebar)
                            return false;
                        out.ID = result.ID;
                        out.sidebar = client.sidebar === null ? [] : client.sidebar.split(`,`);
                        return true;
                    });
                }
                sendResponse(out);
            });
            return true;
        }
        if (request.hasOwnProperty(`getManifest`)) {
            sendResponse(manifest);
            return true;
        }
        if (request.hasOwnProperty(`getClients`)) {
            chrome.storage.local.get(['ID', 'clients', 'token'], result => sendResponse(result));
            return true;
        }
        if (request.hasOwnProperty(`updateData`)) {
            chrome.storage.local.get(['token'], result => {
                if (!result.hasOwnProperty(`token`))
                    return;
                fetch(`${manifest.homepage_url}/mindnr.php?user|getData`, {
                    method: `POST`,
                    body: result.token
                })
                    .then(r => r.json())
                    .then(data => {
                    if (data.hasOwnProperty(`error`))
                        return chrome.storage.local.clear();
                    if (data.hasOwnProperty(`ID`))
                        chrome.storage.local.set(data);
                })
                    .catch(e => console.warn(e));
            });
        }
        if (request.hasOwnProperty(`getClientSignature`)) {
            let out = {};
            chrome.storage.local.get([`signature`], result => {
                result.signature.forEach(item => {
                    if (item.login === request.getClientSignature)
                        out[item.type] = item;
                });
                sendResponse(out);
            });
            return true;
        }
        if (request.hasOwnProperty(`saveClient`)) {
            fetch(`${manifest.homepage_url}/mindnr.php?user|saveClient`, {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request.saveClient)
            })
                .then(r => r.json())
                .then(data => sendResponse(data))
                .catch(e => sendResponse({ error: e.message }));
            return true;
        }
        if (request.hasOwnProperty(`saveSignature`)) {
            chrome.storage.local.get(['token'], result => {
                if (!result.hasOwnProperty(`token`))
                    return;
                request.saveSignature.token = result.token;
                fetch(`${manifest.homepage_url}/mindnr.php?user|saveSignature`, {
                    method: `POST`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request.saveSignature)
                })
                    .then(r => r.json())
                    .then(data => sendResponse(data))
                    .catch(e => sendResponse({ error: e.message }));
                return true;
            });
        }
        if (request.hasOwnProperty(`updateClientName`)) {
            chrome.storage.local.get(['token'], result => {
                if (!result.hasOwnProperty(`token`))
                    return;
                fetch(`${manifest.homepage_url}/mindnr.php?user|updateClientName`, {
                    method: `POST`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: result.token, login: request.login, name: request.updateClientName })
                })
                    .then(r => r.json())
                    .then(data => sendResponse(data))
                    .catch(e => sendResponse({ error: e.message }));
                return true;
            });
        }
        sendResponse({});
        return true;
    };
    chrome.runtime.onMessageExternal.addListener(onMessage);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuc2lvbi1vcGVyYS9leHRlbnNpb24vanMvYmFja2dyb3VuZC9vbk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBRUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFZLEVBQUUsTUFBVyxFQUFFLFlBQWlCLEVBQUUsRUFBRTtRQUNsRSxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBR3RELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7b0JBQUUsT0FBTztnQkFDNUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksc0NBQXNDLEVBQUU7b0JBQ3JFLE1BQU0sRUFBRyxNQUFNO29CQUNmLE9BQU8sRUFBRTt3QkFDUixRQUFRLEVBQVEsa0JBQWtCO3dCQUNsQyxjQUFjLEVBQUUsa0JBQWtCO3FCQUNsQztvQkFDRCxJQUFJLEVBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDQyxNQUFNLEVBQUcsT0FBTyxDQUFDLGdCQUFnQjt3QkFDakMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO3dCQUN4QixLQUFLLEVBQUksTUFBTSxDQUFDLEtBQUs7cUJBQ3JCLENBQUM7aUJBQzFCLENBQUM7cUJBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFD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QUFDLE9BQU8sQ0FBQztvQkFBRSxPQUFPO2dCQUM1QyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsWUFBWSxtQ0FBbUMsRUFBRTtvQkFDbEUsTUFBTSxFQUFHLE1BQU07b0JBQ2YsT0FBTyxFQUFFO3dCQUNSLFFBQVEsRUFBUSxrQkFBa0I7d0JBQ2xDLGNBQWMsRUFBRSxrQkFBa0I7cUJBQ2xDO29CQUNELElBQUksRUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDO2lCQUNwRyxDQUFDO3FCQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztTQUNIO1FBR0QsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEQiLCJmaWxlIjoiZXh0ZW5zaW9uLW9wZXJhL2V4dGVuc2lvbi9qcy9iYWNrZ3JvdW5kL29uTWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJvbk1lc3NhZ2UuZC50c1wiIC8+XHJcbi8vIEB0cy1ub2NoZWNrXHJcbntcclxuXHRcclxuXHRjb25zdCBvbk1lc3NhZ2UgPSAocmVxdWVzdDogYW55LCBzZW5kZXI6IGFueSwgc2VuZFJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdGNvbnN0IG1hbmlmZXN0OiBvYmplY3QgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cInNldENsaWVudFNpZGViYXJcIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGBzZXRDbGllbnRTaWRlYmFyYCkpIHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0PGFueT4oWyd0b2tlbiddLCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGB0b2tlbmApKSByZXR1cm47XHJcblx0XHRcdFx0ZmV0Y2goYCR7bWFuaWZlc3QuaG9tZXBhZ2VfdXJsfS9taW5kbnIucGhwP3VzZXJ8dXBkYXRlQ2xpZW50U2lkZWJhcmAsIHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGBQT1NUYCxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0J0FjY2VwdCcgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50IDogcmVxdWVzdC5zZXRDbGllbnRTaWRlYmFyLFxyXG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiByZXF1ZXN0LnNpZGViYXIsXHJcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuICA6IHJlc3VsdC50b2tlblxyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LnRoZW4ociA9PiByLmpzb24oKSlcclxuXHRcdFx0XHRcdC50aGVuKGRhdGEgPT4gc2VuZFJlc3BvbnNlKGRhdGEpKVxyXG5cdFx0XHRcdFx0LmNhdGNoKGUgPT4gc2VuZFJlc3BvbnNlKHtlcnJvcjogZS5tZXNzYWdlfSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cImdldENsaWVudFNpZGViYXJcIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGBnZXRDbGllbnRTaWRlYmFyYCkpIHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0PGFueT4oW2BJRGAsIGBjbGllbnRzYF0sIHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgb3V0ID0ge0lEOiAwLCBzaWRlYmFyOiBbXX07XHJcblx0XHRcdFx0aWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eShgSURgKSAmJiByZXN1bHQuaGFzT3duUHJvcGVydHkoYGNsaWVudHNgKSkge1xyXG5cdFx0XHRcdFx0cmVzdWx0LmNsaWVudHMuc29tZShjbGllbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2xpZW50LmxvZ2luICE9PSByZXF1ZXN0LmdldENsaWVudFNpZGViYXIpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0b3V0LklEICAgICAgPSByZXN1bHQuSUQ7XHJcblx0XHRcdFx0XHRcdG91dC5zaWRlYmFyID0gY2xpZW50LnNpZGViYXIgPT09IG51bGwgPyBbXSA6IGNsaWVudC5zaWRlYmFyLnNwbGl0KGAsYCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlbmRSZXNwb25zZShvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cImdldFZlcnNpb25cIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGBnZXRNYW5pZmVzdGApKSB7XHJcblx0XHRcdHNlbmRSZXNwb25zZShtYW5pZmVzdCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Ly8gPC9lZGl0b3ItZm9sZD5cclxuXHRcdFxyXG5cdFx0Ly8gPGVkaXRvci1mb2xkIGRlc2M9XCJnZXRDbGllbnRzXCI+XHJcblx0XHRpZiAocmVxdWVzdC5oYXNPd25Qcm9wZXJ0eShgZ2V0Q2xpZW50c2ApKSB7XHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldDxhbnk+KFsnSUQnLCAnY2xpZW50cycsICd0b2tlbiddLCByZXN1bHQgPT4gc2VuZFJlc3BvbnNlKHJlc3VsdCkpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdC8vIDwvZWRpdG9yLWZvbGQ+XHJcblx0XHRcclxuXHRcdC8vIDxlZGl0b3ItZm9sZCBkZXNjPVwidXBkYXRlRGF0YVwiPlxyXG5cdFx0aWYgKHJlcXVlc3QuaGFzT3duUHJvcGVydHkoYHVwZGF0ZURhdGFgKSkge1xyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQ8YW55PihbJ3Rva2VuJ10sIHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0aWYgKCFyZXN1bHQuaGFzT3duUHJvcGVydHkoYHRva2VuYCkpIHJldHVybjtcclxuXHRcdFx0XHRmZXRjaChgJHttYW5pZmVzdC5ob21lcGFnZV91cmx9L21pbmRuci5waHA/dXNlcnxnZXREYXRhYCwge1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBgUE9TVGAsXHJcblx0XHRcdFx0XHRib2R5ICA6IHJlc3VsdC50b2tlblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQudGhlbihyID0+IHIuanNvbigpKVxyXG5cdFx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGBlcnJvcmApKSByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoYElEYCkpIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQuY2F0Y2goZSA9PiBjb25zb2xlLndhcm4oZSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdC8vIDwvZWRpdG9yLWZvbGQ+XHJcblx0XHRcclxuXHRcdC8vIDxlZGl0b3ItZm9sZCBkZXNjPVwiZ2V0Q2xpZW50U2lnbmF0dXJlXCI+XHJcblx0XHRpZiAocmVxdWVzdC5oYXNPd25Qcm9wZXJ0eShgZ2V0Q2xpZW50U2lnbmF0dXJlYCkpIHtcclxuXHRcdFx0bGV0IG91dCA9IHt9O1xyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQ8YW55PihbYHNpZ25hdHVyZWBdLCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdHJlc3VsdC5zaWduYXR1cmUuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRcdGlmIChpdGVtLmxvZ2luID09PSByZXF1ZXN0LmdldENsaWVudFNpZ25hdHVyZSkgb3V0W2l0ZW0udHlwZV0gPSBpdGVtO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHNlbmRSZXNwb25zZShvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cInNhdmVDbGllbnRcIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGBzYXZlQ2xpZW50YCkpIHtcclxuXHRcdFx0ZmV0Y2goYCR7bWFuaWZlc3QuaG9tZXBhZ2VfdXJsfS9taW5kbnIucGhwP3VzZXJ8c2F2ZUNsaWVudGAsIHtcclxuXHRcdFx0XHRtZXRob2QgOiBgUE9TVGAsXHJcblx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0J0FjY2VwdCcgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3Quc2F2ZUNsaWVudClcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihyID0+IHIuanNvbigpKVxyXG5cdFx0XHRcdC50aGVuKGRhdGEgPT4gc2VuZFJlc3BvbnNlKGRhdGEpKVxyXG5cdFx0XHRcdC5jYXRjaChlID0+IHNlbmRSZXNwb25zZSh7ZXJyb3I6IGUubWVzc2FnZX0pKTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cInNhdmVTaWduYXR1cmVcIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGBzYXZlU2lnbmF0dXJlYCkpIHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0PGFueT4oWyd0b2tlbiddLCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGB0b2tlbmApKSByZXR1cm47XHJcblx0XHRcdFx0cmVxdWVzdC5zYXZlU2lnbmF0dXJlLnRva2VuID0gcmVzdWx0LnRva2VuO1xyXG5cdFx0XHRcdGZldGNoKGAke21hbmlmZXN0LmhvbWVwYWdlX3VybH0vbWluZG5yLnBocD91c2VyfHNhdmVTaWduYXR1cmVgLCB7XHJcblx0XHRcdFx0XHRtZXRob2QgOiBgUE9TVGAsXHJcblx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdCdBY2NlcHQnICAgICAgOiAnYXBwbGljYXRpb24vanNvbicsXHJcblx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRib2R5ICAgOiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LnNhdmVTaWduYXR1cmUpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC50aGVuKHIgPT4gci5qc29uKCkpXHJcblx0XHRcdFx0XHQudGhlbihkYXRhID0+IHNlbmRSZXNwb25zZShkYXRhKSlcclxuXHRcdFx0XHRcdC5jYXRjaChlID0+IHNlbmRSZXNwb25zZSh7ZXJyb3I6IGUubWVzc2FnZX0pKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cdFx0XHJcblx0XHQvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cInVwZGF0ZUNsaWVudE5hbWVcIj5cclxuXHRcdGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KGB1cGRhdGVDbGllbnROYW1lYCkpIHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0PGFueT4oWyd0b2tlbiddLCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGB0b2tlbmApKSByZXR1cm47XHJcblx0XHRcdFx0ZmV0Y2goYCR7bWFuaWZlc3QuaG9tZXBhZ2VfdXJsfS9taW5kbnIucGhwP3VzZXJ8dXBkYXRlQ2xpZW50TmFtZWAsIHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGBQT1NUYCxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0J0FjY2VwdCcgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt0b2tlbjogcmVzdWx0LnRva2VuLCBsb2dpbjogcmVxdWVzdC5sb2dpbiwgbmFtZTogcmVxdWVzdC51cGRhdGVDbGllbnROYW1lfSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LnRoZW4ociA9PiByLmpzb24oKSlcclxuXHRcdFx0XHRcdC50aGVuKGRhdGEgPT4gc2VuZFJlc3BvbnNlKGRhdGEpKVxyXG5cdFx0XHRcdFx0LmNhdGNoKGUgPT4gc2VuZFJlc3BvbnNlKHtlcnJvcjogZS5tZXNzYWdlfSkpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdC8vIDwvZWRpdG9yLWZvbGQ+XHJcblx0XHRcclxuXHRcdHNlbmRSZXNwb25zZSh7fSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0Y2hyb21lLnJ1bnRpbWUub25NZXNzYWdlRXh0ZXJuYWwuYWRkTGlzdGVuZXIob25NZXNzYWdlKTtcclxufSJdfQ==
