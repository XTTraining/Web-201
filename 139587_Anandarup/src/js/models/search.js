
export default class Search {
    constructor(query, dataSet) {
        this.query = query;
        this.dataSet = dataSet;
    }

    getResults() {
        try {
           const matchedProducts = this.dataSet.productList.filter(el=>{
             return el.ProductName.toLowerCase().indexOf(this.query) !== -1;
           });
           this.matchedProducts = matchedProducts;
        } catch (error) {
            alert(error);
        }
    }
    getCategories() {
        try {
            this.matchedCategories = [];
            this.matchedProducts.forEach(element => {
                this.matchedCategories.push(this.dataSet.categoryList.find(el=> {
                  return  parseInt(el.CategoryId) === element.categoryId;
                }));    
            });
            this.matchedCategories = this.matchedCategories.filter((x, i, a) => a.indexOf(x) == i);
         } catch (error) {
             alert(error);
         }
    }
}