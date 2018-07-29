import {
    elements
} from './base';
const filterTemplate = require('../../templates/filter.hbs');
import * as productsView from './productsView';

export const renderFilterMenu = data => {
    elements.filterSection.append(filterTemplate(data));
    //    elements.totalFood.text(data.items.length);
    $('.food-count').text(data.items.length);
}
export const renderFilterItems = (data, filter1, filter2) => {
    var filteredItems = [];
    if (filter1.length > 0) {
        $.each(filter1, function (i) {
            var arr1 = data.filter(x => x.category.indexOf(filter1[i]) > -1);
            Array.prototype.push.apply(filteredItems, arr1);
        });
    }
    if (filter2.length > 0) {
        $.each(filter2, function (i) {
            var arr2 = data.filter(x => x.cuisine.indexOf(filter2[i]) > -1);
            Array.prototype.push.apply(filteredItems, arr2);
        });
    }
    if ((filter1.length + filter2.length) == 0) {
        filteredItems = data;
    } else if (filteredItems.length > 0) {
        filteredItems = removeDuplicates(filteredItems, 'id');
    } else {

    }
    console.log(filteredItems);
    productsView.renderResults(filteredItems);
}
//this.items = this.items.filter(x => x.id != id);
function removeDuplicates(arr, key) {
    if (!(arr instanceof Array) || key && typeof key !== 'string') {
        return false;
    }

    if (key && typeof key === 'string') {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
        });

    } else {
        return arr.filter(function (item, index, arr) {
            return arr.indexOf(item) == index;
        });
    }
}
