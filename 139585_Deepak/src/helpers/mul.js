module.exports = function (rate, quant) {
var a = parseInt(rate);
var b = parseInt(quant);
if(a && b){
    return a*b;
}else{
    return 0;
}
};
