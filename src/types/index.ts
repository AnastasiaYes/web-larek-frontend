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
	price: number|null;
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
	UiCatalogItemAddError = "ui:catalog:error-add-to-cart",
	UiCatalogItemOpenEvent = 'ui:catalog:item-open',
	UiCartItemRemove = 'ui:cart:remove--item',
	UiOnOrder = 'ui:on-order',
	UiOrderContactsDetailsFilled = 'ui:order:contacts-details-filled',
	UiContactsDetailsCleared = 'ui:contacts-details-cleared',
	UiOrderPaymentDetailsFilled =  'ui:order:payment-details-filled',
	UiPaymentDetailsCleared = 'ui:payment-details-cleared',
	UiOrderOpenContactsDetails = 'ui:order:open-contacts-details',
	UiOrderOpenSuccessfulModal = 'ui:order:open-successful-modal',
	UiModalClose =  'ui:modal:close',
};
export enum ModelEvents {
	CartEventItemRemove = 'cart:item-removed',
	CartEventItemAdded = 'cart:item-added',
	CartCleared = 'cart:cleared',
	CatalogEventItemsAdded = 'catalog:item-added',
	OrderPaymentDetailsFilled = 'order:payment-details-filled',
	OrderContactsFilled = 'order:contacts-filled',
	OrderContactsFilledFailed = 'order:contacts-filled-failed',
	OrderPaymentDetailsFillFailed = 'order:payment-filled-failed',
};

export type OrderContactsFilledFailed = {
	field: 'phone' | 'email',
	message: string
};

export type OrderPaymentDetailsFillFailed = {
	field: 'payment' | 'address',
	message: string
}