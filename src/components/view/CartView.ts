import { IProductDetails, IView, ViewEvents } from '../../types';
import { createElement } from '../../utils/utils';
import { CartItemView } from './CartItemView';
import { Cart } from '../model/Cart';
import * as events from 'events';
import { IEvents } from '../base/events';

export class CartView implements IView {
	container: HTMLElement;
	itemTemplate: HTMLTemplateElement;
	title: HTMLElement;
	price: HTMLElement;
	basketButton: HTMLElement;
	orderButton: HTMLElement;
	basketList: HTMLElement;

	constructor(private events: IEvents) {
		this.container = (document.getElementById('basket') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
		this.itemTemplate = document.getElementById('card-basket').cloneNode(true) as HTMLTemplateElement;
		this.basketButton = this.container.querySelector('.basket__button');
		this.price = this.container.querySelector('.basket__price');
		this.basketList = this.container.querySelector('.basket__list');
		this.orderButton = this.container.querySelector('.basket__button');

		this.orderButton.addEventListener('click', () => {
			this.events.emit(ViewEvents.UiOnOrder, {});
		});
	}

	render(data: {cart: Cart}): HTMLElement {
		this.basketList.innerHTML = '';

		const views = data.cart.items.map(p => new CartItemView(this.itemTemplate, this.events).render({product: p}));
		views.forEach(view => {
			this.basketList.appendChild(view);
		});

		this.price.textContent = String(data.cart.totalAmount);

		return this.container;
	}
}