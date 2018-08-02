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
var cartItemsRef = dbRef.ref('cartItems');

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

    if ( ($("body").hasClass("gallery-body")) || ($("body").hasClass("offers-body")) ) {
        //Do nothing
    } else {
    
        //Build Featured Dishes
        var srcFeatured = document.getElementById("featured-dish-entry-template").innerHTML;
        var templateFeatured = Handlebars.compile(srcFeatured);

        //Build Menu
        var srcMenu = document.getElementById("menu-entry-template").innerHTML;
        var templateMenu = Handlebars.compile(srcMenu);

        //Build Dish of the month
        var srcMonthlyDish = document.getElementById("month-dish-entry-template").innerHTML;
        var templateDish = Handlebars.compile(srcMonthlyDish);

    }
    
    myFirebase.once("value")
        .then((snapshot) =>{
            $(".header").html(templateHeader(snapshot.val()));
            $(".footer").html(templateFooter(snapshot.val()));

            //update count 
            updateItemsCount();      

            if ( ($("body").hasClass("gallery-body")) || ($("body").hasClass("offers-body")) ) {
                //Do nothing
            } else {
                //Bind featured Dishes
                var htmlFeatured = templateFeatured(snapshot.val());
                $('.featuredDishes').html(htmlFeatured);

                //Bind Menu
                var htmlMenu = templateMenu(snapshot.val());
                $('#accordionDiv').html(htmlMenu);

                //Bind Dish of month
                var htmlMonthlyDish = templateDish(snapshot.val());
                $('.featured__dish').html(htmlMonthlyDish);
            }
        });


    /* Bind Actions */
    $(".accordion").on("click", ".food__item .btn-text", function (e) {
        e.preventDefault();
        var productRow = $(this).parent().parent();

        var itemName = productRow.children('.food__content').children('.heading-5').text();
        var price = parseFloat(productRow.children('.food__content').children().children().children('.price').text());
        var tax = parseFloat(productRow.children('.food__content').children('#hdntax').val());
        var smallImage = productRow.children('.food-img').children('.food-img img').attr('src');
        var id = productRow.attr('id');

        addToCart(id, itemName, price, smallImage, tax);
    });

    $(".features-product").on("click", ".featuredDish button", function (e) {
        // event.preventDefault();

        e.preventDefault();
        var productRow = $(this).parent();
        // console.log(productRow);
        var itemName = productRow.children('.featuredDish__name').text();
        var price = parseFloat(productRow.children('.featuredDish__price').children('.price').text());
        var tax = parseFloat(productRow.children('#hdntax').val());
        var smallImage = productRow.children('.featuredDish img').attr('src');
        var id = productRow.attr('id');

        addToCart(id, itemName, price, smallImage, tax);
        //console.log(id + itemName + price + tax + smallImage);
    });


}); // end of document ready


function addToCart(cid, name, price, imageUrl, tax) {

    cartItemsRef.orderByChild("id").equalTo(cid).once('value', (snapshot) => {
        //console.log(snapshot);
        console.log(snapshot.val());

        if (snapshot.exists()) {
            var qty;
            $.each(snapshot.val(), function (key, element) {
                $.each(this, (name, value) => {
                    if (name == 'quantity') {
                        return qty = value + 1;
                    }
                });
            });

            // get the ref (in this case /cartItems/2) and update its contents
            myFirebase.child('cartItems/' + cid).set({
                "id": cid,
                "name": name,
                "small-image": imageUrl,
                "price": price,
                "tax": tax,
                "quantity": qty,
                "itemTotal": calculateItemTotal(price * qty, tax)
            }, function (error) {
                if (error) {
                    alert('errored');
                } else {
                    alert('Item updated successfully!');
                }
            });

        } else {

            myFirebase.child('cartItems/' + cid).set({
                "id": cid,
                "name": name,
                "small-image": imageUrl,
                "price": price,
                "tax": tax,
                "quantity": 1,
                "itemTotal": calculateItemTotal(price, tax, 1)
            }, function (error) {
                if (error) {
                    alert('errored');
                } else {
                    alert('Item added successfully!');
                }
            });
        }
        // var exists = (snapshot.val() !== null);
        //  alert(exists);
    }).then(() => {
        var divid = '#btn-' + cid;
        $("#btn-" + cid).html("Added");
        $("#btn-" + cid).addClass('not-active');
        $("#btn-" + cid).removeClass('btn--green');

        updateItemsCount();
    });

};

function calculateItemTotal(price, tax) {
    var taxAmt = price * tax / 100;
    var grossPrice = parseFloat(price) + parseFloat(taxAmt);
    return grossPrice;
};

function updateItemsCount() {
    cartItemsRef.on('value', (snapshot) => {
        var totalCount = 0;
        $.each(snapshot.val(), function (key, element) {

            $.each(this, (name, value) => {
                if (name == 'quantity') {
                    return totalCount += parseInt(value);
                }
            });
        });

        $('.header__cart__logo #cart__count').html(totalCount);
        $('.navigation__item #cart__count_mobile').html(totalCount);
    });
}