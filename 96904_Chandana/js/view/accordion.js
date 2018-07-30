import * as base from './base';

export const initAccordion = () => {
    var acc = base.elements.accordion_list;
    var i;

    // for each accordion
    for (i = 0; i < acc.length; i++) {
        // attach event listener
        acc[i].addEventListener("click", function() {
            // event listener function
            // toggle class active
            this.classList.toggle("active");
            // gets teh next sibling element and displays it
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
}