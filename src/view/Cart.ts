import { IProductDetails, IView } from '../types';
import { createElement } from '../utils/utils';

class Cart implements IView
{
	items: IProductDetails[];
	constructor(items: IProductDetails[]) {
		this.items = items;
	}
	render()
	{
		return createElement('div'); // @todo render items using cart item view
	}
}