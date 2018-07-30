var selected_index = -1; //Index of the selected list item 
var contextCart = [];
let TotalAmount = 0;
 debugger;
contextCart = localStorage.getItem('cartItems');
contextCart = JSON.stringify(contextCart);
contextCart = JSON.parse(contextCart);
var shoppintCart = JSON.parse(contextCart);
isCartEmpty(shoppintCart)
for (var i in shoppintCart) {
    debugger;
    var data = JSON.parse(shoppintCart[i]);
    TotalAmount += parseInt(data.foodOfferPrice.substring(2, data.foodOfferPrice.length)) * parseInt(data.quantity);
    createMarkup(data, i);
}
localStorage.setItem('TotalAmount', JSON.stringify(TotalAmount));
updateSubtotalPrice();
function createMarkup(data, i) {
    $("#test").append(
        "<div class='card card-desktop'>" +
        "<div class='col-1-of-4or1'>" + "<img class='cart-image' src=" + data.foodImage + ">" + "</div>" +
        "<div class='col-1-of-4or'>" +
        "<div class='product-cart-image'>" + data.foodName + "</div>" + "<div class='col-1-of-4or product-cart-image' id='" + "u" + data.cartID + "'>" + "<input min='1' max='5' type='number' id='" + i + "' class='quantity-textbox' name='quantity' value='" + data.quantity + "'>" + "</div>" + "</div>" +

        "<div class='col-1-of-4or product-cart-image'>" + "₹ " + parseInt(data.foodOfferPrice.substring(2, data.foodOfferPrice.length)) * parseInt(data.quantity) + "</div>" + "<div class='product-cart-imageRemove' id='" + data.cartID + "'>" + "<button class='add-cart-remove'>Remove</button>" + "</div>" + "</div>");
}



//selected_index = parseInt($(this).attr("id"));
$(document).on("click", '.add-cart-remove', Delete);

function Delete(e) {
    debugger;
    TotalAmount = 0;
    const shoppintCart = JSON.parse(localStorage.getItem('cartItems'));
     const tmp=[];
     for (var i in shoppintCart) {
        var data = JSON.parse(shoppintCart[i]);
        if (data.cartID != e.target.parentElement.id) {
            var ax = JSON.stringify(data);
            tmp.push(ax);
        } 
    }

    localStorage.setItem('cartItems', JSON.stringify(tmp));
    let newshoppintCart = localStorage.getItem('cartItems');
    newshoppintCart = JSON.parse(newshoppintCart);
    $("#cartItem").text(" " + "(" + newshoppintCart.length + "  " + "Items" + ")");
    $("#test").html('');
    for (var i in newshoppintCart) {
        var data = JSON.parse(newshoppintCart[i]);
        TotalAmount += parseInt(data.foodOfferPrice.substring(2, data.foodOfferPrice.length)) * parseInt(data.quantity);
        createMarkup(data, i);
    }
    localStorage.setItem('TotalAmount', JSON.stringify(TotalAmount));
    isCartEmpty(newshoppintCart);
    updateSubtotalPrice();
}



function isCartEmpty(cart) {

    if (cart != null) {
        if (cart.length == 0) {
            $('#Place-Order').hide();

            $("#test").append(
                "<div class='card card-desktop'>" + "<img class='emptycart-image' src='Images/emptyCart.PNG'>" +
                "</div>");
        }
    } else if (cart == null) {
        $('#Place-Order').hide();
        $("#test").append(
            "<div class='card card-desktop'>" + "<img class='emptycart-image' src='Images/emptyCart.PNG'>" +
            "</div>");

    }

}
$(document).on("change", '.quantity-textbox', UpdateQuantity);

function UpdateQuantity(e) {
    TotalAmount = 0;
    const updatecart = JSON.parse(localStorage.getItem('cartItems'));
    var id = parseInt($(this).attr("id"));
    var updateid = e.target.parentElement.id.substring(1, e.target.parentElement.id.length);
    const updateQuantity = [];
    for (var i in updatecart) {
        var data = JSON.parse(updatecart[i]);

        if (data.cartID == updateid) {
            data['quantity'] = e.target.value;
            var ax = JSON.stringify(data);
            updateQuantity.push(ax);
        } else {
            var withoutupdate = JSON.stringify(data);
            updateQuantity.push(withoutupdate);
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(updateQuantity));
    let newupdateshoppintCart = localStorage.getItem('cartItems');
    newupdateshoppintCart = JSON.parse(newupdateshoppintCart);
    $("#test").html('');
    for (var i in newupdateshoppintCart) {
        var data = JSON.parse(newupdateshoppintCart[i]);
        TotalAmount += parseInt(data.foodOfferPrice.substring(2, data.foodOfferPrice.length)) * parseInt(data.quantity);
        createMarkup(data, i);
    }
    localStorage.setItem('TotalAmount', JSON.stringify(TotalAmount));

    updateSubtotalPrice();

}

function updateSubtotalPrice() {
    if (localStorage.getItem('TotalAmount') != null) {
        $('#SubtotalPrice').html("");
        $('#SubtotalPrice').html("₹ " + localStorage.getItem('TotalAmount'));
    }
}
