import {
    selector
} from '../../common/common';
import {
    subtotalTemplate
} from '../templates/subtotal';
import {
    Cart
} from './cart';

const populateCartItems = () => {
    selector.subtotalcontainer().innerHTML = '';
    selector.subtotalcontainer().insertAdjacentHTML('beforeend', subtotalDom());
};

const subtotalDom = () => {

    const cartitems = Cart.loadFromCart();
    let final = '';
    cartitems.sort((x,y) => x.time > y.time);
    final += subtotalTemplate(cartitems);
    return final;
};

export const subtotal = {
    populateCartItems: populateCartItems,
    subtotalDom: subtotalDom
};