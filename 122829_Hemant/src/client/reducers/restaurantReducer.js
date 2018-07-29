import { FETCH_RESTAURANT_DATA } from '../actions';
import { PUSH_MENU_ITEMS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_RESTAURANT_DATA:
            return action.payload;
        default:
            return state;
    }
};