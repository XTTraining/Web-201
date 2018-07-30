import firebase from 'firebase';
import '../sass/main.scss';
require.context("../img/", true, /\.(png|svg|jpg|gif)$/);
import './staticComponents/carousel';
import './staticComponents/accordion';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';
import data from './models/Data';
import Cart from './models/AddToCart';
import * as loadDataView from './views/loadData';
import * as searchView from './views/searchView';
import $ from "jquery";


/*Global state of the application*/
const state = {};

//***************************************LOAD DATA ON PAGE LOAD**************************************************************************************************

const controlFood = (ref) => {
    //load loader till the time food item load
    renderLoader(elements.mainMenuInput);

    //method to get data from firebase
    ref.on("value", function (snapshot) {
        var result = snapshotToArray(snapshot);
        state.data = result;

        //load food item html on page
        result.forEach(loadDataView.renderResults);

        // clear loader
        clearLoader();

        //show inc/dec button on addToCart click
        if (state.addToCart) {

            state.addToCart.cartItems.forEach((item) => {
                loadDataView.hideShowButton(item);
                if (item['quantity'] < 1) {
                    loadDataView.showAddtoCartButton(item['id']);
                }

            });
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
}


/*method to convert firebase data to array*/
const snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};






//**************************************************************************************************************

//SEARCH DATA


const GetSearchResults = (item, element) => {
    console.log(state.query);
    if (item.title.toLowerCase().includes(state.query.toLowerCase())) {
        loadDataView.renderFoodItems(item, element);
    }
}

//get items from each category
const GetCategoryItems = (category) => {
    let element = loadDataView.fetchCategoryElement(category);
    //make category div empty before load result
    element.innerHTML = "";
    for (var item in category) {
        if (item != "key") {
            GetSearchResults(category[item], element);
        }
    }

    //open div if data is there
    loadDataView.hideShowDiv(element);
}

const searchFoodControl = () => {
    state.query = searchView.getInput();
    state.data.forEach(GetCategoryItems);
}


// event listener on search click
if (elements.searchForm) {
    elements.searchForm.addEventListener('submit', e => {
        e.preventDefault();
        searchFoodControl();
    });
}





//********************************************************************************************************


//FILTER DATA
const filterFoodControl = (filterString) => {

    const FetchFood = (item, element) => {
        let filter = item.filter;
        if (filter) {
            var filters = filter.split("|");
            filters.forEach(function (filter) {
                if (filter === filterString) {
                    loadDataView.renderFoodItems(item, element);
                }
            });
        }
    }

    const GetCategory = (category) => {
        let element = loadDataView.fetchCategoryElement(category);
        element.innerHTML = "";
        for (var prop in category) {

            if (prop != "key") {
                FetchFood(category[prop], element);
            }

        }
        loadDataView.hideShowDiv(element);
    }

    state.data.forEach(GetCategory);
}




var checkboxes = document.getElementsByClassName("filter__options--checkbox");
Array.from(checkboxes).forEach(item => item.addEventListener('click', e => {
    if (!elements.checkboxVeg.checked) {
        elements.checkboxNonVeg.disabled = false;
        elements.checkboxNew.disabled = false;
        elements.checkboxVeg.disabled = false
    }

    if (elements.checkboxVeg.checked) {
        var filter = "veg";
        filterFoodControl(filter);
        elements.checkboxNonVeg.disabled = true;
        elements.checkboxNew.disabled = true;
        elements.checkboxVeg.disabled = false;
    }
    if (elements.checkboxNonVeg.checked) {
        var filter = "nonVeg";
        filterFoodControl(filter);
        elements.checkboxVeg.disabled = true;
        elements.checkboxNew.disabled = true;
        elements.checkboxNonVeg.disabled = false;
    }
    if (elements.checkboxNew.checked) {
        var filter = "new";
        filterFoodControl(filter);
        elements.checkboxNonVeg.disabled = true;
        elements.checkboxVeg.disabled = true;
        elements.checkboxNew.disabled = false;
    }
    if (!elements.checkboxNonVeg.checked && !elements.checkboxNew.checked && !elements.checkboxVeg.checked) {
        state.data.forEach(loadDataView.renderResults);
    }
})
);


//********************************************************************************************************
//ADD TO CART


const controlAddToCart = (id) => {
    //show in/dec button
    loadDataView.showIncDecButton(id);

    //  Add item to cart 
    const addItemsToCart = (item, category) => {
        if (id) {

            if (category[item].id === id) {

                category[item].quantity = 1;
                category[item].gst = 0;
                state.addToCart.addToCart(category[item].id, category[item].image, category[item].title,
                    category[item].price, category[item].quantity, category[item].gst, category.key);

            }
        }
    }
    const getCategory = (category) => {

        for (var item in category) {
            addItemsToCart(item, category);
        }
        state.addToCart.readStorage();
        elements.notification.innerHTML = state.addToCart.fetchNumCartItems();
    }
    state.data.forEach(getCategory);
}


//on page late events
window.addEventListener('load', () => {
    //load data on page load
    controlFood(firebase.database().ref("/categories"));
    // Restore items added to cart on page load
    state.addToCart = new Cart();
    state.addToCart.readStorage();
    //update add to cart notification
    if (elements.notification) {
        elements.notification.innerHTML = state.addToCart.fetchNumCartItems();
    }
    if (elements.total) {
        elements.total.innerHTML = state.addToCart.calculateTotal();
    }
    if(elements.mobileNotification){
        elements.mobileNotification.innerHTML = state.addToCart.fetchNumCartItems();
    }

    if(elements.orderedItems){
        elements.orderedItems.innerHTML = "";
        updateOrderListDetails();
    }
    
});


//show add to cart popup

if (elements.cart) {
    elements.cart.addEventListener('mouseover', e => {
        addToCartIconHover();
    });
}

//function to be called on  add to cart  mouse hove
const addToCartIconHover = () => {
    loadDataView.openCart();
    elements.cartItems.innerHTML = "";
    if (state.addToCart != undefined && state.addToCart.cartItems != undefined && state.addToCart.cartItems.length > 0) {
        //calculate gst
        state.addToCart.cartItems.forEach(item => state.addToCart.calculateGST(item.id));
        //render cart items in pop up
        renderCartItems();
        //update total in UI
        if (elements.total) {
            elements.total.innerHTML = state.addToCart.calculateTotal();
        }

    }
}



//render cart items in pop up
const renderCartItems = () => {
    state.addToCart.cartItems.forEach((item) => {
        if ((item.quantity != undefined || item.quantity != NaN) && (item.quantity > 0)) {
            loadDataView.renderCartItems(item);
        }
    });
}
//show add to cart popup for mobile

if (elements.mobileCart) {
    elements.mobileCart.addEventListener('click', e => {
        addToCartIconHover();
        
    });
}

//close add to cart popUp

if (elements.closePopUp) {
    elements.closePopUp.addEventListener('click', e => {
        loadDataView.closeCart();
    });
}


// Add event listener to
//close/open pop up
//remove cart item
window.addEventListener('mouseover', e => {

    if (e.target.matches(elementStrings.cartPopUp)) {
        loadDataView.openCart();
    }
    else {
        loadDataView.closeCart();
    }
});


//********************************************************************************************************
//increment and decrement item nos on product card on home page  


if (elements.accordian) {
    elements.accordian.addEventListener('click', e => {
        if (e.target.matches(elementStrings.add)) {
            incrementQuantity(e.target);
        } 
        if (e.target.matches(elementStrings.remove)) {
            decrementQuantity(e.target);
        }
        //Add to cart
       
        if (e.target.matches(elementStrings.addtoCart)) {
           controlAddToCart(e.target.id);
        } 
    });
}


const incrementQuantity = (target) => {
    const element = $(target).closest(elementStrings.addClass);
    let id = loadDataView.fetchId(element);
    let count = state.addToCart.incrementcartQuantity(id);
    let input = document.querySelector(elementStrings.cardInputId + '-' + id);
    if (count != undefined || count != NaN) {
        input.value = count;
    }
}

const decrementQuantity = (target) => {
    const element = $(target).closest(elementStrings.removeClass);
    let id = loadDataView.fetchId(element);
    let count = state.addToCart.decrementcartQuantity(id);
    let input = document.querySelector(elementStrings.cardInputId + '-' + id);
    if (count != undefined && count != NaN && count >0) {
        input.value = count;
    }
    showAddToCartButton(count, id);
      
}

// shows add to cart button when quantity is 0 and update notification as well

const showAddToCartButton = (count, id) => {
    if (count < 1) {
        loadDataView.showAddtoCartButton(id);
        state.addToCart.deleteCartItem(id);
        let notification = elements.notification.innerHTML;
        if(notification){
            elements.notification.innerHTML = notification - 1;
        }
             
  }
}





  
//update order details on order list page
const updateOrderListDetails = () => {
    state.addToCart.cartItems.forEach((item) => {
        if ((item.quantity != undefined || item.quantity != NaN) && (item.quantity > 0)) {
            state.addToCart.cartItems.forEach(item => state.addToCart.calculateGST(item.id));
            //update total in UI
            elements.total.innerHTML = state.addToCart.calculateTotal();
            loadDataView.renderOrderListItems(item);
        }
        else {
            elements.total.innerHTML = "0";
        }
        if ((item.quantity != undefined || item.quantity != NaN) && (item.quantity > 0)) {
            document.getElementById(elementStrings.cardInput + '-' + item.id).value = item.quantity;
        }
          
    });
}


//increment and decrement item nos on order list page
if (elements.orderedItems) {
    elements.orderedItems.addEventListener('click', e => {
        if (e.target.matches(elementStrings.add)) {
            incrementQuantity(e.target);
            elements.total.innerHTML = state.addToCart.calculateTotal();
        }
        if (e.target.matches(elementStrings.remove)) {
            decrementQuantity(e.target);
            elements.total.innerHTML = state.addToCart.calculateTotal();
        }
        //remove  item from cart
        if (e.target.matches(elementStrings.cartCancel)) {
            if (e.target.matches(elementStrings.cartCancel)) {
                const element = $(e.target).closest(elementStrings.cancel);
                state.addToCart.deleteCartItem(element.id);
                $(element).parent().html("");
                elements.total.innerHTML = state.addToCart.calculateTotal();
            } 
        }
    });
}


