//global variables
let jsonData = "";
let productAPIServer = "https://api.myjson.com/bins/6jyje";
let currencySymbol = "₹";

const addToCart = (product) => {
    if (localStorage) {
        let cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');
        let result = $(cart.products).filter(function (i, n) {
            return n.id === product.id
        });

        if(result.length <= 0)
            cart.products.push(product);
        else {
            result[0].quantity = Number(result[0].quantity) + Number(product.quantity);
            alert(result[0].quantity);
            result[0].total = percentCalculation(result[0].price * result[0].quantity, result[0].vat); //*((result[0].val/100)+1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.assign("cart.html");
    }
}

const percentCalculation = (price, percentage) => {
    return (price + (price * percentage / 100)).toFixed(2);
}

const CartTotal = () => {
    if (localStorage) {
        let cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');
        let total = 0;

        $.each(cart.products, function (index, value) {
            total = total + Number(value.total);
        });
        return total;
    }
}


$(document).on("click", ".cart-product__button-update", function (e) {
    let row = $(this).parent().parent();
    let qty = $(row).find('input[type=text]').val();
    let Price = row.data('price');
    let vat = row.data('vat');
    let productID = row.data('id');
    if (localStorage) {
        let cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');

        $.each(cart.products, function (index, value) {
            if (value != null && typeof value.id != 'undefined' && value.id === productID) {
                value.quantity = qty;
                value.total = percentCalculation(Number(Price) * Number(qty), Number(vat));
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        BindCart('#tpl-cart', '.cart-list');
    }

});

var BindSearch = (data, tplId, anchor) => {
    data = ConvertForSearch(data);
    $(".accordion").html("");
    var template = $(tplId).html();
    var stone = Handlebars.compile(template)(data);
    $(anchor).append(stone);
    $(".accordion").accordion();
}

var BindCart = (tplId, anchor) => {
    if (localStorage) {
        var cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');
        var template = $(tplId).html();
        var stone = Handlebars.compile(template)(cart);
        $(anchor).html("");
        $(anchor).append(stone);
        $("#grand-total").text(currencySymbol + CartTotal());
    }
}

const ConvertToList = (data) => {
    let cats = [];
    let fdata = {
        list: {}
    };

    for (var i = 0; i < data.Products.length; i++) {
        let a = data.Products[i];
        let cat = a.Category;
        if (typeof fdata['list'][cat] === 'undefined') {
            fdata['list'][cat] = [];
        }
        fdata['list'][cat].push(a);
    }
    return fdata;
}




$(document).on("click", ".product__btn", function (e) {
    var li = $(this).parent();
    var strID = li.data('id');
    var strName = li.data('name');
    var strPrice = li.data('price');
    var strCategory = li.data('category');
    var quantity = $(li).find('input[type=text]').val();
    var product = {};
    product.id = strID;
    product.name = strName;
    product.price = strPrice;
    product.quantity = quantity;
    product.vat = (strCategory.toLowerCase() == "snacks") ? 12 : 5;
    product.total = percentCalculation(Number(strPrice) * Number(quantity), Number(product.vat));
    addToCart(product);
});

$(document).on("click", ".cart-product__btn", function (e) {
    var li = $(this).parent().parent();
    var productID = li.data('id');

    if (localStorage) {
        var cart = JSON.parse(localStorage.getItem('cart') || '{"products": []}');

        $.each(cart.products, function (index, value) {

            if (value != null && typeof value.id != 'undefined' && value.id === productID) {
                delete cart.products[index];
                cart.products.splice(index, 1);
            }

        });
        localStorage.setItem('cart', JSON.stringify(cart));
        BindCart('#tpl-cart', '.cart-list');
    }
});


$("#btn_clear").on("click",()=> {
    $("#search").val("");
    $(".accordion").html("");
    BindSearch(jsonData.Products, '#tpl', '.accordion');
    $('input[type=radio]').prop('checked', function () {
        return this.getAttribute('checked') == 'checked';
    });
});

$("#btn_search").on("click", () =>{
    var radioValue = $("input[type=radio]:checked").val();
    var searchText = $("#search").val();
    /*if (searchText == "") {
        alert("Please enter search keyword.");
        return;
    } */
    var result = $(jsonData.Products).filter((i, n) => {
        if (radioValue != 'All')
            return (n.Name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) && (n.Category.toLowerCase() == radioValue.toLowerCase())
        else
            return n.Name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0

    });
    BindSearch(result, '#tpl', '.accordion');
});



$(document).on("click", ".plus-minus", function () {
    var $button = $(this);
    var $input = $button.closest('.sp-quantity').find("input.quntity-input");
    $input.val(
        function (i, value) {
            var multiplier = $button.data('multi');
            if (value == 1 && multiplier < 0)
                multiplier = 0;
            if (value > 1 || (+value + (1 * +multiplier > 1)))
                return +value + (1 * +multiplier);
            else
                return 1;

        });
});




$(document).ready(()=> {
    var BindAccordian = (url, tplId, anchor) => {
        $.getJSON(url, (data) =>{
            jsonData = data;
            data = ConvertToList(data);
            let template = $(tplId).html();
            let stone = Handlebars.compile(template)(data);
            $(anchor).append(stone);
            $(".accordion").accordion();
        });
    }


    if ($(".accordion").length) {
        BindAccordian(productAPIServer, '#tpl', '.accordion');
    }

    if ($(".cart-list").length) {

        BindCart('#tpl-cart', '.cart-list');
    }

});

const ConvertForSearch = (data) => {
    let cats = [];
    let fdata = {
        list: {}
    };

    for (var i = 0; i < data.length; i++) {
        let a = data[i];
        let cat = a.Category;
        if (typeof fdata['list'][cat] === 'undefined') {
            fdata['list'][cat] = [];
        }
        fdata['list'][cat].push(a);
    }
    return fdata;
}


const myFunction = () => {
    let x = $("#myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}