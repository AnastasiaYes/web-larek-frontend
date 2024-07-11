import { IProductDetails, IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class CatalogItemView implements IView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.container = template.content.firstElementChild.cloneNode(true) as HTMLElement;
		this.category = this.container.querySelector('.card__category');
		this.title = this.container.querySelector('.card__title');
		this.image = this.container.querySelector('.card__image');
		this.price = this.container.querySelector('.card__price');
	}

	render(data: { product: IProductDetails }): HTMLElement {
		this.category.textContent = data.product.category;
		this.image.src = process.env.CONTENT_URL + data.product.image;
		this.title.textContent = data.product.title;
		this.price.textContent = String(data.product.price ?? 'бесценен');

		switch (this.category.textContent) {
			case 'софт-скил':
				this.category.classList.add('card__category_soft');
				break;
			case 'другое':
				this.category.classList.add('card__category_other');
				break;
			case 'хард-скил':
				this.category.classList.add('card__category_hard');
				break;
			case 'дополнительное':
				this.category.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this.category.classList.add('card__category_button');
				break;
		}

		this.container.addEventListener('click', (e) => {
			e.stopPropagation();
			this.events.emit(ViewEvents.UiCatalogItemOpenEvent, { product: data.product })
		})

		return this.container;
	}
}