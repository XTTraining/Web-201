module.exports = function (object) {
    if (object.indexOf('3') > -1) {
        return 'starter';
    } else if (object.indexOf('4') > -1) {
        return 'main';
    } else if (object.indexOf('5') > -1) {
        return 'beverages';
    } else {
        return '';
    }
};
