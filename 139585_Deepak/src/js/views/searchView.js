import {
    elements
} from './base';
import * as productsView from './productsView';


export const renderSearch = searchItems => {
    if (searchItems.length == 0) {
        searchItems = [{
            "category": "",
            "cuisine": "",
            "id": 0,
            "image": "img/noFood.webp",
            "name": "Food Not Found",
            "price": 0
  }];
    }
    productsView.renderResults(searchItems);
}
