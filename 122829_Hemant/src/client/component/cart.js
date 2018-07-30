import React from 'react';
import { connect } from 'react-redux';
import { Vegeterian, NonVegeterian } from '../styles/commonStyles';
import {
    RowCoupon,
    PromoText,
    PromoCodeBox,
    BtnBorder,
    SubTotalUnorderedList,
    CartSection,
    CartUnorderedList,
    CartItem,
    CartItemUnorderedList,
    CartItems,
    CartItemContent,
    CartItemQuantity,
    CartItemPrice,
    CartCal,
    DiscountItemUnorderedList,
    DelieveryCharges,
    EstimatedTotal,
    Checkout,
    CartWrapper
} from './cartStyle';




class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponDiscount: 0
        };
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
                    return parseInt(current.price.amount) * current.quantity.numericValue
                }
            });
            let totalSum = itemPrice.length > 0 ? itemPrice.reduce(this.getSum) : 0;
            totalSum = totalSum + this.getTaxes(allItems);
            return totalSum;
        }
    };

    getPrice = (cartItem) => {
        let price = `${cartItem.price.currency} ${cartItem.price.amount * cartItem.quantity.numericValue}`;
        return price;
    };

    createCartItems = (cartItems) => {
        let cartHtml = [];
        for (let i = 0; i < cartItems.length; i++) {
            cartHtml.push(
                <CartItem key={i}>
                    <CartItemContent>
                        {cartItems[i].subcategory && cartItems[i].subcategory === 'non-veg' ? (
                            <NonVegeterian>
                                <div></div>
                            </NonVegeterian>
                        ) :
                            <Vegeterian>
                                <div></div>
                            </Vegeterian>
                        }
                        <CartItemUnorderedList>
                            {cartItems[i].name && (
                                <li>{cartItems[i].name}</li>
                            )}
                            {
                                cartItems[i].description && (
                                    <li>{cartItems[i].description}</li>
                                )}
                        </CartItemUnorderedList>

                    </CartItemContent>
                    <CartItemQuantity>
                        {cartItems[i].quantity && cartItems[i].quantity.numericValue && (
                            <p>{cartItems[i].quantity.numericValue}</p>
                        )}
                    </CartItemQuantity>
                    <CartItemPrice>
                        {cartItems[i].quantity && cartItems[i].quantity.numericValue && (
                            <p>{this.getPrice(cartItems[i])}</p>
                        )}
                    </CartItemPrice>
                </CartItem>
            );
        }
        return cartHtml;
    };

    getCouponDiscount = (restaurants, subTotal) =>{
        let couponApplied = this.refs.couponref.value;
        let matchedValue = restaurants.filter(elem => {
            if(elem.coupon.toUpperCase()===couponApplied.toUpperCase()){
                return elem;
            }
        });
        if(matchedValue.length>0){
            const discount = Math.floor((subTotal * parseInt(matchedValue[0].offers.discount))/100);
            this.setState({
                couponDiscount: discount
            });
        }
    }

    render() {
        const selectedItems = this.props.selectedMenuItems;
        const restaurants = this.props.restaurants;
        return (
            <CartSection>
                <CartUnorderedList>
                    <li>{`${selectedItems.length} Items`}</li>
                    <li>Qty</li>
                    <li>Price</li>
                </CartUnorderedList>
                <CartItems>
                    {this.createCartItems(selectedItems)}
                </CartItems>
                <CartCal>
                    <RowCoupon>
                        <PromoText>
                            <label>Enter promotion code <br />or gift card</label>
                        </PromoText>
                        <PromoCodeBox>
                            <input ref='couponref' type="text" name="name" id="promo-code" placeholder="" />
                        </PromoCodeBox>
                        <BtnBorder>
                            <input type="submit" value="Apply" onClick={()=>this.getCouponDiscount(restaurants, this.getSubTotal(selectedItems))} />
                        </BtnBorder>
                    </RowCoupon>
                    <SubTotalUnorderedList>
                        <li>Taxes</li>
                        <li>INR {this.getTaxes(selectedItems)}</li>
                        </SubTotalUnorderedList>
                    <SubTotalUnorderedList>
                        <li>SubTotal</li>
                        <li>INR {this.getSubTotal(selectedItems)}</li>
                    </SubTotalUnorderedList>
                    <DiscountItemUnorderedList>
                        <li>Coupon Discount</li>
                        <li>INR {this.state.couponDiscount}</li>
                    </DiscountItemUnorderedList>
                    <DelieveryCharges>
                        <li>Shipping Charges</li>
                        <li>INR 0</li>
                    </DelieveryCharges>
                    <EstimatedTotal>
                        <li>ESTIMATED TOTAL</li>
                        <li>INR {this.getSubTotal(selectedItems)-this.state.couponDiscount}</li>
                    </EstimatedTotal>
                    <Checkout>
                        <input type="submit" value="CHECKOUT" />
                    </Checkout>
                </CartCal>
            </CartSection>

        );
    };
};

const mapStateToProps = state => {
    return {
        selectedMenuItems: state.selectedItems,
        restaurants : state.restaurants
    }
};

export default connect(mapStateToProps, {})(Cart);