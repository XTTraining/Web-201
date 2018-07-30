import {
    CartContainerComponent
} from './components/cartcontainer';
import {
    selector
} from './../common/common';
import {
    lazyImgBinder
} from './../common/lazy-load';
import React from "react";
import ReactDOM from "react-dom";

export class CartController {

    constructor() {}

    bindWindowEvents() {
        window.addEventListener('load', () => {
            lazyImgBinder(this.storage);
        });
        window.addEventListener('scroll', () => {
            lazyImgBinder(this.storage);
        });
    }

    bindComponentEvents() {

    }

    init(firebaseStorage) {
        this.storage = firebaseStorage;
        this.bindWindowEvents();
        this.bindComponentEvents();
        
        ReactDOM.render( 
        <CartContainerComponent/> 
        , document.getElementById('cart-container'));
    }

}
