module.exports = function (object) {
    if (object.indexOf('1') > -1) {
        return 'veg';
    } else {
        return 'n-veg';
    }
};
