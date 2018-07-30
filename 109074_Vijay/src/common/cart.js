import * as extension from '../common/extensions';
export default class cart {
    constructor() {

        var storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart !== null) {

            this.cartItems = storedCart.cartItems;
            this.cartValue = storedCart.value;

        } else {

            this.cartValue = 0;
            this.cartItems = [];
        }

    }

    updateCartStore() {
        localStorage.setItem('cart', JSON.stringify(this));
    }

    add(id) {
        //var flag = this.isItemPreset(id);
        var found = this.cartItems.find(function (element) {

            return element.id === id;
        });
        window.cartitemfound = found;
        if (found) {
            for (var i in this.cartItems) {
                if (this.cartItems[i].id === found.id) {
                    this.cartItems[i].count++;
                    this.cartItems[i].subtotal = this.getSubtotalIncludingGST(this.cartItems[i]);
                    // this.cartItems[i].count * this.cartItems[i].price + (this.cartItems[i].price * this.cartItems[i].gst * .01);

                    this.cartValue = this.cartItems.sum('subtotal');
                    console.log('count increased ' + this.cartItems[i].count);
                    console.log('cart items are  :: ' + this.cartItems);
                    window.cartItems = this.cartItems;
                    this.updateCartStore();
                    // return false so remove cart button will not be added.
                    return this.cartItems[i];
                }
            }

        } else {
            let item = this.GetItemByIdFromMenu(id)
            console.log('item in add to cart is :');
            console.log(item);
            if (item !== null) {
                item.count = 1;
                item.subtotal = this.getSubtotalIncludingGST(item);
                this.cartItems.push(item);
                this.cartValue = this.cartItems.sum('subtotal');
                console.log('Added ' + id);
                console.log('cart items are  :: ' + this.cartItems);
                window.cartItems = this.cartItems;
                // return true so remove cart button will be added
                this.updateCartStore();
                return item;
            }
            return null;


        }
        this.updateCartStore();
    }

    update() {

    }

    delete(id) {

        console.log('delete ' + id);
        var i;
        for (i in this.cartItems) {
            if (this.cartItems[i].id === id) {

                if (this.cartItems[i].count > 1) {
                    this.cartItems[i].count--;
                    this.cartItems[i].subtotal = this.getSubtotalIncludingGST(this.cartItems[i]);
                    this.cartValue = this.cartItems.sum('subtotal');
                    this.updateCartStore();
                    return this.cartItems[i];
                }
                break;
                // return false so remove cart button will not be added.                
            }
        }
        this.cartItems.splice(i, 1);
        this.updateCartStore();
        return null;

    }
    getItems() {
        return this.cartItems;
    }

    isItemPreset(x) {
        console.log('hj');
        return this.cartItems.find(function (el) {
            console.log(el);
            return el === x;
        });

    }
    GetItemByIdFromMenu(id) {

        let menu = Window.foodApp.menu || JSON.parse(localStorage.getItem('menu'));
        console.log('item id is' + id);
        let item = menu.find(menuCat => {
            return menuCat.items.some(menuItem => {
                return menuItem.id === id
            });
        });
        console.log(item);
        if (typeof item !== typeof undefined) {
            let found = item.items.find(x => {
                return x.id === id
            });
            console.log('item found ');
            console.log(found);
            found.gst = item.gst;
            return found;

        }
        return null;

    }

    getSubtotalIncludingGST(item) {

        return item.count * (item.price + (item.price * item.gst * .01));

    }

}
