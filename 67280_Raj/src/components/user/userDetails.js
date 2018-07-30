//import { elements } from "./elements";
//import { Cart } from "./cart";

export class UserDetails {

renderUserData(parentElement){
   
    const markup = `
    <div class="main-container">
    <h2 class="order-details-header">User Details</h2>
    <form id="payment-form" method="post" action="#">
      <div class="form-container">
          <div>
              <label class="control-label required" for="name">Name
              </label>
              <input type="text" name="name" id="name" maxlength="25"maxlength="25" required>
          </div>
          <div>
              <label class="control-label required" for="email">Email
              </label>
              <input type="email" name="email" id="email" maxlength="25" required>
          </div>
          <div>

              <label class="control-label required" for="mobile" >Mobile
              </label>
              <div>
                  <input type="text" pattern="[0-9]{10}" title="Please enter valid mobile number" name="mobile" id="mobile" maxlength="10" required>
              </div>
          </div>
      </div>

      <div class="personal-details"></div>

      <div class="address">
          <div>
              <label class="control-label required" for="addressLine1">Flat No. / House No.
              </label>
              <input type="text" name="addressLine1" id="addressLine1" maxlength="40" required>
          </div>
          <div>
              <label class="control-label required" for="addressLine2">Apartment / Locality name.
              </label>
              <input type="text" name="addressLine2" id="addressLine2" maxlength="30" required>
          </div>
      </div>
      <div class="payment">
      <div>
      <fieldset class="payment-method">
      <legend>Payment Method</legend>
          <input type="radio" name="payment" id="cod" class="cod" value="cod">
          <label  for="cod"> Cash on Delivery (COD)
          </label>
          <div>
          <div>
          <input type="radio" name="payment" id="cc" class="cod" value="card">
          <label for="cc"> Credit Card (COD)</label>
          </div>
          </div>
          </fieldset>  
          <div class="bt-drop-in-wrapper">
                   <div id="bt-dropin"></div>
        </div>
               <input id="nonce" name="payment_method_nonce" type="hidden" />
               <button class="food__btn" type="submit" name="submit">confirm order</button>
            </form>
  </div>

   `

parentElement.insertAdjacentHTML('beforeend', markup);
const radioInput = parentElement.querySelectorAll('input');
radioInput.forEach(item=>item.onclick=this.clickHandler);
}
clickHandler(event)
{
    if(event.target.value=="card")
    {
        document.querySelector(".bt-drop-in-wrapper").style.display="block";
    }
    else
    {
        document.querySelector(".bt-drop-in-wrapper").style.display="none";
    }
}
}