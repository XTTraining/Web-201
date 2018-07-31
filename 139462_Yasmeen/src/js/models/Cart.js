let cartItems =[];
export default class Cart{
    constructor() {
        //this.query =query;
    }
    updateCart(id, qty) { 
        
        if (localStorage.getItem('cartItems')) {
            let cartStorage = JSON.parse(localStorage.getItem('cartItems'));
            cartItems = cartStorage;
        } 
        let newCart = cartItems;
        if (id != null && cartItems.length > 0) {
            cartItems.forEach(function(el) {
                // if(el){}
                if (el.ItemId === id) {
                    if (qty > 0) {
                        el.qty = qty;
                    }
                    else if (qty === 0) {
                        let index = cartItems.indexOf(el);
                        
                        newCart.splice(index, 1)
                    }
                }
            })
        }
        cartItems = newCart;
        
        this.saveCartInStorage();
    }

    addToCart(id, foodItems) {
        if (localStorage.getItem('cartItems')) {

            let cartStorage = JSON.parse(localStorage.getItem('cartItems'));
            cartItems = cartStorage;
        }
      
        if (id != null && foodItems.length > 0) {
            // then fill the cart Object.
            foodItems.forEach(el => {
                if (el.ItemId === id) {
                    el.qty = 1;
                    cartItems.push(el);
                }
            });
        }
        this.saveCartInStorage();
    }
    saveCartInStorage(){
        if(cartItems){
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            console.log(JSON.parse(localStorage.getItem('cartItems')));
        }     
    }
} 