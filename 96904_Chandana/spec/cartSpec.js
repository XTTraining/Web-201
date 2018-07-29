//import Cart from '..js//model/Cart';
var cart = require('../js/model/Cart');

describe('Cart', function(){
    let cart;

    beforeEach(function(){
        cart = new cart.Cart();
    });

    it('empty cart should return zero', function(){
        
        console.log(cart);
        expect(cart.cart.length).toBe(0);

    });
});