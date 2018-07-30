import BookRepo from '../data/fbData';
import * as lscache from 'lscache';
import * as global from '../base/constants';
import Filter, * as filter from './Filter';

// This method represents Book Store data
export default class BookModel {  
    // This constructor method initializes bookStore data
    constructor() {
        this.filteredData = [];
        this.books = [];
        this.categories = [];        
        this.dataObject = new BookRepo();
        this.filterData = new Filter();
    }

    //Get all Categories list asynchronously from Firebase
    async getCategories(){
        try {
            // read data from cache
            var cache_categories = lscache.get(global.constants.cacheKey_categoriesData);

            // if data exists in case, set categories and skip database read
            if(cache_categories !== undefined && cache_categories !== null){
                this.categories = cache_categories;
            } 
            else {
                // reading data from database
                await this.dataObject.getCategories();  
                // set categories data
                this.categories = this.dataObject.categories;
                
                // persist data to cache
                lscache.set(global.constants.cacheKey_categoriesData, this.categories);
            }
        } 
        catch (error) {
            alert(error);
        }
    }

    //Get all books list asynchronously from Firebase
    async getBooks() {
        try {
            // read data from cache
            var cache_books = lscache.get(global.constants.cacheKey_booksData);

            // if data exists in case, set books and skip database read
            if(cache_books !== undefined && cache_books !== "undefined" && cache_books !== null)
            {              
               this.books = cache_books;
            } 
            else { 
                // reading data from database
                await this.dataObject.getResults(); 

                 // set categories data         
                this.books = this.dataObject.books;

                // persist data to cache
                lscache.set(global.constants.cacheKey_booksData, this.books);
            }
        } 
        catch (error) {
            alert(error);
        }
    }

    //Get all Categories along with associated books list asynchronously from Firebase
    async getBooksByCategory() {
        let objBook;
        try {
            // read data from cache
            var cacheCategories = lscache.get(global.constants.cacheKey_categoriesData);

            // if cache is empty, go to database
            if( cacheCategories === undefined || cacheCategories === null){

                // getting categories from database
                await this.getCategories();   
            } else {                
                //getting categories from cache
                this.categories = cacheCategories;
            }

            // read  books data from cache
            let cacheBooks = lscache.get(global.constants.cacheKey_booksData);   
            // if cache is empty, go to database         
            if( cacheBooks === undefined || cacheBooks === "undefined" || cacheBooks === null){
                // getting books from database
                await this.getBooks();
            } else {         
                //getting books from cache     
                this.books = cacheBooks;
            }

            //Iterate through each category and get books for it
            for(let category in this.categories){                
                let objCategory = this.categories[category];
                
                let bookListForCategory = [];
                for(let prop in this.books){
                    // set local variable for books
                    objBook = this.books[prop];

                    // check if book has the category
                    if(objBook['Category'].indexOf(objCategory.Name) > -1){

                        // if book has the category, add book to the category arrary
                        bookListForCategory.push(objBook);
                    }
                }
                
                // if category has books, add to it
                if(bookListForCategory.length > 0){
                    this.categories[category].books = bookListForCategory;
                }
            }  

            // get data to get displayed for filter functionality
            this.filterData.initializeFilter(this.categories);
        } catch (error) {
            alert(error);
        }
    }   

    // This method performs search on books for the key provided
    async getBooksBySearchKey(key) { 
        // initialize variables
        let objBook, searchResult;
        this.filteredData = [];

        try {
            // get categories data
            await this.getBooksByCategory();
               
            // loop through categories data
            for(let category in this.categories){
                // store current category in a variable
                let objCategory = this.categories[category];
                searchResult= [];

                // loop through books and find the search input
                for(let prop in objCategory.books){
                    objBook = objCategory.books[prop];
                    if(objBook[global.constants.searchKey_Title].toLowerCase().indexOf(key) > -1 ||
                        objBook[global.constants.searchKey_Author].toLowerCase().indexOf(key) > -1){
                            // if the search input exists, push to results array
                            searchResult.push(objBook);
                    }
                }
                // if there are results
                if(searchResult.length > 0) {
                    objCategory.books = [];
                    objCategory.books = searchResult;
                    // add category to filtered data
                    this.filteredData.push(objCategory);
                }
            }            
        } 
        catch (error) {
            alert(error);
        }
    }

    // This method filters the categories data based on rating
    filterBooksByRating(rating) {
        let category, objCategory, searchResult, prop, objBook;
        for(category in this.categories){
            
            // store current category in a variable
            objCategory = this.categories[category];
            searchResult= [];

            // loop through books and find the search input
            for(prop in objCategory.books){
                objBook = objCategory.books[prop];
                if(objBook.Rating > rating ){
                    // if the search input exists, push to results array
                    searchResult.push(objBook);
                }
            }
            // if there are results
            if(searchResult.length > 0) {
                objCategory.books = [];
                objCategory.books = searchResult;
                // add category to filtered data
                this.filteredData.push(objCategory);
            }
        } 
    }

    // Filter books by categories selected by user
    filterBooksByCategories(filterCategories) {
        // initialize variables
        let searchCategories = [], i, catList;
        // Loop through each filter category user input
        Array.from(filterCategories).forEach( fc => {
            // read user input data
            catList = this.categories;
            // loop through each category in categories list
            for(let category in catList){
                // store current category in a variable
                let catItem = catList[category];
                if(fc === catItem.Name){
                    // if the category name matches, push to teh search results
                    searchCategories.push(catItem);
                }
            }
        })

        // return the result of search
        return searchCategories;        
    }

    // This method works with other method to get the filteredData 
    getFilteredBooks(searchInput) {
        this.filteredData = [];
         
        // if the search input rating is less than 5, filter by rating
        if(searchInput.rating < 5){
            this.filteredData = this.filterBooksByRating(searchInput.Rating);
        }

        // if the categories search input has data, filter by category
        if(searchInput.categories.length > 0){
            this.filteredData = this.filterBooksByCategories(searchInput.categories);
        }
        
        // return filtered data
        return this.filteredData;
    }

    // Get book details using ISBN
    async getBookDetail(isbn) {
        try {
            // get book details from data layer
            return await dataObject.getBookDetails(isbn);    
        }
        catch(error){
            alert(error);
        }
    }
  
}