import { IOrder } from '../../types';
import { IEvents } from '../base/events';

export const OrderPaymentDetailsFilled = 'order:payment-details-filled';
export const OrderContactsFilled = 'order:contacts-filled';
export const OrderCreated = 'order:created';
export class Order implements IOrder {
	payment: string
	email: string
	phone: string
	address: string
	total: number

	constructor(private events: IEvents) {}


	fillPaymentDetails(payment: string, address: string) {
		this.payment = payment;
		this.address = address;
		this._paymentDetailsFilled(payment, address)
	}
	protected _paymentDetailsFilled(payment:string, address:string) {
		this.events.emit(OrderPaymentDetailsFilled, { payment, address })
	}

	fillContactsDetails(email: string, phone: string) {
		this.email = email;
		this.phone = phone;
		this._contactFilled(email, phone)
	}
	protected _contactFilled(email:string, phone:string) {
		this.events.emit(OrderContactsFilled, { email, phone })
	}

}