import { IView } from '../../types';
import { Product } from '../model/api/Product';
import { IEvents } from '../base/events';

export const CatalogItemAddToCartEvent = 'ui:catalog:add-to-cart';

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

	render(data: { product: Product }): HTMLElement {

		this.category.textContent = data.product.category;
		this.title.textContent = data.product.title;
		this.text.textContent = data.product.description;
		this.price.textContent = String(data.product.price);

		this.button.onclick = () => {
			this.events.emit(CatalogItemAddToCartEvent, {product: Product})
		};
 		return this.container;
	}
}