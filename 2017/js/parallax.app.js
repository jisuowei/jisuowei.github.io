$( document ).mousemove( function( e ) {
	$( '.parallax_1' ).parallax( 2	, e );
	$( '.parallax_2' ).parallax( 50	, e );
});

$.fn.parallax = function ( resistance, mouse ) 
{
	$el = $( this );
	TweenLite.to( $el, 0.2, 
	{
		x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
		y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
	});

};