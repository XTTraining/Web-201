import '../scss/main.scss';
import carousel from './bootstrap-only-carousel.js';

///Model Imports
import Products from './models/Products';
import cart from './models/cart';
import filter from './models/filter';
import Search from './models/Search';
import Cartpage from './models/Cartpage';

///Others Imports
import {
    elements
} from './views/base';
import {
    pages
} from './views/base';
import {
    PAGES
} from './config';

///View Imports
import * as productsView from './views/productsView';
import * as filterView from './views/filterView';
import * as cartView from './views/cartView';
import * as searchView from './views/searchView';
import * as cartPageView from './views/cartPageView';
import * as paymentView from './views/paymentView';
const state = {};


//Firebase Data Fetch and Render on UI
const fData = async () => {
    state.products = new Products();
    try {
        await state.products.getFirebaseData();
        if (state.products.data) {
            productsView.renderResults(state.products.data.items);
            filterView.renderFilterMenu(state.products.data);
            state.cart.items = cartView.showFromLocal();
            cartView.updateCartIcon(state.cart.items.length);
            $('.loader').hide();
            state.products.persistData();
        }
    } catch (err) {
        alert('Something wrong with the Application. Try after sometime!!');
    }
}
if (pages.isHome) {
    state.cart = new cart();
    state.filter = new filter();
    fData();
}

////------------HomePage-----------////
const controlCart = (id, _this) => {
    var done = false;
    var cartObj;
    if (pages.isHome) cartObj = cartView;
    if (pages.isCart) cartObj = cartPageView;
    if (_this.hasClass('food__item--add-1')) {
        var count = state.cart.addFood(id);
        if (Number.isInteger(count)) done = cartObj.button(id, count);
    }
    if (_this.hasClass('food__item--add-2')) {
        var count = state.cart.removeFood(id);
        if (Number.isInteger(count)) done = cartObj.button(id, count);
    }
    if (_this.hasClass('food__item--add-4')) {
        var count = state.cart.addFood(id);
        if (Number.isInteger(count)) done = cartObj.button(id, count);
    }
    if (done) {
        if (pages.isCart) {
            state.cartpage.cart = state.cart.items;
            state.cartpage.updatePriceBreakdown(state.products.data);
            state.cartpage.calculateTaxAndTotal();
            cartObj.updatePrice(id, count, state.products.data.items);
            cartObj.updateTaxArea(state.cartpage.priceBreakdown);
        }
        state.cart.saveCart();
        cartObj.updateCartIcon(state.cart.items.length);
    }
}
elements.filter.click(function (e) {
    if (!e.target.closest('.filter')) {
        $(this).toggleClass('active');
    }
});

$('.header__cart').click(function () {
    if (!pages.isCart) {
        if (state.cart.items.length > 0) {
            window.location.href = PAGES.cart;
        } else {
            alert('Please add some food to see Cart');
        }
    }
});
elements.checkoutButton.click(function () {
    if (state.cart.items.length > 0) {
        window.location.href = PAGES.cart;
    } else {
        alert('Please add some food to checkout');
    }
});

elements.body.on('click', '.food__item--add-1,.food__item--add-2,.food__item--add-4', function (event) {
    var id;
    id = $(this).closest('.food__item').data('id');
    if (!id) id = $(this).closest('.cart__item').data('id'); //for cart page
    if (id) controlCart(id, $(this));
});

elements.body.on('click', '.filter__body--item', function (event) {
    const _this = $(this);
    var done = false;

    //    //handling Veg , Non Veg Toggle
    //    if ($(this).hasClass('pref')) {
    //        if ($('.filter__body--item.pref.active').length == 0) {
    //            _this.toggleClass('active');
    //        } else {
    //            if ($(this).hasClass('active')) return;
    //            $('.filter__body label.pref').toggleClass('active');
    //        }
    //    } else {
    //        _this.toggleClass('active');
    //    }
    _this.toggleClass('active');
    if (_this.data('filter1id')) {
        const id = _this.data('filter1id');
        done = state.filter.category(id, _this);
    }
    if (_this.data('filter2id')) {
        const id = _this.data('filter2id');
        done = state.filter.cuisine(id, _this);
    }
    if (done) filterView.renderFilterItems(state.products.data.items, state.filter.categoryFilter, state.filter.cuisineFilter);
});

