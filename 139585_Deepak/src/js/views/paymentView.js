import {
    elements
} from './base';

export const renderPayment = (priceBreakdown) => {
    var done = false;
    if (priceBreakdown) {
        elements.paymentTotal.text(priceBreakdown.itemTotal);
        elements.paymentTax1.text(priceBreakdown.tax1);
        elements.paymentTax2.text(priceBreakdown.tax2);
        elements.paymentGrandTotal.text(priceBreakdown.finalTotal);
        done = true;
    }
    return done;
}
