import axios from 'axios';
export class Payment {

integrate(customeEvent)
{
   let client_token = "";

  const prom =  axios.get('http://brainserver.azurewebsites.net/gettoken')
  .then(function(response) {
    // handle success
    client_token = response.data;
  })
  .catch(function (error) {
    return "error";
  })
   var form = document.querySelector('#payment-form');
   var b = Promise.all([prom]).then(values => {
   braintree.dropin.create({
       authorization: client_token,
       container: '#bt-dropin',
       card: {
        overrides: {
          styles: {
            input: {
              color: '#959595',
              'font-size': '18px'
            },

          }
        }
      },
       paypal: false
       
   }, function (createErr, instance) {
       form.addEventListener('submit', function (event) {
           event.preventDefault();

           instance.requestPaymentMethod(function (err, payload) {
               if (err) {
                  if(!document.querySelector('#cod').checked)
                   return;
                   else
                   {
                    document.querySelector(".message").style.display="block";
                    document.querySelector(".food__btn").style.display="none";
                    customeEvent();
                   }
               }

               // Add the nonce to the form and submit
               document.querySelector('#nonce').value = payload.nonce;
               const payment = axios.post('http://brainserver.azurewebsites.net/makepayment', {
                amount: document.querySelector('.grandTotal').innerHTML,
                payment_method_nounce: document.querySelector('#nonce').value
              })
              .then(function (response) {
                console.log(response);
                document.querySelector(".message").style.display="block";
                document.querySelector(".message").innerHTML =`Payment Sucessfull.  Order Received`;
                    document.querySelector(".food__btn").style.display="none";
                    customeEvent();
              })
              .catch(function (error) {
                console.log(error);
              });

           });
       });});
   });
}
}