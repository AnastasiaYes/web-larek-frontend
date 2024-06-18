import { IView } from '../../types';
import { IEvents } from '../base/events';

export const UiOrderPaymentDetailsFilled =  'ui:order:payment-details-filled';
export class PaymentDetailsView implements IView {
	container: HTMLElement;
	constructor(private events: IEvents) {
		this.container = (document.querySelector('#order') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
	}

	render(): HTMLElement {
		this.container.addEventListener('submit', () => {
			this.events.emit(UiOrderPaymentDetailsFilled, {payment: "123123", address: '123213'}) // @todo get payment & address
		});

		return this.container as HTMLElement;
	}
}