import { elements } from './base';

export const getInput = () => elements.searchInput.val().toLowerCase();

export const showNoProducts = ()=> {
    elements.productWrapper.html('');
    elements.productWrapper.addClass('product__list--noresult');
    const noData = `<div class="noresult"><img src="./img/empty-plate.webp" alt="no result">
                    <div class="noresult__text"> <span>Oh! There’s not much left</span>
                    <p> We can’t find anything related to your search.Try a different search.
                    </p></div></div>`;

    elements.productWrapper.append(noData);
}

export const removeNoResultClass = ()=> {
    elements.productWrapper.removeClass('product__list--noresult');
}