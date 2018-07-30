// Global app controller
import '../sass/main.scss';
import './slick.min.js';

import Product from './models/product';
import Cart from './models/cart';
import Search from './models/search';
import Tax from './models/tax';
import Checkout from './models/checkout';
import { config } from './config';
import * as productView from './views/productView';
import * as searchView from './views/searchView';
import * as cartView from './views/cartView';
import * as taxView from './views/taxView';
import * as checkoutView from './views/checkoutView';
import { elements } from './views/base';
// Primary data structure
const data = {};

$(document).ready(function () {
    $('#promo_carousel').slick({
        dots: true,
        autoplay: true,
        //slidesToShow: 1,
        //adaptiveHeight: true,
        speed: 4000,
        arrows: false
    });
    //$(document).on('keypress', '[role="button"]', null, onKeypressRoleButton, false);
    InitiateProductLoad();
    // 
    if (elements.cartWrapper.length) {
        InitiateCartLoad();
    }
    if (elements.checkoutPage.length) {
        InitiateCheckoutPageLoad();
    }
});
const onKeypressRoleButton = (e)=> {
    //Need both, 'keyCode' and 'which' to work in all browsers.
    var code = e.keyCode || e.which,
        enterKey = 13;
    //If user press space key:
    if (code == enterKey) {
        //Do same thing as onclick:
        $(e.currentTarget).click();
        $(e.currentTarget).focus();
    }
}

const InitiateProductLoad = async () => {
    data.firebaseData = new Product(config);
    data.cart = new Cart();
    try {
        await data.firebaseData.getDataFromFirebase();

        const firebaseData = JSON.parse(localStorage.getItem('firebasedata'));

        data.firebaseData.categoryList = firebaseData.CategoryList;
        data.firebaseData.productList = firebaseData.ListOfProducts;
        data.firebaseData.foodType = firebaseData.FoodType;
        data.firebaseData.taxTable = firebaseData.TaxTable;
        //
        productView.showCategorySection(data.firebaseData.categoryList);
        const hydratedProductData = data.firebaseData.hydrateproducts
            (data.firebaseData.categoryList, data.firebaseData.productList);
        productView.showProducts(hydratedProductData);

        // To maintain state after the page load and to load cart data
        updateProductDataFromCart();


        //load mobile horizontal category bar

        productView.showMobileCategories(data.firebaseData.categoryList);

        //

        updateCartCountInUI(JSON.parse(localStorage.getItem('cart')));
    } catch (error) {
        console.log(error);
    }
}



Array.prototype.groupByAsMap = function (parameter) {
    const productMap = new Map();
    let arr = [];

    this.forEach(element => {
        const category = element[parameter];
        if (arr.length > 0 && arr.find(el => el === category)) {
            productMap.get(category).push(element);
        } else {
            arr.push(category);
            const tempArr = new Array();
            tempArr.push(element);
            productMap.set(category, tempArr);
        }
    });
    return productMap;
};

const updateProductDataFromCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData && cartData.items.length > 0) {
        cartData.items.forEach(element => {
            productView.modifyProductInfoByCart(element);
        })
    }
}

const addProductToCart = (productId, quantity) => {

    const productData = data.firebaseData.getFullProductData(data.firebaseData, productId);

    data.cart.addItem(quantity, productData);
    localStorage.setItem('cart', JSON.stringify(data.cart));
};

// search section

const controlSearch = (control) => {
    const inputText = searchView.getInput();
    if (inputText) {
        data.search = new Search(inputText, data.firebaseData);
        data.search.getResults();
        if (data.search.matchedProducts && data.search.matchedProducts.length > 0) {
            data.search.getCategories();
            //
            productView.showCategorySection(data.search.matchedCategories);
            const hydratedProductData = data.firebaseData.hydrateproducts(data.search.matchedCategories, data.search.matchedProducts);
            productView.showProducts(hydratedProductData, 'search');

            searchMobile();
            updateProductDataFromCart();
        } else {
            searchView.showNoProducts();
        }
    }
    if (control) {
        productView.showCategorySection(data.firebaseData.categoryList);
        const hydratedProductData = data.firebaseData.hydrateproducts(data.firebaseData.categoryList, data.firebaseData.productList);
        productView.showProducts(hydratedProductData);
        searchView.removeNoResultClass();
        searchMobile(control);
        updateProductDataFromCart();
    }
}

