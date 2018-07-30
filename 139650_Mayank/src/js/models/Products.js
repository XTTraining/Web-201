import firebase from 'firebase';


export default class Products {

    // get all products from firebase
    async getAllProducts() {
        try {
            const eventref = firebase.database().ref('Products');
            const snapshot = await eventref.once('value');
            const value = snapshot.val();
            this.result = value;

            // Perist data in localStorage
            this.persistData();

        }
        catch (error) {
            console.log(`Product Model:${error}`);
        }
    }

    // store data in local storage
    persistData() {
        localStorage.setItem('products', JSON.stringify(this.result));
    }

    // get products by category id
    getProductsByCatId(catId) {
        let filteredProd;
        if (catId != null && catId.length > 0) {
            filteredProd = this.result.filter(function (item) {
                const categoryId = item.CatId;
                return ((catId.indexOf(categoryId) >= 0) ? true : false);
            });
            this.filterProdResult = filteredProd;
        }
        else {
            this.filterProdResult = this.result;
        }
    }

    // get product by product id 
     getProductByProductId(productId) {
        if(this.result!=null){
            return this.result.find(item => {
                return item.ID == productId;
            });
        }
    }

}