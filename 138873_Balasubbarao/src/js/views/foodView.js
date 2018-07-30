
//Render Category DOM
export const renderCategory = (data, element) => {

    data.forEach((doc) => {
        const markup =
            `<div class="tab" >
        <input id="tab-${doc.data.id}" type="checkbox" name="tabs" class="tab-input">
        <label for="tab-${doc.data.id}" class="tab-title"  data-category-doc-id="${doc.docId}">${doc.data.name}</label>
        <div class="tab-content">
            <ul class="filter" >
                <div class="foodie-loader foodie-loader-small">Loading...</div>
            </ul>
        </div>
        </div>`;
        element.insertAdjacentHTML('beforeend', markup);
    });
}

export const renderSubCategory = (data, element) => {

    element.innerHTML = '';
    data.forEach((doc) => {
        const markup =
            `<li class="filter-type">
                        <input type="checkbox" class="filter-type-control" id="filter__${doc.docId}" name="filter__${doc.docId}">
                        <label for="filter__${doc.docId}" class="filter-type-label">${doc.data.name}</label>
                    </li>`;
        element.insertAdjacentHTML('beforeend', markup);
    });
}

export const renderFood = (data, element, filterList) => {

    element.innerHTML = '';
    data.forEach((doc) => {
        let found = true;
        if (filterList !== undefined && filterList.length > 0) { found = filterList.some(r => doc.data.category.indexOf(r) >= 0); }
        if (found) {
            const markup =
                ` <div class="col-1-of-3 products__list-items-col">
                    <div class="product" id="${doc.docId}">
                        <div class="product-image-warpper">
                            <img src="img/food/${doc.data.id}.jpg" alt="food-image-${doc.data.id}" class="product-img">
                        </div>
                        <div class="product__content">
                            <span class="product__content-price">Price : $${doc.data.price}</span>
                            
                            <div class="product__content-control">
                                <a href="javascript:void(0)" class="product__content-control-add" data-price="${doc.data.price}" data-id="${doc.docId}">+</a>
                                    <span class="product__content-control-text" data-id="${doc.docId}">${doc.data.qty}</span>
                                <a href="javascript:void(0)" class="product__content-control-remove" data-price="${doc.data.price}" data-id="${doc.docId}">-</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            element.insertAdjacentHTML('beforeend', markup);
        }
    });
}



