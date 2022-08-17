export interface IContact {
	id?: number;
	contact: string;
	name: string;
	email?: string;
	phone?: string;
}

export interface IresponseContactList {
	message: string;
	data: IContactsList
}

export interface IContactsList {
	contacts: IContact[];
}