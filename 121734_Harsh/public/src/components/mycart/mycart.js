import * as commonfunction from '../../base/commonfunction.js';
import * as variable from "../../base/variable.js";

const cssclassname = new variable.cssclassname().getcssclassname();
const constantstring = new variable.constantstring().getconstantstring();

$(cssclassname.mycartquantity).on('click', function (event) {
    const btn = $(event.target);

    // Item id 
    const id = parseInt(btn.closest(cssclassname.mycartquantityitem).attr(constantstring.id));
    var selecteditemincart = 0;

    // Function to delete item from mini-cart
    if (event.target.className === "mycart-quantity-item-delete") {
        let itemparent = btn.closest(cssclassname.mycartquantity);
        btn.closest(cssclassname.mycartquantityitem).remove();

        var itemlength = itemparent.find(cssclassname.mycartquantityitem).length;
        if (itemlength === 0) {
            $(cssclassname.mycart).find(cssclassname.checkoutbutton).hide();
            $(cssclassname.mycartquantity).html(constantstring.emptytext);
        }
        var filterproducts = $.grep(window.cartproduct, function (filterevent) {
            return filterevent[0].id != id;
        });
        window.cartproduct = filterproducts;
    }

    if (event.target.className === "mycart-quantity-item-add") {
        $.map(Object.values(window.cartproduct), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? obj[0].quantity = (obj[0].quantity + 1) : obj[0].quantity;
        });
        var currentquty = commonfunction.getitemquantity(window.cartproduct, id);
        if (selecteditemincart && currentquty >= 0) {
            const itemprice = commonfunction.getitemprice(window.cartproduct, id);
            btn.closest(cssclassname.mycartquantityitem).find(cssclassname.mycartquantityitemselected).text(currentquty);
            btn.closest(cssclassname.mycartquantityitem).find(cssclassname.mycartquantityitemprice).text(constantstring.pricesymbol + (currentquty * itemprice));
        }
    }

    if (event.target.className === "mycart-quantity-item-remove") {
        $.map(Object.values(window.cartproduct), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? obj[0].quantity = (obj[0].quantity - 1) : obj[0].quantity;
        });
        const currentquty = commonfunction.getitemquantity(window.cartproduct, id);
        if (selecteditemincart && currentquty >= 0) {
            var itemprice = commonfunction.getitemprice(window.cartproduct, id);
            btn.closest(cssclassname.mycartquantityitem).find(cssclassname.mycartquantityitemselected).text(currentquty);
            btn.closest(cssclassname.mycartquantityitem).find(cssclassname.mycartquantityitemprice).text(constantstring.pricesymbol + (currentquty * itemprice));
        }
    }

    // Append local Store
    commonfunction.setlocalStorage(window.cartproduct);
});