import { IProductDetails } from '../../types';
import { IEvents } from '../base/events';
import { ModelEvents } from '../../types'

export class Catalog {
	items: IProductDetails[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
		this.items = [];
	}

	addItem(product: IProductDetails) { // добавление в каталог
		this.items.push(product);
		this._itemAdded(product);
	}

	//@todo получение продукта
		getProduct(id: string) {
			for (let i = 0; i < this.items.length; i++) {
				const product = this.items[i];
				if (product.id === id){
					return product;
				}
			}
			return null;
		}

	protected _itemAdded(product: IProductDetails) {
		this.events.emit(ModelEvents.CatalogEventItemAdded, { product })
	}
}