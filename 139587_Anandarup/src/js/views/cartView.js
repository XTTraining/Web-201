
const handlebar = require('../../templates/cart_products.handlebars');

import {elements} from  './base'; 
 
export const showCartProducts = (cartData) => {
    if(cartData) {
        elements.cartPayment.show();
        $(elements.cartProduct).html('');
        $(elements.cartProduct).append(handlebar(cartData));
    }
}

export const showCartEmpty = () => {
    elements.cartPayment.hide();
    $(elements.cartDetails).html('');
    $('.btn-checkout-cart').hide();
    const markup = `<div class="cart__empty"><span class="cart__empty-heading">Cart Empty</span>
    <img class="cart__empty-img" src="./img/Cart_empty.webp" alt="empty cart">
    <p class="cart__empty-description">Good food is always cooking! order some yummy items from the menu.</p>
    <a href="index.html#product" class="btn btn-empty" role="button">Go Ahead</a></div>`;
    $(elements.cartDetails).append(markup);
}
