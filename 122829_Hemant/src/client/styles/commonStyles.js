import styled from 'styled-components';

export const Row = styled.div`
    margin: 0 auto;
    max-width: 1145px;
`;

export const Vegeterian = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid #00ff00;
    >div{
        margin: 2px auto;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #00ff00;
    }
`;

export const NonVegeterian = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid #ff0000;
    >div{
        margin: 2px auto;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ff0000;
    }
`;