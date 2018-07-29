import React from 'react';
import { connect } from 'react-redux';
import { modifyCartItems } from '../actions';
import { Link } from 'react-router-dom';
import {
     MiniCartSection,
     MiniCartHeading,
     MiniCartItem,
     MiniCartInformation,
     CheckoutButton
 } from './minicartStyle';


class MiniCart extends React.Component {
    constructor(props) {
        super(props);
    };

    getCartItems = (menuItems) => {
        let cartItems = [];

        for (let i = 0; i < menuItems.length; i++) {
            cartItems.push(
                <MiniCartItem key={i}>
                    <ul>
                        <li>
                            {menuItems[i].name}
                        </li>
                        <li>
                            <ul>
                                <li onClick={() => this.props.modifyCartItems(menuItems[i], 'add')}>&#8853;</li>
                                {menuItems[i].quantity && menuItems[i].quantity.numericValue && (
                                    <li>{menuItems[i].quantity.numericValue}</li>
                                )}
                                <li onClick={() => this.props.modifyCartItems(menuItems[i], 'remove')}>&#8854;
                                </li>
                            </ul>
                        </li>
                        {menuItems[i].price && menuItems[i].price.amount &&
                            (<li>
                                {parseInt(menuItems[i].price.amount) * menuItems[i].quantity.numericValue}
                            </li>)
                        }
                    </ul>
                </MiniCartItem>
            );
        }
        return cartItems;
    };

    getSum = (total, num) => {
        return total + num;
    };

    getTaxes = (allItems) => {
        const gst = allItems.map(current => {
            if (current.price && current.price.amount && current.gst) {
                return (parseInt(current.price.amount) * parseInt(current.gst)) / 100;
            }
        });
        let totalTax = gst.length > 0 ? Math.floor(gst.reduce(this.getSum)) : 0;
        return totalTax;
    };

    getSubTotal = (allItems) => {
        if (allItems.length > 0) {
            const itemPrice = allItems.map(current => {
                if (current.price && current.price.amount) {
                    let gst = current.price.amount * current.gst / 100;
                    return parseInt(current.price.amount) * current.quantity.numericValue
                }
            });
            let totalSum = itemPrice.length > 0 ? itemPrice.reduce(this.getSum) : 0;
            return totalSum + this.getTaxes(allItems);
        }
    };

    render() {
        const selectedItems = this.props.selectedMenuItems;
        return (
            <MiniCartSection>
                <MiniCartHeading>
                    Cart
                </MiniCartHeading>
                {selectedItems && selectedItems.length > 0 && this.getSubTotal(selectedItems) > 0 && (
                    <MiniCartInformation>
                        {this.getCartItems(selectedItems)}
                        <ul>
                            <li>Taxes</li>
                            <li>{this.getTaxes(selectedItems)}</li>
                        </ul>
                        <ul>
                            <li>Subtotal</li>
                            <li>{this.getSubTotal(selectedItems)}</li>
                        </ul>
                        <Link to='/order'>
                            <CheckoutButton>Checkout</CheckoutButton>
                        </Link>
                    </MiniCartInformation>
                )}
            </MiniCartSection>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedMenuItems: state.selectedItems
    }
};

export default connect(mapStateToProps, { modifyCartItems })(MiniCart);