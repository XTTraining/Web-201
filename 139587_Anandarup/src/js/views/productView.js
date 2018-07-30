import { elements } from './base';


export const showCategorySection = (categoryList) => {
    elements.categoryWrapper.html('');
    categoryList.forEach((element, count) => {
        const markup = `<div class="product__category-item category-${count}">
        <input type="checkbox" class="product__category-checkbox" id="${element.CategoryName}" name="select">
        <label for="${element.CategoryName}" class="product__checkbox-label" tabindex="0" role="checkbox">
            <span class="product__checkbox-button"></span>
            <span>${element.CategoryName}</span>
        </label>
        </div>` ;
        elements.categoryWrapper.append(markup);
    });
}

export const showProducts = (productMap, control) => {

    let markup, productMarkup, quantity;
    quantity = 1;
    elements.productWrapper.html('');
    productMap.forEach((value, key) => {
        markup = `<div class="product__list-category " id="${key}-item">
        <div class="product__list-title">
            <h2>${key} Items</h2>
        </div>`;
        productMarkup = '';
        value.forEach(element => {
            productMarkup += `<div class="product__item" id="${element.id}">
                <div class="product__item-container">
                    <img src="${element.productimgurl}" alt="${element.ProductName}" class="product__item-img">
                </div>
                <h4 class="product__item-heading product__item-heading--4">${element.ProductName}</h4>
                <h5 class="product__item-heading product__item-heading--5">${key} Foods</h5>
                <span class="product__item-price">${element.productPrice}</span>
                <div class="btn-increment">
                    <div class="btn-increment__add" tabindex="0" role="button">ADD</div>
                    <div class="btn-increment__plus" tabindex="0" role="button">+</div>
                    <div class="btn-increment__minus" tabindex="0" role="button"></div>
                    <div class="btn-increment__quantity">${quantity}</div>
                </div>
            </div>`;
        });
        markup = markup + productMarkup + '</div>';
        elements.productWrapper.append(markup);
        
    });

    
    if (!control) {
        $('.category-0 > input[type=checkbox]').prop('checked', true);

        const featuredProductsId = $('.category-0 > input[type=checkbox]').prop('id') + '-item';
        $('#' + featuredProductsId).toggleClass('product__list-category--active');

        $('.product__checkbox-label').on('click', function (e) {
            const productsId = $(this).siblings('.product__category-checkbox').prop('id') + '-item';
            $('#' + productsId).toggleClass('product__list-category--active');
        });
    } else {
        $('.product__category-item > input[type=checkbox]').prop('checked', true).attr('disabled', true);
        $('.product__category-item > input[type=checkbox]').each((i, val) => {
            const productsId = val.id + '-item';
            $('#' + productsId).toggleClass('product__list-category--active');
        });
    }
}

export const modifyProductInfoByCart = (cartProduct) => {
    if (cartProduct) {
        const currentProduct = $('#' + cartProduct.productId);
        currentProduct.find('.btn-increment').children().css('opacity', '1');
        currentProduct.find('.btn-increment__add').css('opacity', '0');
        currentProduct.find('.btn-increment__quantity').html(cartProduct.count);
    }
}


export const showMobileCategories = (categoryList) => {
    if (categoryList) {
        let categoryName, activeClassName;
        elements.horizontalScroll.html('');
        categoryList.forEach((element, index) => {

            if(parseInt(element.CategoryId) === 1) {
                categoryName = 'Home';
                activeClassName = 'horizontal-scroll__nav-item--active';
            } else {
                categoryName = element.CategoryName;
                activeClassName = '';
            }
            const markup = `<span class="horizontal-scroll__nav-item ${activeClassName} category-${index}" 
            id="${element.CategoryName}_category">${categoryName}</span>`;
            elements.horizontalScroll.append(markup);
        });
    }
}
