/*
 * inputImgPrev v0.1.0
 * author 余廷涛 1224100678@qq.com
 * https://
 */
;(function($, window, document, undefined){
	var methods = {
		init: function(options) {
			var defaults = {
				type: /(jpg|jpeg|png|gif)$/,  // 图片格式正则
				maxsize: null,            // 大小最大值
				minsize: null,            // 大小最小值
				maxpx: null,              // 宽高最大值
				minpx: null,              // 宽高最小值
				aspect: null,             // 宽高比
				speed: 1000,              // 错误信息显示时间
				onChange: function(e) {}, // input change事件回调
				onSuccess: function(e) {},// 成功后回调
				onEnd: function(e) {}     // 结束前回调
			}
			var opt = $.extend({}, defaults, options);

			return this.each(function() {
				var $this = $(this);
				var _type = opt.type,
					_maxsize = opt.maxsize,
					_minsize = opt.minsize,
					_maxpx = opt.maxpx,
					_minpx = opt.maxpx,
					_aspect = opt.aspect,
					_speed = opt.speed,
					onChange = opt.onChange,
					onSuccess = opt.onSuccess,
					onEnd = opt.onEnd;

				// 插入DOM
				$('<div class="input-img-prev"></div>').insertBefore($this);
				$('<div class="input-img-error"></div>').insertAfter($this);
				var $prev = $this.siblings('.input-img-prev');
				var $error = $this.siblings('.input-img-error');

				// 绑定change事件
				$this.on('change', function(e) {
					if (this.value == '') {
						return false;
					}
					// change回调
					onChange && onChange.call(this, e);

					// 报错提示方法
					function showError(txt) {
						$error.show().html(txt);
						$prev.removeAttr('style');
						$this.val('');
						setTimeout(function() {
							$error.fadeOut();
						}, _speed);
					}

					// 验证格式
					if (!_type.test(this.value.toLowerCase()) && this.value != '') {
						showError('格式不正确');
						return false;
					}

					// 是否支持FileReader
					if (typeof(FileReader) != 'undefined') {
						var file = this.files[0];
						var filesize = this.files[0].size;
						if (_maxsize && filesize > _maxsize) {
							showError('大小超过限制');
							return false;
						}
						if (_minsize && filesize < _minsize) {
							showError('大小低于限制');
							return false;
						}

						var fr = new FileReader();
						fr.onload = function(e) {
							var path = e.target.result;
							var img = new Image();
							img.onload = function() {
								if (_maxpx && (this.width > _maxpx || this.height > _maxpx)) {
									showError('宽高超过限制');
									return false;
								}
								if (_minpx && (this.width < _minpx || this.height < _minpx)) {
									showError('宽高低于限制');
									return false;
								}
								if (_aspect && this.width/this.height != _aspect) {
									showError('宽高比不符合');
									return false;
								}
								$error.hide();
								$prev.attr('style','background-image:url('+path+')');
								// 成功后回调
								onSuccess && onSuccess.call($this, e);
							}
							img.src = path;
						}
						fr.readAsDataURL(file);
					} else {
						this.select();
						this.blur();
						var path = document.selection.createRange().text;
						var img = $prev.get(0);
						img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)';
						img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = path;
						img.style.visibility = 'hidden';
						var imgwidth = img.offsetWidth;
						var imgheight = img.offsetHeight;
						// 判断宽高
						if (_maxpx && (imgwidth > _maxpx || imgheight > _maxpx)) {
							showError('宽高高于限制');
							return false;
						}
						// 判断宽高
						if (_minpx && (imgwidth < _minpx || imgheight < _minpx)) {
							showError('宽高低于限制');
							return false;
						}
						if (_aspect && imgwidth/imgheight != _aspect) {
							showError('宽高比不符合');
							return false;
						}
						// 判断大小,调用ActiveXObject控件会报错，需要手动修改IE的安全设置
						// var fso = new ActiveXObject('Scripting.FileSystemObject');
						// size = fso.GetFile(path).size;
						// if (size > _maxsize) {
						// 	showError('大小超过限制');
						// 	return false;
						// }
						// if (size < _minsize) {
						// 	showError('大小低于限制');
						// 	return false;
						// }
						$error.hide();
						// 显示图片
						img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
						img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = path;
						img.style.visibility = 'visible';
						document.selection.empty();
						// 成功后回调
						onSuccess && onSuccess.call($this, e);						
					}

					// 结束前回调
					onEnd && onEnd.call(this, e);
				});
			});
		},

		destory: function() {
			return $(this).each(function() {
				var $this = $(this);
				$this.siblings('.input-img-prev').empty();
				$this.off('change');
			});
		}
	};

	$.fn.inputImgPrev = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('method ' + method + ' does not exist on jquery.inputImgPrev.js');
		}
	}	
})(jQuery, window, document);