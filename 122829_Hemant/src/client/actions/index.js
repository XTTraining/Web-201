import { getApiResponse } from '../../helpers/request';
import Config from '../../config';
import 'babel-polyfill';

export const FETCH_RESTAURANT_DATA = 'FETCH_RESTAURANT_DATA';

export const fetchRestaurantData = () => dispatch => {
    const res = getApiResponse(Config.restaurantDataUrl);
    res.then(outdata => {
        let data = outdata.data;
        dispatch({
            type: "FETCH_RESTAURANT_DATA",
            payload: data
        });
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