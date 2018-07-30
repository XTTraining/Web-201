import {
    selector
} from '../../common/common';
import {
    searchResultTemplate
} from '../templates/search-result';
import {
    MenuItem
} from '../models/MenuItem';
import {
    menuItems
} from './menuitem.js';
const $ = require("jquery");

const populateSearchDropDown = (menuitem) => {
    selector.searchresults().insertAdjacentHTML('beforeend', searchResultTemplate(menuitem));
};

const searchForInput = () => {
    selector.searchresults().style['display'] = 'block';
    selector.searchresults().innerHTML = '';
    selector.searchbar().removeEventListener('keyup', searchForInput);
    setTimeout(function () {
        selector.searchbar().addEventListener('keyup', searchForInput);
        searchKeys(populateSearchDropDown);
    }, 400);
};

const searchAndGetAll = () => {
    clearSearch();
    selector.searchresultsection().style['display'] = 'block';
    selector.searchresultsectionmenuitems().innerHTML = '';
    searchKeys(menuItems.populateSearchData, NoResultFound);
    window.scrollBy(0,1);
};

const NoResultFound = () => {
    selector.searchresultsectionmenuitems().innerHTML = '<span style="margin-left:5%">No Result Found.<span>';
};

const searchKeys = (fn) => {
   // let flag = false;
    if (selector.searchbar().value.length > 0) {
        index.forEach((value, key) => {
            const reg1 = new RegExp('(.*)' + selector.searchbar().value.toLowerCase() + '(.*)');
            const reg2 = new RegExp('(.*)' + key.toLowerCase() + '(.*)');
            if (reg1.test(key.toLowerCase()) || reg2.test(selector.searchbar().value.toLowerCase())) {
                value.forEach((menuitem) => {
                    fn(menuitem);
              //      flag = true;
                });
            }
        });
    }
    
};


let index = new Map();
const generateMenuIndex = function () {
    index = new Map();
    $.ajax({
        url: '/static/menu-items.json',
        datatype: 'json',
        async: true,
        success: function (items) {
            items = Object.values(items);
            for (let i = 0; i < items.length; i++) {
                const m = new MenuItem(items[i].id, items[i].name, items[i].price, items[i].description, items[i].imgsrc, items[i].categoryid, items[i].tags);
                const tags = items[i].tags.split(',');
                tags.forEach((tag) => {
                    tag = tag.trim().toLowerCase();
                    if (index.has(tag)) {
                        index.get(tag).push(m);
                    } else if (!index.has(tag)) {
                        let arr = [];
                        arr.push(m);
                        index.set(tag.toLowerCase(), arr);
                    }
                });
            }
        }
    });
};

const clearSearch = () => {
    selector.searchresults().style['display'] = 'none';
    selector.searchresults().innerHTML = '';
    selector.searchresultsection().style['display'] = 'none';
};

export const search = {
    searchForInput: searchForInput,
    generateMenuIndex: generateMenuIndex,
    searchAndGetAll: searchAndGetAll,
    clearSearch: clearSearch
};
