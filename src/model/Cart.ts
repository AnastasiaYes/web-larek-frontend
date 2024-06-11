//cart содержит список товаров и их количество
// может сумму и ещё чтото хз

import { IProductDetails } from '../types';
import { IEvents } from '../components/base/events';

export const CartEventItemAdded = 'cart:item-added';

class Cart {
	items: IProductDetails[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	addItem(product: IProductDetails) {
		this.items.push(product);
		this._itemAdded(product);
	}

	protected _itemAdded(product: IProductDetails)
	{
		this.events.trigger(CartEventItemAdded, { product })
	}
}