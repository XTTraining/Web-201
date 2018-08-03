import React from 'react';
import Header from '../component/header';
import Login from '../component/login';
import Footer from '../component/footer';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <Header />
                <Login />
                <Footer />
            </div>
        );
    }
}

export default LoginPage;