elements.body.on('click', '.filter__header--reset', function (event) {
    state.filter.categoryFilter = [];
    state.filter.cuisineFilter = [];
    $('.filter__body--item').removeClass('active');
    filterView.renderFilterItems(state.products.data.items, state.filter.categoryFilter, state.filter.cuisineFilter);
});

elements.searchInput.keyup(function (e) {
    var searchKey = $(this).val();
    if ((e.keyCode == 8 || e.keyCode == 46) && searchKey.length == 0) {
        searchView.renderSearch(state.products.data.items);
        //return true;
    }
    if (searchKey.length == 0) {
        $('.food__search .icon').removeClass('hidden');
        $('.food__search .icon__cross').addClass('hidden');
        return false;
    } else {
        $('.food__search .icon').removeClass('hidden');
        $('.food__search .icon__search').addClass('hidden');
    }
    $('.food__search').removeClass('error');
    if (searchKey.length < 3) {
        $('.food__search').addClass('error');
        return false;
    }
    state.search = new Search();
    state.search.item(state.products.data.items, searchKey);
    searchView.renderSearch(state.search.results);
}).focusout(function () {
    var searchKey = $(this).val();
    if (searchKey.length == 0) $('.food__search').removeClass('error');
});


////------------CartPage-----------////
const populateCart = () => {
    state.cartpage.getCartItems();
    state.cartpage.updatePriceBreakdown(state.products.data);
    state.cartpage.calculateTaxAndTotal();

    if (state.cartpage.items.length > 0) {
        cartPageView.updateCartIcon(state.cartpage.cart.length);
        cartPageView.renderCart(state.cartpage.items);
        cartPageView.updateTaxArea(state.cartpage.priceBreakdown);
    }
    //add cart items
    state.cart.getCart();
}

if (pages.isCart) {
    state.products = new Products();
    state.cart = new cart();
    state.cartpage = new Cartpage();
    state.products.readStorage();
    populateCart();
}

elements.payButton.click(function () {
    var status = false;
    status = state.cartpage.savePriceBreakdown();
    if (status) window.location.href = PAGES.payment;

});
////------------PaymentPage-----------////
if (pages.isPayment) {
    //Populate year for dropdown
    var currentYear = (new Date()).getFullYear();
    for (var i = 0; i < 25; i++) {
        const html = '<option value="' + currentYear + '">' + currentYear + '</option>';
        $('.year').append(html);
        currentYear++;
    }
    //get full recipt
    state.cartpage = new Cartpage();
    state.cartpage.getPriceBreakdown();
    paymentView.renderPayment(state.cartpage.priceBreakdown);
}
elements.backToMenu.click(function () {
    window.location.href = PAGES.home;
})
elements.paymentType.click(function () {
    elements.paymentType.removeClass('active');
    $(this).addClass('active');
    const id = $(this).data('id');
    if (id) {
        var selector = ".pay2__paydetails";
        $(selector + " > div").addClass('hidden');
        $(selector + '--' + id).removeClass('hidden');
    }
});




//-----------------------------------------

//Accordian Control
$(document).ready(function () {
    $('button.accordion').click(function () {
        var type = $(this).data('type');
        var itemSelector = '.food__item[data-type="' + type + '"]';
        $(this).toggleClass("collapsed");
        if ($(this).hasClass('collapsed')) {
            //hide section Food
            // $(itemSelector).addClass('hidden3');
            $(itemSelector).slideUp(200);
        } else {
            //show section Food
            //$(itemSelector).removeClass('hidden3');
            $(itemSelector).slideDown(200);
        }
    });

    //Menu Control
    $('.header__burger').click(function () {
        $('.content').css("margin-left", "50px");
        $('.header__menu').css("left", "-50px");
    });
    $('.header__menu--close').click(function () {
        $('.header__menu').css("left", "-450px");
        $('.content').css("margin-left", "0");
    });

});
//-------------------------------------------------------
