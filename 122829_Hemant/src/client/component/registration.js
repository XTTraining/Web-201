import React from 'react';
import { FormSection, FormWrapper, InputWrapper, Input, SubmitButton, FormHeader } from './formStyles';
import { getPostAuthenticationResponse } from '../../helpers/request';
import  Config  from '../../config';
import { connect } from 'react-redux';
import { pushUserInfo } from '../actions';

class Registration extends React.Component {
    constructor(props) {
        super(props);
    };

    registerUser = (e) => {
        e.preventDefault();
        let data = {
            name: this.registerNameRef.value,
            email: this.registerEmailRef.value,
            password: this.registerPasswordRef.value
        };
        const userData = getPostAuthenticationResponse(Config.registrationUrl, data);
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
                    Registration
                </FormHeader>
                <form>
                    <FormWrapper>
                        <InputWrapper>
                            <Input width={'90%'} innerRef={(registerNameRef) => { this.registerNameRef = registerNameRef }} type='text' name='name' placeholder='Name' required />
                        </InputWrapper>
                        <InputWrapper>
                            <Input width={'90%'} innerRef={(registerEmailRef) => { this.registerEmailRef = registerEmailRef }} type='email' name='email' placeholder='Email' required />
                        </InputWrapper>
                        <InputWrapper>
                            <Input width={'90%'} innerRef={(registerPasswordRef) => { this.registerPasswordRef = registerPasswordRef }} type='password' name='password' placeholder='Password' required />
                        </InputWrapper>
                        <InputWrapper>
                            <SubmitButton type='submit' onClick={(e) => this.registerUser(e)}>Register</SubmitButton>
                        </InputWrapper>
                    </FormWrapper>
                </form>
            </FormSection>
        );
    }
};

const mapStateToProps = state => {
    return {
    }
};



export default connect(mapStateToProps, { pushUserInfo })(Registration);