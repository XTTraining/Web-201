import {
    elements
} from './base';

export const button = (id, count) => {
    var done = false;
    const foodItem = $('.food__item[data-id="' + id + '"]');
    if (foodItem && count > -1) {
        if (count == 0) {
            foodItem.find('.food__item--add div').addClass('hidden');
            foodItem.find('.food__item--add-1').removeClass('hidden');
        } else {
            foodItem.find('.food__item--add div').removeClass('hidden');
            foodItem.find('.food__item--add-1').addClass('hidden');
        }
        foodItem.find('.food__item--add-3').text(count);
        done = true;
    }
    return done;
}
export const updateCartIcon = count => {
    elements.cartItemCount.text(count);
}
export const showFromLocal = () => {
    var cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(localStorage.getItem('cart'));
        $.each(cart, function (i) {
            const id = cart[i].id;
            const count = cart[i].count;
            const item = $('.food__item[data-id="' + id + '"]');
            item.find('.food__item--add div').removeClass('hidden');
            item.find('.food__item--add-1').addClass('hidden');
            item.find('.food__item--add-3').text(count);
        });
        return cart;
    }
    return [];
}
