
export const addtocartHandler = (el) => {
    var cart = Window.foodApp.cart;
    let item = cart.add(el.id);
    //console.log('return flag is :' + flag);
    if (item && item.count == 1) {
        //if ($(el.parentNode).find('.btn__removefromcart').val() == undefined) {
        var minusCartMarkup =
            `<button class="btn__removefromcart" data-id="${el.id}">
        <span class="btn__removefromcart-minusicon">-</span>                                              
        </button>`;
        $(el.parentNode).prepend(minusCartMarkup);
        let cartQuantityMarkup = `${item.count > 0 ? `<span class="productcard__quantity" id="productcard__quantity-${el.id}">
                    <span class="productcard__quantity-number" id='productcard__quantity-number-${el.id}'>
                    ${item.count}
                    </span>
                    <br>
                    <span class="productcard__quantity-text">
                    in your cart
                    </span> </span>` : ''
            }`

        $(el).parent().parent().siblings(':first').prepend(cartQuantityMarkup);
        console.log('cart length is ' + cart.cartItems.length);
        $('.user-nav__notification').html(cart.cartItems.length);
        $(el).parent().find('.btn__removefromcart').on('click', function () {
            var id = $(this).attr("data-id");
            var item = cart.delete(id);
            //console.log('deleted the item return count is ' + item.count);
            if (item === null) {
                //console.log($(this).parent().html());
                $(this).parent().find('button').first().remove();
                //console.log($(el).find(':first-child').html());
                $('#productcard__quantity-' + id).remove();
                console.log('item removed');
                $('.user-nav__notification').html(cart.cartItems.length);
            } else {
                $('#productcard__quantity-number-' + id).html(item.count);

            }

        });
    }
    $('#productcard__quantity-number-' + el.id).html(item.count);
    ///alert(count);

    console.log('cart items in handler : ' + cart.cartItems);
    return false;
}
export const removefromcartHandler = (el) => {
    var cart = Window.foodApp.cart;
    var id = $(el).attr("data-id");
    var item = cart.delete(id);
    //console.log('deleted the item return count is ' + item.count);
    if (item === null) {
        //console.log($(this).parent().html());
        $(el).parent().find('button').first().remove();
        //console.log($(el).find(':first-child').html());
        $('#productcard__quantity-' + id).remove();
        console.log('item removed');
        $('.user-nav__notification').html(cart.cartItems.length);
    } else {
        $('#productcard__quantity-number-' + id).html(item.count);

    }
}

export const updateQuantityInCart = (id, op) => {
    var cart = Window.foodApp.cart;
    if (op === '+') {
        console.log('cart add updateQuantityInCart called');         
        let item = cart.add(id);
        if(item){
            console.log('cart add count is ');
        console.log(item.count);
        $('#cartItemtotal-' + id).html(item.subtotal.toFixed(2));
        $('#cartItem-' + id).html(item.count);
        $('.cart__rowblack-totalamount').html('₹ ' + cart.cartValue.toFixed(2));

        }
        // class="cart__rowblack-totalamount">
        //                             ₹ ${cart.cartValue} 

    }else{
        console.log('cart add updateQuantityInCart called');        
        let item = cart.delete(id);
        if(item){
            console.log('cart add count is ');
        console.log(item.count);
        $('#cartItemtotal-' + id).html(item.subtotal);
        $('#cartItem-' + id).html(item.count);

        }
        console.log('cart minus count is ');
        console.log(item.count);
         

    }



}

