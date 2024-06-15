import { IOrderCreateResponse } from '../../../types';

export class OrderResponse implements IOrderCreateResponse {
	id: string;
	total: number;
}