import * as commonjs from '../../base/commonfunction.js';
import * as variable from '../../base/variable.js';

const cssclassname = new variable.cssclassname().getcssclassname();
const constantstring = new variable.constantstring().getconstantstring();

var orderlistitems;

$(cssclassname.orderlistmycartquantity).unbind('click').on('click', function (orderlistevent) {
    const btn = $(orderlistevent.target);
    const id = parseInt(btn.closest(cssclassname.orderlistmycartquantityitem).attr(constantstring.id));
    var selecteditemincart = 0;

    // Condition to decrease item from cart
    if (orderlistevent.target.className === "orderlist-mycart-quantity-item-remove") {
        $.map(Object.values(window.orderlistitems), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? (obj[0].quantity > 0 ? obj[0].quantity = (obj[0].quantity - 1) : obj[0].quantity) : obj[0].quantity;
        });
        let currentquty = commonjs.getitemquantity(window.orderlistitems, id);
        if (selecteditemincart && currentquty >= 0) {
            var itemprice = commonjs.getitemprice(window.orderlistitems, id);
            btn.closest(cssclassname.orderlistmycartquantityitem).find(cssclassname.orderlistmycartquantityitemselected).text(currentquty);
            btn.closest(cssclassname.orderlistmycartquantityitem).find(cssclassname.orderlistmycartquantityitemprice).text(constantstring.pricesymbol + (currentquty * itemprice));
        }
    }

    // Condition to add increase item in cart
    if (orderlistevent.target.className === "orderlist-mycart-quantity-item-add") {
        $.map(Object.values(window.orderlistitems), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? obj[0].quantity = (obj[0].quantity + 1) : obj[0].quantity;
        });
        let currentquty = commonjs.getitemquantity(window.orderlistitems, id);
        if (selecteditemincart && currentquty >= 0) {
            var itemprice = commonjs.getitemprice(window.orderlistitems, id);
            btn.closest(cssclassname.orderlistmycartquantityitem).find(cssclassname.orderlistmycartquantityitemselected).text(currentquty);
            btn.closest(cssclassname.orderlistmycartquantityitem).find(cssclassname.orderlistmycartquantityitemprice).text(constantstring.pricesymbol + (currentquty * itemprice));
        }
    }

    // Function to delete item from mini-cart
    if (event.target.className === "orderlist-mycart-quantity-item-delete") {
        let itemparent = btn.closest(cssclassname.orderlistmycartquantity);
        btn.closest(cssclassname.orderlistmycartquantityitem).remove();

        var itemlength = itemparent.find(cssclassname.orderlistmycartquantity).length;
        if (itemlength === 0) {
            $(cssclassname.mycart).find(cssclassname.checkoutbutton).hide();
            $(cssclassname.orderlistmycartquantity).html(constantstring.emptytext);

            $("ul").hide();
        }
        var filterproducts = $.grep(window.orderlistitems, function (filterevent) {
            return filterevent[0].id != id;
        });
        window.orderlistitems = filterproducts;
    }
    window.cartproduct = window.orderlistitems;

    // bind price section
    bindpriceandgst(window.orderlistitems);

    // Append local Store
    commonjs.setlocalStorage(window.cartproduct);
});

// Method to bind my cart price section
function bindpriceandgst(obj) {

    // Update total price without GST
    let pricewithoutgst = calculateprice(obj);
    $(cssclassname.orderlistmycartpriceorder + cssclassname.span).text(constantstring.pricesymbol + pricewithoutgst);

    // Update total GST
    let gst = calculatgsteprice(obj)
    $(cssclassname.gst + cssclassname.span).text(constantstring.pricesymbol + gst);

    let finalprice = pricewithoutgst + (2 * gst);
    $(cssclassname.grandtotal + cssclassname.span).text(constantstring.pricesymbol + finalprice);
}

export function renderorderlisthtml(menu) {
    var html = '';
    for (let key in menu) {
        for (let a = 0; a < menu[key].length; a++) {
            if (menu[key][a].quantity > 0) {
                let totalprice = menu[key][a].discountprice * menu[key][a].quantity;
                html += `<div class="orderlist-mycart-quantity-item" id="${menu[key][a].id}"> <div class="orderlist-mycart-quantity-item-detail">
                    <h3>${menu[key][a].title}</h3> <span class="orderlist-mycart-quantity-item-delete">X </span></div>
                    <div class="orderlist-mycart-quantity-item-total">
                    <div class="orderlist-mycart-quantity-item-selction">
                        <a class="orderlist-mycart-quantity-item-remove">-</a>
                        <a class="orderlist-mycart-quantity-item-selected">${menu[key][a].quantity}</a>
                        <a class="orderlist-mycart-quantity-item-add">+</a>
                    </div>
                    <span class="orderlist-mycart-quantity-item-price">₹ ${totalprice}</span>
                </div></div>`
            }
        }
    }
    return html;
}

export function calculateprice(menu) {
    var totalprice = 0;
    if (window.orderlistitems.length > 0) {
        for (let key in menu) {
            for (let a = 0; a < menu[key].length; a++) {
                totalprice += (parseInt(menu[key][a].quantity) * parseInt(menu[key][a].discountprice));
            }
        }
    }
    return totalprice;
}

export function calculatgsteprice(menu) {
    var snack = 0;
    var food = 0;
    if (window.orderlistitems.length > 0) {
        for (let key in menu) {
            for (let a = 0; a < menu[key].length; a++) {
                if (menu[key][a].category.toLowerCase() === "STARTERS".toLowerCase() || menu[key][a].category.toLowerCase() === "BEVERAGES".toLowerCase()) {
                    snack += (parseInt(menu[key][a].quantity) * parseInt(menu[key][a].discountprice));
                } else {
                    food += (parseInt(menu[key][a].quantity) * parseInt(menu[key][a].discountprice));
                }
            }
        }
    }
    let snackgst = commonjs.calculategstprice(snack, 12);
    let foodgst = commonjs.calculategstprice(food, 5);
    return (snackgst + foodgst);
}

// Method to get local Storage object and bind my cart
$(document).ready(function (loadevent) {
    let jsonObject = JSON.parse(localStorage.getItem(constantstring.selecteditem));
    window.cartproduct = window.orderlistitems = jsonObject;

    if (window.orderlistitems != undefined && window.orderlistitems.length > 0) {
        $(cssclassname.orderlistmycartquantity).html(renderorderlisthtml(window.orderlistitems));
        bindpriceandgst(window.orderlistitems);
    }

    if (window.cartproduct != undefined && window.cartproduct.length > 0) {
        $(cssclassname.mycartquantity).html(commonjs.bindhomepagecartitem(window.cartproduct));
    }

    const mycartquantityitem = $(cssclassname.mycartquantity).find(cssclassname.mycartquantityitem).length;
    if (mycartquantityitem <= 0) {
        $(cssclassname.mycartquantity).html(constantstring.emptytext);
    } else {
        $(cssclassname.checkoutbutton).show();
    }
});