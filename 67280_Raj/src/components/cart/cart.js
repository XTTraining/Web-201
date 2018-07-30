import {beverageTax, foodTax, currency} from "./config"
export class Cart {

    constructor() {
        this.Items = [];
        this.cartTotal=0;
        this.cartTax=0;
        this.grandTotal=0
        this.currency = currency;
        this.totalItemCount=0;
    }

    update(item) {
        var oldItem = this.Items.findIndex(cItem => cItem.id == item.id)
        console.log(oldItem);
        if (oldItem != -1) {
            console.log("found")
            this.Items[oldItem].count = item.count;
            return;
        }
        console.log('in new')
        this.Items.push(item)
    }
    remove(item) {
        var index = this.Items.findIndex(cItem => cItem.id == item.id)
               if (index != -1) {
            console.log("found")
            this.Items.splice(index,1);
            return;
        }
        this.Items.push(item)
    }
    reconcile(data)
    {
        this.cartTotal=0;
            this.cartTax=0;
            this.grandTotal = 0;
        this.totalItemCount=0;

        this.Items.forEach(item => {
           const index = data.findIndex(dataItem => dataItem.id == item.id);
        
            item.title = data[index].title;
            item.unitCost = data[index].price;
            item.image  = data[index].photoSmall
            item.totalCost = item.count * item.unitCost;
            item.tax = item.totalCost * (item.foodType ==="f" ? foodTax: beverageTax);
            
        this.totalItemCount+=item.count;
            this.cartTotal+=item.totalCost;
            this.cartTax+= item.tax;
            this.grandTotal = this.cartTotal + this.cartTax;

        });
    }
    restoreState(cartData)
    {
        this.Items = cartData.Items;
        this.cartTax = cartData.cartTax;
        this.cartTotal = cartData.cartTotal;
        this.grandTotal = cartData.grandTotal;
        this.totalItemCount=cartData.totalItemCount;

    }

}
export class CartItem {

    constructor(id, count) {
        this.id = id;
        this.count = parseInt(count);

        this.image = "";
        this.unitCost=0;
        this.totalCost=0;
        this.title ="";
        this.tax=0;
    }

}