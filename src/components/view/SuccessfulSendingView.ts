import { IView } from '../../types';

export class SuccessfulSendingView implements IView {
	container: HTMLElement;
	constructor() {
		this.container = document.querySelector('#success > .order-success');
	}
	render(data: {totalAmount: number}): HTMLElement {
		return this.container;
	};
}