const InitiateCartLoad = () => {
    data.taxData = new Tax();
    if (JSON.parse(localStorage.getItem('cart')) !== null &&
        JSON.parse(localStorage.getItem('cart')).items.length > 0) {
        data.cart.items = JSON.parse(localStorage.getItem('cart')).items;
        cartView.showCartProducts(data.cart.items);
        CalculateTax(data);
    } else {
        cartView.showCartEmpty();
    }

}

const CalculateTax = (data) => {
    data.taxData = new Tax();

    data.taxData.calculateGST(data.cart.items,
        JSON.parse(localStorage.getItem('firebasedata')));

    localStorage.setItem('cartWithGst', JSON.stringify(data.taxData.taxData));
    taxView.showCartTaxSection(data.taxData);
}

const InitiateCheckoutPageLoad = () => {
    data.checkout = new Checkout();
    checkoutView.showHidePaymentOptions();
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const cartTaxData = JSON.parse(localStorage.getItem('cartWithGst'));
    data.checkout.prepareDataForcheckout(cartData.items, cartTaxData);
    checkoutView.showCheckoutPageCartData(data.checkout);
}

$(elements.searchForm).submit(function (e) {
    e.preventDefault();
    controlSearch();
});
$('.search__input').keyup(function (e) {
    if ($('.search__input').length > 0) {
        $('.search__icon--cross').css('display', 'inline-block');
    } else {
        $('.search__icon--cross').css('display', 'none');
    }
})
$('.search__icon--cross').on('click', function (e) {
    e.preventDefault();
    elements.searchInput.val('');
    controlSearch('reset');
    $('.search__icon--cross').css('display', 'none');
});

$('.nav-mobile__button').on('click', function (e) {
    $('.nav-mobile').addClass('nav-mobile--active');
    $('body').addClass('body-disabled');
    if ($('body').hasClass('body-disabled')) {
        $('.intro, .promo-carousel').on('click', function (e) {
            $('.nav-mobile').removeClass('nav-mobile--active');
            $('body').removeClass('body-disabled');
        });
    }
});
$(document).on("click",  '.nav-mobile__items--with-sub',  function  (e) {
    const parent = e.target.offsetParent;
    let display = parent.classList.contains('sub-active') ? 'none' : 'inline-block';
    if (display === 'inline-block') {
        parent.classList.add('sub-active');
    } else if (display === 'none') {
        parent.classList.remove('sub-active');
    }
    $.each(parent.children, (i, val) => {
        if (val.className === 'sub-nav__mobile') {
            val.style.display = display;
        }
    });
});

////
$(document).on('click', '.btn-increment__add', function (e) {
    hideShowAddButton(e, 1);
    const quantity = getProductCount(e);
    addProductToCart(e.target.offsetParent.parentNode.id, quantity);

    updateCartCountInUI(data.cart);
});

$(document).on('click', '.btn-increment__plus', function (e) {
    increaseDecreaseProductCount(e, 'increase');
    const quantity = getProductCount(e);

    addProductToCart(e.target.offsetParent.parentNode.id, quantity);

    updateCartCountInUI(data.cart);
    if ($(this).parents('.cart__button')) {
        increaseDecreaseProductData(...[$(this), 'increase', quantity]);
        CalculateTax(data);
    }
});

