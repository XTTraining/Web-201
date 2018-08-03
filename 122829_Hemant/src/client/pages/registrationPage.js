import React from 'react';
import Header from '../component/header';
import Registration from '../component/registration';
import Footer from '../component/footer';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <Header />
                <Registration />
                <Footer />
            </div>
        );
    }
}

export default RegistrationPage;