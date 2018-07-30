export default class Search {
    constructor() {
        this.results = [];
    }

    item(allItems, key) {
        try {
            const _this = this;
            if (key) {
                var regex = new RegExp(key, 'i');
                $.each(allItems, function (key, val) {
                    if (val.name.search(regex) != -1) {
                        _this.results.push(val);
                    }
                });
            }
        } catch (error) {
            console.log(`Error in Search->item: ${error}`);
        }
    }

}
