import BookModel from './js/model/Book';
import ShoppingBagModel from './js/model/ShoppingBag';
import BookDetail from './js/model/BookDetail';
import * as utility from './js/base/utility';
import * as bookView from './js/view/bookView';
import * as filterView from './js/view/filterView';
import * as bookDetailView from './js/view/bookDetailView';
import * as shoppingBagView from './js/view/shoppingBagView';
import * as base from './js/view/base';
import * as accordion from './js/view/accordion';
import * as cartView from './js/view/cartView';
import * as paymentView from './js/view/payment';
import * as lscache from 'lscache';
import * as global from './js/base/constants';
import './sass/main.scss'; 
require.context("./img/", true, /\.(png|svg|jpg|gif)$/);
require.context("./css/", true, /\.(png|jpg)$/);

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }


//Initializing state which keeps track of the data
let state = {}, pageCount = 2, pageNumber = 1;
state.shoppingBag = new ShoppingBagModel();

/* -------------- BOOK TILE FUNCTIONALITIES-------- */

// This method controls the book details display functionality
const displayBookDetails = async (element) => {
    try {
        // use Utility class to extract book id from element's id
        const bookISBN = utility.getBookIdFromElementId(element.target.parentElement.id);
        
        // if book id is valid
        if(bookISBN){
            // initialize book object and get details from model layer
            let book = new BookDetail(bookISBN);
            let bookData = await book.getBookDetail();

            // interact with book view UI to populate UI with details
            bookDetailView.renderBookDetailsUsingHandlebars(bookData);

            // attach event listener functionalities once data is loaded
            if(base.elements.close_bookDetailDisplay){
                base.elements.close_bookDetailDisplay.addEventListener("click", bookDetailView.closeBookDetailsView);
            }
        }  
    }
    catch(ex) {
        console.log(ex);
    } 
}

// This method is used to toggle add to favourite icon
const toggleFavouriteIcon = (divElement) => {
    var index;
    if(divElement){

        index = divElement.children[0].children[0].href.baseVal.indexOf('#like-2');
        if(index > -1) {
            divElement.children[0].innerHtml = `
                            <svg class="icon icon-like Btn__AddToFav"  tabindex="0" id="svg_addToFav_{{Name}}__{{ISBN}}">
                                <use xlink:href="./img/icons/SVG-sprite.svg#like"></use>
                            </svg>
            `;
        }
        else {
            divElement.children[0].innerHtml = `
            <svg class="icon icon-like Btn__AddToFav"  tabindex="0" id="svg_addToFav_{{Name}}__{{ISBN}}">
                <use xlink:href="./img/icons/SVG-sprite.svg#like-2"></use>
            </svg>
            `;
        }
    }
    
}

// This method is used to add book to favourites list
const addBookToFavourite = async(element) => {
    try {
        // use Utility class to extract book id from element's id
        const divElement = element.target.parentElement;
        const bookISBN = utility.getBookIdFromElementId(divElement.id);
        
        // if book id is valid
        if(bookISBN){
            //add book to my shopping bag likes (favourites)
            await state.shoppingBag.addLike(bookISBN);
        
            // persist data on cache
            lscache.set(global.constants.cacheKey_likeItem, state.shoppingBag.Like.likes);

            // display updated favourite count on screen
            shoppingBagView.updateLikes(state.shoppingBag.Like.likes.length);

            toggleFavouriteIcon(divElement);
        }
    }
    catch(ex) {
        console.log(ex);
    }
}

// This method is used to add book to cart list
const addBookToCart = async(element) => {
    try{
        // use Utility class to extract book id from element's id
        const bookISBN = utility.getBookIdFromElementId(element.target.parentElement.id);
        // if book id is valid
        if(bookISBN){
            //add book to my shopping bag cart
            await state.shoppingBag.addToCart(bookISBN);
            // persist data on cache
            lscache.set(global.constants.cacheKey_cartItem, state.shoppingBag.Cart.cart);

            // display updated cart item count on screen
            shoppingBagView.updateCart(state.shoppingBag.Cart.cart.length);
        }
    }
    catch(ex) {
        console.log(ex);
    }
}

