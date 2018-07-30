import React from "react";
import CartItemsComponent from './cartitems';
import SubtotalComponent from './subtotal';
import {
    Cart
} from './cart';

export class CartContainerComponent extends React.Component {

    constructor() {
        super();
        let cartitems = Cart.loadFromCart();
        cartitems.sort((x, y) => x.time > y.time);
        const sub = Array.from(cartitems);
        this.state = {
            cartitems: cartitems,
            subtotalitems: sub
        };
    }

    cartUpdateCallback(cartitem, isremoved = false) {
        let arr = this.state.subtotalitems.filter((item) => item.id != cartitem.id);
        if (!isremoved) {
            arr.push(cartitem);
            const item = {
                "id": cartitem.id,
                "size": cartitem.size,
                "qty": cartitem.qty,
                "itemid": cartitem.item.id,
                "time": cartitem.time
            };
            Cart.updateCart(item);
        } else {
            Cart.removeFromCart(cartitem.id);
        }
        this.setState({
            subtotalitems: arr
        });
    }

    render() {
        return ( 
            <div className='cart-items-container col-9 auto-margin'>
                    <div>
                        <div className="col-9 auto-margin">
                            <h2>Cart</h2>
                        </div>
                        <section>
                            <CartItemsComponent cartitems={this.state.cartitems} updatecart={this.cartUpdateCallback.bind(this)} />
                        </section>
                    </div>
                    <section className="subtotal-container">
                        <SubtotalComponent subtotalitems={this.state.subtotalitems} />
                    </section>
            </div>
        );
    }

}
