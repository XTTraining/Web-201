import { elements } from './base';

var paymentTemplate = require('../../templates/tax.handlebars');

// load all cart items
export const renderPaymentDetails = (taxDetails) => {
    elements.paymentDetails.html(paymentTemplate(taxDetails));
};