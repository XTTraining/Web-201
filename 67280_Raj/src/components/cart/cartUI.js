//import { elements } from "./elements";
//import { Cart } from "./cart";

export class CartUI {

    constructor(cartData, parentElement)
    {
        this.cartData = cartData;
        this.parentElement = parentElement;
    }


renderCart() {
    this.parentElement.innerHTML ="";
 this.cartData.Items.forEach(element => {
this.renderItem(element,this.parentElement);  
 });

this.renderTotal(this.cartData, this.parentElement);
}

renderItem(item,parentElement){
    console.log(item);
    const markup = `
    <div class="cart-item" data-itemid=${item.id}>
    <div><img src="${item.image}" alt="" class="food"></div>
        <div class=""> ${item.title}</div>
         <div>${this.cartData.currency}${item.unitCost}</div>
         <div class="product-quantity">
         <div class="product-quantity">
         <form id="myform" method="POST" action="#">
                 <div class="cart-plus-minus">
                 <button id="${item.id}" class="dec-qty qty-btn">-</button>
                 <input class="cart-plus-minus-box" type="text" name="qtybutton" readonly value="${item.count}">
                 <button id=${item.id} class="inc-qty qty-btn">+</button>
             </div>
         </form>
     </div>
         </div>
            <div><a href="#" class="remove qty-btn" id="${item.id}">X</div>
        
    </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', markup);
  
}
    
renderTotal(cartData,parentElement) {
    const markup = `
   <div class="summary">
    <div class="summary__wrap"> 
    <div class="summary__amount summary__item"><span>Cart Total</span><span>${cartData.currency}${cartData.cartTotal} </span></div>
    <div class="summary__tax summary__item"><span>Tax</span><span>${cartData.currency}${cartData.cartTax}</span></div>
    <div class="summary__total summary__item"><span>Grand Total</span><span>${cartData.currency}${cartData.grandTotal}</span></div>
    <div><span></span><span><form id="payment" method="get" action="/payment.html"><button class="food__btn" type="submit">Proceed to Payment</button></form></span></div>
    </div>
    </div>`;
    const element = document.querySelector(".cart-total");
    element.innerHTML=""
    element.insertAdjacentHTML('beforeend', markup);
}

renderSummary(){
    const itemSummary = this.cartData.Items.reduce((itemMarkup,item) => 
    {
        itemMarkup+= this.renderSummaryItem(item);
        return itemMarkup;
    },"");
console.log(itemSummary);
    const markup = `
    <div class="order-wrapper">
    <h2 class="order-details-header">Order Summary</h2>
    <div class="order-details">
    <form action="#">
        <ul>
            <li><p class="strong">Product</p><p class="strong">Total</p></li>
             ${itemSummary}
            <li><p class="strong">cart subtotal</p><p class="strong">${this.cartData.cartTotal}</p></li>
            <li><p class="strong">Tax</p>
                <p>${this.cartData.cartTax}</p>
            </li>
            <li><p class="strong">Grand Subtotal</p><p class="grandTotal">${this.cartData.grandTotal}</p></li>
        </ul>
    </form>
</div>
</div>
    `;
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  
}
renderSummaryItem(item){
    
    const markup =`
     <li><p>${item.count}x ${item.title} </p><p>${item.totalCost}</p></li>
     `
    return markup;
}


}