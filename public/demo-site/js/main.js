$(document).ready(function() {

	// HEADER FIXED

	$(window).scroll(function(){
	    if ($(window).scrollTop() >= 10) {
	       $('.header').addClass('fixed-header');
	    }
	    else {
	       $('.header').removeClass('fixed-header');
	    }
	});

	// MENU

	$('#toggle').click(function(){
		$('.navbar').toggleClass('opened');
	});
	$('#close').click(function(){
		$('.navbar').removeClass('opened');
	});


	// SLIDER TOP

	$('.owl-home').owlCarousel({
	    loop:true,
	    margin:0,
	    nav:true,
		smartSpeed: 1000,
		items: 1,
		onInitialized: function(current) {
        $('.owl-home').find('video').get(0).play();
    },
		autoplay: false,
		navText: false
	});

	$('.owl-events').owlCarousel({
	    loop:true,
	    margin:20,
	    nav:false,
		autoplay: true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
			1000:{
	            items:3
	        },
	    }
	});

	//GALERIA DE IMAGENES

	$(".gallery").lightGallery();

});