// initialize book tile functionality e.g., add to cart, add to like and edit book item
const initBookTileFunctionality = () => {
    // variable declaration for book tile elements
    let cartElements = base.elements.book_addToCart,
        detailElements = base.elements.book_viewDetail,
        favIconElements = base.elements.book_addToFavourite;
    
    // Loop through each cart element on book tiles and attach event listener to add book to cart
    if(cartElements.length > 0){
        for(let el in cartElements) {
            var element = cartElements[parseInt(el)];
            if(element){
                //if element exists, attach event listener to add book to cart
                element.addEventListener("click", addBookToCart);
            }
        }
    }

    // Loop through each cart element on book tiles and attach event listener to edit book
    if(detailElements.length > 0){
        for(let el in detailElements) {
            var element = detailElements[parseInt(el)];
            if(element){
                //if element exists, attach event listener to display details
                element.addEventListener("click", displayBookDetails);
            }
        }
    }

    // Loop through each favourite icon element on book tiles and attach event listener
    if(favIconElements.length > 0){
        for(let el in favIconElements) {
            var element = favIconElements[parseInt(el)];
            if(element){
                //if element exists, attach event listener to add to favourite
                element.addEventListener("click", addBookToFavourite);
            }
        }
    }    
}
const loadMore = () => {
    pageNumber += 1;
    reloadData();
}

const reloadData = () => {
    enableSearchResultFunctionalities(state.bookModel.categories, 
        state.bookModel.filterData, pageCount, pageNumber);
}

const enableLoadMoreFunctionality = () => {
    let element = document.getElementById(base.constants.btnLoadMore);
    if(element) {
        element.addEventListener("click", loadMore);
    }
}

const enableRefreshFunctionality = () => {
    let element = document.getElementById(base.constants.btnRefresh);
    if(element) {
        element.addEventListener("click", reloadData);
    }
}

/*-------------------SEARCH ---------------------*/

// This method initializes all functionalities
const enableSearchResultFunctionalities = (data) => {
    // after books are received, display on page
    bookView.renderBooksUsingHandlebars(data, state.bookModel.filterData, pageCount, pageNumber);

    // initialize accordion functionality
    accordion.initAccordion();

    // initialize book tile functionality
    initBookTileFunctionality();

    // initialize search functionality
    enableSearch()

    // enable filter functionality
    enableFilterFunctionality();

    enableLoadMoreFunctionality();

    enableRefreshFunctionality();
}

// This method is used to search book based on user entered input
const controlSearch = async() => {
    
    let searchInput;
    
    //Read search input
    if(!state.bookModel) { 
        state.bookModel = new BookModel();
    }
    // get user input from bookView
    searchInput = bookView.getSearchInput().toLowerCase();
    // if search input is not empty
    if(searchInput.length > 0) {
        base.renderLoaderForSearchResults();
        try {
            //Call search method on books
            await state.bookModel.getBooksBySearchKey(searchInput);

            //display results
            bookView.renderBooksUsingHandlebars(state.bookModel.filteredData,state.bookModel.filterData, pageCount, pageNumber);

            //accordion functionality once the divs are rendered on page
            accordion.initAccordion();

            // call method to enable book tile functiona
            initBookTileFunctionality();
            
            // enable filter functionality
            enableFilterFunctionality();
        }
        catch(ex) {
            console.log(ex);
        }
    } else {
        alert('Please enter search key');
    }

}

// attach event listener to search button
const enableSearch = () => {
    // Get search element
    let searchElement = bookView.getSearchElement();
    // Attach search element
    searchElement.addEventListener('click', controlSearch);
}


/* ---------------BOOK RETRIEVAL-----------------*/
// This method is used to get all books on page, which is call at the initial load
const controlBookSearch = async () => {
    //Instantiate book model        
    state.bookModel = new BookModel();  

    // Load default divs for render event;
    bookView.renderSearch();
    // display loader until the books are loaded
    base.renderLoaderForSearchResults();

    try {
        // get books segragated in categories
        await state.bookModel.getBooksByCategory();  

        enableSearchResultFunctionalities(state.bookModel.categories);
    }
    catch(ex) {
        console.log(ex);
    }

}

// Applies filter on search results
const filterSearchResults = () => {
    let rating, categories, authors, searchInput = [], results;

    if(!state.bookModel) { 
        state.bookModel = new BookModel();
    }

    rating = filterView.getSelectedRating();
    categories = filterView.getSelectedCategories();
    authors = filterView.getSelectedAuthors();

    searchInput.rating = rating;
    searchInput.categories = categories;
    searchInput.authors = authors;

    results = state.bookModel.getFilteredBooks(searchInput);

    enableSearchResultFunctionalities(results);
}



/*----------------------SHOPPING BAG CONTROLLER ------------*/

// Display Cart details on Cart page
const displayCartDetails = () => {
    lscache.set(global.constants.cacheKey_cartItem, state.shoppingBag.Cart.cart);
    renderCheckoutPage();
};

// Display Cart details on Cart page
const displayLikeDetails = () => {    
    lscache.set(global.constants.cacheKey_likeItem, state.shoppingBag.Like.likes);
    renderCheckoutPage();
};

