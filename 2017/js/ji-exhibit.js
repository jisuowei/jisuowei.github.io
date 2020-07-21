/*
	Author: Chisw; (c)jisuowei.com;  All right resevred.

	使用说明：

		引入 ji-exhibit.js; 通过 jiExhibit(aImgs) 传入一个包含“图像路径”和“图像描述”的数组;
		*相对路径和绝对路径皆可；描述可以为空。

		中央容器尺寸： 1024*736
		图片实际可显示最大分辨率：822*600 
			822 = 1024 - 200（两个按钮宽度）-2（border*2）
			600 = 736 - 36（图片描述高度）-100（pannel高度）
		调整请重新设置 ji-exh-container 的高宽

		var aImgs = [
			{'src':'../img/1.jpg','desc':'第一张图'},
			{'src':'http://example.com/temp.jpg','desc':'第二张图'},
			{'src':'3.jpg','desc':'可以为空'},
			{'src':'4.jpg','desc':''}
		];

		$("#test").click(function(){
			jiExhibit(aImgs);
		});

*/


// 嵌入样式 可读的样式见底部
	var exhCssCont = '#ji-exh-mask{position:fixed;top:0;left:0;z-index:99999;width:100%;height:100%;background:rgba(0,0,0,0.8);display:none}#ji-exh-container{position:absolute;top:50%;left:50%;width:1024px;margin-left:-512px;height:736px;margin-top:-350px;min-width:450px;min-height:400px;background-color:#0d0d0d;border:1px solid #0D0D0D;box-sizing:border-box}#ji-exh-top-prev,#ji-exh-top-next{position:absolute;top:50%;margin-top:-108px;display:block;width:80px;height:80px;line-height:80px;color:#b0b0b0;text-align:center;border-radius:4px;font-size:1.4rem;z-index:1000}#ji-exh-top-prev{left:5px}#ji-exh-top-next{right:5px}#ji-exh-top-prev:hover,#ji-exh-top-next:hover{background:#2f2f2f;color:#fff}#ji-exh-top-prev:active,#ji-exh-top-next:active{background:#1a1a1a}#ji-exh-imgDiv{position:absolute;top:0;bottom:136px;right:100px;left:100px;background:url("") center center no-repeat;background-size:contain}#ji-exh-imgDiv-load-tip{position:absolute;width:100%;top:40%;color:#a0a0a0;text-align:center}#ji-exh-desc{position:absolute;bottom:100px;width:100%;height:36px;color:#e8e8e8;font-size:1rem;line-height:36px;border-top:1px solid #303030}#ji-exh-desc i{width:120px;display:inline-block;text-align:center;color:#a0a0a0}#ji-exh-pnl{position:absolute;bottom:0;left:30px;right:30px;height:100px;box-sizing:border-box;border-right:1px solid #5f5f5f;border-left:1px solid #5f5f5f;background:#2f2f2f;overflow:hidden}#ji-exh-pnl-bg{position:absolute;bottom:0;width:100%;height:100px;background:#2f2f2f}#ji-exh-pnl-prev,#ji-exh-pnl-next{position:absolute;bottom:0;display:block;width:30px;height:100px;line-height:100px;color:#b0b0b0;text-align:center;background:#585858;font-weight:bold}#ji-exh-pnl-prev{left:0}#ji-exh-pnl-next{right:0}#ji-exh-pnl-prev:hover,#ji-exh-pnl-next:hover{color:#fff;background:#626262}#ji-exh-pnl-prev:active,#ji-exh-pnl-next:active{color:#808080;background:#585858}#ji-exh-pnl-wrap{position:absolute;min-width:200px;height:100px;box-sizing:border-box;padding-left:10px}.ji-exh-avatar{width:80px;height:80px;margin:10px 10px 0 0;background:#525252;color:#a0a0a0;line-height:80px;text-align:center;cursor:pointer;float:left}.ji-exh-avatar-img{position:absolute;width:80px;height:80px;margin-top:-80px;background:url("") center center no-repeat;background-size:cover}.ji-exh-avatar:hover{outline:2px solid #808080}.ji-exh-avatar.curr{outline:2px solid #a0a0a0}#ji-exh-tips{position:absolute;color:#909090;font-size:14px;top:101%;text-shadow:1px 1px 1px #363636}#ji-exh-tips a{font-size:inherit}#ji-exh-close{position:absolute;top:0;right:-10px;width:30px;height:30px;line-height:30px;display:block;box-shadow:0 0 5px #890000;text-align:center;border-radius:30px;margin-top:-10px;color:#fff;background:#ff3131;cursor:pointer}#ji-exh-close:hover{background:#EA0000}';
	var exhCss = $('<style></style>');
	$('head').append(exhCss);
	$(exhCss).html(exhCssCont);


