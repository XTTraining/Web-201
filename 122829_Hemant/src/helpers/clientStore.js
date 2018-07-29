import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { loadState, saveState } from '../helpers/storeStorageSync';

export const store = createStore(
    reducers,
    loadState(),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

store.subscribe(() => {
    saveState(store.getState());
});