import { elements } from './base';

export const getInput = () => {
    return $('.search__input:visible').val();
};

export const clearInput = () => {
    elements.searchInput.val('');
};

export const clearResults = () => {
    elements.productList.html('');
};

export const emptySearchResult= () =>{
    const markup=`<div class="emptyResult">
    <h3 class="heading-secondary">Sorry, no results found!</h3>
    <img src="/img/error-no-search-results.png">
    <h4>Please check the spelling or try searching for something else</h4>
    </div>`;

     elements.productList.html(markup);
};