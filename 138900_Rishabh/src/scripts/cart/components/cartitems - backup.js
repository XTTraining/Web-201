import {
    selector
} from '../../common/common';
import {
    Common
} from '../../common/common';
import {
    cartItemTemplate
} from '../templates/cart-item';
import {
    Cart
} from './cart';
import {
    subtotal
} from './subtotal';

const populateCartItems = () => {
    selector.cartcounts().innerHTML = '';
    selector.cartcounts().insertAdjacentHTML('beforeend', cartItemsDom());
};

const cartItemsDom = () => {

    const cartitems = Cart.loadFromCart();
    let final = '';
    cartitems.sort((x,y) => x.time > y.time);
    cartitems.forEach((item) => {
        final += cartItemTemplate(item);
    });
    return final;
};

const reduceQty = (e) => {
    e.preventDefault();
    let input = e.target.parentElement.querySelector('input.item-qty');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.cartId;
        let tmp = Cart.getCartItem(id);
        if (tmp != undefined) {
            tmp.qty = input.value;
            Cart.updateCart(tmp);
            subtotal.populateCartItems();
        }
    }
};

const increaseQty = (e) => {
    e.preventDefault();
    let input = e.target.parentElement.querySelector('input.item-qty');
    if (parseInt(input.value) < 5) {

        input.value = parseInt(input.value) + 1;
        const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.cartId;
        let tmp = Cart.getCartItem(id);
        if (tmp != undefined) {
            tmp.qty = input.value;
            Cart.updateCart(tmp);
            subtotal.populateCartItems();
        }
    }
};

const selectSize = (e) => {
    const items = Common.fetchItems('menu-items.json');
    const parent = e.target.parentElement.parentElement.parentElement.parentElement;
    const id = parent.dataset.itemId;
    const item = items.find((t) => t.id == id);
    let size = 'f';
    if (e.target.className === 'halfSize') {
        parent.querySelector('.item-price span').innerText = '₹'+item.price.h;
        size = 'h';
    } else if (e.target.className === 'fullSize') {
        parent.querySelector('.item-price span').innerText = '₹'+item.price.f;
    }
    const cartid = e.target.parentElement.parentElement.parentElement.parentElement.dataset.cartId;
    let tmp = Cart.getCartItem(cartid);
    if (tmp != undefined) {
        tmp.size = size;
        Cart.updateCart(tmp);
        subtotal.populateCartItems();
    }
};

const removeItem =(e) => {
    const id = e.target.parentElement.parentElement.dataset.cartId;
    Cart.removeFromCart(id);
    window.location.reload();
};

export const cartitems = {
    populateCartItems: populateCartItems,
    cartItemsDom: cartItemsDom,
    reduceQty: reduceQty,
    increaseQty: increaseQty,
    selectSize: selectSize,
    removeItem: removeItem
};
