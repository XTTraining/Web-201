export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__input'),
    category_main:document.querySelector('.category_main'),
    chk_category :$('.chk_category')
}

export const elementStrings = {
    loader: 'loader'
};


export const renderLoader = () => {
    $("#popup-overlay").show();
};

export const clearLoader = () => {
    $("#popup-overlay").hide();
};
