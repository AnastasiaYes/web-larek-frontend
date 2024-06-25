import './scss/styles.scss';
import { Api } from './components/base/api';
import { Catalog} from './components/model/Catalog';
import { EventEmitter } from './components/base/events';
import { IItemList, IProductDetails, ModelEvents, ViewEvents } from './types';
import { CatalogView } from './components/view/CatalogView';
import { CatalogItemView } from './components/view/CatalogItemView';
import { CatalogProductView } from './components/view/CatalogProductView';
import { Cart } from './components/model/Cart';
import { CartView } from './components/view/CartView';
import { Order } from './components/model/Order';
import { ContactsDetailsView } from './components/view/ContactsDetailsView';
import { SuccessfulSendingView } from './components/view/SuccessfulSendingView';

const api = new Api(process.env.API_ORIGIN);
const events = new EventEmitter();
const catalog = new Catalog(events);
const order = new Order(events);
const cart = new Cart(events);
const cartView = new CartView();
const contactsDetailsView = new ContactsDetailsView(events);
const successfulSendingView = new SuccessfulSendingView();
const productDetailsView = new CatalogProductView(document.querySelector('#card-preview'), events);
const galleryProductView = new CatalogView(document.querySelector('.gallery'));
const cardCatalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const catalogItem = new CatalogItemView(cardCatalogTemplate, events);


api.get('/product/').then((resp: IItemList<IProductDetails>) => {
	resp.items.forEach(product => catalog.addItem(product));
})
	.catch(error => {
		alert('Произошла ошибка при получении данных о продукте');
		console.error('Произошла ошибка при получении данных о продукте:', error);
	});

events.on(ModelEvents.CatalogEventItemAdded, () => {
	const catalogItems = catalog.items.map(
		product => {
			return catalogItem.render({ product });
		}
	);
	galleryProductView.render({ items: catalogItems });
});

events.on(ViewEvents.UiCatalogItemOpenEvent, (data:{product: IProductDetails}) => {
	productDetailsView.render(data); //todo render html
});

events.on(ViewEvents.UiCatalogItemAddToCartEvent, (data:{product: IProductDetails}) => {
	cart.addItem(data.product);
});

events.on(ModelEvents.CartEventItemRemove, (data:{product: IProductDetails}) => {
	cart.addItem(data.product);
	cartView.render({cart, totalAmount: cart.totalAmount});
});

events.on(ViewEvents.UiOrderPaymentDetailsFilled, (data:{payment: string, address: string}) => {
	order.fillPaymentDetails(data.payment, data.address);
})
events.on(ModelEvents.OrderPaymentDetailsFilled, () => {
	contactsDetailsView.render()
})
events.on(ViewEvents.UiOrderContactsDetailsFilled, (data:{payment: string, address: string}) => {
	order.fillPaymentDetails(data.payment, data.address);
})
events.on(ModelEvents.OrderContactsFilled, () => {
	api.post('/order', {
		"payment": order.payment,
		"email": order.email,
		"phone": order.phone,
		"address": order.address,
		"total": cart.totalAmount,
		"items": cart.items.map(p => p.id),
	}).then(() => {
		successfulSendingView.render({totalAmount: cart.totalAmount})
	})
	.catch(error => {
		alert('Произошла ошибка при создании заказа');
		console.error('Произошла ошибка при создании заказа:', error);
	});
})