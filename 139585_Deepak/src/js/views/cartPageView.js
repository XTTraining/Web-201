import {
    elements
} from './base';
const cartItemTemplate = require('../../templates/cartitem.hbs');

export const renderCart = items => {
    if (items) {
        $('.cart__item').remove();
        elements.cartList.append(cartItemTemplate(items));
    }
}

export const button = (id, count) => {
    var done = false;
    //if(localStorage.getItem('fire')) const fdata = JSON.parse(localStorage.getItem('fire'));
    const foodItem = $('.cart__item[data-id="' + id + '"]');
    if (foodItem && count > -1) {
        if (count == 0) {
            foodItem.remove();
        } else {
            foodItem.find('.food__item--add-3').text(count);
        }
        done = true;
    }
    return done;
}
export const updatePrice = (id, count, items) => {
    const foodItem = $('.cart__item[data-id="' + id + '"]');
    if (id && foodItem && count && items) {
        var price = 0;
        items.forEach(function (i) {
            if (i.id == id) {
                price = i.price;
            }
        });
        const total = price * count;
        foodItem.find('.cart__item--price').text(total);
    }
}

export const updateTaxArea = (priceBreakdown) => {
    if (priceBreakdown) {
        elements.itemTotal.text(priceBreakdown.itemTotal);
        elements.tax1.text(priceBreakdown.tax1);
        elements.tax2.text(priceBreakdown.tax2);
        elements.grandTotal.text(priceBreakdown.finalTotal);
    }
}
export const updateCartIcon = count => {
    elements.cartItemCount.text(count);
}
