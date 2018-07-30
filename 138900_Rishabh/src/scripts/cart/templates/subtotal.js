export const subtotalTemplate = (cartItems) => {
    let subtotal = cartItems.length > 1 ? cartItems.reduce((acc, value) => {
        if (acc.price != undefined) {
            acc = Number.parseInt(acc.price) * Number.parseInt(acc.qty);
        }
        return Number.parseInt(acc) + (Number.parseInt(value.price) * Number.parseInt(value.qty));
    }) : cartItems[0].price * cartItems[0].qty;

    return `<h3>SUBTOTAL</h3>
                <div class='subtotal-items'>
                ${cartItems.map((cartItem)=> `
                                    <span>
                                        ${cartItem.item.name}
                                    </span>
                                    <span class='align-right'>
                                        ₹${cartItem.price} x ${cartItem.qty}
                                    </span>`
                               ).join('')}
                                </div>
                                 
                                <div class='subtotal-price'>
                                    <span>
                                        Subtotal(${cartItems.length} items)
                                    </span>
                                    <span class='align-right'>
                                        ₹${subtotal}
                                    </span>
                                </div>`;

};
