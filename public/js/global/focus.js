objFocus = {};

//获取URL
objFocus.getUrl = function (obj) {
    var url = '';
    if (obj["ad_url"].length > 2) {
        url = objSite.getWwwUrl("/ad/index_detail?id=" + obj["ad_id"] + "&url=" + encodeURIComponent(obj["ad_url"]) + "&image=" + obj["ad_image"]);
    }
    return url;
};

//获取图片地址
objFocus.getImgSrc = function (obj) {
    return obj["ad_image"];
};

//输出文字类型
objFocus.showWord = function (placeId, obj) {
    if (typeof(focusJson) == "undefined") {
        return false;
    }

    //添加class方便捕捉点击
    obj.addClass("focus66");

    if (typeof(focusJson["place" + placeId]) != "undefined") {
        $.each(focusJson["place" + placeId], function (index, r) {
            var url = objFocus.getUrl(r);
            obj.append('<a href="' + url + '" rel="nofollow" target="_blank" class="focusUrl">' + r["ad_word"] + '</a>\n');
        });
    }
};

//输出单个图片
objFocus.showSingImg = function (placeId, obj) {
    if (typeof(focusJson) == "undefined") {
        return false;
    }

    //添加class方便捕捉点击
    obj.addClass("focus66");

    if (typeof(focusJson["place" + placeId]) != "undefined") {
        $.each(focusJson["place" + placeId], function (index, r) {
            var url = objFocus.getUrl(r);
            var imgSrc = objFocus.getImgSrc(r);
            if (url == '') {
                obj.append('<a rel="nofollow" target="_blank"><img src="' + imgSrc + '" alt=""></a>');
                return;
            } else {
                obj.append('<a href="' + url + '" rel="nofollow" target="_blank"><img src="' + imgSrc + '" alt=""></a>');
                return;
            }
        });
    }
};

//输出Banner
objFocus.showBanner = function (placeId, obj) {
    if (typeof(focusJson) == "undefined") {
        return false;
    }

    //添加class方便捕捉点击
    obj.addClass("focus66");

    if (typeof(focusJson["place" + placeId]) != "undefined") {
        $.each(focusJson["place" + placeId], function (index, r) {
            var url = objFocus.getUrl(r);
            var imgSrc = objFocus.getImgSrc(r);
            if (url == '') {
                obj.append('<li><a rel="nofollow"><img src="' + imgSrc + '" alt=""></a></li>\n');
            } else {
                obj.append('<li><a href="'+ url +'" rel="nofollow" target="_blank"><img src="' + imgSrc + '" alt=""></a></li>\n');
            }
        });
    }

};

//输出背景图Banner
objFocus.showBgBanner = function (placeId, obj) {
    if (typeof(focusJson) == "undefined") {
        return false;
    }

    //添加class方便捕捉点击
    obj.addClass("focus66");

    if (typeof(focusJson["place" + placeId]) != "undefined") {
        $.each(focusJson["place" + placeId], function (index, r) {
            var url = objFocus.getUrl(r);
            var imgSrc = objFocus.getImgSrc(r);
            if (url == '') {
                obj.append('<li><a rel="nofollow" style="background: url('+imgSrc+') no-repeat center center; background-size: cover;"></a></li>\n');
            } else {
                obj.append('<li><a href="'+url+'" rel="nofollow" target="_blank" style="background: url('+imgSrc+') no-repeat center center; background-size: cover;"></a></li>\n');
            }
        });
    }
};

// 全站底部通栏
function showGlobalBotfocus() {
	try{
		var closed = false;
		// 如果设置了独立广告
		if ($('.botfocus').not('#botfocus-global').children('a').length >= 1) {
			return false;
		}
		// 如果广告为空
		if ($('#botfocus-global').children('a').length < 0){
			return false;
		}
		if (!$.cookie('botfocus-global')) {
			$('#botfocus-global').find('img').load(function(){
				$(window).scroll(function() {
					if ($(this).scrollTop() >= 200 && !closed) {
						$('#botfocus-global').fadeIn();
					}
				});
			});
		}
		$('#botfocus-global').children('.botfocus-close').click(function(){
			$.cookie('botfocus-global', 'showed', {expires: 1, domain: '3d66.com', path: '/'});
			closed = true;
			$(this).parents('.botfocus').hide();
		});
	} catch(e) {}
}

// 各二级站点底部通栏
function showBotfocus(id) {
	try{
		var closed = false;
		if ($('#'+id).children('a').length < 0){
			return false;
		}
		if (!$.cookie(id)) {
			$('#'+id).find('img').load(function(){
				$(window).scroll(function() {
					if ($(this).scrollTop() >= 200 && !closed) {
						$('#'+id).fadeIn();
					}
				});
			});
		}
		$('#'+id).children('.botfocus-close').click(function(){
			$.cookie(id, 'showed', {expires: 1});
			closed = true;
			$(this).parents('.botfocus').hide();
		});
	} catch(e) {}
}

// 首页弹窗广告
function openWinFocus() {
	// 如果广告为空
	if ($('#openWinFocus img').length < 1) {
		return false;
	}
	// 一小时弹一次
	var exp = new Date();
	exp.setHours(exp.getHours() + 1); //有效期1小时
	if (!$.cookie('openWinFocus')) {
		// 图片加载后弹出
		$('#openWinFocus img').load(function () {
			layer.open({
				skin: 'layer-nobg',
				type: 1,
				title: false,
				area: ['auto', 'auto'],
				content: $('#openWinFocus')
			});
		});
		$.cookie('openWinFocus', 'showed', {expires: exp});
	}
}

$(function () {
	//输出banner类型
	$(".sysFocusBanner").each(function () {
		var placeId = $(this).attr('data-id');
		objFocus.showBanner(placeId, $(this));
	});

	//输出背景图banner类型
	$('.sysBgBanner').each(function(){
		var placeId = $(this).attr('data-id');
		objFocus.showBgBanner(placeId,$(this));
	});

	//输出单个图片类型
	$(".sysFocusImgSing").each(function () {
		var placeId = $(this).attr('data-id');
		objFocus.showSingImg(placeId, $(this));
	});

	//输出文字类型
	$(".sysFocusWord").each(function () {
		var placeId = $(this).attr('data-id');
		objFocus.showWord(placeId, $(this));
	});

	//广告点击
	$("body .focus66 a").on("click", function () {
		var href = $(this).attr("href");
		if (!href) {
			return false;
		} else {
			href += "&click_time=" + encodeURIComponent(objSite.getNowTime());
		}
		$(this).attr("href", href);
	});

	// 全站底部通栏
	showGlobalBotfocus();

	// 各二级站点底部通栏
	showBotfocus('botfocus-res');
	showBotfocus('botfocus-mall');
	showBotfocus('botfocus-work');
	showBotfocus('botfocus-xr');
	showBotfocus('botfocus-vr');
	showBotfocus('botfocus-vip');
	showBotfocus('botfocus-user');
	showBotfocus('botfocus-so');
	showBotfocus('botfocus-service');
	showBotfocus('botfocus-magic');
	showBotfocus('botfocus-ku');
	showBotfocus('botfocus-soft');
	
	// 顶部tapbar 签到礼包
	$(".topbar .sign-in-gift b").click(function(){
		$(".topbar .sign-in-gift").css("display","none");
	});
});