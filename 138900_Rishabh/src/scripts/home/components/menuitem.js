import {
    MenuItem
} from '../models/MenuItem';
import {
    menuItemTemplate
} from '../templates/menu-item';
import {
    menuItemSectionTemplate
} from '../templates/menu-item-section';
import {
    selector
} from '../../common/common';
import {
    Common
} from '../../common/common';
import {
    category
} from './category';
import {
    Cart
} from '../../cart/components/cart';

const fetchMenuItems = function () {
    let items = Common.fetchItems('menu-items.json');
    let tmp = [];
    for (let i = 0; i < items.length; i++) {
        tmp.push(new MenuItem(items[i].id, items[i].name, items[i].price, items[i].description, items[i].imgsrc, items[i].splcategoryid, items[i].categoryid, items[i].tags));
    }
    return tmp;
};

const populateData = () => {
    selector.menuitemcontainer().insertAdjacentHTML('beforeend', menuItemSectionDom());
};

const populateFullMenuData = () => {
    selector.fullmenudiv().insertAdjacentHTML('beforeend', fullMenuItemSectionDom());
};

const populateSearchData = (item) => {
    selector.searchresultsectionmenuitems().insertAdjacentHTML('beforeend', menuItemTemplate(item));
};

const menuItemSectionDom = () => {
    const c = category.fetchCategories();
    const cat_menuitem_map = new Map();
    const menuitems = fetchMenuItems();
    c.forEach((cat) => {
        const item_arr = menuitems.filter(item => item.splcategoryid.includes(cat.id));
        cat_menuitem_map.set(cat, item_arr);
    });
    let final = '';
    cat_menuitem_map.forEach((value, key) => {
        final += menuItemSectionTemplate(key, value);
    });
    return final;
};

const fullMenuItemSectionDom = () => {
    const c = category.fetchCategories2();
    const cat_menuitem_map = new Map();
    const menuitems = fetchMenuItems();
    c.forEach((cat) => {
        const item_arr = menuitems.filter(item => item.categoryid.includes(cat.id));
        cat_menuitem_map.set(cat, item_arr);
    });
    let final = '';
    cat_menuitem_map.forEach((value, key) => {
        final += menuItemSectionTemplate(key, value);
    });
    return final;
};

const selectSize = (e) => {
    if (e.target.className === 'halfSize') {
        let h = e.target.parentElement.parentElement.parentElement.querySelector('div span.price-half');
        h.style['display'] = 'inline-block';
        let f = e.target.parentElement.parentElement.parentElement.querySelector('div span.price-full');
        f.style['display'] = 'none';
    } else if (e.target.className === 'fullSize') {
        let h = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('div span.price-half');
        h.style['display'] = 'none';
        let f = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('div span.price-full');
        f.style['display'] = 'inline-block';
    }
};

const reduceQty = (e) => {
    e.preventDefault();
    let input = e.target.parentElement.querySelector('input.item-qty');
    if (parseInt(input.value) > 0)
        input.value = parseInt(input.value) - 1;
};

const increaseQty = (e) => {
    e.preventDefault();
    let input = e.target.parentElement.querySelector('input.item-qty');
    if (parseInt(input.value) < 5)
        input.value = parseInt(input.value) + 1;
};

const getSelectedItem = (e) => {
    e.preventDefault();
    const ele = e.target.parentElement.parentElement.querySelector('input[type="radio"]:checked');
    let size = 'f';
    if (ele !== null) {
        size = ele.value;
    }
    if (size === null) {
        size = 'f';
    }
    let qty = e.target.parentElement.parentElement.querySelector('input.item-qty').value;
    if (qty == '0') {
        qty = '1';
    }
    const id = e.target.parentElement.parentElement.parentElement.id;
    if (id != undefined && id.length > 0) {
        Cart.addToCart(size, qty, id);
        animateCart();
    }
};

const animateCart = () => {
    const l = document.querySelector('.cart-link');
    l.classList.remove('cart-link');
    setTimeout(() => {
        const animate = (l) => {
            l.className = 'cart-link';
        };
        animate(l);
    }, 50);
};

//added for accessibility
const showAddToCart = (e) => {

    e.target.parentElement.nextElementSibling.style['transform'] = 'scaleY(1)';
};

//added for accessibility
/*/
const hideAddToCart = (e) => {
    e.target.parentElement.nextElementSibling.style['transform'] = 'scaleY(0)';
};
/*/

export const menuItems = {
    populateData: populateData,
    menuItemSectionDom: menuItemSectionDom,
    populateSearchData: populateSearchData,
    populateFullMenuData: populateFullMenuData,
    fullMenuItemSectionDom: fullMenuItemSectionDom,
    selectSize: selectSize,
    reduceQty: reduceQty,
    increaseQty: increaseQty,
    getSelectedItem: getSelectedItem,
    showAddToCart: showAddToCart
};
