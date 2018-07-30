export default class Cart {

    constructor() {
        this.items = [];
    }

    addItem(item, quantity, productId) {
        let isExist = false;

        this.readStorage();
        // if item exist then update the quantity in the exisitng cart result
        if (this.result) {
            let cartResult = this.result;
            let itemIndex = -1;

            $.each(cartResult, function (index, item) {

                if (item.Id == productId) {
                    isExist = true;
                    item.quantity = quantity;
                    if (item.cartItem != null) {
                        item.totalPrice = parseInt(item.cartItem.Price) * parseInt(quantity);
                    }
                    if (quantity == 0) {
                        itemIndex = index;
                    }
                }
            });

            // remove the item from cart list if quantity is zero
            if (itemIndex >= 0)
                cartResult.splice(itemIndex, 1);
            this.items = cartResult;
        }

        //Otherwise push the item into the array
        if (!isExist) {
            this.items.push({
                "cartItem": item,
                "quantity": quantity,
                "Id": productId,
                "totalPrice": item.Price
            });
        }
        this.result = this.items;
        this.persistData();
    }

    persistData() {
        localStorage.setItem('cartList', JSON.stringify(this.result));
        localStorage.setItem('cartItems', this.totalItem);
    }

    readCartItemCount() {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems)
            this.totalItem = localStorage.getItem('cartItems');
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('cartList'));

        // Restoring likes from the localStorage
        if (storage) this.result = storage;

    }



}