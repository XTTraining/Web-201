import { elements } from '../common/base';
import * as Handlers from './handlers';
import menuController from '../components/menu/menuController';
import searchController from '../components/search/searchController'

export const bindAddtoCartListner = () => {

    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++)


        $(acc[i]).unbind().on("click", function () {
            this.classList.toggle("acc--active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });

    $('.panel__accordion').unbind().on('click', '.btn__addtocart', function () {
        Handlers.addtocartHandler(this);
    });

    $('.btn__removefromcart').unbind().on('click', function () {
        Handlers.removefromcartHandler(this);
    });
}

export const bindCartControls = () => {
    $('.btn__addtocartsolid').unbind().on('click', function () {
        Handlers.updateQuantityInCart(this.id, '+');
        //alert('add');
    });

    $('.btn__removefromcartsolid').unbind().on('click', function () {
        Handlers.updateQuantityInCart($(this).attr("data-id"), '-');
        //alert('add');
    });

}

export const bindDomReadyEvents = () => {
    var menuCtrl = new menuController();
    console.log('menu controll is ');
    console.log(menuCtrl);
    // $('.panel__accordion').on('click', '.btn__addtocart', function () {
    //     Handlers.addtocartHandler(this);
    // });

    $('.hamburger').unbind().click(function () {
        //$(this).toggleClass('open');
        $('.mask').toggleClass('mask-open');
        $('.sidemenu').toggleClass('sidemenu-open');
    });
    $('.mask').unbind().click(function () {
        //$('.hamburger').toggleClass('open');
        $('.mask').toggleClass('mask-open');
        $('.sidemenu').toggleClass('sidemenu-open');
    })

    $('.switch-checkbox').unbind().change(function () {
        var filterOptions = {};
        $(this).parent().toggleClass("switch-on", 1000, "easeOutSine");
        $(this).attr("disabled", true);
        switch (this.id) {
            case 'filter1':

                $('#filter2').prop('checked', false);
                $('#filter2').parent().removeClass('switch-on');
                $('#filter2').attr('disabled', false);
                $('#filter3').prop('checked', false);
                $('#filter3').attr('disabled', false);
                $('#filter3').parent().removeClass('switch-on');
                filterOptions = {
                    vergetarian: true
                }
                break;
            case 'filter2':
                $('#filter1').prop('checked', false);
                $('#filter1').parent().removeClass('switch-on');
                $('#filter1').attr('disabled', false);
                $('#filter3').prop('checked', false);
                $('#filter3').parent().removeClass('switch-on');
                $('#filter3').attr('disabled', false);
                filterOptions = null;
                break;
            case 'filter3':
                $('#filter1').prop('checked', false);
                $('#filter1').parent().removeClass('switch-on');
                $('#filter1').attr('disabled', false);
                $('#filter2').prop('checked', false);
                $('#filter2').parent().removeClass('switch-on');
                $('#filter2').attr('disabled', false);
                filterOptions = {
                    vergetarian: false
                }
                break;

        }


        menuCtrl.filterkey(filterOptions);
    });

    $(elements.userNotification).html(Window.foodApp.cart.cartItems.length);

    $('.tablinks').unbind().click(function (evt) {

        let cityName = $(this).attr("data-id");
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = "tabcontent hide";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" current", "");
        }
        document.getElementById(cityName).className = "tabcontent";
        evt.currentTarget.className += " current";

    });

    let search = new searchController();
    let msg1 = `Enter at least 3 character to search`;

    //alert('search called'); 
    $('.search__button').unbind().on('click', function (event) {

        event.preventDefault();
        let searchKeyWord = $('.search__input').val();
        if (searchKeyWord.length > 2) {

            let searchData = search.search(searchKeyWord);
            let searchMsg = `${searchData.resultCount} item found for ${searchKeyWord}`;

            $('.search__message-text').removeClass('u-hide')
                .removeClass('u-alert')
                .addClass('u-alert')
                .html(searchMsg);
            $('.search__message-row').removeClass('u-hide');

            if (searchData.resultCount == 0) {

                $('.filter').remove();
                $('.checkoutrow').remove();


            } else {
                menuCtrl.loadmenu(searchData, false);

            }



            //alert('search called');
        } else {

            $('.search__message-text').removeClass('u-hide')
                .removeClass('u-alert')
                .addClass('u-alert')
                .html(msg1);




        }

    });
}