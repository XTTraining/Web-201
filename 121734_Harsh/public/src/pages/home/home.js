import * as commonfunctionjs from '../../base/commonfunction.js';
import * as variable from '../../base/variable.js';

const cssclassname = new variable.cssclassname().getcssclassname();
const constantstring = new variable.constantstring().getconstantstring();
const elementids = new variable.elementids().getelementids();

$(cssclassname.checkoutbutton).click(function (accordionevent) {
    // Check browser support
    if (typeof (Storage) !== constantstring.undefined) {
        // Store
        localStorage.setItem(constantstring.selecteditem, JSON.stringify(window.cartproduct));
    }
    window.location.href = "/dist/orderlist.html";
});

$(elementids.foodcategory).change(function () {
    // jQuery
    const selectedVal = $(this).find(':selected').val();
    var filteritemlist = window.fireobject;
    if (selectedVal !== constantstring.All) {
        filteritemlist = commonfunctionjs.getfilteritem(window.fireobject, selectedVal);
    } else {
        filteritemlist = window.fireobject;
    }
    commonfunctionjs.createaccordion(filteritemlist);

    $(cssclassname.addtocart).click(function (minicart) {
        minicart.preventDefault();
        const id = parseInt($(this).attr(constantstring.id));
        var clickeditem = commonfunctionjs.filterobjectbyid(window.fireobject, id);
        let selecteditemincart = 0;
        $.map(Object.values(window.cartproduct), function (obj, index) {
            if (obj[0] != undefined && obj[0].id === id) {
                selecteditemincart = 1;
            }
            return obj[0] != undefined && obj[0].id === id ? obj[0].quantity = (obj[0].quantity + 1) : obj[0].quantity;
        });
        const mycarteitemlength = $(cssclassname.mycartquantity).find(cssclassname.mycartquantityitem).length;
        if (mycarteitemlength <= 0) {
            $(cssclassname.mycartquantity).html(commonfunctionjs.bindselectediteminmycart(clickeditem));
        } else {
            if (!selecteditemincart) {
                $(cssclassname.mycartquantity).append(commonfunctionjs.bindselectediteminmycart(clickeditem));
            } else {
                const currentquty = commonfunctionjs.getitemquantity(window.cartproduct, id);
                const itemprice = commonfunctionjs.getitemprice(window.cartproduct, id);

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