
import '../sass/main.scss';
import './bootstrap.min.js';
import $ from 'jquery';
//import config from 'config';
import Search from './models/Search';
// DOM Elements
import * as searchView from './views/searchView';
import * as orderView from './views/orderView';
import { elements, renderLoader, clearLoader } from './views/base';
import Cart from './models/Cart';
import order from './models/order';

let search = new Search();
let cart = new Cart();
let orderObj = new order();
const state = {};

const getFoodItemsData = async () => {
    state.search = new Search();
    renderLoader();
    try {
        // 4) Search for food items
        await state.search.find();
       
        searchView.bindFoodCategories(state.search.categories);
         
        // get data from storage and default load the category id 1
        state.search.filterBycategoryName(state.search.foodItems, state.search.categories, [], "");

        searchView.bindFoodItems(state.search.filteredItems);
        clearLoader();
    } catch (err) {
        console.log('Something wrong with the search...');
         clearLoader();
    }
}
$(function () {
    // firebase.initializeApp(config);
    if($('.orderDiv').length)
    {
        orderInit();
    }
    else if($('.containerDiv').length)
    {
        homePageInit();
    }
    else if($('.cartDiv').length)
    {
        cartInit();
    }

    function orderInit(){
    
        cartTemplateInit('.order','#order-template');
      
    }
    function cartInit(){
        cartTemplateInit('.cart','#cart-template');
    }

    function cartTemplateInit(selector, selector_template){
        orderObj.checkout();
        // if orderobj is  null show emptycart
        if(orderObj.count > 0)
        {
            orderView.hideEmptyCart();
            orderView.bindOrderDetails(orderObj, selector, selector_template);
            $('.btn_plus_minus').css('opacity', 1 );
        }
        else{
            
            orderView.showEmptyCart();
        }
    }
   
    function homePageInit(){
        getFoodItemsData();// gets data from firebase database
        updateCartNotification();
      
        $('.search').on("submit", function (ev) {
    
            const searchQuery = searchView.getInput();
           
           
            state.search.filterBycategoryName(state.search.foodItems, state.search.categories, [], searchQuery);
    
            searchView.bindFoodItems(state.search.filteredItems);
        });
    }
    // click on checkOut
    $('.btn__checkout, .cartIcon').on("click", function (ev) {
   
        window.location.href ="cart.html";
    });
    $('#btn_proceed').on("click", function (event) {
        
        window.location.href ="order.html";
    });
    $('#btn_home').on("click", function (ev) {
   
        window.location.href ="index.html";
    });

    $(document).on("change", ".chk_category", function (event) {
        categoryFilter();
    });
    $(document).on("click", ".btn_plus", function (event) {
        let id = $(this).data("id");
        let qty = parseInt($('#qty_' + id).text());
        qty += 1;
        cart.updateCart(id, qty);
        $('#qty_' + id).text(qty);

        $('#btn__add-cart_' + id).hide();

        $('#btn__update_' + id).css('opacity', 1 );

        if ($('.orderDiv').length) {
            orderInit();
        }
        updateCartNotification();
        updateCartTotalOnAddOrSubtract();
    });

    $(document).on("click", ".btn_minus", function (event) {
        let id = $(this).data("id");

        let qty = parseInt($('#qty_' + id).text());
        if(qty > 0){
            qty -= 1;  
        }
        cart.updateCart(id, qty);
        $('#qty_' + id).text(qty);
        if (qty === 0){

            MinusItemHandler(id);
        }
        else {
            if ($('.orderDiv').length) {
                orderInit();
            }
        }
        updateCartNotification();
        updateCartTotalOnAddOrSubtract();
        
    });
    function MinusItemHandler(id)
    {
        if($('.orderDiv').length)
        {
            $('#order__Item-'+id).css('display', 'none' );
            orderInit();
        }
        else if($('.cartDiv').length)
        {
            $('#order__Item-'+id).css('display', 'none' );
            cartInit();
        }
        else if($('.containerDiv').length)
        {
            $('#btn__add-cart_'+id).show();
            $('#btn__update_'+id).css('opacity', 0 );
        }
    }
    function updateCartTotalOnAddOrSubtract()
    {
        if($('.orderDiv').length)
        {
            orderInit();
        }
      
        else if($('.cartDiv').length)
        {
            cartInit();
        }
    }

    $(document).on("click", ".btn__add-cart", function (event) {
        let id = $(this).data("id");
        $('#qty_' + id).text(1);
        $('#btn__add-cart_' + id).hide();
        $('#btn__update_' + id).css('opacity', 1 );;
        cart.addToCart(id, state.search.foodItems);
        updateCartNotification();
    }); 
   
});
function updateCartNotification()
{
    if (localStorage.getItem('cartItems')) {
        let cartStorage = JSON.parse(localStorage.getItem('cartItems'));
        let cnt = cartStorage.length;
        if(cnt > 0){
            $('.cart-notification').text(cnt);
            $('.cart-notification').show();
        }
        else {
            $('.cart-notification').text(0);
            $('.cart-notification').hide();
        }
       
    }
    else{
        $('.cart-notification').css('visiblity', 'hidden');
    }  
}
function categoryFilter() {

    let selectedCategories = [];

    $(".chk_category:checked").each(function () {

        selectedCategories.push($(this).data("id"));
    });

    state.search.filterBycategoryName(state.search.foodItems, state.search.categories, selectedCategories, []);

    searchView.bindFoodItems(state.search.filteredItems);
};



