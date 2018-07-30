require("jasmine-local-storage");
const map = new Map();
let localStorage;
function setLocalStorage() {

    beforeEach(function () {

        localStorage = {
            "getItem": (key) => {
                return map.get(key);
            },
            "setItem": (key, value) => {
                return map.set(key, value);
            },
            "clear": () => {
                map.clear();
            }
        };
    });
    afterEach(function () {});
}
