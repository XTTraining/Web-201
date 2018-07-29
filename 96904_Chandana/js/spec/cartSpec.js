//import Cart from '../model/Cart';
var cart = require('../model/Cart');

describe('Cart', function(){
    it('empty cart should return zero', function(){

        let cart = new Cart();
        console.log(cart);
       // expect(cart.cart.length).toBe(0);

    });
});