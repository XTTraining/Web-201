import {
    selector
} from '../../common/common';
import { 
    Cart 
} from '../../cart/components/cart'; 

const openNxtAccordian = (e) => {
    
    e.preventDefault();
    const currentAccordian = e.target.parentElement.parentElement;
    const nxtAccordian = currentAccordian.parentElement.nextElementSibling.querySelector('div');

    currentAccordian.style['display'] = 'none';
    nxtAccordian.style['display'] = 'grid';
    selector.addressaccordianinput().forEach((input) => {
        if (input.value == '' || input.value == undefined) {
            currentAccordian.style['display'] = 'grid';
            nxtAccordian.style['display'] = 'none';
        }
    });
};

const openAccordian = (e) => {
    e.preventDefault();
    selector.addressaccordianinput().forEach((input) => {
        e.target.parentElement.querySelector('div').style['display'] = 'grid';
        if (input.value == '' || input.value == undefined) {
            e.target.parentElement.querySelector('div').style['display'] = 'none';
        }
    });
};

const pay = (e) => {
    e.preventDefault();
    Cart.clearCart();
    window.location = '/index.html';
};

export const accordian = {
    openAccordian: openAccordian,
    openNxtAccordian: openNxtAccordian,
    pay: pay
};
