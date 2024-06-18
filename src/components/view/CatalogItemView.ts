import { IView } from '../../types';
import { Product } from '../model/api/Product';
import { IEvents } from '../base/events';

export const CatalogItemOpenEvent = 'ui:catalog:item-open';

export class CatalogItemView implements IView {
	container: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild as HTMLElement;
	}

	render(data: { product: Product }): HTMLElement {
		const container = this.container.cloneNode(true) as HTMLElement;

		container.querySelector('.card__category').textContent = data.product.category;
		container.querySelector('.card__title').textContent = data.product.title;
		container.querySelector('.card__price').textContent = String(data.product.price);

		container.addEventListener('click', () => {
			this.events.emit(CatalogItemOpenEvent, { product: Product })
		})

		return container;
	}
}