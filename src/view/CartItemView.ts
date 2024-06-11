import { IProductDetails, IView } from '../types';
import { createElement } from '../utils/utils';

class CartItemView implements IView
{
	item: IProductDetails;
	constructor(item: IProductDetails) {
		this.item = item;
	}
	render()
	{
		return createElement('div'); // @todo render item
	}
}