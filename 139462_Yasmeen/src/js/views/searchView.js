
import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = "";

// const selectedCategories=[];
export const bindFoodItems = recipes => {


    var theTemplateScript = $("#food-template").html();

    var theTemplate = Handlebars.compile(theTemplateScript);

    var context = { items: recipes }

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.category_main').html(theCompiledHtml);

   
    if (localStorage.getItem('cartItems')) {
        let cartStorage = JSON.parse(localStorage.getItem('cartItems'));

        if (cartStorage) {
            cartStorage.forEach(function (el) {
                let qtyVal = el.qty;
                let id =  el.ItemId;
                $(`#qty_${id}`).text(qtyVal);
                $('#btn__add-cart_' + id).hide();
                $('#btn__update_' + id).css('opacity', 1);
            });
        }
    }

}


export const  bindFoodCategories = categories =>{
    var theTemplateScript = $("#category-template").html();
    
    var theTemplate = Handlebars.compile(theTemplateScript);
     
    var context = {items: categories}
   
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    
    // Add the compiled html to the page
    $('.category_container').html(theCompiledHtml);
}





