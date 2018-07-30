import {
    Common
} from '../../common/common';
import {
    CartItem
} from '../models/CartItem';

const addToCart = (size, qty, itemid) => {
    const item = {
        "id": Math.random(),
        "size": size,
        "qty": qty,
        "itemid": itemid,
        "time": new Date().getTime()
    };
    let itemstr = getLocalStorageCartItems();
    let itemArr;
    if (itemstr === null) {
        itemArr = [];
        itemArr.push(item);
    } else {
        itemArr = JSON.parse(itemstr);
        itemArr.push(item);
    }
    itemstr = JSON.stringify(itemArr);
    setLocalStorageCartItems(itemstr);
    Common.setCartCount();
};

const loadFromCart = () => {
    let itemstr = getLocalStorageCartItems();
    let itemArr;
    if (itemstr === null) {
        return null;
    } else {
        itemArr = JSON.parse(itemstr);
        let validItems = Common.fetchItems('menu-items.json');
        return itemArr.map((cartitem) => {
            //      debugger;
            let validItem = validItems.find((t) => cartitem.itemid === t.id);
            if (validItem !== null && validItem !== undefined) {
                return new CartItem(validItem, cartitem.id, cartitem.size, cartitem.qty, cartitem.time);
            }
        });
    }
};

const validateMenuItem = (itemid) => {
    let validItems = Common.fetchItems('menu-items.json');
    let validItem = validItems.find((t) => itemid === t.id);
    if (validItem !== null && validItem !== undefined) {
        return true;
    }
    return false;

};

const getLocalStorageCartItems = () => {
    return localStorage.getItem('cartItems');
};

const setLocalStorageCartItems = (cartItemsstr) => {
    return localStorage.setItem('cartItems', cartItemsstr);
};

const removeFromCart = (cartid) => {
    const itemstr = getLocalStorageCartItems();
    let arr = JSON.parse(itemstr);
    arr = arr.filter((cartitem) => cartitem.id != cartid);
    setLocalStorageCartItems(JSON.stringify(arr));
};

const updateCart = (cartitem) => {
    if (validateMenuItem(cartitem.itemid)) {
        removeFromCart(cartitem.id);
        let arr = getLocalStorageCartItems();
        arr = JSON.parse(arr);
        arr.push(cartitem);
        setLocalStorageCartItems(JSON.stringify(arr));
    }
};

const getCartItem = (cartid) => {
    const itemstr = getLocalStorageCartItems();
    let arr = JSON.parse(itemstr);
    return arr.find((cartitem) => cartitem.id == cartid);
};

const clearCart = () => {
    localStorage.clear();
};

export const Cart = {
    loadFromCart: loadFromCart,
    addToCart: addToCart,
    getCartItem: getCartItem,
    updateCart: updateCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart
};
