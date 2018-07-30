import * as variable from "../base/variable.js";

const cssclassname = new variable.cssclassname().getcssclassname();

var controller = (function () {
    var slideIndex = 0;
    var imagecarosuel = function () {
        var slides = document.querySelectorAll(cssclassname.slideshowcontainerslides);
        var dots = document.querySelectorAll(cssclassname.slidesdotitem);
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = cssclassname.displaynone;
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(cssclassname.active, "");
        }
        slides[slideIndex - 1].style.display = cssclassname.displayblock;
        dots[slideIndex - 1].className += cssclassname.active;
        setTimeout(imagecarosuel, 3500); // Change image every 3.5 secondss
    }

    window.onload = imagecarosuel;
    return {
        init: function () {}
    };
})();

controller.init();