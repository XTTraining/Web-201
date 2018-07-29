import { constants, elements, renderLoader, clearLoader } from './base';


//This method updates the count of likes in notification
export const updateLikes = (likesCount) => {
    if(likesCount > 0){
        // update likes count on notification header
        elements.display_notification_likes.innerHTML = likesCount;    
    } 
}

//This method updates the count of cart in notification
export const updateCart = (cartCount) => {
    if(cartCount > 0){
        // update cart item count on notification header
        elements.display_notification_cart.innerHTML = cartCount; 
    }  
}



