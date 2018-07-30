import { parse } from "path";


export default class Checkout {
    constructor() {
        this.Checkout = {};
        this.Checkout.products = [];
    }
    prepareDataForcheckout(cartObj, cartTaxObj) {
        
        this.Checkout.totalProductCount = cartObj.reduce((accumulator, current)=> {
            return accumulator + current.count;
        },0);
        cartObj.forEach(current => {
            current.productDetails.count = current.count;
            current.productDetails.totalPrice = current.totalPrice;
            this.Checkout.products.push(current.productDetails);
        });
        this.Checkout.totalAmount = cartTaxObj.totalAmount;
        this.Checkout.amountWithTax = cartTaxObj.totalAmountWithTax;
        this.Checkout.gstAmount = this.Checkout.amountWithTax - this.Checkout.totalAmount;
        if(parseInt(cartTaxObj.shippingAmount)) {
            this.Checkout.deliveryCharges = 50;
        } else if ( cartTaxObj.shippingAmount && cartTaxObj.shippingAmount.toLowerCase() === 'free') {
            this.Checkout.deliveryCharges = 0;
        }
        return this.Checkout;
    }
}