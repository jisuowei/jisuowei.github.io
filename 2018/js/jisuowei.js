/*
	
	jisuowei.js for Jisuowei.com UI init
	(c)jisuowei.com

*/


Jikit.addHead('<meta name="keywords" content="嵇所伟, 奇斯威克, chisw, chiswick, jisuowei">');
Jikit.addHead('<link href="../img/favicon.ico" rel="shortcut icon" />');
Jikit.addHead('<link rel="stylesheet" type="text/css" href="../../static/css/font-awesome.min.css"/>');


// 结构初始化
var body = '<div id="mask"></div>'
+ '<div id="header">'
	+ '<div id="logo"></div>'
	+ '<div id="nav"></div>'
	+ '<div id="menu"><i class="fa fa-reorder"></i></div>'
	+ '<div id="search_btn" title="搜索"><i class="fa fa-search"></i></div>'
+ '</div>'
+ '<div id="search"><div id="search_inp"><input type="text" id="search_input" placeholder="书名 / 作者  回车发起搜索.." /></div><div id="search_ox" title="关闭搜索"><i class="fa fa-close"></i></div></div>'
+ '<div id="menu_sons">'
	+ '<div class="menu_son"><div class="inset" id="origin"><i class="fa fa-diamond"></i><h4>历程</h4><p>小时一梦 追而逐之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="skill"><i class="fa fa-star-o"></i><h4>技能</h4><p>上士闻道 勤而行之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="read"><i class="fa fa-bookmark-o"></i><h4>阅读</h4><p>下品万般 省而读之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="store"><i class="fa fa-cube"></i><h4>收藏</h4><p>大千世界 收而纳之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="like"><i class="fa fa-heart-o"></i><h4>兴趣</h4><p>人有所好 乐而爱之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="code"><i class="fa fa-keyboard-o"></i><h4>码库</h4><p>物有所用 贮而实之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="blog"><i class="fa fa-file-text-o"></i><h4>日志</h4><p>本纪百年 叙而载之</p></div></div>'
	+ '<div class="menu_son"><div class="inset" id="info"><i class="fa fa-paper-plane-o"></i><h4>关于</h4><p>末篇穷语 概而述之</p></div></div>'
+ '</div>'
+ '<div id="center"><div id="top"></div><div id="mid"></div><div id="btm"></div><div id="footer"><p>© 2014-2018 Jisuowei.com&nbsp;&nbsp;奇斯威克·点燃你的狂热&nbsp;&nbsp;<span>苏ICP证15046910号</span></p></div></div>'
+ '<div id="sider"><div id="sider_ox"><i class="fa fa-angle-left"></i></div></div>'
+ '<span id="totop"><i class="fa fa-angle-up"></i></span>'
+ '<div id="toast"></div>'
+ '<div id="res"><div id="result"></div><span id="res_ox"><i class="fa fa-close"></i></span></div>';
$('body').html(body);


// 插入导航
var navs = [
	{'id':'origin','value':'历程'},
	{'id':'skill', 'value':'技能'},
	{'id':'read',  'value':'阅读'},
	{'id':'store', 'value':'收藏'},
	{'id':'like',  'value':'兴趣'},
	{'id':'code',  'value':'码库'},
	{'id':'blog',  'value':'日志'},
	{'id':'info',  'value':'关于'}
];
for( var i=0; i<navs.length; i++ ) {
	var e = $("<a href='javascript:;' id='" + navs[i].id + "'>"+ navs[i].value +"</a>");
	$('#nav').append(e);
}


// 滚动禁止
$.fn.extend({  
    "preventScroll":function(){  
        $(this).each(function(){  
            var _this = this;  
            if(navigator.userAgent.indexOf('Firefox') >= 0){
                _this.addEventListener('DOMMouseScroll',function(e){  
                    _this.scrollTop += e.detail > 0 ? 60 : -60;     
                    e.preventDefault();  
                },false);   
            }else{  
                _this.onmousewheel = function(e){     
                    e = e || window.event;     
                    _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;     
                    return false;  
                };  
            }  
        })    
    }  
});
$('#mask').preventScroll();
$('#result').preventScroll();
$('#res').preventScroll();



var scroll_bind;

