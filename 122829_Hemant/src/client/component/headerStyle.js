import styled from 'styled-components';

export const HeaderStyle = styled.header`
    background-color: #ff7400;
`;

export const CloseIcon = styled.p`
    color: #fff;
    font-weight: 1000;
    font-size: 185%;
    display: block;
    margin: 20px 20px auto 0;
    cursor: pointer;
    display: ${props => {
        if (props.actionHamburger === true) {
            return 'none';
        }
        else {
            return 'block';
        }
    }};
`;

export const HamBurgerWrapper = styled.div`
    display: none;
    margin: auto 20px auto 0;
    vertical-align: middle;
    @media(max-width: 480px){
        display: ${props => {
        if (props.actionHamburger === true) {
            return 'block';
        }
        else {
            return 'none';
        }
    }};
    }
`;

export const HamBurger = styled.div`
    width: 35px;
    height: 5px;
    background-color: #fff;
    margin: 6px 0;
`;

export const LogoImage = styled.img`
    height:70px;
    margin:5px 0;
`;

export const NavFlexContainer = styled.nav`
    display: flex;
    margin: 0 auto;
    max-width: 1145px;
    justify-content: space-between;
`;

export const MenuUnorderedList = styled.ul`
    margin-top:30px;
    >li{
        list-style: none;
        display: inline;
        margin-left:20px;
    }
    >li>a{
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
    }
    @media (max-width: 768px){
        margin-right: 20px;
    }
    @media (max-width: 480px){
        z-index: 10;
        width: 100%;
        margin-top: 100px;
        text-align: center;
        display: ${props => {
        if (props.actionHamburger === true) {
            return 'none';
        }
        else {
            return 'block';
        }
    }};
    >li{
        display: block;
        margin-bottom: 10px;
        font-size: 80%;
    }
    >li:before{
        content: '';
        height: 2px;
        display: block;
        background-color: #fff;
        margin: 10px 0;
    }
    }
    `;
