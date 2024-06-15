import './scss/styles.scss';
import { Api } from './components/base/api';
import { Catalog, CatalogEventItemAdded } from './components/model/Catalog';
import { EventEmitter } from './components/base/events';
import { ProductList } from './components/model/api/ProductList';
import { IProductDetails } from './types';
import { CatalogView } from './components/view/CatalogView';
import { CatalogItemOpenEvent, CatalogItemView } from './components/view/CatalogItemView';
import { CatalogItemAddToCartEvent, CatalogProductView } from './components/view/CatalogProductView';
import { Product } from './components/model/api/Product';
import { Cart, CartEventItemRemove } from './components/model/Cart';
import { CartView } from './components/view/CartView';
import { UiOrderPaymentDetailsFilled } from './components/view/PaymentDetailsView';
import { Order, OrderContactsFilled, OrderPaymentDetailsFilled } from './components/model/Order';
import { ContactsDetailsView, UiOrderContactsDetailsFilled } from './components/view/ContactsDetailsView';
import { SuccessfulSendingView } from './components/view/SuccessfulSendingView';

const api = new Api(process.env.API_ORIGIN);
const events = new EventEmitter();
const catalog = new Catalog(events);
const order = new Order(events);
const cart = new Cart(events);
api.get('/product/').then((resp: ProductList<IProductDetails>) => {
	resp.items.forEach(product => catalog.addItem(product));
});

events.on(CatalogEventItemAdded, () => {
	const view = new CatalogView(document.querySelector('.gallery'));
	const els = catalog.items.map(
		product => {
			return new CatalogItemView(document.getElementById('card-catalog'), events).render({ product });
		}
	);
	view.render({ items: els });
});

events.on(CatalogItemOpenEvent, (data:{product: Product}) => {
	const view = new CatalogProductView(document.querySelector('#card-preview'));
	view.render(data); //todo render html
});

events.on(CatalogItemAddToCartEvent, (data:{product: Product}) => {
	cart.addItem(data.product);
});

events.on(CartEventItemRemove, (data:{product: Product}) => {
	cart.addItem(data.product);
	const view = new CartView()
	view.render({cart});
});

events.on(UiOrderPaymentDetailsFilled, (data:{payment: string, address: string}) => {
	order.fillPaymentDetails(data.payment, data.address);
})
events.on(OrderPaymentDetailsFilled, () => {
	const view = new ContactsDetailsView(events);
	view.render()
})
events.on(UiOrderContactsDetailsFilled, (data:{payment: string, address: string}) => {
	order.fillPaymentDetails(data.payment, data.address);
})
events.on(OrderContactsFilled, () => {
	api.post('/order', {
		"payment": order.payment,
		"email": order.email,
		"phone": order.phone,
		"address": order.address,
		"total": cart.totalAmount,
		"items": cart.items.map(p => p.id),
	}).then(() => {
		const view = new SuccessfulSendingView();
		view.render({totalAmount: cart.totalAmount})
	});
})