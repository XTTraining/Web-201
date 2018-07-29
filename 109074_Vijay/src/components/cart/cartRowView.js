
export const renderCartRow = (item,readonly) => {

    console.log('ready only value id');
    console.log(readonly);
    let cartRowMarkup = `<div class="cart__row">
    <div class="cart__row-itemname">
    ${item.name}
    </div>
    <div class="cart__row-itemprice" id="cartItemtotal-${item.id}">
        ₹ ${item.subtotal.toFixed(2)}
    </div>
    <div class="cart__row-itemtax">
        Item price ₹ ${item.price}
        <br/> GST applied ${item.gst}%
    </div>
    ${ !readonly ? `<div class="cart__row-action">
        <div class="btn__combo">
            <button class="btn__removefromcartsolid" data-id='${item.id}'>
                <span class="btn__removefromcartsolid-minusicon">
                    -
                </span>
            </button>
            <span class="btn__removefromcartsolid-text" id="cartItem-${item.id}">
            ${item.count}
            </span>
            <button class="btn__addtocartsolid" data-id='${item.id}' id='${item.id}'>
                <span class="btn__addtocartsolid-minusicon">
                    +
                </span>
            </button>
        </div>
    </div>`:""}
</div>`;


 console.log('makup is '+ cartRowMarkup);
return cartRowMarkup;


}