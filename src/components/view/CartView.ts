import { IView } from '../../types';
import { createElement } from '../../utils/utils';
import { CartItemView } from './CartItemView';
import { Cart } from '../model/Cart';

export class CartView implements IView {
	template: HTMLTemplateElement;

	constructor() {
		this.template = document.getElementById('card-basket') as HTMLTemplateElement;
	}
	render(data: { cart: Cart, totalAmount: number }): HTMLElement {
		const views = data.cart.items.map(p => new CartItemView(this.template).render({product: p}))

		//@todo отрендерить представления, отобразить orderAmount

		return createElement('div');
	}
}