import styled, { css } from 'styled-components';

export const ParentCarouselSection = styled.section`
    position: relative;
    height:400px;
    margin-bottom: 10px;
    @media(max-width: 480px){
        height: 225px;
    }
`;

export const CarouselImage = styled.div`
    position: relative;
    margin-top: -5%;
    height: 100%;
    width:100%;
    flex-shrink:0;
    order: ${props => props.order};
    >img{
        height: 100%;
        width: 100%;
    }
    >p{
        position: relative;
        width: 25%;
        height: 20%;
        top: 40%;
        left: 10%;
        text-transform: uppercase;
        font-size: 140%;
        color: #60b246;
        border: 1px solid #60b246;
        text-align: center;
        z-index:999;
    }
    
    @media(max-width:768px){
        margin-top:0;
        >p{
            display: none;
        }
        
    }
`;

export const CarouselSection = styled.div`
    position:absolute;
    display:flex;
    overflow-x: hidden;
    transition: ${props => {
        props.sliding ? 'none' : 'transform 1s ease';
    }};
    transform:${props => {
        if (!props.sliding) {
            return 'translateX(-100%)';
        }
        if (props.direction === 'previous') {
            return 'translateX(200%)';
        };
        return 'translateX(0%)';
    }};
`;

export const ControlWrapper = styled.div`
    margin: 0 auto;
    position:absolute;
    top:40%;
    display:flex;
    justify-content:space-between;
    width: 100%;
`;

export const NavigationButton = styled.div`
    height:30px;
    width: 30px;
    border-style: solid;
    border-width: 5px 5px 0 0;
    border-color: #fff;
    ${props =>
        props.previous && css`
        transform:rotate(225deg);
        margin-left:30px;
        `};
    ${props =>
        props.next && css`
        transform:rotate(45deg);
        margin-right: 30px;
        `};
`;

export const CarouselIndicatorWrapper = styled.div`
        width: 10%;
        margin: 0 auto;
        transform: translateY(350px);
        @media(max-width: 480px){
            transform: translateY(190px);
            width: 15%;
        }
`;

export const CarouselIndicator = styled.ul`
        display: flex;
        justify-content: space-between;
`;

export const Indicator = styled.li`
    background-color: ${(props) =>(props.isCurrent)? '#ff7400': 'gainsboro'};
    list-style:none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    z-index: 1;
    cursor: pointer;
`;