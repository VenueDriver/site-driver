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

	$(".search-icon").on('click',function() {
	  var icon = $(this),
	      input = icon.parent().find("#search-field"),
	      submit = icon.parent().find(".submit"),
	      is_submit_clicked = false;
	  
	  // Animate the input field
	  input.animate({
	    "width": "165px",
	    "padding": "10px",
	    "opacity": 1
	  }, 300, function() {
	    input.focus();
	  });
	  
	  submit.mousedown(function() {
	    is_submit_clicked = true;
	  });
	  
	  // Now, we need to hide the icon too
	  icon.fadeOut(300);
	  
	  // Looks great, but what about hiding the input when it loses focus and doesnt contain any value? Lets do that too
	  input.blur(function() {
	    if(!input.val() && !is_submit_clicked) {
	      input.animate({
	        "width": "0",
	        "padding": "0",
	        "opacity": 0
	      }, 200);
	      
	      // Get the icon back
	      icon.fadeIn(200);
	    };
	  }); 
	});

	//ACORDEON

	// $('#accordion div.panel').hide();
	// $('#accordion h2.acc-title').click(function() {
	//     $(this).next('div.panel').slideToggle('fast').siblings('div.panel:visible').slideUp('fast');
	//     $(this).toggleClass("openit").siblings().removeClass("openit");
	// });



});
