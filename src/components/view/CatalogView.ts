import { IView } from '../../types';

export class CatalogView implements IView {
	container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	render(data: { items: HTMLElement[] }): HTMLElement {
		this.container.replaceChildren(...data.items) // происходит обновление html дерева

		return this.container;
	}
}