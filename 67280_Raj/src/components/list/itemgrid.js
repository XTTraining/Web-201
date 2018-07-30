import { elements } from "./elements";

export const renderItem = (item,parentElemement) => {
    console.log(item);
    const markup = `
    <div class="item" style="animation-name: fadeInLeft;" data-itemid=${item.id}  itemscope="" itemtype="http://schema.org/MenuItem">
      <img itemprop="image" src="${item.photoLarge}" alt="image of ${item.title}" class="item__img">
        <div class="itemContent">
            <h2 class="item__title" itemprop="name">${item.title}</h2>
            <p class="item__description">${item.description}</p>
           <p class="item__price">${item.currency} ${item.price}</p>
        </div>
        <div class="product-quantity">
            <form id="myform" method="POST" action="#">
                    <div class="cart-plus-minus">
                    <label class="control-label required" for="id${item.id}">.</label>
                    <button id="${item.id}" class="dec-qty qty-btn">-</button>
                    
                    <input class="cart-plus-minus-box" type="text" name="qtybutton" id="id${item.id}" readonly value="0">
                    <button id="${item.id}" class="inc-qty qty-btn">+</button>
                </div>
            </form>
        </div>
    </div>
    `;
    parentElemement.insertAdjacentHTML('beforeend', markup);
  
}
export const renderCheckout = (parentElement) => {
    
    const markup =`
     <div class='chekcout-button'><form method="get" action="/cart.html"><button class="food__btn" type="submit">Checkout</button></form> </div>
     `
     parentElement.insertAdjacentHTML('afterend', markup);
}
