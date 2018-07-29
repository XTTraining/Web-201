import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { fetchRestaurantData, pushMenuItems } from '../actions';
import MiniCart from './miniCart';
import { Vegeterian, NonVegeterian } from '../styles/commonStyles';
import {
    SectionGallery,
    ItemDetailsWrapper,
    CartWrapper,
    RestaurantItem,
    ItemWrapper,
    ItemDetails,
    ItemImageBlock,
    ItemDescription,
    ItemAddBtn,
    FoodItemWrapper,
    ViewCart,
    ExpandSpan,
    CollapseSpan
} from './restaurantGalleryStyles';



class RestaurantGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            accordianTriggered: 0
        };
    };

    toggle = (index, total, visibility) => {
        if (visibility === 'show') {
            this.setState({
                isOpen: true,
                accordianTriggered: index + 1
            })
        }
        else {
            this.setState({
                isOpen: false,
                accordianTriggered: index + 1
            })
        }
        let referredDiv = `menu-${index}`;
        var menuItemsDom = ReactDom.findDOMNode(this.refs[referredDiv]);
        if (menuItemsDom !== undefined) {
            menuItemsDom.style.display = menuItemsDom.style.display === 'block' ? 'none' : 'block';
        }
        for (let i = 0; i < total; i++) {
            if (i !== index) {
                var currentDiv = `menu-${i}`;
                var menuItems = ReactDom.findDOMNode(this.refs[currentDiv]);
                menuItems.style.display = menuItemsDom.style.display === 'block' ? 'none' : 'block';
            }
        }
    };

    componentWillMount() {
        this.props.fetchRestaurantData();
    };

    distinctCuisines = (menuitem) => {
        let menuItems = menuitem.map((currentval) => { return currentval.cuisine; });
        menuItems = menuItems.filter((curr, item) => {
            return menuItems.indexOf(curr) === item && curr != undefined && curr != "";
        });
        return menuItems.join();
    };

    getMenuItems = (item, restaurantId) => {
        let menu = item;
        menu.restaurantId = restaurantId;
        return menu;
    };

    createFoodItems = (menuItems, restaurantid) => {
        const menuItemsHtml = [];
        const imagePath = `/assets/img/`;
        for (let i = 0; i < menuItems.length; i++) {
            menuItemsHtml.push(
                <ItemDetails key={i}>
                    <ItemImageBlock>
                        <figure>
                            <img src={`${imagePath}${menuItems[i].image}.jpg`} alt={menuItems[i].image} />
                        </figure>
                    </ItemImageBlock>
                    <ItemDescription>
                        {menuItems[i].subcategory && menuItems[i].subcategory === 'non-veg' ? (
                            <NonVegeterian>
                                <div></div>
                            </NonVegeterian>
                        ) : <Vegeterian>
                                <div></div>
                            </Vegeterian>

                        }
                        <p>{menuItems[i].name}</p>
                    </ItemDescription>

                    <ItemAddBtn>
                        <p>
                            {`${menuItems[i].price.currency} ${menuItems[i].price.amount}`}
                        </p>
                        <button onClick={
                            () =>
                                this.props.pushMenuItems(this.getMenuItems(menuItems[i], restaurantid))
                        }>
                            Add
                                </button>
                    </ItemAddBtn>
                </ItemDetails>
            );
        }
        return menuItemsHtml;
    };

    createGalleryItems = (restaurants) => {
        let gallery = [];
        for (let i = 0; i < restaurants.length; i++) {
            let menuItem = restaurants[i].menu;
            gallery.push(
                <FoodItemWrapper key={i}>
                    <RestaurantItem key={i}>
                        <h2>{restaurants[i].name}</h2>
                        <p>{this.distinctCuisines(menuItem)}</p>
                        <ExpandSpan iconVisibility={this.state.isOpen} onClick={() => this.toggle(i, restaurants.length, 'show')}>+</ExpandSpan>
                        <CollapseSpan onClick={() => this.toggle(i, 'hide')}>X</CollapseSpan>
                    </RestaurantItem>
                    <ItemWrapper ref={`menu-${i}`} accordianState={this.state.isOpen}>
                        {this.createFoodItems(menuItem, restaurants[i]._id)}
                    </ItemWrapper>
                </FoodItemWrapper>
            );
        }
        return gallery;
    };


    render() {
        const restaurants = this.props.restaurant;
        return (
            <SectionGallery>
                <ItemDetailsWrapper accordianState={this.state.isOpen} accordianToShow={this.state.accordianTriggered}>
                    {this.createGalleryItems(restaurants)}
                    <ViewCart cartButtonDisplay={this.props.menuSelected.length}>
                        <a href="/cart">View Cart</a>
                    </ViewCart>
                </ItemDetailsWrapper>
                <CartWrapper>
                    <MiniCart />
                </CartWrapper>
            </SectionGallery>
        );
    }
};

const mapStateToProps = state => {
    return {
        restaurant: state.restaurants,
        menuSelected: state.selectedItems
    }
};



export default connect(mapStateToProps, { fetchRestaurantData, pushMenuItems })(RestaurantGallery);