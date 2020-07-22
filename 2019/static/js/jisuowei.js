/*
	jisuowei.js for jisuowei.com UI init
	@Chisw 2018-04-14 22:11

	001 ui init

*/


;(function(window){

	var $ = window.$;

	var Ji = {

		data: {

			url: '',

			navIndex: 0,
			navTimer: null,
			navList: ['home','article','read','like','store','app'],

			toastTimer: null,

			navHtml: function(index) {
				return (
				`<div class="ji-nav-box">
					<div id="ji-nav-logo"></div>
					<div id="ji-nav-list">
						<span id="ji-nav-list-indicator"></span>
						<a href="${ index!=0 ? '../'        : '' }"        class="home">首页</a>
						<a href="${ index!=0 ? '../article' : 'article' }" class="article">文章</a>
						<a href="${ index!=0 ? '../read'    : 'read' }"    class="read">阅读</a>
						<a href="${ index!=0 ? '../like'    : 'like' }"    class="like">兴趣</a>
						<a href="${ index!=0 ? '../store'   : 'store' }"   class="store">库藏</a>
						<a href="${ index!=0 ? '../app'     : 'app' }"   class="store">应用</a>
					</div>
					<div id="ji-nav-user">
						<span id="ji-nav-user-tip"></span>
						<a href="${ index!=0 ? '../login.html' : 'login.html' }" id="ji-nav-user-avatar">
							<img src="${ index!=0 ? '../' : '' }static/img/avatar.jpg">
						</a>
					</div>
					<a href="javascript:;" class="fa fa-search j_search" id="ji-nav-search"> 搜索</a>
				</div>`)
			},

			footerHtml: function(index) {
				return (
				`<div class="ji-container-center clearfix">
					<div class="footer-left">
						<img src="${ index!=0 ? '../' : '' }static/img/jisuowei_dark.svg" ondragstart="return false;">
						<p>奇斯威克 · 点燃你的狂热</p>
						<p>© 2014-2019 jisuowei.com &nbsp; 苏ICP证15046910号</p>
					</div>
					<div class="footer-right">
						<p class="right-title">联系</p>
						<div class="right-list">
							<a href="https://github.com/chisw" target="_blank"><i class="fa fa-github"></i> Chisw</a>
							<a href="http://weibo.com/chiswick" target="_blank"><i class="fa fa-weibo"></i> @奇斯威克</a>
							<a href="mailto:i@jisuowei.com"><i class="fa fa-envelope-o"></i> i@jisuowei.com</a>
							<a href="https://cn.linkedin.com/in/jisuowei" target="_blank"><i class="fa fa-linkedin-square"></i> jisuowei</a>
						</div>
						<p class="right-title">友情链接</p>
						<div class="right-list">
							<a target="_blank" href="https://www.google.cn/intl/zh-CN/chrome">Chrome</a>
							<a target="_blank" href="https://nodejs.org">Node.js</a>
							<a target="_blank" href="https://cn.vuejs.org">Vue.js</a>
							<a target="_blank" href="http://element-cn.eleme.io">ElementUI</a>
							<a target="_blank" href="http://www.w3school.com.cn">W3School</a>
							<a target="_blank" href="https://fontawesome.com">FontAwesome</a>
							<a target="_blank" href="http://simditor.tower.im">Simditor</a>
							<a target="_blank" href="http://www.easyicon.net">EasyIcon</a>
							<a target="_blank" href="https://tinypng.com">TinyPng</a>
							<a target="_blank" href="http://duokan.com">多看阅读</a>
							<a target="_blank" href="http://www.imxingzhe.com">行者</a>
							<a target="_blank" href="http://www.zcool.com.cn">站酷网</a>
							<a target="_blank" href="http://www.iconfont.cn">iconfont+</a>
							<a target="_blank" href="http://font-spider.org">字蛛</a>
							<a target="_blank" href="https://996.icu">996.ICU</a>
							<a target="_blank" href="https://www.duohui.cn">多会</a>
							<a target="_blank" href="https://www.pomotodo.com">番茄土豆</a>
						</div>
					</div>
				</div>`)
			},

			fixedHtml: function() {
				return (
				`
					<div id="ji-totop"><i class="fa fa-angle-up"></i></div>
					<div id="ji-toast"></div>
					<input id="ji-hidden-val" type="text">

					<div class="ji-search-pannel j_searchPannel">
						<input type="text" class="pannel-input j_searchInput" placeholder="在奇斯威克中搜索.." >
						<p class="pannel-tip">[ Ctrl + Shift + F ] 唤起搜索 &nbsp;&nbsp; [ Enter ] 发起搜索 &nbsp;&nbsp; [ Esc ] 退出搜索</p>
						<table class="pannel-cate">
							<tr>
								<td><i class="fa fa-check"></i>文章</td>
								<td class="on"><i class="fa fa-check"></i>阅读</td>
								<td><i class="fa fa-check"></i>笔记</td>
								<td><i class="fa fa-check"></i>代码</td>
							</tr>
							<tr>
								<td><i class="fa fa-check"></i>文档</td>
								<td><i class="fa fa-check"></i>图片</td>
								<td><i class="fa fa-check"></i>音乐</td>
								<td><i class="fa fa-check"></i>电影</td>
							</tr>
						</table>
					</div>
				`
				)
			},

		},

		init: function(index) {

			this.data.navIndex = index;
			this.data.url = index>0 ? '../' : '';

			// HTML
			$('#ji-nav').html(this.data.navHtml(index));
			$('#ji-footer').html(this.data.footerHtml(index));
			$('#ji-fixed').html(this.data.fixedHtml);

			if($.fn.preventScroll) {
				$('#ji-fixed > div').preventScroll();
			}

			// nav
			var left = $('#ji-nav-list a').eq(index).addClass('active').position().left;
			this.moveNavIndicator(left);

			// event
			$('body')
				.on('click','#ji-nav-logo',function(){
					location.href = index==0 ? '' : '../';
				})
				.on('mouseover','#ji-nav-list a',function(){
					var left = $(this).position().left;
					Ji.moveNavIndicator(left);
				})
				.on('mouseleave','#ji-nav-list',function(){
					var left = $('#ji-nav-list a').eq(Ji.data.navIndex).position().left;
					Ji.moveNavIndicator(left);
				})
				.on('click','#ji-totop',function(){
					$('html,body').animate({scrollTop:0},400);
				})

				// 搜索
				.on('keyup', function(e) {
					var e = e || window.event;
					if( e.keyCode == 27 ) {
						$('#ji-nav,#ji-body,#ji-footer').removeClass('ji-blur');
						$('html, body').css({overflow: 'auto'});
						$('.j_searchPannel').fadeOut();
						$('.ji-article').remove();
					}
				})
				.on('keydown', function(e) {
					var e = e || window.event;
					if( e.keyCode == 70 && e.shiftKey == 1 && e.ctrlKey == 1 ) {
						$('.j_search').trigger('click');
					}
				})
				.on('click', '.j_search', function() {

					$('#ji-nav,#ji-body,#ji-footer').addClass('ji-blur');
					$('html, body').css({overflow: 'hidden'});

					$('.j_searchPannel').fadeIn();

					$('.j_searchInput').focus();

				})

				// 文章
				.on('click', '.j_articleClose', function() {
					$('.ji-article').remove();

					$('#ji-nav,#ji-body,#ji-footer').removeClass('ji-blur');
					$('html, body').css({overflow: 'auto'});
				})

				.on('click', '.j_article', function() {

					var id = $(this).data('id');

					if(!id) {return}

					$('body').append(
						`<div class="ji-article">

							<div class="article-main">

								<div class="main-banner"></div>

								<div class="main-title"></div>

								<div class="main-content editor-style">

									<div class="ji-loading"><div class="dot dot1"></div><div class="dot dot2"></div><div class="dot dot3"></div><div class="dot dot4"></div></div>

								</div>

								<div class="main-comment"></div>
						
							</div>

							<a class="ji-fixed-close j_articleClose" href="javascript:;">&times;</a>

						</div>`
					);


					$('#ji-nav,#ji-body,#ji-footer').addClass('ji-blur');
					$('html, body').css({overflow: 'hidden'});

					setTimeout(function() {

						$.ajax({
							type:'post', async:true, dataType:'json',
							url: `${location.href.indexOf('jisuowei') !== -1 ? 'https://jisuowei.com' : 'http://192.168.31.85'}/api/get/postDetail.php`,
							data: {
								id: id
							},
							success: function(res) {

								$('.main-title').html(
								`
									<h2 class="title-name">${ res.rows[1].title }</h2>

									<div class="title-info">

										<div class="info-author">
											<img class="author-avatar" src="https://jisuowei.com/file/avatar.jpg">
											<span class="author-name">Chisw</span>
											<span class="author-publish">发布于 ${ res.rows[1].date }</span>
										</div>

										<div class="info-data">
											<i class="fa fa-eye"></i> 1024 
											<i class="fa fa-heart-o"></i> 512
											<i class="fa fa-comments-o"></i> 256
											<i class="fa fa-thumbs-o-up"></i> 128
										</div>
										
									</div>

									<div class="title-tags"><div>
								`
								);


								$('.main-content').html( res.rows[1].content.replace(/\n/g, '<br>'));

								var avatar = res.rows[1].avatar;

								if ( avatar ) {
									$('.main-banner').css({backgroundImage: 'url('+ avatar +')'});
								}


								$('pre').each(function(i, block) {
									$(this).html('<code class="javascript">'+ $(this).html() +'</code>')
								});

								$('pre code').each(function(i, block) {
									hljs.highlightBlock(block);
								});

							}
						})

					}, 1000)
					
				})

				// 阅读
				.on('click','.j_bookNote',function(){

					$('body').append(
						`<div class="ji-article">

							<div class="article-main">

								<div class="main-banner"></div>

								<div class="main-content">

									<div class="ji-loading"><div class="dot dot1"></div><div class="dot dot2"></div><div class="dot dot3"></div><div class="dot dot4"></div></div>

								</div>

								<div class="main-comment"></div>

							</div>

							<a class="ji-fixed-close j_articleClose" href="javascript:;">&times;</a>

						</div>`
					);


					$('#ji-nav,#ji-body,#ji-footer').addClass('ji-blur');
					$('html, body').css({overflow: 'hidden'});


					var url = $(this).attr('src');
					var html = 
					`
						<div class="text-center" style="padding:20px 0;"><img class="ji-note-top-avatar" width="100" src="${ url }"></div>
					`;

					var id = $(this).data('id');


					setTimeout(function() {

						$.ajax({
							type:'post', async:true, dataType:'json',
							url: `${location.href.indexOf('jisuowei') !== -1 ? 'https://jisuowei.com' : 'http://192.168.31.85'}/api/get/note.php`,
							data: {
								id: id
							},
							success: function(res) {

								if ( res.rows.length ) {
									res.rows.forEach(function(data, index){
										html +=
										`<div class="ji-read-note-list">
											<p class="ji-read-note-date">
												<i class="fa fa-bookmark-o"></i> ${data.date}
												<a href="javascript:;" class="ji-btn mini ji-read-note-copy"><i class="fa fa-copy"></i></a>
											</p>
											<p class="ji-read-note-content">${data.content}</p>
										</div>`
									});
								} else {
									html += '<p class="text-center">暂无笔记</p>';
								}

								$('.main-content').html(html);
								$('.main-banner').css({background:'url('+ url +') no-repeat center',backgroundSize: 'cover', opacity: '.5'}).addClass('ji-blur');

							}

						});

					}, 500);

				})

				.on('click','.ji-read-note-copy',function(){
					var val = $(this).parent().next().text();
					$('#ji-hidden-val').val(val).select();
					document.execCommand('Copy');
					Ji.toast({text:'复制成功',type:'success'});
				})

				.on('click','#ji-home-read-refresh',function(){
					$('#ji-home-read').toggleClass('rotateX-360');
				})



			var timer_scroll;
			var $window = $(window);
			$window
				.on('scroll',function() {
					if (!timer_scroll) {
						timer_scroll = setTimeout(function() {

							if ($window.scrollTop() > 60) {
								// $('#ji-nav').addClass('cover');
								$("#ji-totop").fadeIn(200);
							} else {
								// $('#ji-nav').removeClass('cover');
								$("#ji-totop").fadeOut(200);
							}

							timer_scroll = null;

						}, 360); 
					}
				})

		},

		moveNavIndicator: function(distance) {
			if(!this.data.navTimer) {
				this.data.navTimer = setTimeout(()=>{
					$('#ji-nav-list-indicator').animate({marginLeft: distance},100);
					this.data.navTimer = null;
				}, 50);
			}
		},

		toast(o) {

			clearTimeout(Ji.data.toastTimer);

			var icon = '';
			switch (o.type) {
				case 'success':
					icon = 'check';
					break;
				case 'error':
					icon = 'times';
					break;
				case 'info':
					icon = 'info';
					break;
				default:
					icon = '';
			}

			$('#ji-toast')
				.html(
					`<i class="fa fa-${icon}"></i> ${o.text}`
				)
				.addClass('on').addClass(o.type);

			Ji.data.toastTimer = setTimeout(function(){
				$('#ji-toast').removeClass().html('');
			},3000);

		},

		getLvStar(score) {
			if( isNaN( parseFloat(score) ) ) return '[WARN]: Ji.getLvStar() need a number';
			if( score < 0 ) return '[WARN]: Ji.getLvStar() need a number greater than 0';

			var score = score*10;

			var sNum = Math.floor(score / 10),
				hNum = (score%10)>0 ? 1 : 0,
				oNum = 5 - sNum -hNum;

			var res = '';

			var arr = [
				{times: sNum, html:''},
				{times: hNum, html:'-half-o'},
				{times: oNum, html:'-o'}
			];

			arr.forEach(function(data, index){
				for(var i=0; i<data.times; i++) {
					res += `<i class="fa fa-star${data.html}"></i>`;
				}
			});

			return res;
		},


	};

	window.Ji = Ji;

})(window);