$(document).ready(function() {

	//NAV BAR
	$('#toggle2').click(function(){
	    $(this).toggleClass('fa-close');
	});

	$('#toggle').click(function(){
	    $(this).toggleClass('fa-close');
	});

	var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		toggle = document.getElementById( 'toggle' ),
		body = document.body;

	toggle.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'toggle' );
	};

	function disableOther( button ) {
		if( button !== 'toggle' ) {
			classie.toggle( toggle, 'disabled' );
		}
	}

	//ACORDEON

	// $('#accordion div.panel').hide();
	// $('#accordion h2.acc-title').click(function() {
	//     $(this).next('div.panel').slideToggle('fast').siblings('div.panel:visible').slideUp('fast');
	//     $(this).toggleClass("openit").siblings().removeClass("openit");
	// });

});
