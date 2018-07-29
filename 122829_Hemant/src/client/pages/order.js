import React from 'react';
import '../theme/globalStyle';
import Header from '../component/header';
import Cart from '../component/cart';
import Footer from '../component/footer';

class Order extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <Header />
                <Cart />
                <Footer />
            </div>
        )
    }
}

export default Order;