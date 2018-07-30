import menuController from './components/menu/menuController';
import Cart from './common/cart';
import * as listeners from './common/listeners';
import CartCtrl from "./components/cart/cartController";
import { elements } from "./common/base";
//import './css/style.css'
import './main.scss'



Window.foodApp = {};
Window.foodApp.cart = new Cart();
Window.foodApp.listeners = listeners;
var menuCtrl = new menuController();
menuCtrl.init();
// var cart = new Cart();
// cart.add(postData);
// console.log(cart.getItems());

// var fb = new firebaseConnector();
// //fb.clearDatabase();
// fb.addItem(
//     'starter',
//     postData.name,
//     postData.imageurl,
//     postData.description,
//     postData.vergetarian,
//     postData.price
// );

// let search = new Search();
// search.init();
// //search.filter();
// search.search('kebab');


if (elements.cartBody !== null) {
    let cartCtrl = new CartCtrl();
    cartCtrl.init(false);
}
if(elements.cartBodyReadyOnly !==null){
    let cartCtrl = new CartCtrl();
    cartCtrl.init(true);

}


// binding events.
$(document).ready(function () {
    listeners.bindDomReadyEvents(menuCtrl);
});



