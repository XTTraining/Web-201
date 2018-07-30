import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';

export default combineReducers({
    restaurants: restaurantReducer,
    selectedItems: menuReducer
});