import { IItemList, IProductDetails } from '../../types';

class ProductList<IProductDetails> implements IItemList<IProductDetails> {
	total: number;
	items: IProductDetails[];

	constructor(total: number, items: IProductDetails[]) {
		this.total = total;
		this.items = items;
	}
}