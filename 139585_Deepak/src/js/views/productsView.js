import {
    elements
} from './base';
const foodItemTemplate = require('../../templates/fooditem.hbs');

export const renderResults = items => {
    // const items = data.items;
    const starters = items.filter(item => item.category.indexOf('3') > -1);
    const main = items.filter(item => item.category.indexOf('4') > -1);
    const beverages = items.filter(item => item.category.indexOf('5') > -1);
    const noSearchResult = items.filter(item => item.id == 0);
    $('.food__item').remove();
    elements.afterStarter.after(foodItemTemplate(starters));
    elements.afterMain.after(foodItemTemplate(main));
    elements.afterDessert.after(foodItemTemplate(beverages));
    elements.searchSection.after(foodItemTemplate(noSearchResult));
    $('.food__item[data-id="0"]').children().not('img, h2').remove();
}
