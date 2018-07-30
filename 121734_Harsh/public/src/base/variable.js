var cssclasses;
var constant;
var elementid;
export class cssclassname {
    constructor() {
        cssclasses = {
            checkoutbutton: ".mycart-checkout-btn",
            addtocart: ".add-to-cart",
            mycartquantity: ".mycart-quantity",
            mycartquantityitem: ".mycart-quantity-item",
            mycartquantityitemselected: ".mycart-quantity-item-selected",
            mycartquantityitemprice: ".mycart-quantity-item-price",
            restaurantaccordion: ".restaurant-accordion",
            restaurantaccordiontitle: ".restaurant-accordion-title",
            restaurantaccordiondescription: ".restaurant-accordion-description",
            show: "show",
            mycart: ".mycart",
            headermenu: ".header-menu",
            clear: ".cls",
            oppenned: "oppenned",
            accordionactive: "restaurant-accordion-active",

            orderlistmycartquantity: ".orderlist-mycart-quantity",
            orderlistmycartquantityitem: ".orderlist-mycart-quantity-item",
            orderlistmycartquantityitemselected: ".orderlist-mycart-quantity-item-selected",
            orderlistmycartquantityitemprice: ".orderlist-mycart-quantity-item-price",
            orderlistmycartpriceorder: ".orderlist-mycart-price-order",
            gst: ".gst",
            grandtotal: ".grand-total",
            span: " span",
            active: " active",

            // Classes for carosuel
            slideshowcontainerslides: ".slideshow-container-slides",
            slidesdotitem: ".slidesdot-item",
            displayblock: "block",
            displaynone: "none"
        };
    }
    getcssclassname() {
        return cssclasses;
    }
}

export class elementids {
    constructor() {
        elementid = {
            foodcategory: "#foodcategory"

        };
    }
    getelementids() {
        return elementid;
    }
}


export class constantstring {
    constructor() {
        constant = {
            undefined: "undefined",
            selecteditem: "selecteditem",
            All: "All",
            id: "id",
            pricesymbol: "₹ ",
            products: "Products",
            emptytext: "<p>Please choose your food</p>",
            Starters: "STARTERS",
            Beverages: "BEVERAGES"
        };
    }
    getconstantstring() {
        return constant;
    }
}