import {
    ComponentsController
} from './ComponentsController.js';
import {
    Route
} from './../routes/routes.js';
import {
    Polyfills
} from '../Polyfills/CustomPolyfill.js';

const initComponents = () => {
    let ci = new ComponentsController(Route.getPage());
    ci.init();
};

const loadPolyfills = () => {
    Polyfills.forEachPolyfill();
    Polyfills.scrollBy();
};

export const app = {
    init: initComponents,
    loadPolyfills: loadPolyfills
};
