import { IProductDetails, IView } from '../../types';
import { IEvents } from '../base/events';
import { ViewEvents } from '../../types'

export class CatalogProductView implements IView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	text: HTMLElement;
	price: HTMLElement;
	button: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
		this.category = this.container.querySelector('.card__category');
		this.title = this.container.querySelector('.card__title');
		this.text = this.container.querySelector('.card__text');
		this.price = this.container.querySelector('.card__price');
		this.button = this.container.querySelector('.card__button');
	}

	render(data: { product: IProductDetails }): HTMLElement {

		this.category.textContent = data.product.category;
		this.title.textContent = data.product.title;
		this.text.textContent = data.product.description;
		this.price.textContent = String(data.product.price);

		this.button.onclick = () => {
			this.events.emit(ViewEvents.UiCatalogItemAddToCartEvent, {product: data.product})
		};
 		return this.container;
	}
}