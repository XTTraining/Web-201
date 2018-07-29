export default class filter {
    constructor() {
        this.categoryFilter = [];
        this.cuisineFilter = [];
    }
    category(id, _this) {
        try {
            var done = false;
            if (id && _this.hasClass('active')) {
                this.categoryFilter.push(id);
                done = true;
            } else {
                this.categoryFilter = this.categoryFilter.filter(x => x != id);
                done = true;
            }
            return done;
        } catch (error) {
            console.log(`Error in filter->category: ${error}`);
        }

    }
    cuisine(id, _this) {
        try {
            var done = false;
            if (id && _this.hasClass('active')) {
                this.cuisineFilter.push(id);
                done = true;
            } else {
                this.cuisineFilter = this.cuisineFilter.filter(x => x != id);
                done = true;
            }
            return done;
        } catch (error) {
            console.log(`Error in filter->cuisine: ${error}`);
        }

    }
}
