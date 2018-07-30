// Global app controller
import '../sass/main.scss';
import './bootstrap-only-carousel';
import firebase from 'firebase';
import { config } from './config';
import { elements, renderLoader, clearLoader } from './views/base';

// Imported views
import * as productsView from './views/productView';
import * as categoryView from './views/categoriesView';
import * as searchView from './views/searchView';
import * as cartView from './views/cartView';
import * as taxView from './views/taxView';

// Imported models
import Products from './models/Products';
import Categories from './models/Categories';
import Search from './models/Search';
import Cart from './models/Cart';
import Tax from './models/Tax';

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        renderLoader();

        try {
            await state.search.getResults();
            const searchResult = state.search.result;
            const categoryResult = state.categories.result;

            // if data found for the psecified search then render the 
            if (searchResult.length > 0) {
                productsView.renderProducts(searchResult, categoryResult, state.cart.result);
            }
            else {
                searchView.emptySearchResult();
            }

            clearLoader();

        } catch (err) {
            console.log('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.submit(event => {
    event.preventDefault();
    controlSearch();
});


// show all categories in the page
const showAllCategories = async () => {
    try {
        renderLoader();
        state.categories = new Categories();
        await state.categories.getAllCategories();
        const result = state.categories.result;
        if (result != null) {
            categoryView.renderCategories(result);
            // bind all checkbox event of category listing
            bindEvent();
        }
        else {
            console.log('No products data available');
        }
        clearLoader();
    }
    catch (error) {
        console.log(`Index :${error}`);
        clearLoader();
    }
}

// show all products in the page
const showAllProducts = async () => {
    try {
        renderLoader();
        state.products = new Products();
        state.cart = new Cart();
        state.cart.result = [];

        await state.products.getAllProducts();

        const prodResult = state.products.result;
        const catResult = state.categories.result;

        if (prodResult != null && catResult != null) {
            // get data from local storage for quantity per product
            state.cart.readStorage();
            productsView.renderProducts(prodResult, catResult, state.cart.result);
        }
        else {
            console.log('No products data available');
        }
        clearLoader();
    }
    catch (error) {
        console.log(`Index :${error}`);
        clearLoader();
    }
}

// bind event to the categories to filter the data
const bindEvent = () => {
    $('.categories-list__item-input').each(function () {
        $(this).change(function () {
            let elemId, splitElem;
            elemId = $(this).attr('id');
            splitElem = elemId.split("-");
            const catId = parseInt(splitElem[1]);

            if ($(this).is(':checked')) {
                $(this).attr('aria-checked', true);
                if (state.filterList == null) {
                    state.filterList = [];
                }
                if (splitElem != null && splitElem.length > 0) {
                    state.filterList.push(catId);
                }
            }
            else {
                $(this).attr('aria-checked', false);
                var index = state.filterList.indexOf(catId);
                if (index > -1) {
                    state.filterList.splice(index, 1);
                }
            }
            state.products.getProductsByCatId(state.filterList);
            productsView.renderProducts(state.products.filterProdResult, state.categories.result, state.cart.result);
        });
    });
}

// insert/update data by product in the local storage
const storeDataByProductId = async (element, quantity) => {
    let productId, isCartItem = false;
    try {
        // store data in local storage per product id
        if ($(element).parents('.categories-items__item') != null
            && $(element).parents('.categories-items__item').length > 0) {
            productId = $(element).parents('.categories-items__item').attr('id');
        }
        else {
            productId = $(element).parents('.cart-items__list').attr('id');
            isCartItem = true;
        }
        if (productId != null) {
            if (state.products == null || state.products.length > 0) {
                await state.products.getAllProducts();
            }
            let cartProduct = state.products.getProductByProductId(productId);
            state.cart.addItem(cartProduct, quantity, productId);
        }

        if (isCartItem) {
            const cartItem = $(element).parents('.cart-items__list');
            getTaxInformation();
            if (quantity == 0) {
                // remove the element from the UI, when item is removed from cart
                cartView.removeCartItem(cartItem);
            }
            else {
                const itemPrice = parseFloat(cartProduct.Price) * parseInt(quantity);
                cartView.updateCartItem(cartItem, itemPrice);

            }
        }
        updateCartNotification();
    }
    catch (error) {
        console.log(`Index :storeDataByProductId:${error}`);
    }
}

// scroll menu for the tablet view to filter the products
$(document).on("click", '.scroll-menu__link', function (event) {
    event.preventDefault();
    let elemId, splitElem;

    elemId = $(this).attr('id');
    splitElem = elemId.split("-");
    const catId = parseInt(splitElem[1]);
    state.filterList = [];

    if (splitElem != null && splitElem.length > 0 && catId != 0) {
        state.filterList.push(catId);
    }
    else {
        state.filterList.pop();
    }

    $(".scroll-menu__item--selected").removeClass("scroll-menu__item--selected");
    $(this).parent().addClass('scroll-menu__item--selected');
    state.products.getProductsByCatId(state.filterList);
    productsView.renderProducts(state.products.filterProdResult, state.categories.result, state.cart.result);
});

// bind events to the add to cart button of product items
$(document).on("click", '.btn-quantity__add', function () {
    $(this).hide();
    $(this).siblings().show();
    const elem = $(this).siblings('.btn-quantity__value');
    let quantity = parseInt(elem.html());
    quantity = 1;
    elem.html(quantity);
    if (state.cart != null && state.cart.totalItem != null) {
        state.cart.totalItem = parseInt(state.cart.totalItem) + 1;
    }
    else {
        state.cart.totalItem = 1;
    }

    storeDataByProductId(this, quantity);
});

