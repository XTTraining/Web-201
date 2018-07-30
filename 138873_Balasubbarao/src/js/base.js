//HTML ELEMENTS
export const elements = {
    category: document.querySelector('.products__list-category'),
    foodList: document.querySelector('.food--list'),
    orderList: document.querySelector('.order__list-table'),
    orderListFooter: document.querySelector('.order__list-table-footer'),
    orderTotal: document.querySelector('#order-total'),    
    orderTax: document.querySelector('#order-total-tax'),
    tabContentFilter: '.filter',
    filterControl: 'filter-type-control',
    addToCart: 'product__content-control-add',
    removeFromCart: 'product__content-control-remove'
};

//FIRESTORE COLLECTION NAMES
export const collections = {
    category: 'Category',
    subCategory: 'SubCategory',
    food: 'Food',
    orders: 'Orders',
}

//FIRESTORE API CONFIGURATION
export const config = {
    apiKey: "AIzaSyC6tbE72dD-CU8k_gpmibZvFIzl45RwCe8",
    authDomain: "foodie-777.firebaseapp.com",
    projectId: "foodie-777"
}
