export class CartItem{
    constructor(item, id, size, qty, time)
    {
        this.id = id;
        this.item = item;
        this.qty = qty;
        this.size = size;
        this.price = item.price[size];
        this.time = time;
    }
}