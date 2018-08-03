
import React from 'react';
import {
    FormSection,
    FormWrapper,
    FormHeader,
    Input,
    InputWrapper,
    SubmitButton
} from './formStyles';
import { connect } from 'react-redux';

class Payment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <FormSection>
                <FormHeader>
                    Payment
                </FormHeader>

                <FormWrapper>
                    <InputWrapper>
                        <Input width={`100%`} type="text" pattern="[0-9]{16}" name="card number" placeholder='Card Number' required />
                    </InputWrapper>
                    <InputWrapper>
                        <Input width={'60%'} type='text' name='validity' placeholder='MM/YY' required />
                        <Input width={'40%'} type='text' name='cvv' placeholder='CVV' required />
                    </InputWrapper>
                    <InputWrapper>
                        <Input width={`100%`} type="text" name="name" placeholder='Name' required />
                    </InputWrapper>
                    <InputWrapper>
                        <SubmitButton>PAY </SubmitButton>
                    </InputWrapper>
                </FormWrapper>
            </FormSection>

        );
    };
}

const mapStateToProps = state => {
    return {
        user: state.userInfo
    }
};



export default connect(mapStateToProps, {})(Payment);
