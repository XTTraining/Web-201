import { elements, renderLoader, clearLoader } from './base';
var cartSummaryTemplate = require("./helpers/cartSummary.hbs");
var cartItemTemplate = require("./helpers/cartTemplate.hbs");
var likeItemTemplate = require("./helpers/likeTemplate.hbs");

export const renderCart = (data) => {      
      renderCartData(data);
      renderLikeData(data);
}

//This method uses handlebars template to render cart header
export const renderCartSummary = (bag) => {
    //populate Cart summary using handlebars template      
    elements.cartHeader.insertAdjacentHTML('beforeend', cartSummaryTemplate(bag));
}

//This method uses handlebars template to populate 
export const renderCartData = (bag) => {
    var cartData = bag.Cart.cart;
    
    //convert and object to array to be used with handlebars
    var cartArray = new Array();
    for(var i=0; i<cartData.length; i++) { 
        cartArray.push(cartData[i].ISBN); 
    }
    
    //populate search results using handlebars template and data
    elements.cartHeader.innerHTML = cartItemTemplate(cartArray);   
    
    renderCartSummary(bag);
}

export const renderLikeData = (bag) => {
    
    var likeItems = bag.Like.likes;
    if(likeItems  && likeItems.length > 0){
        
        //convert and object to array to be used with handlebars
        var likeArray = new Array();
        for(var i=0; i<likeItems.length; i++) { 
            likeArray.push(likeItems[i].ISBN); 
        }
        
        //populate search results using handlebars template and data
        elements.cartHeader.insertAdjacentHTML('beforeend', likeItemTemplate(likeArray));
    }
}


