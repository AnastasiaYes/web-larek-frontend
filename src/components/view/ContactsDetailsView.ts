import { IView, ModelEvents, OrderContactsFilledFailed, ViewEvents } from '../../types';
import { IEvents } from '../base/events';
import * as querystring from 'querystring';
import { createElement, isBoolean } from '../../utils/utils';

export class ContactsDetailsView implements IView {
	container: HTMLElement;
	email: HTMLInputElement;
	emailError: HTMLSpanElement | null = null;
	phone: HTMLInputElement;
	phoneError: HTMLSpanElement | null = null;
	button: HTMLButtonElement;

	constructor(private events: IEvents) {
		this.container = (document.querySelector('#contacts') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
		this.email = this.container.querySelector('[name="email"]');
		this.phone = this.container.querySelector('[name="phone"]');
		this.button = this.container.querySelector('.button[type="submit"]');

		this.email.addEventListener('input', () => {
			this.events.emit(ViewEvents.UiOrderContactsDetailsFilled, {
				email: this.email.value,
				phone: this.phone.value,
			});
		});

		this.phone.addEventListener('input', () => {
			this.events.emit(ViewEvents.UiOrderContactsDetailsFilled, {
				email: this.email.value,
				phone: this.phone.value,
			});
		});

		this.container.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit(ViewEvents.UiOrderOpenSuccessfulModal);
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

	clearCart() {
		this.email.value = '';
		this.phone.value = '';
		this.events.emit(ViewEvents.UiContactsDetailsCleared);
		this.disableButton();
	}

	showError(result: OrderContactsFilledFailed) {
		this.clearErrors();

		const errorSpan = (result.field === 'email' ? this.emailError : this.phoneError) ?? createElement('span');
		errorSpan.classList.add('error-message');
		errorSpan.textContent = result.message;

		if (result.field === 'email') {
			this.email.after(errorSpan);
			this.emailError = errorSpan;
		} else {
			this.phone.after(errorSpan);
			this.phoneError = errorSpan;
		}
	}

	clearErrors() {
		this.emailError?.remove();
		this.phoneError?.remove();
	}
}