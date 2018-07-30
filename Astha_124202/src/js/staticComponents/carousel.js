var slideIndex = 1;
showDivs(slideIndex);

if(document.getElementById('prev')){
	document.getElementById('prev').addEventListener('click', function () {
		var n = -1;
		showDivs(slideIndex += n);
	});
}


if(document.getElementById('next'))
{
	document.getElementById('next').addEventListener('click', function () {
		var n = 1;
		showDivs(slideIndex += n);
	});
	
}


function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("carousel__slide--image");
	if (n > x.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = x.length }
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	if(x[slideIndex - 1])
	{x[slideIndex - 1].style.display = "block";}
	
}
