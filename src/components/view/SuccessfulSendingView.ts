import { IView } from '../../types';

export class SuccessfulSendingView implements IView {
	container: HTMLElement;

	constructor() {
		this.container = (document.querySelector('#success') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
	}

	render(data: { totalAmount: number }): HTMLElement {
		return this.container;
	};
}