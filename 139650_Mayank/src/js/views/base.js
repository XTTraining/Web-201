export const elements={
productList:$('.products'),
categoryList:$('#category--list'),
searchForm: $('.search'),
searchInput: $('.search__input'),
cartResult:$('#cart-items-result'),
paymentDetails:$('#payment-details-tax'),
cartSummary:$('#cart-summary'),
cartInfo:$('.cart--info'),
emptyCart:$('.empty-cart'),
categories:$('#tab-scroll-view')
};


export const renderLoader = () => {
    $("#popup-overlay").show();
};

export const clearLoader = () => {
    $("#popup-overlay").hide();
};
