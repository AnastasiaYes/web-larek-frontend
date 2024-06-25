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

	//@todo создать функцию addItem, которая принимает product: IProductDetails и добавляет себе в "память" - поле items + надо вызвать оповещение о том, что продукт был добавлен в корзину - 20 строка текущего файла
	addItem(product: IProductDetails) {
		this.items.push(product);
		this.totalAmount += product.price;
		this._itemAdded(product)
	}
	protected _itemAdded(product: IProductDetails) {
		this.events.emit(ModelEvents.CartEventItemAdded, { product })
	}
	//@todo создать функцию removeItem, которая принимает removeId: string и удаляет из items тот продукт, у которого id === removeId + надо создать новое событие о том, что продукт был удален. его можно назвать cart:item-remove - 7 строка этого файла
	removeItem(removeId: string) {
		const data: IProductDetails[] = [];
		for (let i = 0; i < this.items.length; i++) {
			const product = this.items[i];
			if (product.id !== removeId) {
				data.push(product);
				continue;
			}
			this.totalAmount -= product.price;
			this._itemRemove(product)
		}

		this.items = data;
	}
	protected _itemRemove (product: IProductDetails) {
		this.events.emit(ModelEvents.CartEventItemRemove, { product })
	}
}