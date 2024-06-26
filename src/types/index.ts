export interface IItemList<T> {
	total: number;
	items: T[];
}
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

export enum ViewEvents {
	UiCatalogItemAddToCartEvent = 'ui:catalog:add-to-cart',
	UiCatalogItemOpenEvent = 'ui:catalog:item-open',
	UiOrderContactsDetailsFilled = 'ui:order:contacts-details-filled',
	UiOrderPaymentDetailsFilled =  'ui:order:payment-details-filled'
};
export enum ModelEvents {
	CartEventItemRemove = 'cart:item-removed',
	CartEventItemAdded = 'cart:item-added',
	CatalogEventItemAdded = 'catalog:item-added',
	OrderPaymentDetailsFilled = 'order:payment-details-filled',
	OrderContactsFilled = 'order:contacts-filled',
	OrderCreated = 'order:created'
};