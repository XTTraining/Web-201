import './styles/main.scss';
import {
    app
} from './scripts/controller/GlobalController.js';

require('babel-polyfill');

app.loadPolyfills();
app.init();