import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home';
import Order from './pages/order';
import CartPage from './pages/cartPage';
export default () =>{
    return(
        <div>
            <Route exact path="/" component={Home} />
            <Route path='/order' component={Order} />
            <Route path='/cart' component={CartPage} />
        </div>
    );
};