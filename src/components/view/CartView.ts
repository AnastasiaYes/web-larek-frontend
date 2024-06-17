import { IView } from '../../types';
import { createElement } from '../../utils/utils';
import { CartItemView } from './CartItemView';
import { Cart } from '../model/Cart';

export class CartView implements IView {
	template: HTMLElement;

	constructor() {
		this.template = document.getElementById('card-basket');
	}
	render(data: { cart: Cart }): HTMLElement {
		let orderAmount = 0;
		data.cart.items.forEach(p => orderAmount += p.price);

		const views = data.cart.items.map(p => new CartItemView(this.template).render({product: p}))

		//@todo отрендерить представления, отобразить orderAmount

		return createElement('div');
	}
}