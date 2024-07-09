import { IOrder, OrderContactsFilledFailed, OrderPaymentDetailsFillFailed } from '../../types';
import { IEvents } from '../base/events';
import { ModelEvents } from '../../types'

export class Order implements IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;

	constructor(private events: IEvents) {
	}

	fillPaymentDetails(reqPayment: undefined|null|string, reqAddress: string) {

		if (!reqPayment) {
			this._paymentDetailsFilledFailed( {field: 'payment', message: 'invalid payment' })
			return;
		}
		this.payment = reqPayment;

		if (reqAddress.length < 3) {
			this._paymentDetailsFilledFailed( {field: 'address', message: 'invalid address' })
			return;
		}
		this.address = reqAddress;

		this._paymentDetailsFilled(reqPayment, reqAddress)
	}

	protected _paymentDetailsFilled(payment: string, address: string) {
		this.events.emit(ModelEvents.OrderPaymentDetailsFilled, { payment, address })
	}

	protected _paymentDetailsFilledFailed(result: OrderPaymentDetailsFillFailed) {
		this.events.emit(ModelEvents.OrderPaymentDetailsFillFailed, result);
	}

	fillContactsDetails(email: string, phone: string) {
		const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/;
		const regexPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

		const validEmail = regexEmail.test(String(email).toLowerCase());
		const validPhone = regexPhone.test(String(phone).toLowerCase());

		if (validEmail && validPhone) {
			this.email = email;
			this.phone = phone;
			this._contactFilled(email, phone);
		} else if (!validEmail) {
			this._contactFilledFailed( {field: 'email', message: 'invalid email' })
		} else {
			this._contactFilledFailed( {field: 'phone', message: 'invalid phone' })
		}
	}

	protected _contactFilled(email:string, phone:string) {
		this.events.emit(ModelEvents.OrderContactsFilled, { email, phone })
	}

	protected _contactFilledFailed(result: OrderContactsFilledFailed) {
		this.events.emit(ModelEvents.OrderContactsFilledFailed, result)
	}

}
