import React from 'react';
import Header from '../component/header';
import Payment from '../component/payment';
import Footer from '../component/footer';

class PaymentPage extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <div>
            <Header />
            <Payment />
            <Footer />
            </div>
        );
    }
}

export default PaymentPage;