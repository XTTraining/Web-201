const $ = require("jquery");

export const selector = (function () {
    return {
        "leftarrow": () => document.querySelector('.featured-carousel .arrow.left'),
        "rightarrow": () => document.querySelector('.featured-carousel .arrow.right'),
        "featureditems": () => document.querySelectorAll('.featured-carousel .featured-item'),
        "slider": () => document.querySelector('.slider'),
        "categories": () => document.querySelectorAll('.categories li'),
        "categories_ul": () => document.querySelector('.categories ul'),
        "category": () => document.querySelectorAll('section.category:not(.search-result-section)'),
        "categorytarget": () => document.querySelector('section.category:target'),
        "header": () => document.querySelector('header'),
        "menuitems": () => document.querySelector('.menu-items'),
        "lazyimg": () => document.querySelectorAll('img[lazy-img-src]'),
        "menuitemcontainer": () => document.querySelector('.menu-item-container'),
        "adddummybtn": () => document.querySelectorAll('.add-btn-dummy-container button'),
        "searchbar": () => document.querySelector('.search-bar input'),
        "searchresults": () => document.querySelector('.search-results'),
        "searchresultsection": () => document.querySelector('.search-result-section'),
        "searchresultsectionmenuitems": () => document.querySelector('.search-result-section .menu-items'),
        "searchIcon": () => document.querySelector('.search-icon'),
        "closeIcon": () => document.querySelector('.close-icon'),
        "fullmenudiv": () => document.querySelector('.full-menu div'),
        "itemSize": () => document.querySelectorAll('.fullSize,.halfSize'),
        "reduceQty": () => document.querySelectorAll('a.reduce-qty'),
        "increaseQty": () => document.querySelectorAll('a.increase-qty'),
        "removeItem": () => document.querySelectorAll('.remove-item'),
        "addtocartbtn": () => document.querySelectorAll('button.add-to-cart-btn'),
        "cartcount": () => document.querySelector('.cart-count'),
        //"cartcounts": () => document.querySelector('ol.cart-items'),
        "cartcounts": () => document.querySelector('.cart-container div section'),
        "cartprice": () => document.querySelectorAll('.item-price span'),
        "subtotalcontainer": () => document.querySelector('.subtotal-container div'),
        "proceed": () => document.querySelectorAll('.accordian-container a'),
        "addressaccordianinput": () => document.querySelectorAll('#address div input'),
        "accordianbtn": () => document.querySelectorAll('.accordian-container button'),
        "ordersummary": () => document.querySelector('.summary'),
        "pay": () => document.querySelectorAll('.pay'),
        
    };
})();

export class Common {
    static fetchItems(filename) {
        let tmp;
        $.ajax({
            url: '/static/' + filename,
            datatype: "json",
            async: false,
            success: function (items) {
                tmp = Object.values(items);
            }
        });
        return tmp;
    }

    static setCartCount() {
        selector.cartcount().innerText = loadFromCart().length;
    }
}

const loadFromCart = () => {
    let itemstr = localStorage.getItem('cartItems');
    let itemArr;
    if (itemstr === null) {
        return [];
    } else {
        itemArr = JSON.parse(itemstr);
        return itemArr;
    }
};
