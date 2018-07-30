import uniqid from 'uniqid';

export default class Cart {
    constructor () {
        this.items = [];
    }
    addItem(count, productDetails) {
        const cartData = localStorage.getItem('cart');
        const totalProductPrice = parseFloat(count) * parseFloat(productDetails.productPrice);
        if(cartData!== null) {
            const data = JSON.parse(cartData);
            if(data && data.items.length > 0) {
                this.items = data.items;
            }
        } else {
            this.items = [];
        }
        if(count === 0) {
            const index = this.items.findIndex(el=> el.productId === productDetails.id);
            this.items.splice(index, 1);
        }
        else if(this.items && this.items.length > 0 && this.items.find(el=> el.productId === productDetails.id)) {
            const product = this.items.find(el=> el.productId === productDetails.id);
            const index = this.items.findIndex(el=> el.productId === productDetails.id);
            this.items.splice(index, 1);
            product.count = count;
            product.totalPrice = parseFloat(count) * parseFloat(product.productDetails.productPrice);
            this.items.push(product);
        } else {
            const item = {
                id: uniqid(),
                count: count,
                productId: productDetails.id,
                productDetails: productDetails,
                totalPrice: totalProductPrice
            };
            this.items.push(item);
        } 
        return this.items;
    }

    getTotalCartCount(cartData) {
        if(cartData && cartData.items.length > 0) {
            return cartData.items.reduce((accumulator, current) => {
                return accumulator + current.count;
            },0);
        } else {
            return 0;
        }
      
    }
}