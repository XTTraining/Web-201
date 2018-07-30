import {
    selector
} from './../common/common';
import {
    accordian
} from './components/accordian';
import {
    order
} from './components/ordersummary';

export class CheckoutController {

    constructor() {

    }

    bindWindowEvents() {
        
    }

    bindComponentEvents() {
        selector.proceed().forEach((t) => t.addEventListener('click', accordian.openNxtAccordian));
        selector.accordianbtn().forEach((t) => t.addEventListener('click', accordian.openAccordian));
       selector.pay().forEach((t) => t.addEventListener('click', accordian.pay ));
    }

    init() {
        
        this.bindWindowEvents();
        this.bindComponentEvents();
        order.populateOrderSummary();
    }

}
