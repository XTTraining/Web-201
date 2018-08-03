import { PUSH_USER_INFO } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case PUSH_USER_INFO:
            return action.payload;
        default:
            return state;
    }
};