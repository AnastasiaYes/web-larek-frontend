import { IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class SuccessfulSendingView implements IView {
	container: HTMLElement;
	button: HTMLButtonElement;
	totalAmount: HTMLElement;

	constructor( private events: IEvents ) {
		this.container = (document.querySelector('#success') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
		this.button = this.container.querySelector('.order-success__close');
		this.totalAmount = this.container.querySelector('.order-success__description-total-amount')

		this.button.addEventListener('click', () => {
			this.events.emit(ViewEvents.UiModalClose);
		})
	}

	render(data: { totalAmount: number }): HTMLElement {
		this.totalAmount.textContent = String(data.totalAmount);

		return this.container;
	};
}