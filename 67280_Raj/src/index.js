import "./style.scss";
import MenuData from "./components/list/dataModel";
import * as menuView from "./components/list/itemgrid";
import { Cart, CartItem } from "./components/cart/cart";
import { CacheManager } from "./components/cacheManager/cacheManager";
import {HeaderUI} from "./components/header/HeaderUI";
import {Helper} from "./components/helper/helper";

const pageElements = {
  items: document.querySelector(".item-container"),
  mainContainer: document.querySelector(".container")
};

const cacheManager = new CacheManager();
var header = new HeaderUI();
header.render(pageElements.mainContainer);


const menuDetails = new MenuData();
var prom = menuDetails.getMenuItems();
var allProm = Promise.all([prom]).then(values => {
  console.values;
  menuDetails.menuItems.forEach(element => {
    menuView.renderItem(element, pageElements.items);
    
  });
  menuView.renderCheckout(pageElements.items);
  cacheManager.setItem("menuItems",menuDetails.menuItems);
});

const myCart = getCart(); 

cacheManager.setItem("cart",myCart);


pageElements.mainContainer.addEventListener("click", Helper.productUpdate);
//pageElements.mainContainer.addEventListener("click", updateMinicart);

function updateMinicart()
{
 document.querySelector(".cart-count").innerHTML= getCart().totalItemCount;
}
function getCart()
{
  const cart = new Cart();
const cartData= cacheManager.getItem("cart");
if(cartData!=null || cartData!=undefined)
{
  cart.restoreState(cartData)
}
console.log(cart  );
return cart;

}

