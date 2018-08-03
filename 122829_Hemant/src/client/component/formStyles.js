import styled from 'styled-components';

export const FormSection = styled.section`
    max-width: 1145px;
    margin: 20px auto;
`;

export const FormHeader = styled.h2`
    width: 40%;
    margin: 0 auto;
    color: gainsboro;
    font-size: 500%;
    font-weight: 200;
    text-align: center;
    @media(max-width: 768px){
        font-size: 425%;
    }
    @media(max-width: 480px){
        width: 50%
        font-size: 300%;
    }
`;

export const FormWrapper = styled.div`
    width: 40%;
    margin: 20px auto;
    @media(max-width:480px){
        width: 80%;
    }
`;

export const InputWrapper = styled.div`
    width: 80%;
    margin: 10px auto;
    @media(max-width: 480px){
    margin: 5px auto;
    }
`;

export const Input = styled.input`
    padding-left: 5px;
    width: ${props=>props.width};
    vertical-align: middle;
    height: 10%;
    font-size: 120%;
    border: 2px solid gainsboro;
    border-radius; 3px;
    color: darkgrey;
    &::placeholder {
        font-size: 70%;
        font-weight: 300;
        color:darkgrey;
      }
    @media(max-width: 768px){
        height: 5%;
    }
`;

export const SubmitButton = styled.button`
      width: 50%;
      margin: 40px auto;
      display: block;
      height: 10%;
      background-color: #60b246;
      color: #fff;
      font-size: 120%;      
      letter-spacing: 2px;
      border: 1px transparent;
      border-radius: 3px;
      cursor: pointer;
      @media(max-width: 768px){
          height: 5%;
          margin: 20px auto;
      }
`;  

export const FormBottomLink = styled.a`
      text-decoration: none;
      font-size: 80%;
      color: #60b246;
      width: 15%;
      margin: 0 auto;
      display: block;
`;


