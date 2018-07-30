const handlebar = require('../../templates/cart_checkout.handlebars');

import {elements} from  './base'; 

export const showHidePaymentOptions = ()=> {
    const paymentOption = $('.checkout-page__payment-option')[0];
    paymentOption.classList.add('checkout-page__payment-option--active');
    let dataId = paymentOption.dataset.id;
    $('#' + dataId).css('display', 'block');
    $('.checkout-page__payment-option').on('click', function() {
        $(this).parent().find('.checkout-page__payment-option').removeClass('checkout-page__payment-option--active');
        $(this).addClass('checkout-page__payment-option--active');
        $(this).parents('.checkout-page__payment-wrapper').find('.checkout-page__payment-ways').css('display', 'none');
        dataId = $(this).data('id');
        $('#' + dataId).css('display', 'block');
    });
}

export const showCheckoutPageCartData = (checkOutData)=> {

    if(checkOutData) {
        $(elements.checkoutPageItems).html('');
        $(elements.checkoutPageItems).append(handlebar(checkOutData.Checkout));
    }
}