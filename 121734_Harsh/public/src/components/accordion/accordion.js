import * as commonfunctionjs from '../../base/commonfunction.js';
import * as initializefirebase from '../../abstracts/apikey.js';
import * as variable from "../../base/variable.js";

const cssclassname = new variable.cssclassname().getcssclassname();
const constantstring = new variable.constantstring().getconstantstring();
const ids = new variable.elementids().getelementids();

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref(constantstring.products);
var fireobject;
var cartproduct;
window.cartproduct = [];

contactsRef.on('value', function (snapshot) {
    window.fireobject = snapshot.val();
    commonfunctionjs.createaccordion(snapshot.val());

    // Bind fliter dropdown
    $.each(Object.keys(commonfunctionjs.groupingdata(window.fireobject)), function (val, text) {
        $(ids.foodcategory).append(
            $('<option></option>').val(text).html(text)
        );
    });

    $(cssclassname.addtocart).click(function (minicart) {
        minicart.preventDefault();
        const id = parseInt($(this).attr(constantstring.id));
        let clickeditem = commonfunctionjs.filterobjectbyid(window.fireobject, id);
        let selecteditemincart = 0;
        $.map(Object.values(window.cartproduct), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? obj[0].quantity = (obj[0].quantity + 1) : obj[0].quantity;
        });
        let mycarteitemlength = $(cssclassname.mycartquantity).find(cssclassname.mycartquantityitem).length;
        if (mycarteitemlength <= 0) {
            $(cssclassname.mycartquantity).html(commonfunctionjs.bindselectediteminmycart(clickeditem));
        } else {
            if (!selecteditemincart) {
                $(cssclassname.mycartquantity).append(commonfunctionjs.bindselectediteminmycart(clickeditem));
            } else {
                let currentquty = commonfunctionjs.getitemquantity(window.cartproduct, id);
                let itemprice = commonfunctionjs.getitemprice(window.cartproduct, id);

                $(cssclassname.mycartquantity).find("#" + id).find(cssclassname.mycartquantityitemselected).text(currentquty);
                $(cssclassname.mycartquantity).find("#" + id).find(cssclassname.mycartquantityitemprice).text(constantstring.pricesymbol + (currentquty * itemprice));
            }
        }
        if (!selecteditemincart) {
            selecteditemincart = 0;
            window.cartproduct.push(clickeditem);
        }
        $(cssclassname.checkoutbutton).show();

        // Append local Store
        commonfunctionjs.setlocalStorage(window.cartproduct);
    });
});

$(document).ready(function () {
    const fooditem = $(cssclassname.mycartquantity).find(cssclassname.mycartquantityitem).length;
    if (fooditem > 0) {
        $(cssclassname.checkoutbutton).show();
    } else {
        $(cssclassname.mycartquantity).html(constantstring.emptytext);
        $(cssclassname.checkoutbutton).hide();
    }
});