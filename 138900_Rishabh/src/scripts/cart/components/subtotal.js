import React from "react";

export default class SubTotalComponent extends React.Component {
    
    calculateSubtotal(subtotalitems) {
        let subtotal = subtotalitems.length > 1 ? subtotalitems.reduce((acc, value) => {
            if (acc.price != undefined) {
                acc = Number.parseInt(acc.price) * Number.parseInt(acc.qty);
            }
            return Number.parseInt(acc) + (Number.parseInt(value.price) * Number.parseInt(value.qty));
        }) : subtotalitems[0].price * subtotalitems[0].qty;
        return subtotal;
    }

    render() {
        let subtotal = 0;
         
        const items = this.props.subtotalitems.map((item, index) => { 
                            subtotal += item.price * item.qty;
                            return (
                            <div className="subtotal-item" key={index}>
                                    <span>
                                        {item.item.name}
                                    </span>
                                    <span className="align-right">
                                        ₹{item.price} x {item.qty}
                                    </span>
                            </div>
                            );});
        return (
                 <div className="subtotal-container-div"><h3>SUBTOTAL</h3>
                            <div className='subtotal-items'>
                                {items}
                            </div>
                                 
                            <div className="subtotal-price">
                                <span>
                                    Subtotal({items.length} items)
                                </span>
                                <span className="align-right">
                                    ₹{subtotal}
                                </span>
                            </div>
                </div>
        );
    }

}