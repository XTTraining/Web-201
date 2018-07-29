// List of elements that's used in code
export const elements = {
    book_results: document.querySelector('.features'),
    search_results: document.getElementById("search_results"),
    prev_btn: document.getElementById("btn_car_prev"),
    next_btn: document.getElementById("btn_car_next"),
    accordion_list: document.getElementsByClassName("accordion"),
    carousel_div: document.getElementById("carousel"),
    carousel_slides: document.getElementsByClassName("carouselSlides"),
    search_input: document.getElementById("inputSearch"),
    search_button: document.getElementById("btnSearch"),
    book_viewDetail: document.getElementsByClassName("Btn__ViewDetails"),
    book_addToCart: document.getElementsByClassName("Btn__AddToCart"),
    book_addToFavourite: document.getElementsByClassName("Btn__AddToFav"),
    section_bookDetails: document.getElementById("details-wrapper"),
    close_bookDetailDisplay: document.getElementById("closeDisplay"),
    display_notification_likes: document.getElementById("notification_like"),
    display_notification_cart: document.getElementById("notification_cart") ,
    cartHeader: document.getElementById("section__main"),
    mainSection: document.getElementById("section__main"),
    btn_payment_bottom: document.getElementById("btn_payment_bottom") ,
    btn_continue_bottom: document.getElementById("btn_continue_bottom") ,
    btn_payment_top: document.getElementById("btn_payment_top") ,
    btn_continue_top: document.getElementById("btn_continue_top") ,
    btn_confirm_payment: document.getElementById("btn_confirm_payment")

};

//export const constants = {
export const constants = {
    quantityPlus: "quantity-plus",
    quantityMinus: "quantity-minus",
    quantity: "quantity",
    filterButton: "filter-button",
    btnApplyFilter: "applyFilter",
    category: "category",
    author: "author",
    ratingChecked: 'input[name="rating"]:checked',
    searchResults: "search_results",
    searchInput: "inputSearch",
    btnSearch: "btnSearch",
    btnLoadMore: "btnLoadMore",
    btnRefresh: "refreshPage"
}

// sets carousel's slide index
export const setCarouselSlideIndex = (index) => {
    elements.carousel_div.setAttribute('data-slideIndex', index);
};

// gets carousel's slide index
export const getCarouselSlideIndex = () => {
    let sIndex = elements.carousel_div.getAttribute('data-slideIndex');
    if(!sIndex || sIndex == '')
        return 1;
    else 
        return sIndex;
};

// constants used in elements
export const elementStrings = {
    loader: 'loader'
};

// This method used renders loader for search results element
export const renderLoaderForSearchResults = () => {
    // read search results element
    var elementDiv = document.getElementById("search_results");
    // Call render load and pass search result element to render the loader
    renderLoader(elementDiv);
}

// This method is used to render the Loader on the element passed to it as 'parent'
export const renderLoader = parent => {
    // define loader
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons/SVG-sprite.svg#loading"></use>
            </svg>
        </div>
    `;
    // insert into parent element
    parent.insertAdjacentHTML('afterbegin', loader);
};

// This method is used to remove loaded display from page
export const clearLoader = () => {
    // read the loader
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // if present, remove it 
    if (loader) loader.parentElement.removeChild(loader);
};





