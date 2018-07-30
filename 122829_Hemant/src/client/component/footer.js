import React from 'react';
import { FooterData } from '../data/footerData';
import {Row} from '../styles/commonStyles';
import {
    FooterSection,
    FooterLinks,
    FooterSocialLinks,
    SocialLinks,
    CopyRightText
} from './footerStyle';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    };

    getSocialIcons = (icons) => {
        let socialLinks = [];
        for (let i = 0; i < icons.length; i++) {
            let socialLink = icons[i];
            socialLinks.push(
                <li key={i}>
                    <a href={socialLink.link.href} alt="">
                        <figure>
                            <img src={socialLink.image.src} alt={socialLink.image.alt} />
                        </figure>
                    </a>
                </li>
            );
        }
        return socialLinks;
    };

    render() {
        return (
            <FooterSection>
                <Row>
                    <FooterLinks>
                        {
                            this.props.footerImage && (
                                <a href={this.props.footerLink}>
                                    <figure>
                                        <img src={this.props.footerImage} alt={this.props.footerImageAlt} />
                                    </figure>
                                </a>
                            )
                        }
                    </FooterLinks>
                    <FooterSocialLinks>
                        {
                            this.props.socialLinks && this.props.socialLinks.length > 0 && (
                                <SocialLinks>
                                    {this.getSocialIcons(this.props.socialLinks)}
                                </SocialLinks>
                            )}
                    </FooterSocialLinks>
                    {
                            this.props.copyRightText && (
                                <CopyRightText>{this.props.copyRightText}</CopyRightText>
                            )
                        }
                        </Row>
            </FooterSection>
        )
    };
};

Footer.defaultProps = {
    footerImage: FooterData.footerLeftSection.img.src,
    footerImageAlt: FooterData.footerLeftSection.img.alt,
    footerLink: FooterData.footerLeftSection.link.href,
    footerAlt: FooterData.footerLeftSection.link.alt,
    copyRightText: FooterData.footerLeftSection.copyRightText,
    socialLinks: FooterData.footerSocialLinks
};

export default Footer;