//attach event listener for like icon
base.elements.display_notification_likes.addEventListener("click", displayLikeDetails);
//attach event listener for cart icon
base.elements.display_notification_cart.addEventListener("click", displayCartDetails);


/*********************************************************************** */
/******************************FILTER FUNCTIONALITY********************* */
/*********************************************************************** */

const collapseAllFilterDiv = () => {
    
    var collapsibleElements = document.getElementsByClassName("filter-row");

    Array.from(collapsibleElements).forEach( (element) => {
        element.style.display = "none";
    });
}

const displayRespectiveDiv = (event) => {
    var elementId, divId, divElement;
    // Collapse all filter Divs
    collapseAllFilterDiv();

    // expand the respective div
    elementId = event.target.parentElement.id;

    // construct div id
    divId = elementId + "__div";
    // get div element
    divElement = document.getElementById(divId);
    if(divElement){
        divElement.style.display = "flex";
    }
}

const enableFilterFunctionality = () => {
    var collapsibleElements = document.getElementsByClassName(base.constants.filterButton);
    
    Array.from(collapsibleElements).forEach( (element) => {
        element.addEventListener("click", displayRespectiveDiv);
    });

    var btnApplyFilter = document.getElementById(base.constants.btnApplyFilter);

    btnApplyFilter.addEventListener("click", filterSearchResults);
}

/*********************************************************************** */
/****************** PAGE RENDERING FUNCTIONALITY   ********************* */
/*********************************************************************** */

// This method displays home page
const renderPage = () => {
    let currentPage, cartItems, likeItems;
    
    // Read current page from cache
    currentPage = lscache.get(global.constants.cacheKey_pageName);
    if(currentPage && currentPage !== null 
                && currentPage !== undefined                     
                && currentPage === 'checkout'){
        toggleMainPage(currentPage);
        renderCheckoutPage();
    }
    else {
        // if currentPage doesn't exist, navigate to home page
        renderHomePage();
    }

    // read cart items from cache
    cartItems = lscache.get(global.constants.cacheKey_cartItem);
    if(cartItems){
        // update shopping bag cart from cache 
        shoppingBagView.updateCart(cartItems.length);
    }

    // read like items from cache
    likeItems = lscache.get(global.constants.cacheKey_likeItem);
    if(likeItems){
        // update shopping bag like from cache 
        shoppingBagView.updateLikes(likeItems.length);
    }
}

// render Home page 
const renderHomePage = () => {    
    // initialize current page to home
    const currentPage = 'home';
    lscache.set(global.constants.cacheKey_pageName, currentPage);

    // change class for the page segment
    toggleMainPage(currentPage);

    //render books for home page and shopping bag
    controlBookSearch();
    // initialize shopping bag, it calculates all 
    state.shoppingBag.initializeShoppingBag();   
    // enable search funcitonality on button click 
    enableSearch()
  
}

// renders home page
const reloadHomePage = () => {
    // set cache key for current page to home
    lscache.set(global.constants.cacheKey_pageName, 'home');

    // call global methor ot render a page
    renderPage();
}

/*-------------   CART DISPLAY   ----------------*/


//Render checkout page
const renderCheckoutPage = () => {
    var cartData, likeData;
    lscache.set(global.constants.cacheKey_pageName, 'checkout');
    //clean up html for details page
    toggleMainPage('checkout');

    //initialize shopping bag
    let bagData = state.shoppingBag.initializeShoppingBag();
    
    // cartData = lscache.get(global.constants.cacheKey_cartItem);
    cartData = bagData;
    if(bagData) {
        //check if shopping bag's cart is not empty
        if(bagData.Cart.cart.length > 0){
            cartView.renderCart(bagData);
            // if cart is rendered, add cart page event
            enableCheckoutPageEvents();
            attachCartEventListeners();
        } else {
            // if there is not item in cart, alert and go back to home page
            alert('There are no items in your cart! We are navigating you to home page.');
            renderHomePage();
        }       
    }
}

/*********************************************************************** */
 /*                     CART QUANTITY CHANGE EVENTS                       */
 /*********************************************************************** */

 // This method is used called to update entire shopping bag to recalculate its values, 
 // when a cart item's quantity is changed
 const updateQuantityForBook = (elementId, quantity) => {
    // use Utility class to extract book id from element's id
    const bookISBN = utility.getBookIdFromElementId(elementId);

    // Update the quantity of the shopping bag cart item
    state.shoppingBag.updateCartItemQuantity(bookISBN, quantity);

    // re-render the checkout page
    renderCheckoutPage();
}

