import styled from 'styled-components';

export const FooterSection = styled.footer`
    background-color: #333;
    font-size: 80%;
    padding-bottom: 20px;
`;

export const FooterLinks = styled.div`
    width: 50%;
    text-align: left;
    display: inline-block;
    >a>figure>img{
        height: 50px;
    }
`;

export const FooterSocialLinks = styled.div`
    display: inline-block;
    width: 50%;
    text-align: right;
    vertical-align: top;
    margin-top: 10px;
`;

export const SocialLinks = styled.ul`

    >li{
        list-style: none;
        display: inline-block;
    }
`;

export const CopyRightText = styled.p`
        margin-top: 10px;
        color: #fff;
        margin-left: 10px;
`;