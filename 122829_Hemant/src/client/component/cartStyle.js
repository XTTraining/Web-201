import styled from 'styled-components';


export const RowCoupon = styled.div`
    &:after{
        display: block;
        height: 5px;
        background-color: gainsboro;
        content: "";
        margin-top: 40px;
    }
`;


export const CartCal = styled.div`
    width: 70%;
    margin-left: auto;
    margin-top: 10px;
    @media(max-width:480px){
        width: 100%;
    };
`;

export const PromoText = styled.div`
    text-transform: uppercase;
    text-align: right;
    width:40%;
    display: inline-block;
    vertical-align: middle;
    @media(max-width:480px){
        width: 100%;
        display: block;
        margin-auto;
        text-align: center;
    }
`;

export const PromoCodeBox = styled.div`
    text-align: right;
    width:30%;
    display: inline-block;
    >input[type = text]{
        width: 50%;
        line-height: 35px;
        border: 2px solid gainsboro;
    }
    @media(max-width: 480px){
        width: 49%;
    }
`;

export const BtnBorder = styled.div`
    text-align: left;
    text-indent: 30px;
    width:30%;
    display: inline-block;
    >input[type=submit]{
        background-color: #ffffff;
        font-weight: 700;
        width: 50%;
        border: 2px solid gainsboro;
        line-height: 35px;
        font-weight: 200;
        font-size: 100%;
        letter-spacing: 2px;
    }
    @media(max-width: 480px){
        width: 49%;
        margin-top:15px;
    }
`;

export const CartSection = styled.section`
    margin: 20px auto;
    max-width: 1145px;
    &:before{
        display: block;
        height: 1px;
        background-color: gainsboro;
        content: "";
    }
`;

export const CartUnorderedList = styled.ul`
    margin-left: 10px;
    &:after{
        content:"";
        height: 10px;
        background-color: gainsboro;
        display: inline-block;
    }
    >li{
        list-style: none;
        margin: 15px 0 0 0;
        text-transform: uppercase;
        display: inline-block;    
    }
    >li+li{
        width: 15%;
    }
    >li:first-child{
        width: 70%;
        font-weight: 400;

    }
`;

export const CartItem = styled.div`
    width: 100%;
`;

export const CartItemUnorderedList = styled.ul`
    margin: 10px 0 0 15px;

    >li{
        list-style: none;
    }
    >li:last-child{
        font-size: 75%;
    }
    >li:first-child{
        font-weight: 300;
        letter-spacing: 2px;
    }
`;

export const CartItems = styled.div`
    &:after{
        display: block;
        height: 2px;
        margin-top:5px;
        background-color: gainsboro;
        content: "";
    }
    &:before{
        display: block;
        height: 2px;
        margin-top:5px;
        background-color: gainsboro;
        content: "";
    }
    > div + div{
        &:before{
            display: block;
            height: 1px;
            margin-top:5px;
            background-color: gainsboro;
            content: "";
        }
    }
`;

export const CartItemContent = styled.div`
    display: inline-block;
    width: 70%;
    vertical-align: middle;
    text-align: left;
    margin-top:10px;
    >div:first-of-type{
        margin-left: 15px;
    }
`;

export const CartItemQuantity = styled.div`
    display: inline-block;
    width: 15%;
    >p{
        display: inline-block;
        margin-left: 18px;
    }
`;

export const CartItemPrice = styled.div`
    display: inline-block;
    width: 15%;
    >p{
        display: inline-block;
    }
`;


export const SubTotalUnorderedList = styled.ul`
    margin-top: 20px;
    >li{
        list-style:none;
        display: inline-block;
        text-align: center;
    }
    >li:first-child{
        width: 60%;
        font-weight: 300;
    }
    >li:last-child{
        width: 40%;
        text-indent: 45px;
    }
`;

export const DiscountItemUnorderedList = styled.ul`
    margin-top: 20px;
    >li{
        list-style:none;
        display: inline-block;
    }
    >li:first-child{
        width: 60%;
        font-weight: 300;
        text-align: center;
        text-indent: 15px;
    }
    >li:last-child{
        width: 40%;
        text-indent: 45px;
        text-align: center;
    }
`;

export const DelieveryCharges = styled.ul`
    margin-top: 20px;
    &:after{
        display: block;
        height: 2px;
        background-color: gainsboro;
        content: "";
        margin-top: 30px;
    }
    >li{
        list-style:none;
        display: inline-block;
    }
    >li:first-child{
        width: 60%;
        font-weight: 300;
        text-align: center;
        text-indent: 15px;
    }
    >li:last-child{
        width: 40%;
        text-indent: 45px;
        text-align: center;
    }
`;

export const EstimatedTotal = styled.ul`
    margin-top: 20px;
    &:after{
        display: block;
        height: 5px;
        background-color: gainsboro;
        content: "";
        margin-top: 30px;
    }
    >li{
        list-style:none;
        display: inline-block;
    }
    >li:first-child{
        width: 60%;
        font-weight: 300;
        text-align: center;
        text-indent: 15px;
    }
    >li:last-child{
        width: 40%;
        text-indent: 45px;
        text-align: center;
    }
`;

export const Checkout = styled.div`
    margin-top: 20px;
    width: 30%;
    margin-left: auto;
    >input[type=submit]{
        background-color: #60b246;
        font-size: 125%;
        border: 5px solid gainsboro;
        padding: 5px;
        color: #fff;
        margin-left: 20px;
    }
    @media(max-width: 480px){
        width: 100%;
        text-align:center;
    }
`;