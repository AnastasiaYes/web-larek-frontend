import { IProductDetails } from '../../types';

class Product implements IProductDetails
{
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}