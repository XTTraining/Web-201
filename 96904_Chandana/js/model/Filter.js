import * as lscache from 'lscache';
import * as global from '../base/constants';

// This class represents a cart item
export default class Filter {
    // Initializes Filter class
    constructor() {
        this.CategoriesList = [];
        this.AuthorList = [];
        this.SelectedCategories = [];
        this.SelectedAuthors = [];
    }

    // This method filters category and author data 
    initializeFilter(categoryData) {
        this.populateCategories(categoryData);
        this.populateAuthors(categoryData);
    }

    // This method performs filter on category data, based on categories
    populateCategories(categoryData){
        var propCat, category;

        // Loop through categories 
        for(propCat in categoryData){
            // set local variable for category
            category = categoryData[propCat];
            // push the categories name to the array
            this.CategoriesList.push(category.Name);
        };
    }

    // This method performs filter on category data, based on authors
    populateAuthors(categoryData){
        // initialize variables
        let category, book, propCat, propBook;

        for(propCat in categoryData){
            // set local variable for books
            category = categoryData[propCat];

            // loop through each book to get author name
            for(let propBook in category.books){
                book = category.books[propBook];

                // avoid duplicacy
                if(this.AuthorList.indexOf(book.Author) === -1){
                    this.AuthorList.push(book.Author);
                }
            }
        }        
    }
}