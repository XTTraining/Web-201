export default class cart {
    constructor() {
        this.items = [];
    }

    addFood(id) {
        try {
            var index = this.items.findIndex(x => x.id == id);
            var count = 1;
            if (index == -1) {
                const item = {
                    id,
                    count
                };
                this.items.push(item);
            } else {
                this.items[index].count++;
                count = this.items[index].count;
            }
            return count;
        } catch (error) {
            console.log(`Error in cart->addFood: ${error}`);
        }

    }
    removeFood(id) {
        try {
            var count;
            var index = this.items.findIndex(x => x.id == id);
            if (index == -1) return false;
            this.items[index].count--;
            count = this.items[index].count;
            if (this.items[index].count < 1) {
                this.items = this.items.filter(x => x.id != id);
            }
            return count;
        } catch (error) {
            console.log(`Error in cart->removeFood: ${error}`);
        }

    }
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    getCart() {
        if (localStorage.getItem('cart')) {
            this.items = JSON.parse(localStorage.getItem('cart'));
        }
    }
}
