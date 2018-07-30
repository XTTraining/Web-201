import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

// This class represent the data layer and is the only place that has database related code
export default class BookRepo {
    // class constructor that initializes  proxy, config and firbase app
    constructor() {
        this.proxy = "https://cors-anywhere.herokuapp.com/";
        this.config = {
            apiKey: "AIzaSyDMbj73_BPSSB7-UZzB8m6Xt6e8DoQyAO4",
            authDomain: "bookaholic-c5996.firebaseapp.com",
            databaseURL: "https://bookaholic-c5996.firebaseio.com",
            projectId: "bookaholic-c5996",
            storageBucket: "bookaholic-c5996.appspot.com",
            messagingSenderId: "179149729157"
        };

        // if the firebase app exists, set the app; else, initialize firebase app
        (!firebase.apps.length) ? firebase.initializeApp(this.config) : firebase.app();
    }

    // This method returns all books from the firebase books api
    async getResults() {
        try {
            // await firebase api to get books
            const res = await axios(`${this.proxy}${this.config.databaseURL}/books.json`);

            // set data with the retrieved information
            this.books = res.data;
        } catch (error) {
            alert(error);
        }
    }

    // This method get all the categories from the firebase api
    async getCategories(propertyName, propertyVal) {
        try {
            // await firebase api to get categories
            const res = await axios(`${this.proxy}${this.config.databaseURL}/Category.json`);
            
            // set data with the retrieved information
            this.categories = res.data;
        } 
        catch (error) {
            alert(error);
        }
    }

    // This method gets a book details using ISBN
    async getBookDetails(isbn) {
        try {
             // await firebase api to get details
            const url = `${this.proxy}${this.config.databaseURL}/books/-${isbn}.json`;            
            const res = await axios(url);

            // set data with the retrieved information
            return res.data;
        }
        catch(error) {
            alert(error);
        }
    }
}