import { elements } from './base';

var cartTemplate = require('../../templates/cart.handlebars');
var cartSummaryTemplate = require('../../templates/cart-summary.handlebars');

// load all cart items
export const renderCartItem = (cartItems) => {
    if(cartItems!=null && cartItems.length>0){
        elements.cartResult.append(cartTemplate(cartItems));
        elements.cartInfo.show();
        elements.emptyCart.hide();
    }
    else{
        elements.cartInfo.hide();
        elements.emptyCart.show();
    }
};

// render cart summary for order page
export const renderCartSummary = (cartItems) => {
    elements.cartSummary.append(cartSummaryTemplate(cartItems));
};

export const updateCartItem = (cartItem,itemPrice) => {
    $(cartItem).children('.cart-items__price').html(itemPrice);
};

// remove the item from the cart
export const removeCartItem = (cartItem) => {
    $(cartItem).remove();
    if (elements.cartResult.has('li').length == 0) {
        elements.cartInfo.hide();
        elements.emptyCart.show();
    }
};