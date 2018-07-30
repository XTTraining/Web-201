var cartItems = [];
var tbClients = [];
//Code for tab functionality
//localStorage.removeItem("cartItems");
$(document).ready(function () {


    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
    $(".add-cart").click(function () {
        var id = $(this).attr("id");
        Add(id);
    });
    BindData();
})




function Add(id) {
    var foodImage = "#foodImage" + id;
    var foodName = "#foodName" + id;
    var foodPrice = "#foodPrice" + id;
    var foodOfferPrice = "#foodOfferPrice" + id;
    var productID = id;
    var quantity = "#quantity" + id;
    var cart = JSON.stringify({
        foodImage: $(foodImage).attr('src'),
        foodName: $(foodName).text(),
        foodPrice: $(foodPrice).text(),
        foodOfferPrice: $(foodOfferPrice).text(),
        productID: productID,
        cartID: Math.random() * 1000000,
        quantity: $(quantity).val()
    });
    cartItems.push(cart);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    cartItems = JSON.parse(localStorage.getItem("cartItems"));

    BindData();
}

function BindData() {
    // debugger;
    tbClients = localStorage.getItem("cartItems"); //Retrieve the stored data 
    tbClients = JSON.parse(tbClients); //Converts string to object 
    $("#cartItem").text(" " + "(" + tbClients.length + "  " + "Items" + ")");
}


Handlebars.registerHelper('if-equals', function (listItem, categoryID, options) {
    if (listItem.categoryID === categoryID) {
        return options.fn(this);
    }
});

var context = {
    list: [{
            categoryID: '1',
            productID: '1',
            foodImage: 'Images/FoodImages/GobiMethi.JPG',
            foodName: 'Gobi Methi Paranthas',
            foodPrice: '110',
            foodOfferPrice: '100'
                },
        {
            categoryID: '1',
            productID: '2',
            foodImage: 'Images/FoodImages/12.JPG',
            foodName: 'Raisin Pop',
            foodPrice: '120',
            foodOfferPrice: '110'
                },
        {
            categoryID: '1',
            productID: '3',
            foodImage: 'Images/FoodImages/13.JPG',
            foodName: 'Honey-Banana',
            foodPrice: '130',
            foodOfferPrice: '120'
                },
        {
            categoryID: '1',
            productID: '4',
            foodImage: 'Images/FoodImages/14.JPG',
            foodName: 'Fruit Pop Oatmeal',
            foodPrice: '140',
            foodOfferPrice: '125'
                },
        {
            categoryID: '1',
            productID: '5',
            foodImage: 'Images/FoodImages/15.JPG',
            foodName: 'Nutty Dates',
            foodPrice: '150',
            foodOfferPrice: '130'
                },
        {
            categoryID: '1',
            productID: '6',
            foodImage: 'Images/FoodImages/16.JPG',
            foodName: 'Peanut Butter',
            foodPrice: '160',
            foodOfferPrice: '140'
                },
        {
            categoryID: '2',
            productID: '7',
            foodImage: 'Images/FoodImages/21.JPG',
            foodName: 'Punjabi Dal Tadka',
            foodPrice: '180',
            foodOfferPrice: '150'
                },
        {
            categoryID: '2',
            productID: '8',
            foodImage: 'Images/FoodImages/22.JPG',
            foodName: 'Chef Special Veg',
            foodPrice: '185',
            foodOfferPrice: '155'
                },
        {
            categoryID: '3',
            productID: '9',
            foodImage: 'Images/FoodImages/31.JPG',
            foodName: 'Paneer Soy',
            foodPrice: '180',
            foodOfferPrice: '160'
                },
        {
            categoryID: '3',
            productID: '10',
            foodImage: 'Images/FoodImages/32.JPG',
            foodName: 'Superfood Trail Mix',
            foodPrice: '100',
            foodOfferPrice: '89'
                },
        {
            categoryID: '3',
            productID: '11',
            foodImage: 'Images/FoodImages/33.JPG',
            foodName: 'Signature Fruit Bowl',
            foodPrice: '120',
            foodOfferPrice: '69'
                },
        {
            categoryID: '4',
            productID: '12',
            foodImage: 'Images/FoodImages/41.JPG',
            foodName: 'Ricotta Black Rice',
            foodPrice: '270',
            foodOfferPrice: '250'
                }
            ]
};
if (window.location.pathname == "/index.html" || window.location.pathname == "/") {

    var source = document.getElementById("entry-BreakfastTemplate").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(context);
    var div = document.createElement(div);
    div.innerHTML = html;
    document.getElementById("breakfast").appendChild(div);

    var source1 = document.getElementById("entry-LunchTemplate").innerHTML;
    var template1 = Handlebars.compile(source1);
    var html1 = template1(context);
    var lunch = document.createElement(lunch);
    lunch.innerHTML = html1;
    document.getElementById("lunch").appendChild(lunch);

    var source2 = document.getElementById("entry-SnacksTemplate").innerHTML;
    var template2 = Handlebars.compile(source2);
    var html2 = template2(context);
    var snacks = document.createElement(snacks);
    snacks.innerHTML = html2;
    document.getElementById("snacks").appendChild(snacks);


    var source3 = document.getElementById("entry-DinnerTemplate").innerHTML;
    var template3 = Handlebars.compile(source3);
    var html3 = template3(context);
    var dinner = document.createElement(dinner);
    dinner.innerHTML = html3;
    document.getElementById("dinner").appendChild(dinner);
}