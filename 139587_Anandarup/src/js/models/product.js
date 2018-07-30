import firebase from 'firebase';



export default class Search {
    constructor(config) {
        this.config = config;
    }
    async getDataFromFirebase() {
        try {

            const app = firebase.initializeApp(this.config);
            const firebaseRef = firebase.database().ref();
            const snapShot = await firebaseRef.once('value');
            const data = snapShot.val();
            localStorage.setItem('firebasedata', JSON.stringify(data));


        } catch (error) {
            console.log(error);
        }

    };
    hydrateproducts(categoryList, productList) {
        const productMap = new Map();
        let categoryName;
        const data = productList.groupByAsMap('categoryId');
        const mapProductAsc = new Map([...data.entries()].sort((a,b) => a[0] > b[0]));

        mapProductAsc.forEach((value, key) => {
            categoryName = categoryList.find(el => parseInt(el.CategoryId) === key).CategoryName;
            productMap.set(categoryName, value);
        });
        return productMap;
    }
    getFullProductData(firebasedata, id) {
        const product = firebasedata.productList.find(el => el.id === parseInt(id));
        product.categoryName = firebasedata.categoryList.find
            (el => parseInt(el.CategoryId) === product.categoryId).CategoryName;
        const foodTypeName = firebasedata.foodType.find
            (el => el.FoodTypeValue === product.foodType).FoodTypeName;
        if (foodTypeName === 'Veg') {
            product.foodTypeName = foodTypeName;
        }
        return product;
    }
}

