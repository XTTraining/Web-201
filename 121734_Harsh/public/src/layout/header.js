import * as variable from "../base/variable.js";

const cssclassname = new variable.cssclassname().getcssclassname();

$(document).ready(function () {
    $(document).delegate(cssclassname.headermenu, 'click', function (event) {
        $(this).addClass(cssclassname.oppenned);
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function (event) {
        $(cssclassname.headermenu).removeClass(cssclassname.oppenned);
    })
    $(document).delegate(cssclassname.clear, 'click', function (event) {
        $(cssclassname.headermenu).removeClass(cssclassname.oppenned);
        event.stopPropagation();
    });
});