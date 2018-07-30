import FireBaseAPI from './firebaseapi';
import { elements, collections } from './base';

import Food from './models/food';
import * as FoodView from './views/foodView';

import Order from './models/order';
import * as OrderView from './views/orderView';

const api = new FireBaseAPI();
const food = new Food(api);
const order = new Order(api);

//Generate uniquie Id 

if (localStorage['-orderid-'] == undefined) {
    localStorage['-orderid-'] = Date.now();
}

//CATEGORY CONTROLLER
const controlCategory = async () => {

    //GET THE LIST OF CATEGORIES.
    food.getCategroyList().then(function (categoryList) {
        //RENDER THE CATEGORIES.
        FoodView.renderCategory(categoryList, elements.category);
    });

    //LIST FOOD ITEMS BASED ON CATEGORY SELECTION.
    food.getFoodList(order).then(function (foodList) {
        //RENDER FOOD ITEMS        
        FoodView.renderFood(foodList, elements.foodList);
    });
    setupEventListener();
}

const setupEventListener = () => {

    if (elements.category !== undefined && elements.category !== null) {
        //SETUP EVENT LISTNER FOR CATEGORY EXPAND TO LIST THE SUBCATEGORY AND TO FILTER THE FOOD ITEMS BASES ON SUBCATEGORY SELECTION
        elements.category.addEventListener('click', function (event) {

            //GET CATEGORY DOCUMENT ID.
            const categoryDoc = event.target.getAttribute('data-category-doc-id');

            //GET THE DOM ELEMENT OF FILTER NODE TO APPEND THE SUBCATEGORIES.
            const tabContentElement = event.target.parentNode.querySelector(elements.tabContentFilter);

            //IF CATEGORY DOC AND FILTER NOTE IS NOT NULL AND UNDEFINED, FETCH THE DOCS.
            if (categoryDoc !== null && tabContentElement !== undefined) {

                //CONSTRUCT THE SUBCATEGORY COLLECTION PATH. EX: /category/0001/subCategory
                let collectionName = `/${collections.category}/${categoryDoc}/${collections.subCategory}`;

                //GET THE SUBCATEGORIES        
                food.getSubCategroyList(collectionName).then(function (subCategoryList) {
                    //RENDER SUBCATEGORIES
                    FoodView.renderSubCategory(subCategoryList, tabContentElement);
                });
            }
            //IF SUBCATEGORY ITEM CHECKED OR UNCHECKED FILTER FOOD DATA.
            if (event.target.getAttribute('class') === elements.filterControl) {

                const filerSubCategories = [];
                document.querySelectorAll('.filter-type-control').forEach((ele) => {
                    if (ele.checked) filerSubCategories.push(ele.id.split('__')[1]);
                });
                //FILTER FOOD ITEMS.
                food.getFoodList().then(function (foodList) {
                    //RENDER FOOD ITEMS
                    FoodView.renderFood(foodList, elements.foodList, filerSubCategories);
                });

                //INIT EVENT LISTENER FOR + AND - CONTROLS IN LIST VIEW.
                addRemoveCartCategory();
            }
        });
    }
}

const addRemoveCart = () => {
    try {
        const eventType = event.target.getAttribute('class');

        if (eventType === elements.addToCart || eventType === elements.removeFromCart) {

            const docId = event.target.getAttribute('data-id');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const currentValElement = document.querySelectorAll('span[class="product__content-control-text"][data-id="' + docId + '"]')[0];
            let currentVal = parseInt(currentValElement.innerHTML, 0);

            if (eventType === elements.addToCart && currentVal < 10) {
                currentVal = currentVal + 1;
            }
            else if (eventType === elements.removeFromCart && currentVal > 0) {
                currentVal = currentVal - 1;
            }
            currentValElement.innerHTML = currentVal;
            order.updateOrder(docId, currentVal, price);
            return {
                "id": docId,
                "element": currentValElement.closest(".order__list-table-row")
            };
        }
    }
    catch (ex) {
        console.log(ex);
    }
}


const addRemoveCartCategory = () => {
    elements.foodList.addEventListener('click', function (event) {
        addRemoveCart();
    });
}



if (elements.category !== undefined && elements.category !== null) {
    controlCategory();
    addRemoveCartCategory();
}

////////// ORDER /////////////////////
/// ORDER CONTROLLER
const controlOrder = () => {
    //GET THE LIST OF CATEGORIES.
    order.getOrderList().then(function (orderList) {
        //RENDER THE CATEGORIES.
        OrderView.renderOrders(orderList, elements.orderListFooter);
        //RENDER ORDER SUMMARY
        OrderView.orderSummary(orderList);
    });
}



const addRemoveCartOrder = () => {
    elements.orderList.addEventListener('click', function (event) {
        const currentOrder = addRemoveCart();
        //REFRESH THE UPDATED VALUES        
        if (currentOrder !== undefined && currentOrder !== null) {
            order.getOrderItem(currentOrder.id).then(function (order) {
                OrderView.renderOrder(order, currentOrder.element);
            });
        }
    });
}


if (elements.orderListFooter !== undefined && elements.orderListFooter !== null) {
    controlOrder();
    addRemoveCartOrder();
}






