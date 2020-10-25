declare var isClientLogged: boolean;
declare var clientId: string;
declare var isSubpageCreate: boolean;
declare var isSubpageUpdate: boolean;
declare var pageName: string;

interface Window {
	//isClientLogged: typeof isClientLogged,
	//clientId: typeof clientId,
	//isSubpageCreate: typeof isSubpageCreate,
	//isSubpageUpdate: typeof isSubpageUpdate,
	//pageName: typeof pageName
}

interface Client {
	loginHash: string,
	name: string,
	login: string,
	password: string,
	token: string,
	userToken?: string
}

interface ClientsData {
	[key: string]: Client
}

interface UserData {
	ID: number,
	clients: Client[],
	token: string
}

// fuck jquery
declare function jQuery(a?: any): any;