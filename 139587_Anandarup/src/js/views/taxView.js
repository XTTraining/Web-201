const handlebar = require('../../templates/cart_taxSection.handlebars');

import {elements} from  './base'; 
 
export const showCartTaxSection = (cartTaxData) => {
    if(cartTaxData) {
        $(elements.cartPaymentDetails).html('');
        $(elements.cartPaymentDetails).append(handlebar(cartTaxData.taxData));
    }

}