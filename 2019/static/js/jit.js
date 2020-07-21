/*
	jit.js
	@jisuowei 2018-04-19 00:13

	extendNative
	extendJQuery
	outline
	runHourglass
	id
*/


;(function(window){

	let jit = {

		init: function() {

			this.extendNative();
			this.extendJQuery();

		},

		// 原生扩展
		extendNative: function() {

		  // 字符串
			// 时间字符串转毫秒数
			String.prototype.getTime = function() {
				let d = new Date(this);
				return d.getTime();
			}

			// 转换成 HTML 实体符号
			String.prototype.toHTMLEntity = function() {
				let arr = this.split('');
					res = '';

				arr.forEach(function(o, i) {
					res += '&#'+ o.charCodeAt() +';';
				});

				return res;
			}

		  // 数字
		  	// 随机整数 默认 1-100间
			Math.randomInt = function(n) {
				n = parseInt(n) || 100;
				n = n < 0 ? 0 : n;
				return this.floor( this.random() * n );
			}

		  // 日期
		  	// 固定格式时间串
			Date.prototype.getDatetime = function() {
				let Y = this.getFullYear(),
					M = this.getMonth() + 1,
					D = this.getDate(),
					h = this.getHours(),
					m = this.getMinutes(),
					s = this.getSeconds();
				return Y + '-' + (M>9?M:'0'+M) +'-'+ (D>9?D:'0'+D) +' '+ (h>9?h:'0'+h) +':'+ (m>9?m:'0'+m) +':'+ (s>9?s:'0'+s);
			}

		  // 地址栏
			// 扩展 seek 方法
			let pairs = location.search.substring(1).split('&');

			location._search = {};

			pairs.forEach(function(o, i) {
				let pair = o.split('=');
				if ( pair[0] ) location._search[ pair[0] ] = pair[1];
			});

			pairs = null;

			location.seek = function(key) {
				let val = this._search[key];
				if ( val !== undefined ) {
					val = decodeURIComponent( val );
				} else {
					val = null;
				}
				return val;
			}


		},  // extendNative


		// jQuery 扩展
		extendJQuery: function() {

			if ( !window.$ ) return null;


			$.fn.freezeImg = function() {
				$(this).attr({ondragstart: 'return false;', oncontextmenu:' return false;'});
			};


			$.fn.extend({
				preventScroll: function() {
					$(this).each(function() {
						let that = this;  
						if ( navigator.userAgent.indexOf('Firefox') >= 0 ) {
							that.addEventListener('DOMMouseScroll', function(e) {
								that.scrollTop += e.detail > 0 ? 60 : -60;
								e.preventDefault();  
							}, false);
						} else {
							that.onmousewheel = function(e) {
								e = e || window.event;
								that.scrollTop += e.wheelDelta > 0 ? -60 : 60;
								return false;
							};
						}
					})
				}
			});


			this.ajax = function(url, data, type, success, fail) {
				$.ajax({
					url: url,
					data: data,
					type: type,
					dataType: 'json',
					success: success,
					fail: fail
				})
			}
		},  // extendJQuery


		// ajax
		ajax: function() {},


		// 所有元素描边
		outline: function() {

			function r() { return Math.randomInt(256); };

			$('*').each(function(i, o) {
				$(o).css({
					outline: '1px solid rgba('+ r() +','+ r() +','+ r() +',.72)',
					outlineOffset: '-1px'
				});
			});
		},  // outline


		// 倒计时
		runHourglass: function() {

			$('[hourglass]').each(function() {

				let $el    = $(this),
					expire = + $el.attr('hourglass');  // 获取剩余时间

				if ( isNaN( expire ) || ( expire <= 0 ) ) return null;  // 判空

				$el.removeAttr('hourglass');

				let seconds = parseInt( expire / 1000 );  // 获取总秒数

				_handle();  // 立即执行显示

				let timer = setInterval(_handle, 1000);

				function _handle() {
					let res,
						s = seconds % 60,
						m = Math.floor( seconds / ( 60		     ) % 60 ),
						h = Math.floor( seconds / ( 60 * 60	     ) % 24 ),
						d = Math.floor( seconds / ( 60 * 60 * 24 ) );

					if ( d <= 0 && h <= 0 && m <= 0 && s <= -1 ) {
						res = '';
					} else {
						res = 
							'<span class="hourglass">' +
								( d > 0 ? d + '<span>天</span>' : '' ) +
								h + '<span>小时</span> ' +
								m + '<span>分</span> ' +
								s + '<span>秒</span>' +
							'<span>';
					}

					res ? $el.html( res ) : clearInterval( timer );

					seconds--;
				}
			})

		},  // runHourglass


		id: function(pre, stamp) {

			function _getChar(range) {
				let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
				return str[ Math.randomInt( range || 36 ) ];
			}

			let _pre = 
                    typeof pre === 'string' && pre.length === 2 
                    ? pre.toUpperCase() 
                    : _getChar(25) + _getChar(),

                bolt = pre ? 'Z' : _getChar(24),

                D    = new Date(),
                yy   = Math.abs( D.getFullYear() - 2000 ),
                M    = D.getMonth() + 1,
                MM   = M > 9 ? M : '0'+ M,
                d    = D.getDate(),
                dd   = d > 9 ? d : '0'+ d,
                h    = D.getHours(),
                hh   = h > 9 ? h : '0'+ h,
                m    = D.getMinutes(),
                mm   = m > 9 ? m : '0'+ m;

            if ( stamp ) {
            	yy = stamp.substring(0,2);
            	MM = stamp.substring(2,4);
            	dd = stamp.substring(4,6);
            	hh = stamp.substring(6,8);
            	mm = stamp.substring(8,10);
            }

			return _pre + yy + MM + dd + bolt + hh + mm + _getChar(25) + _getChar() + _getChar();
		},  // id

	};


	window.jit = jit;

	jit.init();

})(window);