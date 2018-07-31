
export default class order{
    constructor() {
    }
    checkout(){
        this.calculateSubTotal();
    }
    calculateSubTotal(){
        // iterate the cart and calculate the subtotal
        let cartStorage = JSON.parse(localStorage.getItem('cartItems'));
        let total = 0;
        let gstAmount = 0; 
       
        if(cartStorage.length > 0)
        {
            cartStorage.forEach(el => {
                let totalprice = (el.qty * el.price);
                total += totalprice;
                let gst = 0;
                if(el.categoryid === 5) // eg. beverages has 12% GST
                {
                    gst = parseFloat(((el.price * 12)/100).toFixed(2));
                }
                else{
                    gst = parseFloat(((el.price * 4)/100).toFixed(2));
                }
                gstAmount += gst;
            });
            this.subTotal = total;
            this.gst = gstAmount.toFixed(2);
            this.totalAmount = (this.subTotal + gstAmount).toFixed(2);
            this.cart = cartStorage;
            this.count = cartStorage.length;
        }
        else{
            this.subTotal = 0;
            this.gst = 0;
            this.totalAmount =0;
            this.cart = cartStorage;
            this.count = 0;
        }
    }

}
