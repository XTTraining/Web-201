import BookRepo from '../data/fbData';
import * as lscache from 'lscache';
import * as global from '../base/constants';

let dataObject = new BookRepo();

// This class represents a single book
export default class BookDetail {

    // initialize book by ISBN
    constructor(isbn){
        this.ISBN = isbn;
    }

    //Get book details using ISBN
    async getBookDetail() {
        try {
            // get book details from data layer
            return await dataObject.getBookDetails(this.ISBN);
        }
        catch(error){
            alert(error);
        }
    }
}
