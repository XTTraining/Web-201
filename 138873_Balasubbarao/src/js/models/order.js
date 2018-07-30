import { collections } from '../base';


export default class order {

    //API-FIREBASE API OBJECT TO CALL THE MEHTHODS.
    constructor(api) {
        this._api = api;
    }

    updateOrder(docId, qty, price) {
        if (qty !== 0) {
            const data = {
                'id': docId,
                'qty': qty,
                'price': price,
                'totalPrice': (parseInt(qty) * parseFloat(price)) + ((parseInt(qty) * parseFloat(price)) * .5),
                'tax': .5,
                'imgid': parseInt(docId)
            };
            this._api.addItem(collections.orders, docId, data)
        }
        else {
            this._api.deleteItem(collections.orders, docId)
        }
    }

    getOrderList() {
        return this._api.list(collections.orders);
    }

    async getOrderItem(docId) {
        return await this._api.getItem(collections.orders, docId);
    }
}