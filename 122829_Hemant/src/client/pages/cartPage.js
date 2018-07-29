import React from 'react';
import '../theme/globalStyle';
import Header from '../component/header';
import MiniCart from '../component/miniCart';

class CartPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header />
                <MiniCart />
                </div>
        )
    }
};

export default CartPage;