import {
    home
} from '../home/index.js';
import {
    cart
} from '../cart/index.js';
import {
    Header
} from '../common/header.js';
import {
    Common
} from '../common/common.js';
import {
    checkout
} from './../checkout/index.js';
import firebase from 'firebase/app';
import 'firebase/storage';

export class ComponentsController {
    constructor(page) {
        this.page = page;
        var config = {
            apiKey: "AIzaSyB9NBMkReB1oOkdSO4Csk9qbZPqx4uXh20",
            authDomain: "web201-201.firebaseapp.com",
            databaseURL: "https://web201-201.firebaseio.com",
            projectId: "web201-201",
            storageBucket: "web201-201.appspot.com",
            messagingSenderId: "527954885165"
        };
        firebase.initializeApp(config);
        this.firebaseStorage = firebase.storage();
    }

    init() 
    {
        window.addEventListener('scroll', Header.reduceHeaderOnScroll);
        window.addEventListener('load', Header.reduceHeaderOnScroll);
        window.addEventListener('load', Common.setCartCount);
        switch (this.page) {
            case 'cart':
                {
                    cart.init(this.firebaseStorage);
                    break;
                }
            case 'checkout':
                {
                    checkout.init(this.firebaseStorage);
                    break;
                }
            default:
                {
                    home.init(this.firebaseStorage);
                    break;
                }
        }
    }
}
