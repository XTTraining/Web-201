export default class Cart {
    constructor(){
        this.cartItems=[];

    }

    addToCart(id,img,title,price,quantity,gst,category){
        let cartItem={id,img,title,price,quantity,gst,category};
        this.cartItems.push(cartItem);
        this.persistData();

        return cartItem;

    }

    deleteCartItem(id){
        const index=this.cartItems.findIndex(el=>el.id===id);
        this.cartItems.splice(index,1);
        this.persistData();

    }
    
    incrementcartQuantity(id){
      var cartitem = this.cartItems.find(el=>el.id===id);
      cartitem.quantity=cartitem.quantity+1;
      this.persistData();
      return cartitem.quantity;
    }

    decrementcartQuantity(id){
        var cartitem = this.cartItems.find(el=>el.id===id);
         if(cartitem.quantity>0)
        {
            cartitem.quantity = cartitem.quantity-1;
        }
        this.persistData();
        return cartitem.quantity;
    }


    calculateGST(id){
        
        var cartitem = this.cartItems.find(el=>el.id===id);
         if(cartitem.category=="MainCourse")
        {
            cartitem.gst = (cartitem.price*5)/100;
        }
        else if(cartitem.category=="Snacks"){
            cartitem.gst = (cartitem.price*12)/100;
        }
        else if(cartitem.category=="beverages"){
            cartitem.gst = (cartitem.price*12)/100;
        }
        this.persistData();
        return cartitem.gst;
    }


    fetchNumCartItems(){
         return this.cartItems.length;
     }

     calculateTotal(){
        let total=0;
        let itemTotal=0;
       this.cartItems.forEach(item=>{
            itemTotal=  item.price*item.quantity + item.gst*item.quantity;
            total=total+itemTotal;
        });

        return total.toFixed(2);
     }
     persistData() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('cartItems'));
        
        // Restoring likes from the localStorage
        if (storage) this.cartItems = storage;
    }
}