import { IView } from '../../types';
import { Product } from '../model/api/Product';
import { IEvents } from '../base/events';

export const CatalogItemOpenEvent = 'ui:catalog:item-open';

export class CatalogItemView implements IView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
		this.category = this.container.querySelector('.card__category');
		this.title = this.container.querySelector('.card__title');
		this.price = this.container.querySelector('.card__price');
	}

	render(data: { product: Product }): HTMLElement {
		this.category.textContent = data.product.category;
		this.title.textContent = data.product.title;
		this.price.textContent = String(data.product.price);

		this.container.addEventListener('click', () => {
			this.events.emit(CatalogItemOpenEvent, { product: Product })
		})

		return this.container;
	}
}