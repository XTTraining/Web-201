import * as carRowView from "./cartRowView";
import { elements } from "../../common/base";

export const renderCart = (cart,readonly) => {

    let cartBody = '';
    cart.cartItems.forEach(elements => {
        cartBody = cartBody + carRowView.renderCartRow(elements,readonly);
    });

    let blackRowMarkup = `<div class="cart__rowblack">
                            <div class="cart__rowblack-total">
                                Total
                            </div>
                            <div class="cart__rowblack-totalamount">
                                    ₹ ${cart.cartValue.toFixed(2)} 
                            </div>
                        </div>`;

    if (!readonly) {
        elements.cartBody.innerHTML = cartBody + blackRowMarkup;
    }else {
        elements.cartBodyReadyOnly.innerHTML = cartBody + blackRowMarkup;
    }
}