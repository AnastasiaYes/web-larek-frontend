import { IView, ViewEvents } from '../../types';
import { IEvents } from '../base/events';
import * as querystring from 'querystring';
import * as trace_events from 'trace_events';

export class ModalView implements IView {
	modalContent: HTMLElement;

	constructor(public container: HTMLElement, private events: IEvents) {
		this.modalContent = this.container.querySelector('.modal__content');

		this.container.querySelector('.modal__close').addEventListener('click', () => {
			this.events.emit(ViewEvents.UiModalClose, this.container);
		});

		document.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			const targetInsideModal = target.classList.contains('modal');
			const modalIsActive = this.container.classList.contains('modal_active');

			if (targetInsideModal && modalIsActive) {
				this.events.emit(ViewEvents.UiModalClose, this.container);
			}
		});
	}

	render(data: { element: HTMLElement }): HTMLElement {
		this.modalContent.innerHTML = '';
		this.modalContent.append(data.element);

		this.container.classList.add('modal_active');

		return this.container;
	}
}