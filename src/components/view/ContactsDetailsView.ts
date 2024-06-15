import { IView } from '../../types';
import { IEvents } from '../base/events';

export const UiOrderContactsDetailsFilled =  'ui:order:contacts-details-filled';
export class ContactsDetailsView implements IView {
	container: HTMLElement;
	constructor(private events: IEvents) {
		this.container = document.querySelector('#contacts > .form');
	}
	render(): HTMLElement {
		this.container.addEventListener('submit', () => {
			this.events.emit(UiOrderContactsDetailsFilled, {})
		});

		return this.container as HTMLElement;
	}
}