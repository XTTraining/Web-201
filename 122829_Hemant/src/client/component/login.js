import React from 'react';
import { FormSection, FormWrapper, InputWrapper, Input, SubmitButton, FormHeader, FormBottomLink } from './formStyles';
import Config from '../../config';
import { getPostAuthenticationResponse } from '../../helpers/request';
import { connect } from 'react-redux';
import { pushUserInfo } from '../actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
    };

    loginUser = (e) => {
        e.preventDefault();
        let data = {
            email: this.loginEmailRef.value,
            password: this.loginPasswordRef.value
        };
        const userData = getPostAuthenticationResponse(Config.loginUrl, data);
        userData.then(data => {
            if (data && data.userInformation && data.userInformation.status === "success" && data.userInformation.user) {
                this.props.pushUserInfo(data.userInformation);
            }
        });
    };


    render() {
        return (
            <FormSection>
                <FormHeader>
                    Login
                </FormHeader>
                <form>
                    <FormWrapper>
                        <InputWrapper>
                            <Input width={'90%'} innerRef={(loginEmailRef) => { this.loginEmailRef = loginEmailRef }} type='email' name='email' placeholder='Email' required />
                        </InputWrapper>
                        <InputWrapper>
                            <Input width={'90%'} innerRef={(loginPasswordRef) => { this.loginPasswordRef = loginPasswordRef }} type='password' name='password' placeholder='Password' required />
                        </InputWrapper>
                        <InputWrapper>
                            <SubmitButton type="submit" onClick={(e) => this.loginUser(e)}>Login</SubmitButton>
                        </InputWrapper>
                        <FormBottomLink href='/registration' alt='Signup'>Sign Up</FormBottomLink>
                    </FormWrapper>
                </form>
            </FormSection>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
};


export default connect(mapStateToProps, { pushUserInfo })(Login);