import { IProductDetails } from '../../types';
import { IEvents } from '../base/events';
import {ModelEvents} from '../../types'

export class Cart {
	items: IProductDetails[];
	totalAmount: number;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
		this.items = [];
		this.totalAmount = 0;
	}

	addItem(product: IProductDetails) {
		this.items.push(product);
		this.totalAmount += product.price;
		this._itemAdded(product)
	}
	protected _itemAdded(product: IProductDetails) {
		this.events.emit(ModelEvents.CartEventItemAdded, { product })
	}

	removeItem(removeId: string) {
		const data: IProductDetails[] = [];
		let target: IProductDetails|null = null;
		for (let i = 0; i < this.items.length; i++) {
			const product = this.items[i];
			if (product.id !== removeId) {
				data.push(product);
				continue;
			}
			target = product;
			this.totalAmount -= product.price;
		}

		this.items = data;
		if (target !== null) {
			this._itemRemove(target)
		}
	}
	protected _itemRemove (product: IProductDetails) {
		this.events.emit(ModelEvents.CartEventItemRemove, { product })
	}

	clearCart() {
		this.items = [];
		this.totalAmount = 0;
		this.events.emit(ModelEvents.CartCleared);
	}

}