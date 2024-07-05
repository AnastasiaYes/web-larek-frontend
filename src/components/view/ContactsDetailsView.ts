import { IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';

export class ContactsDetailsView implements IView {
	container: HTMLElement;

	constructor(private events: IEvents) {
		this.container = (document.querySelector('#contacts') as HTMLTemplateElement).content.firstElementChild as HTMLElement;

		this.container.addEventListener('submit', (e) => {
			//e.preventDefault();
			//найти имейл и телефон и передать в событие
			this.events.emit(ViewEvents.UiOrderContactsDetailsFilled, {});
		});
	}

	render(): HTMLElement {
		return this.container as HTMLElement;
	}
}