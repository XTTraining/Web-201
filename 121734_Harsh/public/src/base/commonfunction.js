import * as variable from "../base/variable.js";

const cssclassname = new variable.cssclassname().getcssclassname();
const constantstring = new variable.constantstring().getconstantstring();

export function getitemquantity(itemlist, itemid) {
    return $.map(Object.values(itemlist), function (obj, index) {
        return obj[0] != undefined && obj[0].id === itemid ? obj[0].quantity : undefined;
    });
}

export function getitemprice(itemlist, itemid) {
    return $.map(Object.values(itemlist), function (obj, index) {
        return obj[0] != undefined && obj[0].id === itemid ? obj[0].discountprice : undefined;
    });
}

export function bindaccordion(jsondata) {
    let groupeddata = groupingdata(jsondata);
    let accordionhtml = renderaccordionhtml(groupeddata);
    return accordionhtml;
}

export function filterobjectbyid(objectvalue, id) {
    return Object.values(objectvalue).filter(function (keyvalue) {
        return keyvalue.id === id
    });
}

// function to filter value based on input on category and product title
export function filterobjectbycategoryandtitle(unfilterdata, filterstring) {
    var filteredArray = Object.values(unfilterdata).filter(function (key) {
        return key == filterstring || key.filter(function (keyvalue) {
            return keyvalue.title = filterstring;
        });
    });
}

// Function to get json array object and return array based on grouped category
export function groupingdata(jsonData) {
    let groupedBycategory = [];
    for (let key in jsonData) {
        var category = jsonData[key].category;
        if (!groupedBycategory[category]) {
            groupedBycategory[category] = [];
        }
        groupedBycategory[category].push(jsonData[key]);
    }
    return groupedBycategory;
}

export function renderaccordionhtml(menu) {
    var html = '';
    for (let key in menu) {
        html += `<div class="accordion-container"> <div class="restaurant-accordion-title">${key}</div>`;
        for (let a = 0; a < menu[key].length; a++) {
            html += `<div class="restaurant-accordion-description">
           <div class="restaurant-accordion-left">
           <img class="slideshow-container-foodimage" alt="${menu[key][a].title}" src="img/Panner_tikka.jpg">
            </div><div class="restaurant-accordion-right"><div class="item-title">
            <p> ${menu[key][a].title} </p>`;
            if (menu[key][a].subcategory == 'veg') {
                html += '<span class = "veg"> </span>';
            } else {
                html += '<span class = "non-veg"> </span>';
            }
            html += `</div><p> ${menu[key][a].description}</p><div class="accordion-action">
            <p>₹ ${menu[key][a].discountprice}</p><a title="${menu[key][a].title} add-to-cart" class="add-to-cart" id='${menu[key][a].id}' href="#">Add to cart</a></div></div></div>`;
        }
        html += `</div>`;
    }
    return html;
}

export function bindhomepagecartitem(obj) {
    var html = '';
    for (let key in obj) {
        for (let a = 0; a < obj[key].length; a++) {
            if (obj[key][a].quantity > 0) {
                let totalprice = obj[key][a].discountprice * obj[key][a].quantity;
                html += `<div class="mycart-quantity-item" Id="${obj[key][a].id}" ><div class="mycart-quantity-item-detail">
    <h3>${obj[key][a].title}</h4><span class="mycart-quantity-item-delete">X </span></div>
    <div class="mycart-quantity-item-total"><div class="mycart-quantity-item-selction">
    <a title="remove ${obj[key][a].title}" class="mycart-quantity-item-remove" >-</a><a title="total ${obj[key][a].title}" class="mycart-quantity-item-selected">${obj[key][a].quantity}</a>
    <a title="add ${obj[key][a].title}" class="mycart-quantity-item-add">+</a></div>
    <span class="mycart-quantity-item-price">₹ ${totalprice}</span></div></div>`;
            }
        }
    }
    return html;
}

export function calculategstprice(price, precntage) {
    return ((price * precntage) / 100)
}

// Method to set local storeage
export function setlocalStorage(storagevalue) {
    if (typeof (Storage) !== constantstring.undefined) {
        // Append local Store
        localStorage.setItem(constantstring.selecteditem, JSON.stringify(storagevalue));
    }
}

export function createaccordion(accordionvalue) {
    $(cssclassname.restaurantaccordion).html(bindaccordion(accordionvalue));
    $(cssclassname.restaurantaccordiontitle).click(function (accordionevent) {
        accordionevent.preventDefault();
        var $this = $(this);

        if ($this.parent().find(cssclassname.restaurantaccordiondescription).hasClass(cssclassname.show)) {
            $this.parent().find(cssclassname.restaurantaccordiondescription).each(function () {
                $(this).removeClass(cssclassname.show);
                $this.parent().find(cssclassname.restaurantaccordiontitle).removeClass(cssclassname.accordionactive);
            });
        } else {
            $this.parent().find(cssclassname.restaurantaccordiondescription).each(function () {
                $(this).addClass(cssclassname.show);
                $this.parent().find(cssclassname.restaurantaccordiontitle).addClass(cssclassname.accordionactive);
            });
        }
    });
}

export function getfilteritem(menu, selectedvalue) {
    let arr = [];
    for (var key in menu) {
        if (menu[key].category === selectedvalue) {
            arr.push(menu[key]);
        }
    }
    return arr;
}

export function bindselectediteminmycart(obj) {
    let title = obj[0].title;
    return `<div class="mycart-quantity-item" Id="${obj[0].id}" ><div class="mycart-quantity-item-detail">
      <h3>${title}</h4><span class="mycart-quantity-item-delete">X </span></div>
    <div class="mycart-quantity-item-total"><div class="mycart-quantity-item-selction">
    <a title="remove ${title}"  class="mycart-quantity-item-remove" >-</a><a title="total ${title}" class="mycart-quantity-item-selected">1</a>
    <a title="add ${title}" class="mycart-quantity-item-add">+</a></div>
    <span class="mycart-quantity-item-price">₹ ${obj[0].discountprice}</span></div></div>`;
}