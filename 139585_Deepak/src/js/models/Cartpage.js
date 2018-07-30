export default class Cartpage {
    constructor() {
        this.cart = [];
        this.items = [];
        this.priceBreakdown = {};
    }

    getCartItems() {
        try {
            var cart = localStorage.getItem('cart');
            var items;
            const _this = this;
            if (cart) {
                cart = JSON.parse(cart);
                _this.cart = cart;
                //Get detailed items from local storage
                var fire = localStorage.getItem('fire');
                if (fire) {
                    fire = JSON.parse(fire);
                    // items = fire.items.filter(x => (_this.cart.findIndex(y => y.id == x.id) > -1));
                    //                items = $.map(fire.items, function (x) {
                    //                    return (_this.cart.findIndex(y => y.id == x.id) > -1)
                    //                });

                    items = fire.items.filter(x => (_this.cart.findIndex(y => {
                        if (y.id == x.id) {
                            x.count = y.count;
                            return true;
                        } else {
                            return false;
                        }
                    }) > -1));
                }
                this.items = items;
            }
        } catch (error) {
            console.log(`Error in Cartpage->getCartItems: ${error}`);
        }

    }

    updatePriceBreakdown(data) {
        const taxList = data.Tax;
        this.priceBreakdown.list = [];
        this.cart.forEach((i) => {
            var price = getPrice(data.items, i.id);
            var tax = getTax(data, i.id);
            if (price, tax) {
                var model = getPriceModel(i.id, i.count, price, tax.value, tax.id);
                this.priceBreakdown.list.push(model);
            }
        });
    }

    calculateTaxAndTotal() {
        try {
            var list = this.priceBreakdown.list;
            var itemTotal = 0;
            var tax1 = 0;
            var tax2 = 0;
            var total = 0;
            if (list) {
                list.forEach((l) => {
                    itemTotal = itemTotal + (l.price * l.count);
                    if (l.taxId == 1) {
                        tax1 = tax1 + l.taxTotal();
                    }
                    if (l.taxId == 2) {
                        tax2 = tax2 + l.taxTotal();
                    }

                });
                total = itemTotal + tax1 + tax2;
                this.priceBreakdown.itemTotal = itemTotal.toFixed(2);
                this.priceBreakdown.tax1 = tax1.toFixed(2);
                this.priceBreakdown.tax2 = tax2.toFixed(2);
                this.priceBreakdown.finalTotal = total.toFixed(2);
            }
        } catch (error) {
            console.log(`Error in Cartpage->calculateTaxAndTotal: ${error}`);
        }

    }

    savePriceBreakdown() {
        try {
            var status = false;
            if (this.priceBreakdown) {
                localStorage.setItem('recipt', JSON.stringify(this.priceBreakdown));
                status = true;
            }
            return status;
        } catch (error) {
            console.log(`Error in Cartpage->savePriceBreakdown: ${error}`);
        }

    }
    getPriceBreakdown() {
        try {
            if (localStorage.getItem('recipt')) {
                this.priceBreakdown = JSON.parse(localStorage.getItem('recipt'));
            }
        } catch (error) {
            console.log(`Error in Cartpage->getPriceBreakdown: ${error}`);
        }

    }
}

function getPriceModel(id, count, price, tax, taxid) {
    return {
        id: id,
        count: count,
        price: price,
        tax: tax,
        taxId: taxid,
        priceWithTax: function () {
            const total = (this.price * this.count) * (1 + (this.tax / 100));
            return total;
        },
        taxTotal: function () {
            const taxTotal = (this.price * this.count) * (this.tax / 100);
            return taxTotal;
        }
    };
}

function getPrice(items, id) {
    var p;
    items.forEach((item) => {
        if (item.id == id) p = item.price;
    });
    return p;
}

function getTax(data, id) {
    var t;
    var TAX = {};
    var cat;
    data.items.forEach((item) => {
        if (item.id == id) cat = item.category;
    });
    if (cat.indexOf('3') > -1 || cat.indexOf('4') > -1) t = 1;
    if (cat.indexOf('5') > -1) t = 2;
    if (t) {
        data.Tax.forEach((tax) => {
            if (tax.id == t) {
                TAX.value = tax.value;
                TAX.id = tax.id;
            }
        });
    }
    return TAX;
}
