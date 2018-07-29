import { elements, renderLoader, clearLoader } from './base';
var bookDetaislTemplate = require("./helpers/bookDetails.hbs");


//This method uses handlebars template to display book details 
export const renderBookDetailsUsingHandlebars = (bookDetails) => {
   
    //populate search results using handlebars template and data
    elements.section_bookDetails.innerHTML = bookDetaislTemplate(bookDetails);
    elements.section_bookDetails.style.display = 'flex';
    debugger;
    if(elements.close_bookDetailDisplay){
        elements.close_bookDetailDisplay.addEventListener('click', closeBookDetailsView);
    }
}

// This method closes the book details screen
export const closeBookDetailsView = () => {   
    // clear data 
    elements.section_bookDetails.innerHTML = "";
    // hide screen
    elements.section_bookDetails.style.display = 'none';
}