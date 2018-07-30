import { elements } from './base';

export const renderProducts = (productList, categoryList, cartList) => {
    elements.productList.html("");
    categoryList.forEach(function (item) {
        const catId = item.Id;
        const catName = item.Name;

        const filteredList = productList.filter(function (item) {
            return item.CatId == catId;
        });
        renderProductsByCategory(filteredList, catName, catId, cartList);
    });
    elements.productList.focus();
};

export const filterProducts = (elemId, productList) => {
    productList.filter(function (item) {
        return elemId;
    });
};

const renderProductsByCategory = (productList, categoryName, catId, cartList) => {
    if (productList != null && productList.length > 0 && categoryName != null) {
        const markup = `<div id="divCatId-${catId}" class="categories-items">
        <div class="categories-items__name">
        <h2 class="heading-secondary">${categoryName}</h2>
        </div>
        ${foodItems(productList, cartList)}
        </div>`;

        elements.productList.append(markup);
    }
};

const foodItems = (itemsList, cartList) => {
    let productHTML = "";
    itemsList.forEach(function (item) {
        const markup = `<div id="${item.ID}" class="categories-items__item">
        <div class="categories-items__item-container">
            <img src="${item.Image}" alt="${item.Name}" class="categories-items__item--image">
        </div>
        <div class="categories-items__details">
            <h3 class="categories-items__details--heading">${item.Name}</h3>
            <span class="categories-items__details--type">${item.Description}</span>
        </div>
        <div class="categories-items__price">
            <span class="categories-items__price--text">${item.Price}</span>
        </div>
        <div class="categories-items__quantity">
         ${selectedQuantity(item.ID, cartList)}
        </div>
    </div>`;
        productHTML = `${productHTML} ${markup}`;
    });
    return productHTML;
};

const selectedQuantity = (itemId, cartList) => {
    let markup;

    markup = `<div class="btn-quantity">
            <div class="btn-quantity__add" role="button" tabindex="0">ADD</div>
            <div class="btn-quantity__minus hide" role="button" tabindex="0"></div>
            <div class="btn-quantity__value hide" tabindex="0">1</div>
            <div class="btn-quantity__plus hide" role="button" tabindex="0">+</div>
            </div>`;

    const item = cartList.find(function (el) {
        return el.Id == itemId;
    });

    if (item && item.quantity > 0) {
        markup = `<div class="btn-quantity">
                <div class="btn-quantity__add hide" tabindex="0" role="button" aria-label="ADD">ADD</div>
                <div class="btn-quantity__minus" tabindex="0" role="button" aria-label="Remove"></div>
                <div class="btn-quantity__value" tabindex="0">${item.quantity}</div>
                <div class="btn-quantity__plus" tabindex="0" role="button" aria-label="Add More">+</div>
                </div>`;
    }

    return markup;
};