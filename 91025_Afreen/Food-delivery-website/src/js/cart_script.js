var config = {
    apiKey: "AIzaSyDMRUCaQJSRKjoIQHD1-gAhxcaI2GpdIBM",
    authDomain: "spice-house-20180.firebaseapp.com",
    databaseURL: "https://spice-house-20180.firebaseio.com",
    projectId: "spice-house-20180",
    storageBucket: "spice-house-20180.appspot.com",
    messagingSenderId: "1641703789"
};

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to your entire Firebase database
var dbRef = firebase.database();
var myFirebase = dbRef.ref();
var myCartFirebase = dbRef.ref("cartItems");

Handlebars.registerHelper('if-equals', function (listItem, type, options) {
    if (listItem.navtype.includes(type)) {
        return options.fn(this);
    }
});

$(document).ready(function () {
    
    $.ajax("./src/views/header.html").done(function (headerPartialDetails) {
        $(".container").append(headerPartialDetails);
        Handlebars.registerPartial("HeaderPartial", $("#header-partial-template").html());
        Handlebars.registerPartial("FooterPartial", $("#footer-partial-template").html());
    });

    //Header
    var templateHeader = Handlebars.compile(document.getElementById("header-render-template").innerHTML);
    //footer
    var templateFooter = Handlebars.compile(document.getElementById("footer-render-template").innerHTML);

    myFirebase.once("value")
        .then((snapshot) =>{
            $(".header").html(templateHeader(snapshot.val()));
            $(".footer").html(templateFooter(snapshot.val()));
        });        

    //Build Cart
    var srcCart = document.getElementById("cart-entry-template").innerHTML;
    var templateCart = Handlebars.compile(srcCart);

    myCartFirebase.once("value")
        .then((childSnapshot) => {      
            //Bind Cart
            var htmlCart = templateCart(childSnapshot.val());
            $('.cart__items').html(htmlCart);
        })
        .then(() => {
            // console.log('hello');
            recalculateCart();
            updateSumItems();
        });

    /* Bind Actions */
    // Update quantity   
    $(".cart__items").on("change", ".cart__item__quantity input", function (e) {
        updateQuantity(this);
    });

    // Remove item
    $(".cart__items").on("click", ".remove button", function (e) {
        //console.log("remove button clicked");
        removeItem(this);
    });

    //Promotion code applied
    $(".cart-module").on("click", ".promo-code-cta", function (e) {        
        var promoCode = $("#promo-code").val();
        validatePromo(promoCode);
    });

    $(".summary").on("click","#btnCheckout", function(e) {
        event.preventDefault(); 
        window.location.href = '/confirmation.html';
        return false;
    });

    $(".summary").on("click","#btnCheckout1", function(e) {
        event.preventDefault(); 
        window.location.href = '/confirmation.html';
        return false;
    });
    //});


}); // end of document

var validationMessages = {
    invalidCoupon: 'The promotion code %promocode% is invalid. Please enter valid promotion code!!!',
    emptyCoupon: 'Please enter valid promotion code!!',
    minimumOrder: 'Order must be more than $100 for Promo code to apply.'
}

function validatePromo(promoCode) {
    if (promoCode == '') {
        $(".validationMessage").text(validationMessages.emptyCoupon).css('color', 'red');

    } else {

        var value;
        var offers = dbRef.ref("offers");
        //console.log(offers);
        offers.on("value")
            .then((childSnapshot) => {
                childSnapshot.val().forEach((data) => {
                    if (data.code.toUpperCase() == promoCode.toUpperCase()) {
                        //console.log(data.code + ' ' + data.cdvalue);
                        value = data.cdvalue;
                        return;
                    }
                });
            })
            .then(() => {
                if (value == undefined || value == '' || value == null) {
                    $(".validationMessage").text(validationMessages.invalidCoupon.replace('%promocode%', promoCode.toUpperCase())).css('color', 'red');
                }
                else {
                    $(".validationMessage").text('');
                    var subtotal = $('.subtotal_amount').text();

                    if (subtotal < 100) {
                        $(".validationMessage").text(validationMessages.minimumOrder).css('color','red');

                    } else {
                        $(".validationMessage").text('');
                        recalculateCart(true,value);                                          
                    }
                }
                console.log("cdValue: " + value);
            });
    }
}

