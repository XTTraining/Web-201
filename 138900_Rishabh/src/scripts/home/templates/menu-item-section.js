import {
    menuItemTemplate
} from '../templates/menu-item';

export const menuItemSectionTemplate = (cat, menuitems) =>{
    return `<section id='${escape(cat.name)}' class='category' vocab='http://schema.org/' typeof='MenuSection'>
                        <div id='${escape(cat.name)}-placeholder' class='category-placeholder'></div>
                        <h2 property='name'>
                            ${cat.name}
                        </h2>
                        <section class='menu-items' property='hasMenuItem'>
                          ${transformMenuItems(menuitems, cat.name)}
                        </section>
                        <hr>
                    </section>`;
};

const transformMenuItems = (menuitems, catname) => {
    
    let final = '';
    menuitems.forEach((item) => final+=menuItemTemplate(item, catname));
    return final;
};