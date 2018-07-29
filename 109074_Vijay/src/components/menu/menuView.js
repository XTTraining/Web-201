import { elements } from '../../common/base';
import * as cardView from './cardView';

export const renderMenu = (menu, isFiltered) => {

    let accordionMarkup = '';
    let menuitems = [];

    console.log('in menu loader');
    console.log(menu);

    if (!isFiltered) {
        menu.forEach(menuitem => {
            let cards = '';
            menuitem.items.forEach(function (item, index, array) {
                cards = cards + cardView.renderCard(item);
                //menuitems.push(menu[key][itemKey].name);

            });
            let accordionButton = `
        <button class="accordion menu__cat">${menuitem.menuName}</button>
        <div class="panel__accordion">
            <div class="panelgrid" id='panelgrid-${menuitem.menuName.replace(' ','-')}'>                         
                ${cards}
            </div>
        </div>
        `;

            accordionMarkup = accordionMarkup + accordionButton;

        });

        if (elements.accordionPanel !== null) {

            $(elements.userNotification).html(Window.foodApp.cart.cartItems.length);
            elements.accordionPanel.insertAdjacentHTML('afterend', accordionMarkup);
            //return accordionMarkup;
            console.log('---menu menu end---')
        }

    } else {

        menu.forEach(menuitem => {
            let cards = '';
            menuitem.items.forEach(function (item, index, array) {
                cards = cards + cardView.renderCard(item);
                //menuitems.push(menu[key][itemKey].name);
                
            });

            console.log(`.panelgrid-${menuitem.menuName.replace(' ','-')}`);

            //console.log(document.querySelector('.panelgrid-'+ menuitem.menuName));
            console.log($('#panelgrid-'+ menuitem.menuName.replace(' ','-')).html());
            $('#panelgrid-'+ menuitem.menuName.replace(' ','-')).html(cards);
            $('#panelgrid-'+ menuitem.menuName.replace(' ','-')).maxHeight =$('#panelgrid-'+ menuitem.menuName.replace(' ','-')).scrollHeight;
         
            console.log('no of cards is ' + menuitem.items.length);

        });
        console.log('loading in menu for filter data');

        // var acc = document.getElementsByClassName("accordion");
        // for (var i = 0; i < acc.length; i++)
        //     acc[i].addEventListener("click", function () {
        //         this.classList.toggle("active");
        //         var panel = this.nextElementSibling;
        //         if (panel.style.maxHeight) {
        //             panel.style.maxHeight = null;
        //         } else {
        //             panel.style.maxHeight = panel.scrollHeight + "px";
        //         }
        //     });

    }

};

