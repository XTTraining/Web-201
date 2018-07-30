import {
    selector
} from '../../common/common';
import {
    Cart
} from '../../cart/components/cart';
import {
    orderSummaryTemplate
} from './../templates/ordersummary';

const populateOrderSummary = () => {
    //  selector.ordersummary().innerHTML = '';
    selector.ordersummary().insertAdjacentHTML('afterbegin', orderSummaryDom());
};

const orderSummaryDom = () => {
    const cartitems = Cart.loadFromCart();
    if(cartitems.length < 1){
        window.location = '/index.html';
    }
    const subtotal = cartitems.length > 1 ? cartitems.reduce((acc, value) => {
        if (acc.price != undefined) {
            acc = Number.parseInt(acc.price) * Number.parseInt(acc.qty);
        }
        return Number.parseInt(acc) + (Number.parseInt(value.price) * Number.parseInt(value.qty));
    }) : Number.parseInt(cartitems[0].price) * Number.parseInt(cartitems[0].qty);
    const tax = subtotal * .05;
    const total = parseFloat(subtotal + tax).toFixed(2);
    return orderSummaryTemplate(cartitems, subtotal, tax, total);
};

export const order = {
    populateOrderSummary: populateOrderSummary
};
