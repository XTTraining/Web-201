import {elements} from './base';

var categoryTemplate = require('../../templates/categories.handlebars');

export const renderCategories=(categoryList) =>{
    if(categoryList!=null)
    {
        elements.categoryList.empty();
        elements.categories.empty();
        elements.categories.append(categoryTemplate(categoryList));
        categoryList.forEach(foodCategory);
    }
};


const foodCategory = item => {

    const markup = `
    <li class="categories-list__item">
    <input id="cat-${item.Id}" class="categories-list__item-input" type="checkbox" aria-checked="false"/>
    <label class="categories-list__item--name" for="cat-${item.Id}" tabindex="0">${item.Name}</label>
    </li>
    `;
    elements.categoryList.append(markup);
};