import styled from 'styled-components';


export const SectionGallery = styled.section`
    margin: 10px auto 10px 20px;
    max-width: 1145px;
`;

export const ItemDetailsWrapper = styled.div`
    width: 70%;
    display: inline-block;


    >div:nth-child(${props => props.accordianToShow}) span:first-of-type{
        display: ${props => props.accordianState ? 'none' : 'block'};
    };

    >div:nth-child(${props => props.accordianToShow}) span:last-of-type{
        display: ${props => props.accordianState ? 'block' : 'none'};
    };
    
    @media(max-width:480px){
        width: 95%;
        margin: 0 auto;
    }

    @media(max-width:768px){
        width: 95%;
        margin: 0 auto;
    }
`;
export const CartWrapper = styled.div`
    width: 30%;
    display: inline-block;
    vertical-align: top;
    @media(max-width:480px){
        display: none;
    }
    @media(max-width:768px){
        display: none;
    }
`;

export const RestaurantItem = styled.div`
    display: flex;
    margin-bottom: 10px;
    background-color: gainsboro;
    align-items: center;
    color: #fff;
    border-radius: 3px;
    >h2{
        margin-left: 5px;
        width: 30%;
        letter-spacing: 3px;
        font-weight: 300;
        font-size: 200%;
    }
    >p{
        width: 70%;
        margin-right: 15px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    @media (max-width : 768px){
        >h2{
            font-size: 125%;
        }
        >p{
            display: none;
        }
    }
`;

export const ItemWrapper = styled.div`
    width: 100%;
    display: none;
`;

export const ItemDetails = styled.div`
    display: inline-block;
    margin-bottom: 40px;
    border-radius: 3px;
    width: 45%;
    height: 300px;
    margin-left: 10px;
    :hover{
        border: 2px solid gainsboro;
    }
    @media(max-width:480px){
        width: 90%;
    }
    @media(max-width:768px){
        height: 250px;
    }
`;

export const ItemImageBlock = styled.div`
    overflow: hidden;
    background: #000;
    height: 65%;
    margin: auto;
    width: 75%;
    margin-top: 10px;
    >figure>img{
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        border: 2px transparent;
        transform: scale(1.15);
        transition: transform 0.5s, opacity 0.5s;
    }
    >figure>img:hover{
        opacity: 1;
        transform: scale(1.13);
        box-shadow: 2px gainsboro;
    }
    @media(max-width:768px){
        height: 160px;
    }
    @media(max-width: 480px){
        width:90%;
        height: 60%;
    }
`;

export const ItemDescription = styled.div`
    width: 75%;
    display: flex;
    margin: 10px auto 10px auto;
    >p{
        display: inline-block;
        text-align: center;
        font-size: 90%;
        font-weight: 400;
        margin-left: 10px;
    }
    @media(max-width:480px){
        width: 90%;
        margin: 6px auto;
        display:flex;
    }
`;

export const ItemAddBtn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin: auto;
    >p{
        font-weight: 300;
        font-size: 75%;
    }
    >button{
        border: 1px solid gainsboro;
        font-size: 95%;
        text-transform: uppercase;
        padding: 5px 15px;
        background-color: #60b246;
        color: #fff;
        font-weight:200;
        cursor: pointer
    }
    @media(max-width:480px){
        width: 90%;
    }
    >button{
        font-size: 80%;
        align-self:center;
    }
`;

export const FoodItemWrapper = styled.div`

`;


export const ViewCart = styled.div`
    width: 90%;
    position: fixed;
    bottom:0;
    background-color: #60b246;
    height: 7%;
    text-align: center;
    display: none;
    &:before{
        content:'';
        display:block;
        vertical-align: middle;
        height: 32%;
    }
    >a{
        font-size: 90%;
        text-decoration: none;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 400;
    }
    @media(max-width:480px){
        display: ${props => {
        if (props.cartButtonDisplay > 0) {
            return 'block';
        } else {
            return 'none';
        }
    }};
    }
    @media(max-width:768px){
        display: ${props => {
        if (props.cartButtonDisplay > 0) {
            return 'block';
        } else {
            return 'none';
        }
    }};
    }
`;

export const ExpandSpan = styled.span`
    font-size: 295%;
    display:block;
    cursor: pointer;
    margin: 0 0 0 auto;
`;

export const CollapseSpan = styled.span`
    font-size: 200%;
    display: none;
    cursor: pointer;
    margin: 0 2px 0 auto;
`;