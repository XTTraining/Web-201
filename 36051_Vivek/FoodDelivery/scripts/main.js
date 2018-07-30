//accordian
var FoodItemsObj;
$(document).ready(function () {


    //Accordion functionality
    function BindAccordionEvents() {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                panel.style.maxHeight = "1px;"
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }
    BindAccordionEvents();
    //Increase/Decrease Quantity
    function bindQuantityChangeEvent() {
        $(".button").on("click", function () {

            var $button = $(this);
            var oldValue = $button.parent().find("input").val();

            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }

            $button.parent().find("input").val(newVal);
            //update the JSON object with new product quantity

            
            var prodId = $button.parent().attr("data-product");
            var catId = $button.parent().attr("data-category");
            for (var i = 0; i < FoodItemsObj.categories.length; i++) {
                if (FoodItemsObj.categories[i].category_name == catId) {
                    FoodItemsObj.categories[i].products.filter(a => a.id.toLowerCase().indexOf(prodId) != -1)[0].quantity = newVal;
                }
            }
            console.log(FoodItemsObj);
        });
    }
    bindQuantityChangeEvent();
    $("#btnsearch").on("click", function () {
        var selectedCategories = [];
        $('#filterdata input:checked').each(function () {
            selectedCategories.push($(this).attr('value'));
        });
        var textToSearch = $(".search_input").val();
        var filterdobject = JSON.parse(JSON.stringify(FoodItemsObj));

        if (textToSearch) {
            for (var i = 0; i < filterdobject.categories.length; i++) {
                filterdobject.categories[i].products = filterdobject.categories[i].products.filter(a => a.name.toLowerCase().indexOf(textToSearch) != -1);
            }
        }

        filterdobject.categories = filterdobject.categories.filter(a => selectedCategories.indexOf(a.category_name) > -1);
        document.getElementById("productData").innerHTML = template(filterdobject);
        BindAccordionEvents();
        bindQuantityChangeEvent();
    });

    $("#btncheckout").on("click", function () {

        localStorage.setItem("cart", FoodItemsObj);
        location.href="OrderList.html"
    });

});