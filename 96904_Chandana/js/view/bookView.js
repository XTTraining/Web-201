import { constants, elements, renderLoader, clearLoader } from './base';
var categoriesTemplate = require("./helpers/bookByCategory.hbs");
var searchTemplate = require("./helpers/searchDiv.hbs");
var filterTemplate = require("./helpers/filterTemplate.hbs");

//This method uses handlebars template to populate 
export const renderBooksUsingHandlebars = (categoryData, filterData, pageCount, pageNumber) => {
    //convert and object to array to be used with handlebars
    let startIndex, endIndex, searchResultsDiv, categoryArray = new Array();

    // start index is the multiple of page count and page number -1, as array is zero based
    startIndex = parseInt(pageCount) * parseInt(pageNumber -1);
    endIndex = startIndex + parseInt(pageCount);

    // converts an object of objects to array of object for handlebars
    for(var prop in categoryData) { 
        categoryArray.push(categoryData[prop]); 
    }

    // gets only a block of data, as entire data would be very heavy to load at once
    categoryArray = categoryArray.slice(0, endIndex);
    
    // render search markup
    renderSearch();

    // render filter markup
    renderFilter(filterData);

    //populate search results using handlebars template and data
    searchResultsDiv = document.getElementById(constants.searchResults);
    if(searchResultsDiv){
        // append search results markup
        searchResultsDiv.insertAdjacentHTML('beforeend', categoriesTemplate(categoryArray));
    }
}

// This method uses books array and renders on page
export const renderAllBookResult = (booksDataList) => {
    for(var prop in booksDataList){       
        renderBookResult(booksDataList[prop]);
    }
};

// Get the input text from search input 
export const getSearchInput = () => {
    // get search input element
    var searchInputElement = document.getElementById(constants.searchInput);
    if(searchInputElement){
        return searchInputElement.value;
    }
    return elements.search_input.value;
}

// render search controls on html
export const renderSearch = () => {
    //searchTemplate
    elements.mainSection.innerHTML = searchTemplate();
}

// render filter controls on html
export const renderFilter = (data) => {
    // get search results element area
    var searchResultsDiv = document.getElementById(constants.searchResults);
    if(searchResultsDiv){
        // insert the filter markup on screen
        searchResultsDiv.insertAdjacentHTML('afterbegin', filterTemplate(data));
    }
}

// get the search button element
export const getSearchElement = () => {
    return document.getElementById(constants.btnSearch);    
}


