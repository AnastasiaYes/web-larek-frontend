import { IOrder } from '../../types';
import { IEvents } from '../base/events';
import { ModelEvents } from '../../types'

export class Order implements IOrder {
	payment: string
	email: string
	phone: string
	address: string
	total: number

	constructor(private events: IEvents) {}

	fillPaymentDetails(payment: string, address: string) {
		//@todo проверка входящих параметров
		this.payment = payment;
		this.address = address;
		this._paymentDetailsFilled(payment, address)
	}
	protected _paymentDetailsFilled(payment:string, address:string) {
		this.events.emit(ModelEvents.OrderPaymentDetailsFilled, { payment, address })
	}

	fillContactsDetails(email: string, phone: string) {
		//@todo проверка входящих параметров. если корректно то сеттим поля и вызываем _контактФиллед, если некорректно, можно придумать событие Оред контакст филлед фейлед, которое оповестит о поле, где была ошибка и детали ошибки, текстом.
		this.email = email;
		this.phone = phone;

		/*type OrderContactsFilledFailed = {
			field: 'phone' | 'email',
			message: string
		}*/
		this._contactFilled(email, phone)
	}
	protected _contactFilled(email:string, phone:string) {
		this.events.emit(ModelEvents.OrderContactsFilled, { email, phone })
	}
	protected _contactFilledFailed(result: OrderContactsFilledFailed) {
		this.events.emit(ModelEvents.OrderContactsFilledFailed, result)
	}
}