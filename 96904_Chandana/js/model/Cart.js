import * as lscache from 'lscache';
import * as global from '../base/constants';

// This class represents a cart item
export default class Cart {
    // Initializes Cart
    constructor() {
        this.cart = [];
    }

    // add a book to 'likes' list when liked by user
    addToCart(ISBN) {
        let currentItem;        
        const index = this.cart.findIndex(el => el.ISBN.ISBN == ISBN.ISBN);

        // if item exists
        if(index > -1){
            // read the item
            currentItem = this.cart[index].ISBN;
            // if item exists
            if(currentItem && currentItem.Quantity){
                // increment Quantity and add to the book
                this.cart[index].ISBN.Quantity = parseInt(currentItem.Quantity) + 1;
            } else {
                // set default quantity to 1
                this.cart[index].ISBN.Quantity = 1;
            }
        } 
        else {
            //create a cart object to store minimal book information to be stored
            const cartItem = { ISBN };

            //add object to the cart array
            this.cart.push(cartItem);

            // persist cart
            this.saveCartToLocalStorage();

            // return item
            return cartItem;
        }
    }

    // delete book from cart
    deleteFromCart(ISBN) {
        // find index
        const index = this.cart.findIndex(el => el.ISBN === ISBN);

        // remove item from cart array
        this.cartItem.splice(index, 1);

        // Perist data in localStorage
        this.saveCartToLocalStorage();
    }

    // identifies is a book is likes using books' id or ISBN
    isAddedToCart(ISBN) {
        // return index 
        return this.cart.findIndex(el => el.ISBN === ISBN) !== -1;
    }

    //Get total likes of the user
    getNumOfCartItems() {
        // return length
        return this.cart.length;
    }

    //Saving user likes details to local storage as is should persist locally
    saveCartToLocalStorage() {
        // save data to cache
        lscache.set(global.constants.cacheKey_cart,this.cart);
    }

    //Reading user likes details from local storage
    readDataFromLocalStorage() {
        // read from cache
        const storage = lscache.get(global.constants.cacheKey_cart);

        // restoring data to local storage
        if(storage) {
            // set the likes
            this.likes = storage;
        }
    }
}