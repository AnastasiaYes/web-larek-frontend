import { IView } from '../../types';
import { Product } from '../model/api/Product';

export class CartItemView implements IView {
	container: HTMLElement;
	constructor(template: HTMLTemplateElement) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
	}
	render(data: { product: Product }): HTMLElement {
		const container = this.container.cloneNode(true) as HTMLElement;
		container.querySelector('.card__category').textContent = data.product.category;
		container.querySelector('.card__title').textContent = data.product.title;
		container.querySelector('.card__price').textContent = String(data.product.price);

		return container;
	}
}