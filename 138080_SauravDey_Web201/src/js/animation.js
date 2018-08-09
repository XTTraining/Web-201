let myIndex = 0;

function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if(x.length>0)
    {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
          }
          myIndex++;
          if (myIndex > x.length) {myIndex = 1}    
          x[myIndex-1].style.display = "block";  
          setTimeout(carousel, 2500); 
    }       
}

function accordion(thisAccordion,e)
{
    thisAccordion.classList.toggle("active");
    let panel = thisAccordion.nextElementSibling;
    if (panel.classList.contains("menu-item")) {
        panel.classList.remove("menu-item");
    } else {
        panel.className += ' menu-item ';
    }
}
export { carousel,accordion};

