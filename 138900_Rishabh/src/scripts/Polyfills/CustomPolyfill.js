export class Polyfills {
    static forEachPolyfill() {
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = function (callback, params) {
                params = params || window;
                for (var i = 0; i < this.length; i++) {
                    callback.call(params, this[i], i, this);
                }
            };
        }
    }

    static scrollBy() {
        if (!Element.prototype.scrollBy) {
            Element.prototype.scrollBy = function (params){
                this.scrollLeft = params.left;
            };
        }
    }
}