function jiExhibit(aImgs) {

// 初始化 HTML 结构 

	// 创建遮罩
	var exhMask = $("<div id='ji-exh-mask'></div>");
	$('body').append(exhMask);

	// 结构片段见底部
	$(exhMask).html('<div id="ji-exh-container"><a href="javascript:;" id="ji-exh-top-prev"><i class="fa fa-chevron-left"></i></a><a href="javascript:;" id="ji-exh-top-next"><i class="fa fa-chevron-right"></i></a><div id="ji-exh-imgDiv-load-tip">Loading..</div><div id="ji-exh-imgDiv"></div><p id="ji-exh-desc"><i></i><span></span></p><div id="ji-exh-pnl-bg"></div><div id="ji-exh-pnl"><div id="ji-exh-pnl-wrap"></div></div><a href="javascript:;" id="ji-exh-pnl-prev"><i class="fa fa-angle-double-left"></i></a><a href="javascript:;" id="ji-exh-pnl-next"><i class="fa fa-angle-double-right"></i></a><a id="ji-exh-close"><i class="fa fa-close"></i></a><p id="ji-exh-tips">只需引入 ji-exhibit.js 文件（已内置HTML结构和CSS）； 通过函数 jiExhibit(aImgs) 即可调用， aImgs 为一个包含图片路径和图片描述的对象数组。<a href="../js/ji-exhibit.js" target="_blank"> 查看源码 </a><br/>*Completed in 2016‎/8‎/‎5‎ ‏‎21:55:31 & Designed by Chisw; (c)jisuowei.com; All right reserved.</p></div>');

	// 结构初始化完毕为 display:none 所以此时将其显示
	$("#ji-exh-mask").fadeIn(200);




// 初始化 缩略图
	// 根据 aImgs 生成下方缩略图（avatar） 并追加到 wrap 内
	for(var i=0; i<aImgs.length; i++) {
		var eDiv = $("<div class='ji-exh-avatar'>Loading..<div class='ji-exh-avatar-img' style='background-image:url("+ aImgs[i].src +")'></div></div>");
		$("#ji-exh-pnl-wrap").append(eDiv);
	}

	// 根据 aImgs.length 控制 wrap 宽度
	$("#ji-exh-pnl-wrap").css({'width':aImgs.length*90 + 20});

	// 初始化/标记 选中缩略图索引
	var currIndex = 0;





// 通过传入计算出的距离n 更新 wrap 位置
	function updateWrapPos(n) {
		// 查询 margin-left 最小（即能往左滑动的最大）值
		var maxLeft = $('#ji-exh-pnl-wrap').width() - $('#ji-exh-container').width();
		// 设到达最左极值 并控制“左滑动按钮”的显示
		if(n>0) {
			n = 0;
			$("#ji-exh-pnl-prev").hide();
		} else {
			$("#ji-exh-pnl-prev").show();
		}
		// 设到达最右极值 并控制“右滑动按钮”的显示
		if(n<-maxLeft) {
			n = -maxLeft - 60;
			$("#ji-exh-pnl-next").hide();
		} else {
			$("#ji-exh-pnl-next").show();
		}
		// 执行滑动动画
		$('#ji-exh-pnl-wrap').animate({'marginLeft':n},300);
	}
	// 初始化调试
	// updateWrapPos(1);





// 元素事件细化
	// 缩略图点击事件
	$('.ji-exh-avatar').click(function(){
		// 清空选中样式
		$('.ji-exh-avatar').removeClass('curr');
		// 当先追加选中样式
		$(this).addClass('curr');
		// 查询选中索引值
		var index = $(this).index();
		// 更新大图
		$("#ji-exh-imgDiv").css({'backgroundImage':'url('+aImgs[index].src+')'});
		// 更新描述
		$("#ji-exh-desc").html('<i>' + (index+1) + '/' + aImgs.length + '</i>'  +  '<span>' + (aImgs[index].desc || "未添加描述") + '</sapn>');
		// 控制上部左右翻页按钮的显示
		if(index == 0) {
			$("#ji-exh-top-prev").hide();
		} else if(index == aImgs.length-1) {
			$("#ji-exh-top-next").hide();
		} else {
			$("#ji-exh-top-prev,#ji-exh-top-next").show();
		}
		// 查询当前选中的 left 值
		var l = index*90;
		// 查询到达居中位置的距离
		var n = -l + $('#ji-exh-container').width()/2 - 80;
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
		updateWrapPos(currPrev + 5*90);
	});
	$('#ji-exh-pnl-next').click( function(){
		var currPrev = parseInt( $('#ji-exh-pnl-wrap')[0].style.marginLeft );
		updateWrapPos(currPrev - 5*90);
	});


	// 初始化 第一个缩略图点击
	$('.ji-exh-avatar')[0].click();


	// 关闭 渐隐后移除
	$('#ji-exh-close').click(function(){
		$("#ji-exh-mask").fadeOut(200);
		setTimeout(function(){
			$("#ji-exh-mask").remove();
		},200);
	});






// 窗口缩放自适应 节流控制
	// 设置 timer	
	var timer = 0;
	$(window).resize(function(){
		// 判空
		if(!timer) {
			// 重置为计时器
			timer = setTimeout(function(){
				// 获取当前窗口的 宽 高
				var winW = $(window).width();
				var winH = $(window).height();
				// 宽度 自适应判断
				if(winW < 1124) {
					$("#ji-exh-container").css({
						'width': winW-100,
						'marginLeft': -(winW-100)/2
					});
				} else {
					$("#ji-exh-container").css({
						'width': '1024px',
						'marginLeft': '-512px'
					});
				}
				// 高度 自适应判断
				if( winH < 800 ) {
					$("#ji-exh-container").css({
						'height': winH-130,
						'marginTop': -(winH-130)/2
					});
				} else {
					$("#ji-exh-container").css({
						'height': '736px',
						'marginTop': '-350px'
					});
				}
				// 置空 timer
				timer = 0;
			},200);
		}
	}).trigger('resize');;



}