function updateSumItems() {
    var sumItems = 0;
    //console.log('inside upadte sum items')
    $('.cart__item__quantity input').each(function () {
        //console.log($(this).val());
        sumItems += parseInt($(this).val());
    });

    $('.total-items').text(sumItems);
    $('.header__cart__logo #cart__count').html(sumItems);
    $('.navigation__item #cart__count_mobile').html(sumItems);
}

var fadeTime = 300;

function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.cart__item__description').children().children('.price').text());
    var tax = parseFloat(productRow.children('.cart__item__description').children().children('.tax').text());
    //var imageUrl=productRow.children('.cart__item__image img').text();
    var quantity = $(quantityInput).val();
    // console.log('price: '+ price);
    // console.log('tax: '+ tax);
    var linePrice = calculateItemTotal(price * quantity, tax);

    /* Update line price display and recalc cart totals */
    productRow.children('.total-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice);
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });

    updateSumItems();

    /* Update firebase server */
    var imageUrl=productRow.children('.cart__item__image').children('.cart__item__image img').attr('src');
    var name = productRow.children('.cart__item__description').children('.name').text();
    var cid = productRow.attr('id');
    //console.log(imageUrl + cid + name + price + tax + quantity + linePrice);
    
    //get the ref (in this case /cartItems/2) and update its contents
    myFirebase.child('cartItems/' + cid).set({
        "id": cid,
        "name": name,
        "small-image": imageUrl,
        "price": price,
        "tax": tax,
        "quantity": quantity,
        "itemTotal": linePrice // calculateItemTotal(price * qty, tax)
    }, function (error) {
        if (error) {
            console.log('errored');
        } else {
            console.log('Item updated successfully!');
        }
    });
}

function calculateItemTotal(price, tax) {
    var taxAmt = price * tax / 100;
    var grossPrice = parseFloat(price) + parseFloat(taxAmt);
    //console.log (taxAmt + '  '+ grossPrice);
    return grossPrice.toFixed(2);
};

function recalculateCart(onlyTotal, promoValue) {
    var subtotal = 0;

    // Sum up row totals
    $('.cart__item').each(function () {
        subtotal += parseFloat($(this).children('.total-price').text());
    });

    //Calculate totals
    var total = subtotal;

    /*If switch for update only total, update only total display*/
    if (onlyTotal) {
        
        var promocode= $("#promo-code").val();
        //If promotion code is applied
        total = calculatePromo(subtotal,promoValue);

        /* Update total display */
        $('.final_amount').fadeOut(fadeTime, function () {
            $(".code").html(promocode);
            $('.final_amount').html(total.toFixed(2));
            $('.final_amount').fadeIn(fadeTime);
        });
    } else {
        //Clear promo code 
        $(".code").text("none");
        $(".promo_amount").text("0");

        /* Update summary display. */
        $('.final_amount').fadeOut(fadeTime, function() {
            $('.subtotal_amount').html(subtotal.toFixed(2));
            $('.final_amount').html(total.toFixed(2));
            if (total == 0 || total==undefined || total ==NaN) {
                $('.cart_btn').fadeOut(fadeTime);
            } else {
                $('.cart_btn').fadeIn(fadeTime);
            }
            $('.final_amount').fadeIn(fadeTime);
        });
    }
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
        updateSumItems();
    });

    //Remove item from firebase
    var cid= productRow.attr('id');
    //console.log(cid);
    myFirebase.child('cartItems/' + cid).remove();
}

function calculatePromo(subTotal,value) {
   // console.log(value);
    var discountedAmount=0;
    // if discount is percantage else number
    if ((value.indexOf('%')) > -1) {        
        //console.log(value);
        discountedAmount = (parseInt(value) / 100) * subTotal;
        //discountedAmount = discountedAmount.toFixed(2);
    } else {        
        discountedAmount = parseInt(value).toFixed(2);
    }
    var amount = subTotal - discountedAmount;
    $(".promo_amount").text(discountedAmount);

    return amount;
}