import { IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class ContactsDetailsView implements IView {
	container: HTMLElement;

	constructor(private events: IEvents) {
		this.container = (document.querySelector('#contacts') as HTMLTemplateElement).content.firstElementChild as HTMLElement;
	}

	render(): HTMLElement {
		this.container.addEventListener('submit', () => {
			this.events.emit(ViewEvents.UiOrderContactsDetailsFilled, {});
		});

		return this.container as HTMLElement;
	}
}