import { elements, renderLoader, clearLoader } from './base';
var payentTemplate = require("./helpers/paymentPageTemplate.hbs");

//This method expects shopping bag data to populate payment page
export const renderPaymentPage = (bagData) => {
    //populate search results using handlebars template 
    elements.mainSection.innerHTML = payentTemplate(bagData);
    // once page is rendered, enable page events
    enableEventListenersForPaymentPage();
}

// This method is used to render page events
const enableEventListenersForPaymentPage = () => {
    // Get button element
    var confirmButtonElement = document.getElementById("btn_confirm_payment");
    if(confirmButtonElement){
        // attach event listener for confirm functionaltiy
        confirmButtonElement.addEventListener('click', paymentConfirmed);
    }
}

// event listener for confirmation button click
const paymentConfirmed = () => {
    alert('Thanks for your confirmation. Your order would be dispatched soon!');
}