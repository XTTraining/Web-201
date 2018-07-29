export const elements = {
    body: $('body'),
    foodContainer: $('.food'),
    filter: $('.header__filter'),
    afterStarter: $('.accordion[data-type="starter"]'),
    afterMain: $('.accordion[data-type="main"]'),
    afterDessert: $('.accordion[data-type="beverages"]'),
    totalFood: $('.food-count'),
    cartItemCount: $('.header__cart--count'),
    filterSection: $('.filter'),
    searchInput: $('.food__search input'),
    searchSection: $('.food__search'),
    cartList: $('.cart__list--body'),
    checkoutButton: $('.checkout button'),
    payButton: $('.pay__btn'),
    paymentType: $('.pay2__paytype--icon'),
    backToMenu: $('.pay1__goback'),
    itemTotal: $('.cart__list--tax-total .cart__list--right'),
    tax1: $('.cart__list--tax-tax1 .cart__list--right'),
    tax2: $('.cart__list--tax-tax2 .cart__list--right'),
    grandTotal: $('.cart__list--tax-final .cart__list--right'),
    paymentTotal:$('.pay1__body--part.total .pay1__body--value'),
    paymentTax1: $('.pay1__body--part.tax1 .pay1__body--value'),
    paymentTax2: $('.pay1__body--part.tax2 .pay1__body--value'),
    paymentGrandTotal: $('.pay1__footer--money, .pay2__total--money')

}

export const pages = {
    isHome : $('.home').length > 0,
    isCart : $('.cartpage').length > 0,
    isPayment: $('.payment').length > 0
}
