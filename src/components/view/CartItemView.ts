import { IProductDetails, IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class CartItemView implements IView {
	container: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	index: HTMLElement;
	deleteButton: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
		this.title = this.container.querySelector('.card__title');
		this.price = this.container.querySelector('.card__price');
		this.index = this.container.querySelector('.basket__item-index');
		this.deleteButton = this.container.querySelector('.basket__item-delete');
	}
	render(data: { product: IProductDetails, index: number }): HTMLElement {
		this.title.textContent = data.product.title;
		this.price.textContent = String(data.product.price);
		this.index.textContent = String(data.index+1);

		this.deleteButton.addEventListener('click', () => {
			this.events.emit(ViewEvents.UiCartItemRemove, {index: data.index});
		});

		return this.container;
	}
}