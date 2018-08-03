import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';

export default combineReducers({
    restaurants: restaurantReducer,
    selectedItems: menuReducer,
    userInfo: userReducer
});