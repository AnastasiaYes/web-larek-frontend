import { IProductDetails, IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class CatalogItemView implements IView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
		this.category = this.container.querySelector('.card__category');
		this.title = this.container.querySelector('.card__title');
		this.image = this.container.querySelector('.card__image');
		this.price = this.container.querySelector('.card__price');
	}

	render(data: { product: IProductDetails }): HTMLElement {
		this.category.textContent = data.product.category;
		this.image.src = process.env.CONTENT_URL + data.product.image;
		this.title.textContent = data.product.title;
		this.price.textContent = String(data.product.price);

		this.container.addEventListener('click', (e) => {
			e.stopPropagation();
			this.events.emit(ViewEvents.UiCatalogItemOpenEvent, { product: data.product })
		})

		return this.container;
	}
}