$(document).on('click', '.btn-increment__minus', function (e) {
    increaseDecreaseProductCount(e, 'decrease');
    const quantity = getProductCount(e);


    addProductToCart(e.target.offsetParent.parentNode.id, quantity);

    updateCartCountInUI(data.cart);

    if ($(this).parents('.cart__button')) {
        increaseDecreaseProductData(...[$(this), 'decrease', quantity]);
        CalculateTax(data);
    }
    // check for cart is empty or not
    const count = data.cart.getTotalCartCount(data.cart);
    if (count === 0) {
        cartView.showCartEmpty();
    }

    if (quantity === 0) {
        if ($(this).parents('.cart__button')) {
            removeProductRowFromUI($(this));
        }
    }
});

// horizontal scroll
$(document).on('click', '.horizontal-scroll__nav-item', function () {
    const productsId = $(this).prop('id').split('_')[0] + '-item';
    if (!$(this).hasClass('category-0')) {
        $('.intro, .promo-carousel').hide();
    } else {
        $('.intro, .promo-carousel').show();
    }
    $('#' + productsId).parent().find('.product__list-category').
        removeClass('product__list-category--active');

    $('#' + productsId).addClass('product__list-category--active');

    $(this).parent().find('.horizontal-scroll__nav-item').
        removeClass('horizontal-scroll__nav-item--active');

    $(this).addClass('horizontal-scroll__nav-item--active');
});

const hideShowAddButton = (element, quantity) => {
    const opacityValue = quantity === 0 ? 0 : 1;
    const elementList = element.target.offsetParent.children;
    $.each(elementList, (i, val) => {
        val.style.opacity = opacityValue;
        if (quantity === 0 && val.className === 'btn-increment__add') {
            val.style.opacity = 1;
        }
        else if (val.className === 'btn-increment__quantity') {
            val.textContent = 1;
        }
    });
    if (quantity !== 0) {
        element.target.style.opacity = 0;
    }

}

const getProductCount = (element) => {
    let quantity = 1;
    $.each(element.target.offsetParent.children, (i, val) => {
        if (val.classList.contains('btn-increment__quantity')) {
            quantity = parseInt(val.textContent);
        }
    });
    return quantity;
}

const increaseDecreaseProductCount = (element, type) => {
    let quantity = 1;
    $.each(element.target.offsetParent.children, (i, val) => {
        if (val.classList.contains('btn-increment__quantity') && type === 'increase') {
            quantity = parseInt(val.textContent) + 1;
            val.textContent = quantity;
        } else if (val.classList.contains('btn-increment__quantity') && type === 'decrease') {
            const currentQuantity = parseInt(val.textContent);
            quantity = currentQuantity > 0 ? (currentQuantity - 1) : 0;
            val.textContent = quantity;
        }
    });
}

const increaseDecreaseProductData = (element, type, quantity) => {
    const productParent = element.parents('.cart__button').siblings('.cart__product-wrapper');
    productParent.find('.product__count').html(`(${quantity} PCS)`);
    const productUnitPrice = parseFloat(productParent.parent().find('.cart__product-price--hidden').val());
    productParent.parent().find('.cart__product-price').html(quantity * productUnitPrice);
}

const removeProductRowFromUI = (element) => {
    element.parents('.cart__product').remove();
}

const updateCartCountInUI = (cartData) => {
    const count = data.cart.getTotalCartCount(cartData);
    $('.cart__product-count').html(count);
    if (count === 0) {
        $('.cart__product-count').hide();
    } else {
        $('.cart__product-count').css('display', 'inline-block');
    }
}

const searchMobile = (control) => {
    if ($('body').hasClass('mobile-container')) {
        $('.intro, .promo-carousel').hide();
        if (control) {
            $('.intro, .promo-carousel').show();
            $('.horizontal-scroll__nav').find('.horizontal-scroll__nav-item')
                .removeClass('horizontal-scroll__nav-item--active');
            $('.horizontal-scroll__nav').find('.horizontal-scroll__nav-item.category-0')
                .addClass('horizontal-scroll__nav-item--active');
        }
    }
}