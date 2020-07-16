$(document).ready(function(){

	//history button
	$("#his-bottom p a").click(function(){
		$("#his-bottom p a").css({"color":"#808080","background":"#efefef"});
		$(this).css({"color":"#efefef","background":"#5c5c5c"});
	});
	$("#a1999").click(function(){$("#his-panel").css({"marginTop":"0px"});});
	$("#a2005").click(function(){$("#his-panel").css({"marginTop":"-340px"});});
	$("#a2006").click(function(){$("#his-panel").css({"marginTop":"-680px"});});
	$("#a2008").click(function(){$("#his-panel").css({"marginTop":"-1020px"});});
	$("#a2011").click(function(){$("#his-panel").css({"marginTop":"-1360px"});});
	$("#a2014").click(function(){$("#his-panel").css({"marginTop":"-1700px"});});
	$("#a2015").click(function(){$("#his-panel").css({"marginTop":"-2040px"});});

	//switch button
	$("#barchar_btn").css({"color":"#efefef"});
	$(".switch a").click(function(){
		$(".switch a").css({"color":"#808080"});
		$(this).css({"color":"#efefef"});
	});

	//table_show
	$("#schedule").hide();
	$("#barchar_btn").click(function(){
		$(".table_show").fadeOut(500);
		$("#barchar").fadeIn(500);
	});
	$("#schedule_btn").click(function(){
		$(".table_show").fadeOut(500);
		//show the waterbubble with animate
		$("#schedule").fadeIn(500);
		setTimeout(function(){
			wbAnimateShow(true);
		},100)
	});

	//barchar animate
	$(".showBarcharAni").click(function(){
		barcharAni();
	});

});

//barchar animate
function barcharAni(){
	var aniTime = 1200;

	$("#bc-r-t span").css({"width":"0px"});
	$("#span-ai").animate({width:'+=18%'},aniTime);
	$("#span-apache").animate({width:'+=23%'},aniTime);
	$("#span-cad").animate({width:'+=85%'},aniTime);
	$("#span-css").animate({width:'+=86%'},aniTime);
	$("#span-html").animate({width:'+=89%'},aniTime);
	$("#span-java").animate({width:'+=10%'},aniTime);
	$("#span-js").animate({width:'+=45%'},aniTime);
	$("#span-jq").animate({width:'+=75%'},aniTime);
	$("#span-mysql").animate({width:'+=15%'},aniTime);
	$("#span-php").animate({width:'+=35%'},aniTime);
	$("#span-ps").animate({width:'+=90%'},aniTime);
	$("#span-sql").animate({width:'+=18%'},aniTime);
	$("#span-ug").animate({width:'+=73%'},aniTime);

}


