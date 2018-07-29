import * as lscache from 'lscache';
import * as global from '../base/constants';

// This method represents Like item
export default class Like {
    constructor() {
        this.likes = [];
    }

    // add a book to 'likes' list when liked by user
    addLike(ISBN, title, author, image) {
        const index = this.likes.findIndex(el => el.ISBN === ISBN);

        if(index > -1) {
            alert('This item is already liked');
        }
        else {
            //create a like object
            const likeItem = { ISBN, title, author, image };

            //add object to the likes array
            this.likes.push(likeItem);

            this.saveDataToLocalStorage();

            return likeItem;
        }
    }

    //delete a book item from likes using book's ISBN number
    deleteLike(ISBN) {
        const index = this.likes.findIndex(el => el.ISBN === ISBN);
        this.likes.splice(index, 1);

        // Perist data in localStorage
        this.saveDataToLocalStorage();
    }

    // identifies is a book is likes using books' id or ISBN
    isLiked(ISBN) {
        return this.likes.findIndex(el => el.ISBN === ISBN) !== -1;
    }

    //Get total likes of the user
    getNumLikes() {
        return this.likes.length;
    }

    //Saving user likes details to local storage as is should persist locally
    saveDataToLocalStorage() {
        lscache.set(global.constants.cacheKey_likes, this.likes);
    }

    //Reading user likes details from local storage
    readDataFromLocalStorage() {
        const storage = lscache.get(global.constants.cacheKey_likes);

        //restoring data to local storage
        if(storage) {
            this.likes = storage;
        }
    }

}