import { elements } from '../base';

export const renderOrders = (data, element) => {

    data.forEach((doc) => {

        const markup =
            `<div class="order__list-table-row" id="${doc.docId}">
                <div class="order__list-table-col order__list-table-col-content">
                    <img src="img/food/${doc.data.imgid}.jpg" alt="food" class="order__list-table-col-content--image">
                </div>
                <div class="order__list-table-col order__list-table-col-content hide-mobile">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div class="order__list-table-col order__list-table-col-content">                    
                    <div class="product__content-control">
                        <a href="javascript:void(0)" class="product__content-control-add" data-price="${doc.data.price}" data-id="${doc.docId}">+</a>
                            <span class="product__content-control-text" data-id="${doc.docId}">${doc.data.qty}</span>
                        <a href="javascript:void(0)" class="product__content-control-remove" data-price="${doc.data.price}" data-id="${doc.docId}">-</a>
                    </div>
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.price}
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.tax}
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.totalPrice}
                </div>
            </div> `;
        element.insertAdjacentHTML('beforebegin', markup);

    });
}

export const renderOrder = (doc, element) => {

    const markup = `
                <div class="order__list-table-col order__list-table-col-content">
                    <img src="img/food/${doc.data.imgid}.jpg" alt="food" class="order__list-table-col-content--image">
                </div>
                <div class="order__list-table-col order__list-table-col-content hide-mobile">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div class="order__list-table-col order__list-table-col-content">                    
                    <div class="product__content-control">
                        <a href="javascript:void(0)" class="product__content-control-add" data-price="${doc.data.price}" data-id="${doc.docId}">+</a>
                            <span class="product__content-control-text" data-id="${doc.docId}">${doc.data.qty}</span>
                        <a href="javascript:void(0)" class="product__content-control-remove" data-price="${doc.data.price}" data-id="${doc.docId}">-</a>
                    </div>
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.price}
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.tax}
                </div>
                <div class="order__list-table-col order__list-table-col-content">
                    $${doc.data.totalPrice}
                </div>`;
    element.innerHTML = markup;
}

export const orderSummary = (orders) => {

    var sum = 0;
    if (orders.length > 0) {
        orders.forEach((doc) => {
            sum = sum + parseFloat(doc.data.totalPrice);
        })
    }

    elements.orderTax.innerHTML = '$' + .5;
    elements.orderTotal.innerHTML = '$ ' + parseFloat(sum);

}