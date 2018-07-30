export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const query=this.query.toLowerCase();
            this.readStorage();
            
            const searchResult=this.result.filter(function(item){
                return (item.Name.toLowerCase().indexOf(query) >=0 ? true:false);
            });
            this.result =searchResult;
        } catch (error) {
            console.log(error);
        }
    }


    readStorage() {
        const storage = JSON.parse(localStorage.getItem('products'));
        // Restoring likes from the localStorage
        if (storage) this.result = storage;
    }
}