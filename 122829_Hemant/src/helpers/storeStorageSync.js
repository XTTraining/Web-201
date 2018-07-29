import {store } from '../helpers/clientStore';

const initializeState = () => {
    store.subscribe(()=>{
        console.log(store.getStore());
        return store.getState();
    });
};

export const loadState = () => {
    try {
        let serializedState = localStorage.getItem('userData');
        if (serializedState === null) {
            return initializeState();
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return {};
    }
};

export const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem('userData', serializedState);
    }
    catch (err) {

    }
};