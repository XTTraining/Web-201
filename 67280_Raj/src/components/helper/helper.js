import { Cart, CartItem } from "../cart/cart"
import { CacheManager } from "../cacheManager/cacheManager";
export class Helper {


    
static productUpdate(event) {

    console.log("target" + event.target);
    const eventTarget = event.target;
        if (eventTarget.matches(".qty-btn")) {
           
            event.preventDefault();
            event.stopPropagation();
            const cacheManager = new CacheManager();
            const myCart = new Cart();
            myCart.restoreState(cacheManager.getItem("cart")); 
        
            const menuDetails = cacheManager.getItem("menuItems");
            
             
    
    
         // alert(quantity);
         if(eventTarget.matches(".inc-qty")){
            const btn = eventTarget.parentElement.querySelector(".cart-plus-minus-box");
            let quantity = parseInt(btn.value);
          btn.value = quantity += 1;
          var item = new CartItem(event.target.id, btn.value);
          myCart.update(item);
         }
         else if(eventTarget.matches(".dec-qty")){
            const btn = eventTarget.parentElement.querySelector(".cart-plus-minus-box");
            let quantity = parseInt(btn.value);
          if(quantity>0)
          {
     
          btn.value = quantity -= 1;
          console.log(btn);
          var item = new CartItem(event.target.id, btn.value);
          myCart.update(item);
          }
         }
        else if(eventTarget.matches(".remove"))
{
   // alert('in remove');
    var item = new CartItem(event.target.id,0);

    myCart.remove(item);
}
          myCart.reconcile(menuDetails);
          cacheManager.setItem("cart", myCart);
          console.log("writing cache");
          console.log(cacheManager.getItem("cart"));
        }
      }
}