// event trigger on add food item
$(document).on("click", '.btn-quantity__plus', function () {
    const elem = $(this).siblings('.btn-quantity__value');
    let quantity = parseInt(elem.html());
    quantity = quantity + 1;
    state.cart.totalItem = parseInt(state.cart.totalItem) + 1;
    elem.html(quantity);
    storeDataByProductId(this, quantity);
});

// event trigger on remove food item
$(document).on("click", '.btn-quantity__minus', function () {
    const elem = $(this).siblings('.btn-quantity__value');
    let quantity = parseInt(elem.html());
    quantity = quantity - 1;
    state.cart.totalItem = parseInt(state.cart.totalItem) - 1;
    elem.html(quantity);

    if (quantity == 0) {

        $(this).hide();
        $(this).siblings().hide();
        $(this).siblings('.btn-quantity__add').css('display', 'flex');
    }

    storeDataByProductId(this, quantity);
});


// Intialize firebase application for database connection
const initializeApp = () => { firebase.initializeApp(config) };

$('.mobile-header__button').click(function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $('#mobile-nav').addClass('sidebar-animation');
    $('body').addClass('hidden-overflow');
    $('#overlay').show();
});

$('#overlay').click(function () {
    $(this).hide();
    $('body').removeClass('hidden-overflow');
    $('#overlay').hide();
    $('#mobile-nav').removeClass('sidebar-animation');
});

$(document).on("click", '.sidebar-menu__link--accordion-up', function () {
    $(this).children('.sidebar-submenu').show();
    $(this).children('.sidebar-submenu').removeClass('submenu-animation-collapse');
    $(this).children('.sidebar-submenu').addClass('submenu-animation-expand');
    $(this).removeClass('sidebar-menu__link--accordion-up');
    $(this).addClass('sidebar-menu__link--accordion-down');
});

$(document).on("click", '.sidebar-menu__link--accordion-down', function () {
    $(this).children('.sidebar-submenu').hide();
    $(this).children('.sidebar-submenu').addClass('submenu-animation-collapse');
    $(this).children('.sidebar-submenu').removeClass('submenu-animation-collapse');
    $(this).removeClass('sidebar-menu__link--accordion-down');
    $(this).addClass('sidebar-menu__link--accordion-up');
});

$(document).on("click", '.payment-type__item--radio', function () {
    const elem = $(this).siblings('ul');
    const defaultId = 1;
    $(".pay-selected").parent().css('display', 'none');
    $(".pay-selected").removeClass("pay-selected");
    if (elem != null && elem.length > 0) {
        elem.children(':first-child').addClass('pay-selected');
        elem.css('display', 'flex');
        $('#banks--select').val(defaultId);
    }
});


$(document).on("click", '.payment-netbanking__item', function () {
    const selectedId = $(this).children().data('bank_id');
    $(".pay-selected").removeClass("pay-selected");
    $('#banks--select').val(selectedId);
    $(this).addClass('pay-selected');
});

$(document).on("click", '.payment-wallet__item', function () {
    $(".pay-selected").removeClass("pay-selected");
    $(this).addClass('pay-selected');
});

$(document).on("click", '.payment-type__item--radio', function () {
    if ($(this).attr('id') === "netBanking") {
        $('#banks--select').parent().css('display', 'flex');
    }
    else {
        $('#banks--select').parent().css('display', 'none');
    }
});

// get cart information from the storage
const getCartInfo = () => {
    try {
        state.cart.readStorage();
        state.cart.readCartItemCount();
        if (state.cart != null && elements.cartResult != null) {
            if (state.cart.result != null) {
                cartView.renderCartItem(state.cart.result);
                cartView.renderCartSummary(state.cart.result);
                updateCartNotification();
            }
        }
    }
    catch (error) {
        console.log(`getCartInfo : Index :${error}`);
        clearLoader();
    }

}

// get GST and Tax information of the cart items
const getTaxInformation = async () => {
    try {
        state.tax = new Tax();
        state.tax.readTaxStorage();
        state.categories.readCatStorage();
        if (state.tax.result == null) {
            await state.tax.getTaxDetails();
        }
        else if (state.categories.result == null) {
            await state.categories.getAllCategories();
        }
        else {
            state.tax.getTax(state.cart.result, state.categories.result);
            taxView.renderPaymentDetails(state.tax.cartTax);
        }
    }
    catch (error) {
        console.log(`getTaxInformation: Index :${error}`);
    }
}

// To update notification of total items in the cart
const updateCartNotification = () => {
    const totalItems = state.cart.totalItem;
    if (totalItems > 0) {
        $('.header-menu__notification').css('display', 'flex');
        $('.header-menu__notification').text(totalItems);
    }
    else {
        $('.header-menu__notification').hide();
    }
}

//Enable key press on focus of element

$(document).on("keypress", '[role="button"],[type="checkbox"],li', function (e) {
    //Need both, 'keyCode' and 'which' to work in all browsers.
    var code = e.keyCode || e.which,
        enterKey = 13;
    //If user press space key:
    if (code == enterKey) {
        //Do same thing as onclick:
        $(e.currentTarget).click();
        $(e.currentTarget).focus();
    }
});


// Function trigger on application load
$(document).ready(function () {
    initializeApp();
    // show all categories
    showAllCategories();
    showAllProducts();
    //load cart and tax information
    getCartInfo();
    getTaxInformation();
});