window.onload = function () {

	// 当前选中页
	var nav_curr = $('title').attr('title');
	$('#nav a#' + nav_curr).addClass('on');
	if(nav_curr == 'read') {read_now = true;}  // 阅读搜索

	// totop
	$('#totop').click(function() {
		$('html,body').animate({scrollTop:0},400);
		return false;
	});

	// nav
	$('#nav a,.inset').click(function(){
		var target = $(this).attr("id").substring(0).toLowerCase();
		if (target !== 'blog') {
			window.location = '../' + target;
		} else {
			window.open('https://jisuowei.com/post');
		}
	});

	// logo
	$('#logo').click(function(){window.location = '../';});

	// 滚动判断
	var timer_scroll = 0; 
	window.onscroll = function() {
		if (!timer_scroll) {
			timer_scroll = setTimeout(function() {

			// #header
				if ($(window).scrollTop() > 70) {
					$('#header').addClass('on');
					$("#totop").fadeIn(200);
				} else {
					$('#header').removeClass('on');
					$("#totop").fadeOut(200);
				}

			// curr title
				var body_top = document.body.scrollTop || document.documentElement.scrollTop;
				var min = 0;
				var tops = [];
				// get all
				for( var i=0; i < $('.title_1').length; i++ ) {
					tops[i] = Math.abs( $(".title_1")[i].offsetTop - body_top );
				}
				// get min
				for (var i = 1; i < tops.length; i++) {
					if (tops[i] < tops[min]) {
						min = i;
					}
				}

				if(scroll_bind) {
					scroll_bind(min);
				}

				timer_scroll = 0;

			}, 500); 
		}
	}

	// 窗口变化
	$(window).resize(function(){
		if( $(window).width() > 780 ) {
			if(!f_sider || !f_menu) {
				menu(0);
				sider(0);
				mask(0);
			}
		}
	});



}


// 搜索
var read_now = false;
var read_focus = false;
$('#search_input').focus(function(){read_focus=true});
$('#search_input').blur(function(){read_focus=false});
document.onkeydown = function(evt){
	var e = evt || window.event;
	if( e.keyCode == 13 ) {
		if(read_focus) {
			if(read_now) {
				var key = $('#search_input').val();
				if(key !='') {
					bookSearch(key,'search');
					$('#search_input').blur();
				} else {
					toast('请输入 书名 / 作者');
				}
				$('#search_input').val('');
			} else {
				toast('抱歉，暂时只支持在 “阅读” 中搜索！ <a href="../read">前往</a>');
			}
		}
	}
};


$('#search_btn').click(function(){search(1);});
$('#search_ox' ).click(function(){search(0);});

function search(open) {
	if(open) {
		$('#search').addClass('on');
		$('#search_input').focus();
		menu(0);
		sider(0);
		mask(0);
	} else {
		$('#search').removeClass('on');
		$('#search_input').val('');
	}
}


var f_sider = true;
$('#sider_ox').click(function(){
	if(f_sider) {
		if(!f_menu){menu(0);}
		sider(1);
		mask(1);
		search(0);
	} else {
		sider(0);
		mask(0);
	}
});

var f_menu = true;
$('#menu').click(function(){
	if(f_menu) {
		if(!f_sider){sider(0);}
		menu(1);
		mask(1);
	} else {
		menu(0);
		mask(0);
	}
});


function mask(open,time) {
	var time = time || 400;
	if(open) {
		$('#mask').fadeIn(time);
		$('#center').addClass('on');
	} else {
		$('#mask').fadeOut(time);
		$('#center').removeClass('on');
	}
}


function menu(open) {
	if(open) {
		$('#menu,#menu_sons').addClass('on');
		f_menu = false;	
	} else {
		$('#menu,#menu_sons').removeClass('on');
		f_menu = true;
	}
}

function sider(open) {
	if(open) {
		$('#sider,#sider_ox').addClass('on');
		f_sider = false;	
	} else {
		$('#sider,#sider_ox').removeClass('on');
		f_sider = true;
	}
}

var timer_toast;
function toast(str) {
	clearTimeout(timer_toast);
	$('#toast').html(str).addClass('on');
	timer_toast = setTimeout(function(){
		$('#toast').removeClass('on');
		$('#toast').html('');
	},3000);
}



