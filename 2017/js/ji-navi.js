// mask
var oMask = $("<div id='ji-mask'></div>");
$('body').append(oMask);

var oMaskContent = $('<div id="ji-mask-content"><p id="loadingTip">数据加载中..</p></div>');
$(oMask).append(oMaskContent);


$(oMaskContent).click(function(event){
	event.stopPropagation()
});

function showJiMask() {
	$('#ji-mask').fadeIn(300);

	var bodyST;
	$('#ji-mask').mouseenter(function() {
		bodyST = $(window).scrollTop();
		document.onscroll = function() {
			$(window).scrollTop(bodyST);
		}
	});

	$('#ji-mask').mouseleave(function() {
		document.onscroll = function() {
			$(window).scrollTop();
		}
	});

}

function hideJiMask() {
	$('#ji-mask').fadeOut(300);
}



window.onload = function () {

// navi 生成
	(function(){

		var eNav = $('<header><nav><div id="ji-logo"></div><div id="nav-a"></div></nav></header>');
		$('body').prepend(eNav);

		var oNavi = [
			{'id':'nav-origin','value':'<i class="fa fa-dot-circle-o"></i> 历程'},
			{'id':'nav-skill','value':'<i class="fa fa-star-o"></i> 技能'},
			{'id':'nav-read','value':'<i class="fa fa-bookmark-o"></i> 阅读'},
			{'id':'nav-store','value':'<i class="fa fa-cube"></i> 收藏'},
			{'id':'nav-like','value':'<i class="fa fa-heart-o"></i> 兴趣'},
			{'id':'nav-code','value':'<i class="fa fa-folder-o"></i> 码库'},
			{'id':'nav-blog','value':'<i class="fa fa-file-text-o"></i> 日志'},
			{'id':'nav-info','value':'<i class="fa fa-info-circle"></i> 关于'}
		];

		for( var i=0; i<oNavi.length; i++ ) {
			var eA = $("<a href='javascript:;' id='" + oNavi[i].id + "'>"+ oNavi[i].value +"</a>");
			$('nav').append(eA);
		}

		// jiFooter
		$('.ji-content').append('<div id="jiFooter">© 2014-2017 Jisuowei.com&nbsp;&nbsp;奇斯威克·点燃你的狂热&nbsp;&nbsp;苏ICP证15046910号</div>');


// head 
		var eMeta = $('<meta name="keywords" content="嵇所伟, 奇斯威克, chisw, chiswick, jisuowei">');
		var eIcon = $("<link href='../img/favicon.ico' rel='shortcut icon' />");
		var eLink = $("<link rel='stylesheet' type='text/css' href='../css/font-awesome.min.css' />");

		$('head').append(eMeta,eLink,eIcon);

// 初始化 链接样式
		$('.ji-a-exhibit').prepend('<i class="fa fa-file-photo-o"></i> ');
		$('.ji-a-link').prepend(' <i class="fa fa-external-link-square"></i> ');
		$('.ji-content-img p').prepend('<i class="fa fa-caret-up"></i> ')



// backtotop
		var eBackToTop = $('<a href="javascript:;" id="backtotop"><i class="fa fa-angle-up"></i></a>');
		$('body').append(eBackToTop);
		$(eBackToTop).hide();

		$(eBackToTop).click(function() {
			$('body,html').animate( { scrollTop: 0 }, 400 );
			return false;
		});

	})();


// nav 点击跳转
	$('nav a').click(function(){
		var sLocation = $(this).attr("id").substring(4).toLowerCase();
		if (sLocation !== 'blog') {
			window.location = '../' + sLocation;
		} else {
			window.open('../blog');
		}
	});


// 当前页 导航样式
	var nNavNotation = $('title').attr('title');
	$('nav a#nav-' + nNavNotation).addClass('hover');


// logo 点击跳转 index
	$('#ji-logo').click(function(){
		window.location = '../index.html';
	});


// 滚动判断
	var jiInitTimer = 0; 
	$(window).scroll(function() { 
		if (!jiInitTimer) { 
			jiInitTimer = setTimeout(function() { 
				if ($(window).scrollTop() > 70) {
					$('header').css({'boxShadow':'0 0 24px #808080'});
					$("#backtotop").fadeIn(300);
				} else {
					$('header').css({'boxShadow':'none'});
					$("#backtotop").fadeOut(300);
				}
				jiInitTimer = 0; 
			}, 300); 
		} 
	}).trigger('scroll'); 


// 导航条变化
	$(window).resize(function(){

		if( $(window).width() < 980 ) {
			$(".ji-content").css({'left':'0','marginLeft':'0'});
		} else {
			$(".ji-content").css({'left':'50%','marginLeft':'-490px'});
		}
		
	});



}

