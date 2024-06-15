export interface IItemList<T> {
	total: number;
	items: T[];
}

export interface IProductDetails {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IOrderCreateRequest {
	payment: string
	email: string
	phone: string
	address: string
	total: number,
	items: string[]
}

export interface IOrder {
	payment: string
	email: string
	phone: string
	address: string
	total: number,
}

export interface IOrderCreateResponse {
	id: string;
	total: number;
}

export interface IView {
	render(data?: any): HTMLElement;
}