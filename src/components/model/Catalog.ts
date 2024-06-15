//все что находится в папке api - это классы, которые используются в качестве ответов от внешнего сервиса.
// Все что не в апи - используется нашим проектом - это наши модели, у которых есть какой-то функцционал, в то время как сущности апи не имеют функций, они только передают значения

import { IProductDetails } from '../../types';
import { IEvents } from '../base/events';

export const CatalogEventItemAdded = 'catalog:item-added';

export class Catalog {
	items: IProductDetails[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
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
		this.events.emit(CatalogEventItemAdded, { product })
	}
}