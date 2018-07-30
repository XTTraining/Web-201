import { elements,elementStrings} from './base';
import template  from '../../hbs/template.hbs';
import cartItemtemplate from '../../hbs/cartItemtemplate.hbs';
import orderListTemplate from '../../hbs/orderListTemplate.hbs';
export var count=0;

export const renderFoodItems = (foodItem,element) => {
     if(element){
        element.insertAdjacentHTML('beforeend', template(foodItem)); 
    }
    
   }


export const renderResults= foodItem=>{
    if(elements.mainMenuInput)
    {
        var elementIdArr =elements.mainMenuInput.id.split("-");
        var elementId= elementIdArr[0]+'-'+foodItem["key"];
        var element= document.getElementById(elementId); 
    }
      for(var prop in foodItem)
    {
      if(prop!=="key")
      {
        renderFoodItems(foodItem[prop],element);
      }
       
    }
 
};  



export const hideShowDiv= element=>{
    if (element.innerHTML!="") {
        element.className += " show";
    } else {
        element.className = element.className.replace(" show", "");
            }
    count=0;
};


export const openCart = ()=>{

if(elements.popUp){
    elements.popUp.style.display="block";
}

};


export const closeCart = ()=>{
    if(elements.popUp){
        elements.popUp.style.display="none";
    }
    
    };


 
export const renderCartItems = (cartItem) => {
  
    if(elements.cartItems){
        elements.cartItems.insertAdjacentHTML('beforeend', cartItemtemplate(cartItem)); 
    }
}

export const renderOrderListItems = (cartItem) => {

    if(elements.orderedItems){
        elements.orderedItems.insertAdjacentHTML('beforeend', orderListTemplate(cartItem)); 
    }
}

//method to show inc/dec button on addToCart Click 
export const hideShowButton = (item)=>{
        if(document.getElementById(elementStrings.cardButton + '-' + item['id'])){
            document.getElementById(elementStrings.cardButton + '-' + item['id']).style.display = "none";
        }
        if(document.getElementById(elementStrings.cardQuantity + '-' + item['id'])){
        document.getElementById(elementStrings.cardQuantity + '-' + item['id']).style.display = "block";
        }
        if(item['quantity']!==undefined && item['quantity']!==NaN && (item.quantity > 0)){
            if(document.getElementById(elementStrings.cardInput + '-' + item['id'])){
            document.getElementById(elementStrings.cardInput + '-' + item['id']).value =item['quantity'];
            }
           
        }
       
         
        
    }


//method to show addToCart button when quantity is 0  on load
export const showAddtoCartButton = (id)=>{
     
        if(document.getElementById(elementStrings.cardQuantity+ '-' + id))
        {document.getElementById(elementStrings.cardQuantity+ '-' + id).style.display = "none";
        }

        if(document.getElementById(elementStrings.cardButton + '-' + id)){
        document.getElementById(elementStrings.cardButton + '-' + id).style.display = "block";
        }
}


//method get category element
export const fetchCategoryElement = (category)=>{
    let elementIdArr = elements.mainMenuInput.id.split("-");
    let element = document.getElementById(elementIdArr[0] + '-' + category["key"]);
     return element;
}


export const showIncDecButton = (id)=>{
    
        document.getElementById(elementStrings.cardQuantity+ '-' + id).style.display = "block";
        document.getElementById(elementStrings.cardButton + '-' + id).style.display = "none";
    
}

export const fetchId=(element)=>{
    let elementArr = element[0].parentElement.id.split('-');
    return elementArr[2];
}



