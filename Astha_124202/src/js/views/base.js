export const elements={
    mainMenuInput: document.querySelector("#categories__accordian-MainCourse"),
    beveragesInput: document.querySelector("#categories__accordian-beverages"),
    snacksInput: document.querySelector("#categories__accordian-Snacks"),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.header__search--input'),
    filterOptions:document.querySelector(".filter__options"),
    checkboxVeg:document.querySelector('input[name=Veg]'),
    checkboxNonVeg:document.querySelector('input[name=NonVeg]'),
    checkboxNew:document.querySelector('input[name=New]'),
    notification:document.querySelector('.header__icon--notification'),
    logo:document.querySelector('.header__logo'),
    popUp:document.querySelector('.cartPopUp'),
    cart:document.querySelector('.header__addToCart'),
    addToCartButton:document.querySelector('.card-button'),
    cartItem:document.querySelector('.cartItem'),
    cartItems:document.querySelector('.cartItems'),
    closePopUp:document.querySelector('.cart__close'),
    cartItems:document.querySelector('.cartItems'),
    container:document.querySelector('.container'),
    increment:document.querySelector('.card-add'),
    decrement:document.querySelector('.card-remove'),
    cardInput:document.querySelector('.card-input'),
    orderList:document.querySelector('.orderList'),
    checkout:document.querySelector('.checkout'),
    paymentContainer:document.querySelector('.payment__container'),
    carousel:document.querySelector('.carousel'),
    feature:document.querySelector('.feature'),
    payment:document.querySelector('.payment'),
    remove:document.querySelector('.cart__cancel'),
    total:document.querySelector('.cartItem__total-num'),
    accordian:document.querySelector('.categories__accordian'),
    showReceipt:document.querySelector('.orderList__checkout'),
    mobileCart:document.querySelector('.header__cartIcon'),
    mobileNotification:document.querySelector('.header__notificationMobile'),
    orderedItems:document.querySelector('.orderedItems')
}



export const elementStrings = {
    loader: 'loader',
    cardQuantity:'card-quantity',
    cardButton:'card-button',
    cardInput:'cardInput',
    add:'.card-add, .card-add *',
    remove:'.card-remove, .card-remove *',
    addClass:'.card-add',
    removeClass:'.card-remove',
    cardInputId:'#cardInput',
    cancel:'.cart__cancel',
    addtoCart:'.card-addToCart',
    cartPopUp:'.cartPopUp, .header__addToCart,.header__addToCart *, .cartPopUp *',
    cartCancel:'.cart__cancel,.cart__cancel *'
       
   };

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
        </div>
    `;
    if(parent)
    {
        parent.insertAdjacentHTML('afterbegin', loader);
    }
    
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

