var loadTime = false;
var allLoaded = false;

//=====[LOADING]=====
setTimeout(function(){
	loadTime = true;
	if(allLoaded) {
		hideLoading();
	}
}, 3000);

$(window).on("load", function() {
	allLoaded = true;
	if(loadTime) {
		hideLoading();
	}
});

$('#close').click(function() {
	$('#gallery-slider').fadeOut(200);
});

$('#fullscreen').click(function() {
	$('#gallery-slider .top-wrapper').toggleClass('fullscreen');
});

$("section .images-wrapper .image").each(function( index ) {
	var x = Math.floor((Math.random() * 20) + 1) / 10;
	$(this).attr("data-wow-delay",x+"s");
});

$('#gallery-slider .slider img').click(function() {
	var img = $(this).attr('src');
	$('#gallery-slider .slider img').removeClass('active');
	$(this).addClass('active');
	$('#slider-image').attr('src', img);
});

$("body").keydown(function(e){
    if((e.keyCode || e.which) == 37) {   
        prevImage();
	}
	if((e.keyCode || e.which) == 39) {
        nextImage();
    }   
});

function nextImage() {
	var n = $('#gallery-slider .slider img.active');
	if($("#gallery-slider .slider img.active").is(':last-child')) {
	} else {
		var img = $(n).next().attr('src');
		$('#slider-image').attr('src', img);
		$('#gallery-slider .slider img.active').removeClass('active').next().addClass('active');
	}
}

function prevImage() {
	var n = $('#gallery-slider .slider img.active');
	if($("#gallery-slider .slider img.active").is(':first-child')) {
	} else {
		var img = $(n).prev().attr('src');
		$('#slider-image').attr('src', img);
		$('#gallery-slider .slider img.active').removeClass('active').prev().addClass('active');
	}
}

function viewAlbum(id) {
	$('#gallery-slider').fadeIn(200);
}

function hideLoading() {
	$('#loading').fadeOut(350);
	var wow = new WOW();
	wow.init();
}