/* ------------ HTML 结构 ------------------

// 遮罩
<div id='ji-exh-mask'>
	// 中央容器
	<div id='ji-exh-container'>

		// 上部左右翻页按钮
		<a href="javascript:;" id="ji-exh-top-prev"><i class="fa fa-chevron-left"></i></a>
		<a href="javascript:;" id="ji-exh-top-next"><i class="fa fa-chevron-right"></i></a>

		// loading 提示
		<div id='ji-exh-imgDiv-load-tip'>Loading..</div>
		// 大图容器
		<div id='ji-exh-imgDiv'></div>

		// 图片描述
		<p id='ji-exh-desc'><i></i><span></span></p>

		// 底部面板背景块
		<div id="ji-exh-pnl-bg"></div>
		// 底部面板
		<div id="ji-exh-pnl">
			// 内部滑块
			<div id="ji-exh-pnl-wrap"></div>
		</div>

		// 面板左右滑动按钮
		<a href="javascript:;" id="ji-exh-pnl-prev"><i class="fa fa-angle-double-left"></i></a>
		<a href="javascript:;" id="ji-exh-pnl-next"><i class="fa fa-angle-double-right"></i></a>

		// 关闭按钮
		<a id="ji-exh-close"><i class="fa fa-close"></i></a>

		// 版权信息
		<p id="ji-exh-tips">只需引入 ji-exhibit.js 文件（已内置CSS）； 通过函数 jiExhibit(aImgs) 即可调用， aImgs 为一个包含图片路径和图片描述的对象数组。<a href="js/ji-exhibit.js" target="_blank"> 查看源码 </a><br/>
		*Completed in 2016‎/8‎/‎5‎ ‏‎21:55:31 by Chisw (c)jisuowei.com All right reserved.
		</p>
		
	</div>

</div>


<style>

// 遮罩
#ji-exh-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.8);
	display: none;
}

// 中央容器
#ji-exh-container {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 1024px;
	margin-left: -512px;
	height: 736px;
	margin-top: -350px;
	min-width: 450px;
	min-height: 400px;
	background-color: #0D0D0D;
	border:1px solid #0D0D0D;
	box-sizing:border-box;
}

// 上部左右翻页按钮
#ji-exh-top-prev,
#ji-exh-top-next {
	position: absolute;
	top: 50%;
	margin-top: -108px;
	display: block;
	width: 80px;
	height: 80px;
	line-height: 80px;
	color: #b0b0b0;
	text-align: center;
	border-radius: 4px;
	font-size: 1.4rem;
	z-index: 1000;
}

#ji-exh-top-prev { left: 5px; }
#ji-exh-top-next { right: 5px; }

#ji-exh-top-prev:hover, #ji-exh-top-next:hover { background: #2F2F2F; color: #fff; }
#ji-exh-top-prev:active, #ji-exh-top-next:active { background: #1a1a1a; }


// 大图框
#ji-exh-imgDiv {
	position: absolute;
	top: 0;
	bottom: 136px;
	right: 100px;
	left: 100px;
	background: url("") center center no-repeat;
	background-size: contain;
}

#ji-exh-imgDiv-load-tip {
	position: absolute;
	width: 100%;
	top: 40%;
	color: #a0a0a0;
	text-align: center;
}

// 图片描述
#ji-exh-desc {
	position: absolute;
	bottom: 100px;
	width: 100%;
	height: 36px;
	color: #e8e8e8;
	font-size: 1rem;
	line-height: 36px;
	border-top: 1px solid #303030;
}

#ji-exh-desc i {
	width: 120px;
	display: inline-block;
	text-align: center;
	margin: 0 18px;
	color: #a0a0a0;
}


// 下方面板
#ji-exh-pnl {
	position: absolute;
	bottom: 0;
	left: 30px;
	right: 30px;
	height: 100px;
	box-sizing: border-box;
	border-right: 1px solid #5F5F5F;
	border-left: 1px solid #5F5F5F;
	background: #2f2f2f;
	overflow: hidden;
}

#ji-exh-pnl-bg {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100px;
	background: #2f2f2f;
}

// 下方面板 左右滑动按钮
#ji-exh-pnl-prev,
#ji-exh-pnl-next {
	position: absolute;
	bottom: 0;
	display: block;
	width: 30px;
	height: 100px;
	line-height: 100px;
	color: #b0b0b0;
	text-align: center;
	background: #585858;
	font-weight: bold;
}

#ji-exh-pnl-prev { left: 0; }
#ji-exh-pnl-next { right: 0; }

#ji-exh-pnl-prev:hover, #ji-exh-pnl-next:hover { color: #fff; background: #626262; }
#ji-exh-pnl-prev:active, #ji-exh-pnl-next:active { color: #808080; background: #585858; }


// 面板内部滑块
#ji-exh-pnl-wrap {
	position: absolute;
	min-width: 200px;
	height: 100px;
	box-sizing: border-box;
	padding-left: 10px;
}

// 缩略图容器
.ji-exh-avatar {
	width: 80px;
	height: 80px;
	margin: 10px 10px 0 0;
	background: #525252;
	color: #a0a0a0;
	line-height: 80px;
	text-align: center;
	cursor: pointer;
	float: left;
}

// 缩略图
.ji-exh-avatar-img {
	position: absolute;
	width: 80px;
	height: 80px;
	margin-top: -80px;
	background: url("") center center no-repeat;
	background-size: cover;
}

.ji-exh-avatar:hover {
	outline: 2px solid #808080;
}

.ji-exh-avatar.curr {
	outline: 2px solid #a0a0a0;
}


// 关闭按钮
#ji-exh-close {
	position: absolute;
	top: 0;
	right: -10px;
	width: 30px;
	height: 30px;
	line-height: 30px;
	display: block;
	box-shadow:0 0 5px #890000;
	text-align: center;
	border-radius: 30px;
	margin-top: -10px;
	color: #fff;
	background: #FF3131;
	cursor: pointer;
}

#ji-exh-close:hover { background: #EA0000; }

// 版权信息
#ji-exh-tips {
	position: absolute;
	color: #909090;
	font-size: 14px;
	top: 101%;
	text-shadow: 1px 1px 1px #363636;
}

</style>
*/