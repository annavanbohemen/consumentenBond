export interface IContact {
	id?: number;
	contact: string;
	name: string;
	email?: string;
	phone?: string;
}

export interface IContactsList {
	contacts: IContact[];
}