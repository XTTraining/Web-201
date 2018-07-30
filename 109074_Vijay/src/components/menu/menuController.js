import { elements } from '../../common/base';
import * as menuView from './menuView';
import Menu, * as model from './Menu';
 



export default class menuController {

    constructor() { 
    }
    
    init() {
        console.log('--------init in menuController-----------')

        let menuData = JSON.parse(localStorage.getItem('menu'));
        console.log('load........');
        console.log(menuData);
        //console.log(menuData);
        if (!menuData) {
            console.log('----inside fresh----')
            let model = new Menu(function (data) {
                let menu = [];
                let menuitems = [];
                for (let key in data.menu) {
                    let menuSection = [];
                    for (let itemKey in data.menu[key].items) {
                        let dataItem = data.menu[key].items[itemKey];
                        dataItem.id = itemKey;
                        menuSection.push(dataItem);
                        menuitems.push(dataItem.name);
                    }
                    let item = {
                        menuName: key,
                        items: menuSection,
                        gst:data.menu[key].gst
                    };
                    menu.push(item);
                }

                Window.foodApp.menu = menu;
                localStorage.setItem('menu', JSON.stringify(menu)); 
                localStorage.setItem('menuitems', JSON.stringify(menuitems)); 
                console.log('inside menu controller condition');
                menuView.renderMenu(menu); 
                Window.foodApp.listeners.bindAddtoCartListner();

            });
        }
        else {

            this.loadmenu(menuData,false);

        }

    }

    loadmenu(menuData,isFiltered) { 
        if(!isFiltered){
            $(".accordion").remove();
            $('.panel__accordion').remove();
        }
        menuView.renderMenu(menuData,isFiltered); 
        Window.foodApp.listeners.bindAddtoCartListner();
         
    }

    filterkey(filterOptions) {

        let filteredMenu = [];
        //console.log('filter ver value is ' + filterOptions.vergetarian);
        let menu = JSON.parse(localStorage.getItem('menu'));
        menu.forEach(function (menuItem) {
            let filterItems = menuItem.items.filter(function (item) {

                if (filterOptions === null) {
                    return true;
                } else if (filterOptions.vergetarian) {
                    return item.vergetarian === true;
                }
                else {
                    return item.vergetarian === false;
                }


            })
            if (filterItems.length > 0) {
                let item = {
                    menuName: menuItem.menuName,
                    items: filterItems
                };
                filteredMenu.push(item);
            }

        });

        if (filteredMenu.length > 0) {

            
            console.log('filtered Menu is');
            console.log(filteredMenu);
            this.loadmenu(filteredMenu,true);
            console.log('filtered Menu is ending');
        } else {
            console.log('filtered Menu lenth is 0');
        }


    }

}