import {
    Cart
} from '../../../src/scripts/cart/components/cart';


describe('Testing Cart functionalities', () => {

    it('should clear cart', () => {
        let map = new Map();
        let localStorage = {
            "getItem": (key) => {
                return map.get(key);
            },
            "setItem": (key, value) => {
                return map.set(key, value);
            },
            "clear": () => {
                map.clear();
            }
        };
        const item1 = localStorage.getItem('cartItems');
        if (item1 != undefined) 
        {
            Cart.clearCart();
        }
        const item2 = localStorage.getItem('cartItems');
        expect(item2).toEqual(undefined);
    });


});
