import styled from 'styled-components';

export const MiniCartSection = styled.section`
    width: 80%;
    margin: 0 auto;
    @media(max-width: 480px){
        margin-top: 20px;
    };
`;

export const MiniCartHeading = styled.h2`
    background-color: gainsboro;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    font-size: 200%;
    letter-spacing: 3px;
    font-weight: 300;
    @media(max-width: 768px){
        font-size: 125%;
        display: none;
    };
    @media(max-width:480px){
        display: none;
    }
`;

export const MiniCartItem = styled.div`
    font-size: 90%;
    margin: 10px 0;
    >ul{
        display: flex;
        justify-content: space-around;
    }
    >ul>li{
        list-style: none;
    }
    >ul>li:first-child{
        width: 40%;
        margin-top: 5px;
    }
    >ul>li:nth-child(2){
        width: 35%;
    }
    >ul>li:last-child{
        width: 25%;
        text-align: right;
        margin-top: 5px;
    }
    >ul>li>ul{
        display: flex;
        justify-content: space-around;
    }
    >ul>li>ul>li{
        list-style:none
        cursor: pointer;
        margin-left: 5px;
        font-size: 150%;
        
    }
    >ul>li>ul>li:first-child, >ul>li>ul>li:last-child{
        color: #000;
        font-weight: 200;
        margin-top: 4px;
    }
    >ul>li>ul>li:nth-child(2){
        border: 3px solid gainsboro;
        vertical align: center;
        font-size: 95%;
        font-weight: 500;
        margin-top:5px;
        width: 50%;
        text-align: center;
    }
`;

export const MiniCartInformation = styled.div`
    margin-top: 5px;
    >ul{
        display: flex;
        justify-content: space-between;
    }
    >ul>li{
        list-style: none;
    }
    >ul>li:first-child{
        font-weight: 300;
    }
`;

export const CheckoutButton = styled.button`
    width: 100%;
    text-transform: uppercase;
    background-color: #60b246;
    color: #fff;
    height: 50px;
    margin-top: 20px;
    cursor: pointer;
`;
