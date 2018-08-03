import React from 'react';
import Home, {loadData} from './pages/home';
import Order from './pages/order';
import CartPage from './pages/cartPage';
import PaymentPage from './pages/paymentPage';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';


export default [
    {
        loadData,
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/cart',
        component: CartPage
    },
    {
        path: '/payment',
        component: PaymentPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/registration',
        component: RegistrationPage
    }
]