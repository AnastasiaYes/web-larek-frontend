# Проектная работа "Веб-ларек"

__Стек:__ HTML, SCSS, TS, Webpack
__Паттерн проектирования__ — MVC

#### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/model — модели проекта
- src/components/model/api — модели проекта, которые взаимодействуют с api
- src/components/view — представления проекта
- src/components/base/ — папка с базовым кодом

#### Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения и хендлеры событий
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

#### Событийная модель:
- src/index.ts — содержит хендлеры, которые реагируют на изменения на сайте и в сущности

#### Использование принципа ООП "полиморфизм" в виде интерфейса:
- Сyщности CartItemView, CartView, CatalogItemView, CatalogProductView, CatalogView, ContactsDetailsView, PaymentDetailsView, SuccessfulSendingView реализует интерфейс IView
- Сущность Order реализует интерфейс IOrder
- Сущность Product реализует интерфейс IProductDetails
- Сущность OrderResponse реализует интерфейс IOrderCreateResponse
- Сущность ProductList реализует интерфейс IItemList

#### Описание моделей:
- OrderResponse — класс имеет поля id заказа и сумму заказа. Назначение класса OrderResponse заключается в предоставлении способа для хранения и передачи данных о созданном заказе.
- Product — класс имеет поля параметров товара: id, название, описание, категория и цена. Назначение класса Product заключается в предоставлении способа для хранения и передачи данных о продукте.
- ProductList — класс принимает количество товара и его список. Назначение класса ProductList заключается в предоставлении информации об количестве выбранного товара и их список.
- Cart — класс принимает массив из выбранных пользователем продуктов, общую сумму все выбранных продуктов и менеджер событий с помощью котрого вызывается события для добавления продукта и удаления продукта из корзины. Класс Cart обеспечивает управление товарами в корзине и взаимодействие с другими частями приложения через систему событий
  - addItem функция добавления в корзину 
  - removeItem функция удаления из корзины
  - _itemAdded защищенный метод, который вызывается с объектом продукта, он генерирует событие CartEventItemAdded
  - _itemRemove защищенный метод, который вызывается с объектом продукта, он генерирует событие CartEventItemRemove
- Catalog — класс принимает менеджер событий с помощью которого вызывается событие добавления нового продукта. Класс Catalog обеспечивает управление товарами в каталоге и позволяет другим компонентам приложения реагировать на изменения в каталоге через систему событий.
  - getProduct функция получения продукта 
  - addItem функция добавления продукта
  - _itemAdded защищенный метод, который вызывается с объектом продукта, он генерирует событие CatalogEventItemAdded
- Order — класс принимает менеджер событий для уведомления о заполнении данных пользователя. Класс Order обеспечивает удобное управление информацией о заказе и взаимодействие с другими компонентами через механизм событий.
  - fillPaymentDetails функция заполнения первого модального окна с информаций об адресе и способе оплаты
  - fillContactsDetails функция заполнения второго модального окна с информаций о телефоне и email пользователя
  - _paymentDetailsFilled защищенный метод, вызывается с деталями платежа и адресом, он создаёт событие OrderPaymentDetailsFilled
  - _contactFilled защищенный метод, вызывается с деталями номера телефона и email, он создаёт событие OrderContactsFilled

#### Описание представлений:
- CartItemView — класс принимает html элемент шаблона для создания новой копии и ее заполнения. Класс CartItemView обеспечивает создание и управление html-представлением продукта в корзине
  - render функция заполняет html и возвращает новый  
- CartView — класс принимает template корзины. Класс CartView обеспечивает создание и управление html-представлением корзины покупок  
  - render функция подготовки html элемента для отображения в корзине 
- CatalogItemView — класс принимает html элемент шаблона для создания новой копии и ее заполнения и менеджер событий. Класс CatalogItemView обеспечивает создание и управление html-представлением продукта в каталоге
  - render функция заполняет html и возвращает новый
- CatalogProductView — класс принимает html элемент шаблона для создания новой копии и ее заполнения. Класс CatalogProductView обеспечивает создание и управление html-представлением детальной информации о продукте в модальнм окно
  - render функция заполняет html и возвращает новый
- CatalogView — класс принимает html элемент контейнера каталога. Класс CatalogView обеспечивает управление отображением продуктов в каталоге
  - render функция отображает  элементы каталога 
- ContactsDetailsView — класс принимает менеджер событий. Класс ContactsDetailsView обеспечивает создание и управление html-представлением формы контактных данных
  - render функция для прослушивания отправки формы и события
- PaymentDetailsView — класс принимает менеджер событий. Класс PaymentDetailsView обеспечивает создание и управление html-представлением формы платежных данных
  - render функция для прослушивания отправки формы и события
- SuccessfulSendingView — класс имеет поле с html элементом. Класс SuccessfulSendingView обеспечивает создание и управление html-представлением, информирующим пользователя об успешной отправке данных.
  - render функция возвращает html элемент формы для последующего отображения 

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
