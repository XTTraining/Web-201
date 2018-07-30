import firebase from 'firebase';
import * as utils from './Utils';

export default class Tax {

    constructor() {
        this.categoryTax = [];
        this.cartTax = [];
    }

    // get all tax details from firebase
    async getTaxDetails() {
        try {
            const eventref = firebase.database().ref('Tax');
            const snapshot = await eventref.once('value');
            const value = snapshot.val();
            this.result = value;
            this.persistTaxData();
        }
        catch (error) {
            console.log(`Tax Model:${error}`);
        }
    }

    // get all unique cat id {taxId:1,taxPercentage:15%,catId:1} {taxId:1,taxPercentage:12%,catId:3}
    getTaxInfoByCategory(categories) {
        let taxInfo;
        categories.forEach(category => {
            taxInfo = this.result.find(item => category.TaxId == item.Id);
            if (taxInfo != null) {
                this.categoryTax.push({
                    "taxId": category.TaxId,
                    "catName": category.Name,
                    "catId": category.Id,
                    "taxPercentage": taxInfo.TaxPercentage
                });
            }
        });

        return this.categoryTax;
    }

    getTax(cartItems, categories) {
        const taxInfo = this.getTaxInfoByCategory(categories);
        let hasItem, taxAmount, index, totalAmount = 0, amount = 0;
        const defaultTax = parseFloat(5);

        cartItems.forEach(item => {
            hasItem = false;

            let tax = taxInfo.find(function (data) {
                return data.catId == item.cartItem.CatId;
            })

            taxAmount = (utils.convertToFloat(item.totalPrice) * utils.convertToFloat(tax.taxPercentage) / 100);
            amount = utils.convertToFloat(amount) + utils.convertToFloat(item.totalPrice);
            totalAmount = utils.convertToFloat(totalAmount) + utils.convertToFloat(taxAmount);

            if (this.cartTax.length > 0) {
                index = this.cartTax.findIndex(function (item) {
                    return item.taxPercentage == tax.taxPercentage;
                });

                if (index >= 0) {
                    hasItem = true;
                    this.cartTax[index].taxPercentage = parseFloat(tax.taxPercentage);
                    if (parseFloat(tax.taxPercentage) === defaultTax) {
                        this.cartTax[index].catName = "Foods";
                    }
                    else if (!this.cartTax[index].catName.includes(tax.catName)) {
                        this.cartTax[index].catName = this.cartTax[index].catName + "," + tax.catName;
                    }
                    this.cartTax[index].taxAmount = (utils.convertToFloat(this.cartTax[index].taxAmount) + utils.convertToFloat(taxAmount)).toFixed(2);
                }
            }

            if (!hasItem) {
                this.cartTax.push({
                    "taxPercentage": tax.taxPercentage,
                    "catName": tax.taxPercentage == defaultTax ? "Foods" : tax.catName,
                    "taxAmount": taxAmount.toFixed(2)
                });
            }
        });

        this.cartTax.amount = amount.toFixed(2);
        this.cartTax.totalAmount = (totalAmount + amount).toFixed(2);
    }

    persistTaxData() {
        localStorage.setItem('taxData', JSON.stringify(this.result));
    }


    readTaxStorage() {
        const storage = JSON.parse(localStorage.getItem('taxData'));
        // Restoring likes from the localStorage
        if (storage) this.result = storage;

    }

}
