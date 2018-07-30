

export default class Tax {
    constructor() {
        this.taxData = {};
        this.taxData.items = [];
        this.taxData.totalAmount = 0;
        this.taxData.shippingAmount = 0;
    }

    calculateGST(cartData, fireBaseData) {
        if (cartData.length > 0) {
            const shippingAmount = 50;
            const shippingMaxLimit = 500;
            cartData.forEach(element => {
                element.taxPercentage = this.getProductTaxInfo(element, fireBaseData);
                this.taxData.totalAmount += element.totalPrice;
            });
            const productMap = cartData.groupByAsMap('taxPercentage');
            productMap.forEach((value, key) => {
                this.constructTaxObj(value, key);
            });

            this.taxData.shippingAmount = this.taxData.totalAmount <= shippingMaxLimit ? shippingAmount : 'Free'; 
            const shipping = this.taxData.shippingAmount === 'Free' ? 0 : parseFloat(this.taxData.shippingAmount);
            this.taxData.totalAmountWithTax = this.taxData.totalAmount + this.taxData.items.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.taxAmount;
            }, 0) + shipping;
            this.taxData.shippingClass = shipping === 0 ? 'cart__product-price--shipping' : '';
            return this.taxData;
        }
    }

    getProductTaxInfo(product, fireBaseData) {
        const taxTypeId = fireBaseData.CategoryList.find(el =>
            parseInt(el.CategoryId) === product.productDetails.categoryId).taxTypeId;
        return  fireBaseData.TaxTable.find(el => el.taxTypeId === taxTypeId).taxPercentage;;
    }
    constructTaxObj(value, key) {
        const taxItem = {
            taxPercentage: key,
            categoryName: key === 5 ? 'Food' : this.getCategories(value),
            taxAmount: (this.getTaxAmount(value) * key) / 100,
            totalAmount: this.getTaxAmount(value)
        };
        this.taxData.items.push(taxItem);
    }
    getTaxAmount(productList) {
        const taxAmount = productList.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.totalPrice;
        }, 0);
        return taxAmount;
    }
    getCategories(productList) {
        const categoryArr = productList.reduce((accumulator, currentValue) => {
            if (accumulator.length === 0) {
                accumulator.push(currentValue.productDetails.categoryName);
            }
            else if (accumulator.find(el => el !== currentValue.productDetails.categoryName)) {
                accumulator.push(currentValue.productDetails.categoryName);
            }
            return accumulator;
        }, []);
        return categoryArr;
    }
}