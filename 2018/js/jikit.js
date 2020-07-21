/*
	
	jikit.js Jikit v1.0 2017/1/12 0:46
	(c)jisuowei.com

	001 Navzoom
	002 Article
	003 Exhibit
	004 Paginator

*/


var Jikit = {


a: function (a) {
	if( a ) {
		alert( a );
	} else {
		alert('Hi');
	}
},

log: function (a) {
	console.log(a);
},

info: function (opacity) {

	if(!opacity){opacity = 0.2;}

	var oInfoDiv = document.createElement('div');

	$(oInfoDiv).css({
		'width':'100%',
		'height':'2rem',
		'background':'rgba(0,0,0,'+ opacity +')',
		'color':'#fff',
		'lineHeight':'2rem',
		'position':'fixed',
		'top':'0',
		'zIndex':'99999999999999'
	});

	$(oInfoDiv).html( "W:" + $(window).width() + " H:" + $(window).height() );

	$('body').append(oInfoDiv);
},

addOnload: function( newFunction ) {
	var oldOnload = window.onload;  // 将已经设置了的 window.onload 保存 如果没有设置也无碍
	if( typeof oldOnload == "function" ) {  // 对象探测 是否有 window.onload 存在
		window.onload = function() {
			if(oldOnload) {  // 如果设置了 window.onload 就执行
				oldOnload();
			}
			newFunction();  // 执行完 window.onload 就执行传递进来的函数
		}
	} else {  // 不存在已设置的 window.onload 就执行传递进来的函数
		window.onload = newFunction;
	}
},

ajax: function ( url, fnSucc, fnFaild ) {
	//1.创建Ajax对象
	var oAjax = null;
	if( window.XMLHttpRequest ) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject( "Microsoft.XMLHTTP" );
	}
	//2.连接服务器
	oAjax.open('GET', url, true);
	//3.发送请求
	oAjax.send();
	//4.接收服务器的返回
	oAjax.onreadystatechange = function () {
		if( oAjax.readyState == 4 )	{  //完成
			if( oAjax.status == 200 ) {  //成功
				fnSucc( oAjax.responseText );
			} else {
				if( fnFaild ) {
					fnFaild( oAjax.status )
				}
			}
		}
	}
},

imgFreeze: function () {
	$('img').attr({'ondragstart':'return false;','oncontextmenu':'return false;'});
},

addHead: function(url){
	$('head').append($(url));
},

addFAIcon: function (selector,iconSuffix) {
	$(selector).prepend(' <i class="fa fa-'+ iconSuffix +'"></i> ');
},


// 001
Navzoom: {

	pos: 0,

	init: function(selector,titles,ox) {

		if(ox) {
			$(selector).append($('<div id="Jikit_Navzoom"></div>'));
			
			var html = 	'<span class="before"></span>'
					+	'<div id="Jikit_Navzoom_scroller">'
						+	'<span id="Jikit_Navzoom_indicator"></span>'
						+	'<div id="Jikit_Navzoom_container"></div>'
					+	'</div>'
					+	'<span class="after"></span>';

			$('#Jikit_Navzoom').html(html);

			for(var i=0;i<titles.length;i++){
				$('#Jikit_Navzoom_container').append( $('<a href="javascript:;">'+ titles[i] +'</a>') );
			}

			$('#Jikit_Navzoom_container a').click(function(){
				var index = $(this).index();
				Jikit.Navzoom.updateIndicator(index);
				var top = $(".title_1")[index].offsetTop;
				$('body,html').animate({scrollTop: top },200);
			});

			$('#Jikit_Navzoom_scroller').preventScroll();
		}

	},

	updateIndicator: function(index) {
		// 设置 Jikit_Navzoom_indicator 距离差
		var dis = 8;
		// 获取当前 offsetTop
		var n = $("#Jikit_Navzoom_container a")[index].offsetTop;
		// Jikit_Navzoom_indicator 动画
		$("#Jikit_Navzoom_indicator").animate({top: n + dis},100);

		// 同时更新 scroll滑块位置
		if( n != Jikit.Navzoom.pos ) {
			$("#Jikit_Navzoom_scroller").animate({scrollTop:n + dis -100},300);
			Jikit.Navzoom.pos = n;
		}
	}
},  // Navzoom end

// 002
Article: {

	init: function(id,ox) {

		$.getJSON('../../static/json/'+ id +'.json', function(data) {

			var titles = [];

			for(var i=0;i<data.length;i++){

				titles.push(data[i].title);

				var html = '';

				html += '<p class="title_1">'+ data[i].title +'<span> '+ data[i].sub +'</span></p>';

				for(var j=0;j<data[i].body.length;j++) {

					if(data[i].body[j].type == 'img') {
						html += '<div class="img_1">';
							html += '<img src="'+ data[i].body[j].url +'" />';
							html += '<p>' + data[i].body[j].sub + '</p>';
						html += '</div>';
					} else {
						html += '<div class="paras">';
						for(var k=0;k<data[i].body[j].paras.length;k++) {
							html += '<p>' + data[i].body[j].paras[k] + '</p>';
						}
						html += '</div>';
					}
				}

				$('#mid').append($(html));

			}

			Jikit.Navzoom.init('#sider',titles,ox);

			Jikit.imgFreeze();
			Jikit.addFAIcon('.img_1 p','caret-up');
			Jikit.addFAIcon('.ji-a-link','external-link-square');
			Jikit.addFAIcon('.Jikit_Exhibit','file-photo-o');


			$('.Jikit_Exhibit').click(function(){
				var url = $(this).attr('data');
				$.getJSON('../../static/json/'+ url +'.json', function(data) {
					Jikit.Exhibit.init(data);
				});
			});



		});
	}

},  // Article

