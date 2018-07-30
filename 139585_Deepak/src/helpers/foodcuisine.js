module.exports = function (cuisine) {
    if (cuisine.indexOf('1') > -1) {
        return 'Continental';
    }
    else if(cuisine.indexOf('2') > -1) {
        return 'Indian';
    }
    else if(cuisine.indexOf('3') > -1) {
        return 'Pan-Asian';
    }else{
        return '';
    }

};
