import './scss/styles.scss';
import { Api } from './components/base/api';
import { Catalog} from './components/model/Catalog';
import { EventEmitter } from './components/base/events';
import { IItemList, IProductDetails, ModelEvents, OrderContactsFilledFailed, ViewEvents } from './types';
import { CatalogView } from './components/view/CatalogView';
import { CatalogItemView } from './components/view/CatalogItemView';
import { CatalogProductView } from './components/view/CatalogProductView';
import { Cart } from './components/model/Cart';
import { CartView } from './components/view/CartView';
import { Order } from './components/model/Order';
import { ContactsDetailsView } from './components/view/ContactsDetailsView';
import { SuccessfulSendingView } from './components/view/SuccessfulSendingView';
import { ModalView } from './components/view/ModalView';
import { PaymentDetailsView } from './components/view/PaymentDetailsView';

const api = new Api(process.env.API_ORIGIN);
const events = new EventEmitter();
const catalog = new Catalog(events);
const order = new Order(events);
const cart = new Cart(events);
const cartView = new CartView(events);
const contactsDetailsView = new ContactsDetailsView(events);
const paymentDetailsView = new PaymentDetailsView (events);
const successfulSendingView = new SuccessfulSendingView(events);
const productDetailsView = new CatalogProductView(document.querySelector('#card-preview'), events);
const galleryProductView = new CatalogView(document.querySelector('.gallery'));
const cardCatalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const modal = document.querySelector('#modal-container') as HTMLElement;
const modalView = new ModalView(modal, events);
const headerBusketBtn = document.querySelector('.header__basket') as HTMLElement;
const headerBusketCounterSpan = document.querySelector('.header__basket-counter') as HTMLSpanElement;


api.get('/product/').then((resp: IItemList<IProductDetails>) => {
	catalog.addItems(resp.items); //все сразу
})
	.catch(error => {
		alert('Произошла ошибка при получении данных о продукте');
		console.error('Произошла ошибка при получении данных о продукте:', error);
	});

headerBusketBtn.addEventListener('click', function() {
	const cartModalContent = cartView.render({cart: cart});
	modal.replaceWith(modalView.render({ element: cartModalContent}));
});

events.on(ModelEvents.CatalogEventItemsAdded, () => {
	const catalogItems = catalog.items.map(
		product => {
			const catalogItem = new CatalogItemView(cardCatalogTemplate, events);
			return catalogItem.render({ product });
		}
	);
	galleryProductView.render({ items: catalogItems });
});

events.on(ViewEvents.UiOrderOpenContactsDetails, () => {
	modal.replaceWith(modalView.render({element: contactsDetailsView.render()}))
});

events.on(ViewEvents.UiCatalogItemOpenEvent, (data:{product: IProductDetails}) => {
	const productDetailsModalElement = productDetailsView.render(data);

	modal.replaceWith(modalView.render({ element: productDetailsModalElement}))
});

events.on(ViewEvents.UiCartItemRemove, (data:{product: IProductDetails}) => {
	cart.removeItem(data.product.id)
});

events.on(ViewEvents.UiOnOrder, () => {
	modal.replaceWith(modalView.render({element: paymentDetailsView.render()}))
});

events.on(ViewEvents.UiOrderOpenSuccessfulModal, () => {
	api.post('/order', {
		"payment": order.payment,
		"email": order.email,
		"phone": order.phone,
		"address": order.address,
		"total": cart.totalAmount,
		"items": cart.items.map(p => p.id),
	}).then(() => {
		modal.replaceWith(modalView.render({element: successfulSendingView.render({totalAmount: cart.totalAmount})}))
		cart.clearCart();
	})
		.catch(error => {
			alert('Произошла ошибка при создании заказа');
			console.error('Произошла ошибка при создании заказа:', error);
		});
	paymentDetailsView.clearCart();
	contactsDetailsView.clearCart()
});

events.on(ViewEvents.UiModalClose, (modalElement?:HTMLElement) => {
	if (!modalElement) {
		modalView.container.classList.remove('modal_active');
		return;
	}
	modalElement.classList.remove('modal_active');
});

events.on(ViewEvents.UiCatalogItemAddToCartEvent, (data:{product: IProductDetails}) => {
	cart.addItem(data.product);
	events.emit(ViewEvents.UiModalClose, modalView.container)
});

events.on(ModelEvents.CartEventItemAdded, () => {
	headerBusketCounterSpan.textContent = String(cart.items.length);
});

events.on(ModelEvents.CartCleared, () => {
	headerBusketCounterSpan.textContent = String(cart.items.length);
});

events.on(ModelEvents.CartEventItemRemove, () => {
	modal.replaceWith(modalView.render({ element: cartView.render({cart})}));
	headerBusketCounterSpan.textContent = String(cart.items.length);
});

events.on(ViewEvents.UiOrderPaymentDetailsFilled, (data:{payment: null|string, address: string}) => {
	order.fillPaymentDetails(data.payment, data.address);
});

events.on(ViewEvents.UiOrderContactsDetailsFilled, (data:{email: string, phone: string}) => {
	order.fillContactsDetails(data.email, data.phone);
});

events.on(ModelEvents.OrderPaymentDetailsFilled, () => {
	paymentDetailsView.enableButton();
});
events.on(ModelEvents.OrderPaymentDetailsFillFailed, () => {
	paymentDetailsView.disableButton();
});

events.on(ModelEvents.OrderContactsFilled, () => {
	contactsDetailsView.clearErrors();
	contactsDetailsView.enableButton()
});

events.on(ModelEvents.OrderContactsFilledFailed, (result: OrderContactsFilledFailed) => {
	contactsDetailsView.disableButton()
	contactsDetailsView.showError(result);
});