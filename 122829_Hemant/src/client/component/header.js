import React from 'react';
import { HeaderData } from '../data/headerData';
import {
    HeaderStyle,
    LogoImage,
    NavFlexContainer,
    MenuUnorderedList,
    HamBurgerWrapper,
    HamBurger,
    CloseIcon
} from './headerStyle';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ishamburger: true
        }
    };
    getMenuItems = () => {
        let menuItems = [];
        let items = this.props.navigation;
        for (let i = 0; i < items.length; i++) {
            menuItems.push(
                <li key={i}>
                    <a href={items[i].link.href}>{items[i].title}</a>
                </li>
            );
        };
        return menuItems;
    };

    showMenu = () => {
        this.setState({ ishamburger: false });
    };

    hideMenu = () => {
        this.setState({ ishamburger: true });
    };

    render() {

        return (
            <HeaderStyle>
                <NavFlexContainer Row>
                    <a href="/" alt="">
                        <LogoImage src={this.props.headerLogoImage} alt='khaana-peena' />
                    </a>
                    <MenuUnorderedList actionHamburger={this.state.ishamburger}>
                        {this.getMenuItems()}
                    </MenuUnorderedList>
                    <HamBurgerWrapper onClick={this.showMenu} actionHamburger={this.state.ishamburger}>
                        <HamBurger>
                        </HamBurger>
                        <HamBurger>
                        </HamBurger>
                        <HamBurger>
                        </HamBurger>
                    </HamBurgerWrapper>
                    <CloseIcon onClick={this.hideMenu} actionHamburger={this.state.ishamburger}>
                        X
                    </CloseIcon>
                </NavFlexContainer>
            </HeaderStyle>
        )
    };
}

Header.defaultProps = {
    headerTitle: HeaderData.title,
    navigation: HeaderData.navigationItems,
    headerLogoImage: HeaderData.logoImage
}

export default Header;