// 003
Exhibit: {
	init: function(aImgs) {

		// 创建遮罩
		$('body').append($('<div id="ji-exh-mask" oncontextmenu="return false;"></div>'));
		$("#ji-exh-mask").fadeIn(300);
		$('#ji-exh-mask').preventScroll();

		setTimeout(function(){

			var html = '<div id="ji-exh-container">'
			+ '<div id="ji-exh-imgDiv-load-tip"><i class="fa fa-spinner"></i></div>'
			+ '<div id="ji-exh-imgDiv">'
				+ '<span></span><img ondragstart="return false;" oncontextmenu="return false;" />'
				+ '<i id="ji-exh-top-prev"><i class="fa fa-chevron-left"></i></i>'
				+ '<i id="ji-exh-top-next"><i class="fa fa-chevron-right"></i></i>'
			+ '</div>'
			+ '<p id="ji-exh-desc"><i></i><span></span></p>'
			+ '<div id="ji-exh-pnl-bg"></div><div id="ji-exh-pnl"><div id="ji-exh-pnl-wrap"></div></div>'
			+ '<span id="ji-exh-pnl-prev"><i class="fa fa-angle-double-left"></i></span>'
			+ '<span id="ji-exh-pnl-next"><i class="fa fa-angle-double-right"></i></span>'
			+ '<span id="ji-exh-close"><i class="fa fa-close"></i></span>'
			+ '<p id="ji-exh-tips">Jikit.Exhibit v2017/1/23; (c)jisuowei.com.</p>'
			+ '</div>';
			$('#ji-exh-mask').html(html);


			// 初始化 缩略图
			for(var i=0; i<aImgs.length; i++) {
				$('#ji-exh-pnl-wrap').append($('<div class="ji-exh-avatar"><i class="fa fa-spinner"></i><div class="ji-exh-avatar-img" style="background-image:url('+ aImgs[i].src +')"></div></div>'));
			}

			// 根据 aImgs.length 控制 wrap 宽度
			$("#ji-exh-pnl-wrap").css({'width':aImgs.length*58 + 20});

			// 初始化/标记 选中缩略图索引
			var currIndex = 0;


			// 通过传入计算出的距离n 更新 wrap 位置
			function updateWrapPos(n) {
				// 查询 margin-left 最小（即能往左滑动的最大）值
				var maxLeft = $('#ji-exh-pnl-wrap').width() - $('#ji-exh-container').width();
				// 设到达最左极值 并控制“左滑动按钮”的显示
				maxLeft = Math.abs(maxLeft);
				if(n>0) {
					n = 0;
					$("#ji-exh-pnl-prev").hide();
				} else {
					$("#ji-exh-pnl-prev").show();
				}
				// 设到达最右极值 并控制“右滑动按钮”的显示
				if(n<-maxLeft) {
					n = -maxLeft - 58;
					$("#ji-exh-pnl-next").hide();
				} else {
					$("#ji-exh-pnl-next").show();
				}
				// 执行滑动动画
				$('#ji-exh-pnl-wrap').animate({'marginLeft':n},240);
			}


			// 元素事件细化
			// 缩略图点击事件
			$('.ji-exh-avatar').click(function(){
				// 样式
				$('.ji-exh-avatar').removeClass('on');
				$(this).addClass('on');
				// 查询选中索引值
				var index = $(this).index();
				// 更新大图
				$("#ji-exh-imgDiv img").attr({'src':aImgs[index].src});
				// 更新描述
				$("#ji-exh-desc").html('<i>' + (index+1) + '/' + aImgs.length + '</i>' +  '<span>' + (aImgs[index].desc || "未添加描述") + '</sapn>');
				// 控制上部左右翻页按钮
				if(index == 0) {
					$("#ji-exh-top-prev").hide();
				} else if(index == aImgs.length-1) {
					$("#ji-exh-top-next").hide();
				} else {
					$("#ji-exh-top-prev,#ji-exh-top-next").show();
				}
				// 查询当前选中的 left 值
				var l = index*58;
				// 查询到达居中位置的距离
				var n = -l + $('#ji-exh-container').width()/2 - 24;
				// 调用函数 更新 wrap 位置
				updateWrapPos(n);
				// 更新选中缩略图索引
				currIndex = index;
			});


			// 上部左右翻页按钮事件
			$('#ji-exh-top-prev').click( function(){
				$('.ji-exh-avatar')[currIndex-1].click();
			});
			$('#ji-exh-top-next').click( function(){
				$('.ji-exh-avatar')[currIndex+1].click();
			});


			// wrap 左右滑动按钮事件
			$('#ji-exh-pnl-prev').click( function(){
				var currPrev = parseInt( $('#ji-exh-pnl-wrap')[0].style.marginLeft );
				updateWrapPos(currPrev + 5*58);
			});
			$('#ji-exh-pnl-next').click( function(){
				var currPrev = parseInt( $('#ji-exh-pnl-wrap')[0].style.marginLeft );
				updateWrapPos(currPrev - 5*58);
			});


			// 初始化 第一个缩略图点击
			$('.ji-exh-avatar')[0].click();


			// 关闭 渐隐后移除
			$('#ji-exh-close').click(function(){
				$("#ji-exh-mask").fadeOut(300);
				setTimeout(function(){
					$("#ji-exh-mask").remove();
				},300);
			});

		},200);  // timeout


	}

},  // Exhibit

