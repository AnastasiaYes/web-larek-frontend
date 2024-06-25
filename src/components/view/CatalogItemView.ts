import { IProductDetails, IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

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

	render(data: { product: IProductDetails }): HTMLElement {
		this.category.textContent = data.product.category;
		this.title.textContent = data.product.title;
		this.price.textContent = String(data.product.price);

		this.container.addEventListener('click', () => {
			this.events.emit(ViewEvents.UiCatalogItemOpenEvent, { product: data.product })
		})

		return this.container;
	}
}