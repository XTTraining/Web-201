//import { elements } from './base';

// var postData = {
//     name: name,
//     imageurl: img,
//     description: desc,
//     vergetarian: vergetarian,
//     price: price
// };
export const renderCard = (card) => {

    var item = Window.foodApp.cart.cartItems.find(function (el) { return el.id === card.id })
    var qty = 0;
    if (typeof item !== typeof undefined) {
        qty = item.count;
    }

    // console.log('----rendering card----')
    // console.log(card);

    var minusCartMarkup =
            `<button class="btn__removefromcart" data-id="${card.id}">
        <span class="btn__removefromcart-minusicon">-</span>                                              
        </button>`;
    const markup = `    
    <div class="productcard">
    <div class="productcard__image">
    
    ${qty > 0 ? `<span class="productcard__quantity" id="productcard__quantity-${card.id}">
                    <span class="productcard__quantity-number" id='productcard__quantity-number-${card.id}'>
                    ${qty}
                    </span>
                    <br>
                    <span class="productcard__quantity-text">
                    in your cart
                    </span> </span>` : ''
                
        }
        
            
                                       
        <img class="productcard__image-thumbnail" src="${card.imageurl}" alt="${card.name}" />
    </div>
    <div class="productcard__caption">
        <div class="productcard__caption-title">
        ${card.name}
        <span class="productcard__caption-dishtype ${card.vergetarian ? "icon__veg" : "icon__nonveg"}"></span>
        </div>
        <div class="productcard__caption-desc">
        ${card.description}
        </div>

    </div>
    <div class="productcard__cartoptions">
        <div class="productcard__cartoptions-price">
            ₹ ${card.price}
        </div>
        <div class="productcard__cartoptions-addtocart">

            ${ qty>0 ? minusCartMarkup :''}
            <button class="btn__addtocart" data-id="${card.id}" id="${card.id}">
                <span class="btn__addtocart-addicon">+</span>
                <span class="btn__addtocart-addtext">ADD</span>
            </button>

        </div>
    </div>
</div>
    `;

    //console.log(markup);
    return markup;
    //elements.shopping.insertAdjacentHTML('beforeend', markup);
};