// 004
Paginator: function(curr, pages, container, caller) {

	$(container).html('');  // 先清空

	// <!-- 创建必要元素 -->
	// 上下页
	var pPrev  = $('<span class="pgnt_a" id="pgnt_prev">上一页</span>');
	var pNext  = $('<span class="pgnt_a" id="pgnt_next">下一页</span>');
	// 首末页
	var pFirst = $('<span class="pgnt_a pgnt_n" value="1">1</span>');
	var pLast  = $('<span class="pgnt_a pgnt_n" value="'+ pages +'">'+ pages +'</span>');
	// 跳转框
	var pgnt_skip = $('<div id="pgnt_skip"><input maxlength="3" id="pgnt_skip_input" type="text" placeholder="页码" /><span id="pgnt_skip_btn"> 跳转 </span></div>')

	// <!-- 分页生成 start -->
	if(pages<=7) {  // 小于 7 页 全部打出
		for( var i=1; i<=pages; i++) {
			$(container).append($('<span class="pgnt_a pgnt_n" value="'+ i +'">'+ i +'</span>'));
		}
	} else {  // 大于 7 页
		if( curr != 1){$(container).append(pPrev);}  // 第一页时隐藏“上一页”按钮

		$(container).append(pFirst);  // 第1页 一直显示
		
		if(curr<6){  // 点击页小于 6 一直显示前六页
			for( var i=2; i<=6; i++) {
				$(container).append($('<span class="pgnt_a pgnt_n" value="'+ i +'">'+ i +'</span>'));
			}

			$(container).append($('<span class="pgnt_dot">···</span>'));  // 显示 后省略号 + 最后一页 + 下一页
			$(container).append(pLast,pNext);

		} else if(curr<pages-3) {  // 点击页还没到最后4页

			$(container).append($('<span class="pgnt_dot">···</span>'));  // 显示 前省略号

			for( var i=curr-2; i<=curr+2; i++) {  // 显示 点击页 前后 各两页
				$(container).append($('<span class="pgnt_a pgnt_n" value="'+ i +'">'+ i +'</span>'));
			}

			$(container).append($('<span class="pgnt_dot">···</span>'));  // 显示 后省略号
			$(container).append(pLast);
			
			if( curr != pages ) {$(container).append(pNext);}  // 没到最后一页 就显示“下一页”按钮

		
		} else {  // 只剩下 点到最后四页的情况

			$(container).append($('<span class="pgnt_dot">···</span>'));  // 显示 前省略号

			for( var i=pages-5; i<=pages; i++) {  // 生成 最后 6 页
				$(container).append($('<span class="pgnt_a pgnt_n" value="'+ i +'">'+ i +'</span>'));
			}

			if( curr != pages ) {$(container).append(pNext);}  // 没到最后一页 就显示“下一页”按钮
		}

		$(container).append(pgnt_skip);  // 追加跳转框
		
		$('#pgnt_skip_btn').click(function(){  // 跳转框事件
			var index = parseInt($('#pgnt_skip_input').val());
			if( !(index<0|| index>pages || isNaN(index)) ){ caller( index ); }
			$('#pgnt_skip_input').val('');
		});

	}

	// 样式
	$(container + ' span').removeClass('on');
	$(container + ' span[value='+ curr +']').addClass('on');

	// 分页点击
	$('.pgnt_n').click(function(){
		var now = parseInt($(this).attr('value'));
		if(curr != now ) {
			curr = now;
			caller( curr );
		}
	});

	$('#pgnt_next').click(function(){ caller(curr+1) });
	$('#pgnt_prev').click(function(){ caller(curr-1) });

}  // Paginator



}  // Jikit end




// function GetQueryString(name) {
// 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
// 	var r = window.location.search.substr(1).match(reg);
// 	if(r!=null)return  unescape(r[2]); return null;
// }
 
// var collectionName = GetQueryString("name");


