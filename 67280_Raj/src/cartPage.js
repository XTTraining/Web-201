import "./style.scss";
//import MenuData from "./components/list/dataModel";
//import * as menuView from "./components/list/itemgrid";
import { Cart, CartItem } from "./components/cart/cart";
import { CacheManager } from "./components/cacheManager/cacheManager";
import  {CartUI} from "./components/cart/cartUI";
import {HeaderUI} from "./components/header/HeaderUI";
import {Helper} from "./components/helper/helper";
import { debug } from "util";

const pageElements = {
  cartConainter: document.querySelector(".cart-container"),
  
  carItemConainter: document.querySelector(".cart-item-container"),
  cartSummary: document.querySelector(".cart-summary"),
  
};

var header = new HeaderUI();
header.render(pageElements.cartConainter);

const cacheManager = new CacheManager();
const cartData = cacheManager.getItem("cart"); // move key to constant
if(cartData.Items.length==0) window.location.href="/";
const cartUI = new CartUI(cartData,pageElements.carItemConainter);
cartUI.renderCart();

debugger;
 pageElements.carItemConainter.addEventListener("click", Helper.productUpdate);
 pageElements.carItemConainter.addEventListener("click", function(){
  const cartData = cacheManager.getItem("cart"); // move key to constant
  if(cartData.Items.length==0) window.location.href="/";
  const cartUI = new CartUI(cartData,pageElements.carItemConainter);
  cartUI.renderCart();
 });