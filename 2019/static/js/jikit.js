/*
	jikit.js JIKIT Plugin v2.0.1
	@Chisw 2018-04-15 11:32

	001 carousel
*/


;(function(window){

	var Jikit = {

		data: {


		},

		/* 001 carousel */
		carousel: {
			init: function(p) {

				var o = {
					data: p.data || null,
					el: p.el || null,
					time: p.time || 5,
					timer: null,
					index: 0
				}

				var $container = $(o.el);


				if( !(o.data && $container) ) {
					console.log('[WARN] JIKIT Carousel params wrong!')
					return false;
				}


				var HTML = 
					`<div class="jikit-carousel">
						<i class="fa fa-spinner fa-spin"></i>
						<div class="jikit-carousel-box">

						</div>
						<div class="jikit-carousel-dots"></div>
						<span class="jikit-carousel-btn-prev fa fa-angle-left"></span>
						<span class="jikit-carousel-btn-next fa fa-angle-right"></span>
					</div>`;
				$container.html(HTML);


				var html = '', dots = '';
				o.data.forEach(function(data, index){

					html +=
						`<div class="jikit-carousel-avatar">
							<img src="${data.avatar}" data-url="${data.url}" ondragstart="return false;">
							<div class="jikit-carousel-title">${data.title.substring(0,16)}</div>
						</div>`;

					dots += `<span></span>`;

				})
				$container.find('.jikit-carousel-box').html(html);
				$container.find('.jikit-carousel-dots').html(dots);


				var $avatars = $container.find('.jikit-carousel-avatar');
				var $dots = $container.find('.jikit-carousel-dots span');
				$avatars.eq(0).show();
				$dots.eq(0).addClass('active');


				function shiftTimer(ox) {

					if(ox) {
						clearInterval(o.timer);
						o.timer = setInterval(function(){

							o.index++;
							if(o.index==o.data.length) {
								o.index = 0;
							}
							shiftAvatar(o.index);

						}, o.time*1000);

					} else {
						clearInterval(o.timer);
					}

				}
				shiftTimer(1.5);


				function shiftAvatar(index) {  // console.log(index);

					$avatars.fadeOut();

					o.index = index

					$avatars.eq(o.index).fadeIn();
					$dots.removeClass('active').eq(index).addClass('active');

				}


				$container
					.on('click','.jikit-carousel-dots span',function(){
						var index = $(this).index();
						shiftAvatar(index);
					})
					.on('click','.jikit-carousel-btn-next',function(){
						o.index++;
						if(o.index==o.data.length) {
							o.index = 0;
						}
						shiftAvatar(o.index);
					})
					.on('click','.jikit-carousel-btn-prev',function(){
						o.index--;
						if(o.index<0) {
							o.index = o.data.length-1;
						}
						shiftAvatar(o.index);
					})
					.on('mouseenter',function(){
						shiftTimer(0);
					})
					.on('mouseleave',function(){
						shiftTimer(1.5);
					})
					.on('click','.jikit-carousel-avatar img',function(){
						var url = $(this).data('url');
						if ( !url ) return null;
						window.open( url );
					})

			}
		},

	}

	window.Jikit = Jikit;

})(window);