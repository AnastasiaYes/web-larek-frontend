import { IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class PaymentDetailsView implements IView {
	container: HTMLElement;
	selectedPayment: HTMLButtonElement | null = null;
	address: HTMLInputElement;
	button: HTMLElement;

	constructor(private events: IEvents) {
		this.container = (document.querySelector('#order') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
		this.address = this.container.querySelector('.form__input[type="text"]');
		this.button = this.container.querySelector('.button[type="submit"]');

		this.processPaymentMethodsListener();

		this.address.addEventListener('input', () => {
			this.events.emit(ViewEvents.UiOrderPaymentDetailsFilled, {
				payment: this.selectedPayment?.textContent ?? null,
				address: this.address.value,
			});
		});

		this.container.addEventListener('submit', (event) => {
			event.preventDefault()
			this.events.emit(ViewEvents.UiOrderOpenContactsDetails);
		});
	}

	render(): HTMLElement {
		return this.container as HTMLElement;
	}

	enableButton(): void {
		this.button.removeAttribute('disabled');
	}

	disableButton(): void {
		this.button.setAttribute('disabled', 'true');
	}

	private processPaymentMethodsListener() {
		const paymentMethods = this.container.querySelectorAll('.order__buttons button');
		const activeClass = 'button_alt-active';

		paymentMethods.forEach(btn => {
			btn.addEventListener('click', (event) => {
				this.onChoosePaymentMethod(event, activeClass, paymentMethods);
				this.events.emit(ViewEvents.UiOrderPaymentDetailsFilled, {
					payment: this.selectedPayment?.textContent ?? null,
					address: this.address.value,
				});
			});
		});
	}

	private onChoosePaymentMethod(event: Event, activeClass: string, paymentMethods: NodeListOf<Element>) {
		const currTarget = event.currentTarget as HTMLButtonElement;
		currTarget.classList.toggle(activeClass);

		if (currTarget.classList.contains(activeClass)) {
			paymentMethods.forEach(el => {
				if (currTarget === el) {
					return;
				}
				el.classList.remove(activeClass);
			});

			this.selectedPayment = currTarget as HTMLButtonElement;
			return;
		}

		this.selectedPayment = null;
	}
	clearCart() {
		if (this.selectedPayment) {
			this.selectedPayment.classList.remove('button_alt-active');
			this.selectedPayment = null;
		}
		this.address.value = '';
		this.events.emit(ViewEvents.UiPaymentDetailsCleared);
		this.disableButton();
	}
}