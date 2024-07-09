import { IItemList, IProductDetails } from '../../types';
import { IEvents } from '../base/events';
import { ModelEvents } from '../../types'

export class Catalog {
	items: IProductDetails[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
		this.items = [];
	}

	addItems(products: IProductDetails[]) { // добавление в каталог
		products.forEach(product => {this.items.push(product)});
		this._itemAdded();
	}

		getProduct(id: string) {
			for (let i = 0; i < this.items.length; i++) {
				const product = this.items[i];
				if (product.id === id){
					return product;
				}
			}
			return null;
		}

	protected _itemAdded() {
		this.events.emit(ModelEvents.CatalogEventItemsAdded)
	}
}