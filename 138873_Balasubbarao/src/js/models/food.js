import { collections } from '../base';

export default class category {

    //API-FIREBASE API OBJECT TO CALL THE MEHTHODS.
    constructor(api) {
        this._api = api;
    }

    //GET THE ALL CATEGORIES.
    getCategroyList() {
        return this._api.list(collections.category);
    }

    //GET ALL SUBCATEGORIES BY CATEGORY.
    getSubCategroyList(collectionName) {
        return this._api.list(collectionName);
    }

    //GET ALL FOOD LIST ITEMS.
    async getFoodList(order) {

        let fooditems = await this._api.list(collections.food);

        await fooditems.forEach((doc) => {

            order.getOrderItem(doc.docId).then(function (order) {
                if (order.data !== undefined) {
                    doc.data.qty = order.data.qty;
                }
            });
        });
        return fooditems;
    }

}

