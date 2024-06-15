import { IView } from '../../types';
import { Product } from '../model/api/Product';

export const CatalogItemAddToCartEvent = 'ui:catalog:add-to-cart';

export class CatalogProductView implements IView {
	container: HTMLElement;
	constructor(template: HTMLElement) {
		this.container = template.querySelector('.card_full');
	}

	render(data: { product: Product }): HTMLElement {
		const container = this.container.cloneNode(true) as HTMLElement;

		container.querySelector('.card__category').textContent = data.product.category;
		container.querySelector('.card__title').textContent = data.product.title;
		container.querySelector('.card__text').textContent = data.product.description;
		container.querySelector('.card__price').textContent = String(data.product.price);

		const button = container.querySelector('.card__button');
		button.addEventListener('click', function() {
			this.events.emit(CatalogItemAddToCartEvent, {product: Product})
		})
 		return container;
	}
}