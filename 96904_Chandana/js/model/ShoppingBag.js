import * as lscache from 'lscache';
import * as global from '../base/constants';
import Like from './Like';
import Cart from './Cart';
import BookDetail from './BookDetail';

export default class ShoppingBag {

    // initialize shopping bag
    constructor() {
        var cartData, likeData;    
        
        // fill in cart and like data from cache
        cartData = lscache.get(global.constants.cacheKey_cartItem);
        likeData = lscache.get(global.constants.cacheKey_likeItem);

        // initialize variables to hold cart and likes data
        this.Cart = new Cart();
        this.Like = new Like();

        // if cache has cart data, set object's cart data
        if(cartData){
            this.Cart.cart = cartData;
        }
        // if cache has cart data, set object's like data
        if(likeData) {
            this.Like.likes = likeData;
        }
    }

    // This method adds like to the shopping bag
    async addLike(ISBN) {
        // initialize BookDetail's model
        let bookDetail = new BookDetail(ISBN);
        // call method to get book details based on ISBN
        let book = await bookDetail.getBookDetail();
        // add like to the shopping bag
        this.Like.addLike(book);
    }

    // This method adds cart item to the shopping bag
    async addToCart(ISBN) {
        // initialize BookDetail's model
        let bookDetail = new BookDetail(ISBN);
        // call method to get book details based on ISBN
        let book = await bookDetail.getBookDetail();
        // add like to the shopping bag
        this.Cart.addToCart(book);
    }

    // This method removes like from shopping bag
    removeFromLikes(ISBN) {
        this.Like.deleteLike(ISBN);
    }

    // This method removes cart item from shopping bag
    removeFromCart(ISBN) {
        this.Cart.deleteFromCart(ISBN);
    }

    // This method calculates total Number of cart items
    getTotalOfCartItems() {
        // initialized cart total
        var totalCart = 0;

        // calcuate and add quantity of each item
        for(var i = 0; i <this.Cart.cart.length; i++){
            totalCart += this.Cart.cart[i].ISBN.Quantity;
        }

        // set total cart items
        this.TotalCartItems = totalCart;
    }

    // This method calculates total Number of like items
    getTotalOflikeItems() {
        // initialized cart total
        var totalLike = 0;

        // calcuate and add quantity of each item
        for(var i = 0; i <this.Like.likes.length; i++){
            totalLike += this.Like.likes[i].ISBN.Quantity;
        }

        // update total like items
        this.TotalLikeItems = totalLike;
    }

    //This method calculates the sub total of each item
    //sub total of an item = item Price * quantity
    calculateItemSubTotal() {

        // if shopping bag has cart item
        if(this.Cart.cart){
            // loop through each cart item
            this.Cart.cart.forEach( item => {

                //if Quantity is not initialized, initialize it for calculations
                if(!item.ISBN.Quantity){
                    item.ISBN.Quantity = 1;
                }
                
                // calculate sub total price for each cart item
                item.ISBN.SubTotal = parseInt(item.ISBN.Quantity) * parseFloat(item.ISBN.Price);
            }); 
        }
    }

    // This method calculates teh total price for the shopping bag
    // total price is the total of all subtotal prices
    calculateTotalPrice() {
        //To calculate total price its important to calculate individual subTotal price
        this.calculateItemSubTotal();

        var total = 0;
        // if shopping bag has cart items
        if(this.Cart.cart){
            // loop througheach cart item
            this.Cart.cart.forEach( item => {
                // add subtotal price of each item to the total price
                total += parseFloat(item.ISBN.SubTotal);
            }); 
        }
        // set total price
        this.TotalPrice = total;
    }

    //This method calculates GST amount for the shopping bag 
    // GST rule  : if totalPrice < 500 then 4% GST would be applied, else 8% GST would be applied
    calculateGST() {
        //GST is calculated on Total Price so calling the calculate Total Price
        if(!this.TotalPrice || this.TotalPrice === 0){
            this.calculateTotalPrice();
        }

        //GST Rate logic
        if(this.TotalPrice <= 0){
            this.GstRate = 0;
            this.GST = 0;
            return;
        }
        else if(this.TotalPrice > 0 & this.TotalPrice <= 500){
            this.GstRate = 4; 
        } 
        else if( this.TotalPrice > 500) {
            this.GstRate = 8; 
        }

        // calculate GST
        this.GST = parseInt(this.GstRate) * parseFloat(this.TotalPrice) / 100;
    }

    //Calculate the delivery charges
    //Rule: delivery charge for shoppings less than amount 500 is Rs. 50 else Rs. 0
    calculateDeliveryCharges() {
        //GST is calculated on Total Price
        if(!this.TotalPrice || this.TotalPrice === 0){
            this.calculateTotalPrice();
        }

        //Delivery charge logic
        this.DeliveryCharge = this.TotalPrice > 500 ? 0 : 50;
    }

    //this method calculates the final price
    // Final price = TotalPrice + GST - DeliveryCharges
    calculateFinalPrice() {
        this.calculateTotalPrice();
        this.calculateGST();
        this.calculateDeliveryCharges();
        this.FinalPrice = Math.round((this.TotalPrice + this.GST + this.DeliveryCharge) * 100) / 100;
    }

    // This method refreshes shopping bag to recalculate of pricing and quantity vallues
    initializeShoppingBag() {
        this.calculateFinalPrice();
        this.getTotalOfCartItems();
        this.getTotalOflikeItems();
        return this;        
    };

    // This method is used to update cart item's quantity as entered by user
    updateCartItemQuantity(bookISBN, quantity) {
        // find the book from the array, and set quantity
        Array.from(this.Cart.cart).forEach( book => 
            {if(book.ISBN.ISBN === bookISBN) { book.ISBN.Quantity = quantity ; }}
        )

        //recalculate shopping Bag
        this.initializeShoppingBag();
    }
}
