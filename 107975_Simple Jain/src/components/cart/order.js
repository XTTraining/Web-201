import Cart from '../cart/cart'
export default class Order{

    constructor(){
        this.cartObj = new Cart();
    }

    init(){
        this.cartObj.createCart();
    }
}

const orderObj = new Order();
orderObj.init();
