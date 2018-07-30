export class Route {

    constructor() {}

    static getPage() {
        const arr = window.location.pathname.trim().split('/');
        if (arr[1].length > 0) {
            return arr[1].split('.')[0];
        } else {
            return 'home';
        }
    }
}
