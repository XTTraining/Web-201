import { getApiResponse } from '../../helpers/request';
import Config from '../../config';
import 'babel-polyfill';
import { push } from 'react-router-redux';


export const FETCH_RESTAURANT_DATA = 'FETCH_RESTAURANT_DATA';

export const fetchRestaurantData = () => async dispatch => {
    const res = await getApiResponse(Config.restaurantDataUrl);
    dispatch({
                 type: "FETCH_RESTAURANT_DATA",
                 payload: res
             });
};


export const PUSH_MENU_ITEMS = 'PUSH_MENU_ITEMS';

export const pushMenuItems = (menuItems) => dispatch => {
    dispatch({
        type: "PUSH_MENU_ITEMS",
        payload: menuItems
    });
};

export const MODIFY_CART_ITEMS = 'MODIFY_CART_ITEMS';

export const modifyCartItems = (menuItem, operation)=> dispatch =>{  
    dispatch({
        type: "MODIFY_CART_ITEMS",
        payload: {
            item: menuItem,
            operation: operation
        }
    });
};

export const PUSH_USER_INFO = 'PUSH_USER_INFO';

export const pushUserInfo = (user)=> dispatch =>{  
    dispatch({
        type: "PUSH_USER_INFO",
        payload: user
    });
    dispatch(push('/'));
};