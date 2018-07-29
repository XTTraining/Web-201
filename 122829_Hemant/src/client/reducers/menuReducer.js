import { PUSH_MENU_ITEMS, MODIFY_CART_ITEMS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case PUSH_MENU_ITEMS:
            const allSelectedMenu = state;
            const elementIndex = allSelectedMenu.indexOf(
                allSelectedMenu.find(
                    element => {
                        return element.name == action.payload.name && element.restaurantId == action.payload.restaurantId;
                    }));
            if (elementIndex !== -1) {
                return state.map((element, index) => {
                    if (index === elementIndex) {
                        element.quantity.numericValue = element.quantity.numericValue + 1;
                    }
                    return element;
                });
            }
            return [
                ...state, action.payload
            ];
        case MODIFY_CART_ITEMS:
            const allMenu = state;
            const lastElementIndex = allMenu.indexOf(
                allMenu.find(
                    element => {
                        return element.name == action.payload.item.name &&
                            element.restaurantId == action.payload.item.restaurantId &&
                            element.quantity.numericValue && element.quantity.numericValue === 1
                    }));
            const menuIndex = allMenu.indexOf(
                allMenu.find(
                    element => {
                        return element.name == action.payload.item.name &&
                            element.restaurantId == action.payload.item.restaurantId;
                    }));
            if (menuIndex !== -1) {
                if(lastElementIndex!==-1 && action.payload.operation == 'remove'){
                    return state.filter((element, index)=>index!==lastElementIndex);
                }
                return state.map((element, index) => {
                    if (index === menuIndex && action.payload.operation === 'add') {
                        element.quantity.numericValue = element.quantity.numericValue + 1;
                    }
                    else if (lastElementIndex===-1 && index === menuIndex && action.payload.operation == 'remove') {
                        element.quantity.numericValue = element.quantity.numericValue - 1;
                    }
                    return element;
                });
            }
            
        default:
            return state;
    }
};