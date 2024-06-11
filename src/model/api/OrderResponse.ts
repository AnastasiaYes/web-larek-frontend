import { IOrderCreateResponse } from '../../types';

class OrderResponse implements IOrderCreateResponse {
	id: string;
	total: number;
}