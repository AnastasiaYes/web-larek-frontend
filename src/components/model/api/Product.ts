import { IProductDetails } from '../../../types';

export class Product implements IProductDetails
{
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}