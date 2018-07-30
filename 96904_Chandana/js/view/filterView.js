import * as base from './base';

// This method get the selected value of rating in filter and default is 5
export const getSelectedRating = () => {
    var rating = 5, ratingElement;
    ratingElement = document.querySelector(base.constants.ratingChecked);
    if(ratingElement)
    {
        rating = ratingElement.value;
    }
    return rating;
}

// this method gets the list of user selected categories in filter
export const getSelectedCategories = () => {
    var categoryList = [], categoryElement;
    categoryElement = document.getElementsByName(base.constants.category);
    categoryElement.forEach(el => {
        if(el.checked) {
            categoryList.push(el.value);
        }
    });
    return categoryList;
}

// this method gets the list of user selected author in filter
export const getSelectedAuthors = () => {
    var authorList = [], authorElement;
    authorElement = document.getElementsByName(base.constants.author);
    authorElement.forEach(el => {
        if(el.checked) {
            authorList.push(el.value);
        }
    });
    return authorList;
}
