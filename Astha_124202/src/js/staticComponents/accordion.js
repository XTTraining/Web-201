import $ from "jquery";

function expand(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf(" show") == -1) {
        x.className += " show";
    } else {
        x.className = x.className.replace(" show", "");
    }
}



    $(".categories__button").click(e=> {
        let id=e.target.id;
        id= id.replace("--button","");
        expand(id);
        
	});



