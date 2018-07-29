import * as cartView from "./cartView";

export default class CartController {
    constructor() {

        var storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart !== null) {

            this.cart = storedCart;

        } else {

            this.cart = [];
        }
    }

    init(readonly) {


        if (this.cart && this.cart.cartItems) {
            cartView.renderCart(this.cart,readonly);
            Window.foodApp.listeners.bindCartControls();

        }


    }
}