var TAG = {

Read: {
	tag:["古典名著","近代","世界名著","艺术","计算机","传记","小说","经管","人文社科","历史","政治","科学","外语","科幻","教育","心理","中国史","世界史"]
	,pub:["多看文库","中信","中华书局","中南博集天卷","北京磨铁数盟","北京兴盛乐","北京图灵文化","北京新华先锋","青岛智道文化","浙江出版集团","杭州蓝狮子","诚品读库","上海读客","北京凤凰壹力","北京华章","北京明日宏图","中版集团","北京新知文创","北京紫云文心","中国人民大学","新星","湖北长江","四川文轩在线","北京紫图","上海书猫","中国国际广播","中央编译","北京明天远航","北京东方视角","北京掌娱互动","接力","华中科技大学","金城","广东省出版集团","中国纺织","北京和平雅华","黑龙江华文悦读","人民东方","人民文学","北京华章同人","上海世纪文睿","北京日知","湖南科学","湖南文艺","北京凤凰联动","江苏译林","山西春秋","山西书海","北京九志天达","上海世纪","中国文著协","凤凰悦世泓文","湖南省青苹果","电子工业","北京华文经典","陕西书海","北京东西时代","北京世图","北京斯坦威","北京精典博维","北京理工大学","三联书店","杭州果麦","北京博采雅集","上海浩林","广州久邦","东西文库","北京华夏盛轩","后浪出版","广西师范大学","北京世纪文景","上海译文","北京时代华语","人民邮电","新经典文化","天津聚石文华","悦读名品","北京卓文天语","北京华章图文","上海雅众文化","现代","北京东方资治","长江新世纪","商务印书馆","北京环球卓尔","北京图灵","江苏人民","机械工业","北京十分科技","重庆远望科技","北京白马时光","北京清妍景和","北京中作华文","天津华文天下","北京华文天下","天津湛庐","时代数联","上海九久读书","复旦大学","北京智者天下","中国水利水电","北京世纪景风","湖北今古传奇","北京人天书店","北京阳光秀美","北京华阅时代","北京读品联合","东方","Confidential","四川科幻世界","浙江人民","云南人民","清华大学","海南","上海浦睿文化","北京大学音像","华文悦读荟","北京新东方","北京凤凰天下","成都万有","北京长江世纪","中国传媒大学","豆瓣阅读","新经典","北京阳光博客","中国华侨","中国社会科学","世界图书","undefined","北京大学","上海辞书","江苏文艺","中国商业","新华出版社","南京凤凰悦世","东莞永正电子","浙江九层文化","北京南文博雅","外文社","外教研","新世界","北京齐物秋水","辽宁无限穿越","上海阅文信息","武汉出版社"]
	,taga:[
		{'way':'aut','key':'吕思勉'},
		{'way':'aut','key':'林语堂'},
		{'way':'aut','key':'胡适'},
		{'way':'aut','key':'汪曾祺'},
		{'way':'aut','key':'周国平'},
		{'way':'aut','key':'易中天'},
		{'way':'aut','key':'刘慈欣'},
		{'way':'aut','key':'凡尔纳'},
		{'way':'aut','key':'东野圭吾'},
		{'way':'aut','key':'卡耐基'},
		{'way':'search','key':'西方视野里的中国'},
		{'way':'search','key':'双语'},
		{'way':'search','key':'牛津通识读本'},
		{'way':'search','key':'剑桥艺术史'},
		{'way':'search','key':'简史'},
	]
},

Store: {
	tab: [
		{'id':'excerpt','value':'格言'},
		{'id':'article' ,'value':'文章'},
		{'id':'video','value':'视频'},
		{'id':'file' ,'value':'文件'}
	]
},

Like: {
	tab: [
		{'id':'ride','value':'骑行'},
		{'id':'webapp','value':'WebApp'}
	]
},

Code: {
	tab: [
		{'id':'course','value':'教程'},
		{'id':'itbook','value':'技术书籍'},
		{'id':'handbook','value':'速查手册'}
	]
}

	
}

// var color = ['#6BCBCA','#FF6766','#20BF63','#5677FC','#FF7199','#00ABF0','#EF6443','#ABB72D','#FE3B73','#895B4B'];