// Attach event listener for quantity change event
const enableQuantityChangedEvent = () => {
    // get the element that represents quantity
    const elementQuantity = document.getElementsByClassName(base.constants.quantity);

    // loop through each element and add event listener for increment
    Array.from(elementQuantity).forEach( currentElement => 
        // attach event handler for the quantity element value change
        currentElement.addEventListener('onchange', updateQuantityForBook)
    );
}

// This method is used to increase the quantity by 1
export const incrementQuantity = (event) => {
    // read the value of quantity of the previous sibling 
    const quantityElement = event.target.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);

    //increment
    quantity = quantity + 1;

    // display the incremented quantity to the screen
    quantityElement.textContent = quantity;

    // update quantity of the book in shopping bag cart
    updateQuantityForBook(quantityElement.id, quantity);
}

// This method is used to decrease the quantity by 1
export const decrementQuantity = (event) => {
    // read the value of quantity of the next sibling 
    const quantityElement = event.target.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    
    // decrease the quantity if its greate than zero, else do nothing
    if(quantity > 0){
        
        quantity = parseInt(quantity) - 1;
        quantityElement.textContent = quantity; 

        // update quantity of the book in shopping bag cart
        updateQuantityForBook(quantityElement.id, quantity);
    }
}

// This method is used to attach the event listeners to the page button 
// for increment and decrement
export const attachCartEventListeners = () => {
    // get all elements by class names
    const elementsPlus = document.getElementsByClassName(base.constants.quantityPlus),
        elementsMinus = document.getElementsByClassName(base.constants.quantityMinus);

    // loop through each element and add event listener for increment
    Array.from(elementsPlus).forEach( currentElement => 
        currentElement.addEventListener('click', incrementQuantity)
    )

    // loop through each element and add event listener for decrement
    Array.from(elementsMinus).forEach( currentElement => 
        currentElement.addEventListener('click', decrementQuantity)
    )
}

/*********************************************************************** */
/****************************** PAGE RENDERING FUNCTIONALITY********************* */
/*********************************************************************** */

// This method is used to render payment page, for user confirmation
const renderPaymentPage = () => {
    // initialize page name
    let currentPage = 'payment', bagData;

    // persist page name to cache
    lscache.set(global.constants.cacheKey_pageName, currentPage);
    // change the class of the main section 
    toggleMainPage(currentPage);

    //initialize shopping bag
    bagData = state.shoppingBag.initializeShoppingBag(this);

    // if badData is valid
    if(bagData) {
        //check if shopping bag's cart is not empty
        if(bagData.Cart.cart.length> 0){
            // call view metho to render payment page
            paymentView.renderPaymentPage(bagData);
        } else {
            // if there is not item in cart, alert and go back to home page
            alert('There are no items in your cart! We are navigating you to home page.');
            renderHomePage();
        }       
    }    
}

// This method is used to attach page checkout events
export const enableCheckoutPageEvents = () => {
    // initialize elements for checkout events
    let btnPaymentBottom = document.getElementById("btn_payment_bottom"),
        btnContinueBottom = document.getElementById("btn_continue_bottom"),
        btnPaymentTop = document.getElementById("btn_payment_top"),
        btnContinueTop = document.getElementById("btn_continue_top");
    
    //add event listener to checkout buttons
    if(btnContinueBottom){
        btnContinueBottom.addEventListener("click", reloadHomePage);
        btnContinueTop.addEventListener("click", reloadHomePage);
        btnPaymentBottom.addEventListener("click", renderPaymentPage);
        btnPaymentTop.addEventListener("click", renderPaymentPage);
    }
}

// This code cleans up home page to dislay only the content that's inteded
// displayElementType = home for homepage "class = main-content"
// displayElementType = checkout for checkout page and "class= main-cart"
// dispalyElementType = payment for payment page
const toggleMainPage = (displayElementType) => {
  
    // initialize variable for main page section
    let mainSection = base.elements.mainSection;
    // clean up main section 
    mainSection.innerHtml = "";

    // clean up the classes for main section
    if (mainSection.classList) { 
        mainSection.classList.remove("main-cart");
        mainSection.classList.remove("main-content");
        mainSection.classList.remove("main-payment");
    }
    // add the class name, based on page name
    if(displayElementType === 'home'){
        mainSection.classList.add("main-content");
    } 
    else if(displayElementType === 'checkout'){
        mainSection.classList.add("main-cart");
    } 
    else if(displayElementType === 'payment'){
        mainSection.classList.add("main-payment");
    } 
}

// loads the page on initial page load
renderPage();


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}