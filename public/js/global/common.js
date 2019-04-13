$(function () {
    // tab选项卡
    try {
        $('.tab').each(function () {
            $(this).find('.tab-body').eq(0).show();
            $(this).find('.tab-body:gt(0)').hide();
        });
        $('.tab-head li').hover(function () {
            var n = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.tab').find('.tab-body').eq(n).show().siblings('.tab-body').hide();
        });
    } catch (e) {
    }

    // 延迟加载
    try {
        $('.product img').lazyload({
            threshold: 0
        });
    } catch (e) {
    }

    // 反馈
    $('.feedback').click(function () {
        layer.closeAll();
        $.ajax({
            url: objSite.getUserUrl('user/check_login/index'),
            dataType: "jsonp",
            success: function (data) {
                if (data.status == 0) {
                    parent.openLogin();
                } else {
                    var url = objSite.getServiceUrl('feedback/index/index');
                    parent.layer.open({
                        type: 2,
                        title: false,
                        resize: false,
                        area: ['602px', '522px'],
                        content: [url, 'no'],
                        anim: 5
                    });
                }
            }
        });
    });

    //首页用户资产显示
    objSite.loginInFeeHtml = function (res) {
        //兼容渲点显示
        if (!res.data.xuan_dian) {
            res.data.xuan_dian = 0;
        }

        if (res.data.user_img) {
            var user_img = res.data.user_img;
        } else {
            var user_img = objSite.getStaticUrl('public/images/common/defaultHead.jpg');
        }
        var user_name = res.data.nick_name;

        $('.user-photo').attr('src', user_img);
        if (res.data.msgcount != 0 && res.data.msgcount) {
            $('#usermsg').html('<span class="dot"></span><i class="iconfont-x" id="j_dot">&#xe60b;</i>');
        }
        $('.usercontent').html('<dl><dt>溜币</dt><dd>' + res.data.user_lb + '</dd></dl><dl><dt>赠点</dt><dd>' + res.data.zeng_dian + '</dd></dl><dl><dt>渲点</dt><dd>' + res.data.xuan_dian + '</dd></dl><dl><dt>提现点</dt><dd>' + res.data.cash_lb + '</dd></dl>');
        //增加用户名跟用户
        $('#user-link').attr('href', objSite.getUserUrl('/'));

        //vip首页Html
        if (window.location.host.indexOf('vip') > -1) {
            objSite.vipLoginInHtml(res, user_img, user_name);
        }
    };

    //刷新Html赋值
    objSite.loginTopHtml = function (res) {
        //兼容渲点显示
        if (!res.xuan_dian) {
            res.xuan_dian = 0;
        }

        //web首页
        $('.user-photo').attr('src', res.user_img);
        $('.nav-user-icon').html('<span class="star-member"><a target="_blank" title="用精致的作品展示优秀的自己" href=' + objSite.getUserUrl("#/index/info_form/starlevel") + '><img src="' + objSite.getStaticUrl(res.star_icon) + '"></a></span>');

        //vip状态
        if (res.is_vip >= 0 && res.vip_status == 1) {
            $('.nav-user-tip').html('<span class="usertxt">' + res.user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(res.vip_icon_expire) + '"></a>');
        } else if (res.is_vip > 0) {
            $('.nav-user-tip').html('<span class="usertxt vip-color">' + res.user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(res.vip_icon) + '"></a>');
        } else {
            $('.nav-user-tip').html('<span class="usertxt">' + res.user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(res.vip_icon) + '"></a>');
        }

        $('.login').addClass("is_logined");

        //下拉框
        var topUserHtml = '<div class="user-name">';
        topUserHtml += '<a href="' + objSite.getUserUrl('/') + '" target="_blank">';
        topUserHtml += '<img class="user-img" src="' + res.user_img + '" alt="">';
        if (res.is_vip > 0 && res.vip_status == 0) {
            topUserHtml += '<span class="usertxt vice-color">' + res.user_name + '</span>';
        } else {
            topUserHtml += '<span class="usertxt">' + res.user_name + '</span>';
        }
        topUserHtml += '<a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("privilege.html") + '" class="iconfont-x vice-color">';
        if (res.is_vip == 0 || res.vip_status == 1) {
            topUserHtml += '<img class="top-vip-icon" src="' + objSite.getStaticUrl(res.vip_icon_expire) + '">';
        } else {
            topUserHtml += '<img class="top-vip-icon"  src="' + objSite.getStaticUrl(res.vip_icon) + '">';
        }
        topUserHtml += '</a>';
        topUserHtml += '</a>';
        topUserHtml += '</div>';
        topUserHtml += '<div class="dropmenu user-wraper">';
        topUserHtml += '<dl class="clearfix">';
        topUserHtml += '<dt><img src="' + res.user_img + '" alt=""></dt>';
        topUserHtml += '<dd>';
        if (res.vip_status == 1) {
            topUserHtml += '<p><span class="usertxt">' + res.user_name + '</span><a target="_blank" title="已过期" href=' + objSite.getVipUrl("/privilege.html") + ' class="iconfont-x vice-color move">';
        } else if (res.is_vip > 0) {
            topUserHtml += '<p><span class="usertxt vip-color">' + res.user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href=' + objSite.getVipUrl("/privilege.html") + ' class="iconfont-x vice-color move">';
        } else {
            topUserHtml += '<p><span class="usertxt">' + res.user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href=' + objSite.getVipUrl("/privilege.html") + ' class="iconfont-x vice-color move">';
        }
        if (res.is_vip == 0 || res.vip_status == 1) {
            topUserHtml += '<img class="top-vip-icon" src="' + objSite.getStaticUrl(res.vip_icon_expire) + '">';
        } else {
            topUserHtml += '<img class="top-vip-icon"  src="' + objSite.getStaticUrl(res.vip_icon) + '">';
        }
        topUserHtml += '</a>';
        topUserHtml += '<p><a target="_blank" title="用精致的作品展示优秀的自己" href=' + objSite.getUserUrl("/account/star/index") + '><img src="' + objSite.getStaticUrl(res.star_icon) + '"></a></p>';
        topUserHtml += '</dd>';
        topUserHtml += '</dl>';
        topUserHtml += '<ul>';
        topUserHtml += '<li class="clearfix">';
        //topUserHtml += '<span><i class="iconfont-x vice-color">&#xe646;</i>溜币</span><i>' + res.user_lb + '</i><a href="' + objSite.getUserUrl('/pay/payment_lb/index') + '" target="_blank" class="jclick-count" data-type="13">充值</a>';
        topUserHtml += '<span><i class="iconfont-x vice-color">&#xe646;</i>溜币</span><i>' + res.user_lb + '</i><a href="' + objSite.getLbPayUrl('/') + '" target="_blank" class="jclick-count" data-type="13">充值</a>';
        topUserHtml += '</li>';
        topUserHtml += '<li class="clearfix">';
        topUserHtml += '<span><i class="iconfont-x main-color">&#xe64f;</i>赠点</span><i>' + res.zeng_dian + '</i><a href="' + objSite.getUserUrl('/') + '"target="_blank" class="jclick-count" data-type="14">签到</a>';
        topUserHtml += '</li>';
        topUserHtml += '<li class="clearfix">';
        topUserHtml += '<span><i class="iconfont-x light-blue">&#xe72b;</i>渲点</span><i>' + res.xuan_dian + '</i><a href="' + objSite.getServiceUrl('/buy/xr_web.html') + '"target="_blank" class="jclick-count" data-type="15">充值</a>';
        topUserHtml += '</li>';
        topUserHtml += '<li class="clearfix">';
        topUserHtml += '<span><i class="iconfont-x purple-color">&#xe669;</i>星点</span><i>' + res.xing_dian + '</i><a href="' + objSite.getUserUrl('/upload/index/index') + '"target="_blank" class="jclick-count" data-type="15">上传</a>';
        topUserHtml += '</li>';
        topUserHtml += '<li class="clearfix">';
        topUserHtml += '<span><i class="iconfont-x blue-color">&#xe670;</i>提现点</span><i>' + res.cash_lb + '</i><a href="' + objSite.getUserUrl('/asset/lb_log_list/index') + '"target="_blank" class="jclick-count" data-type="16">提现</a>';
        topUserHtml += '</li>';
        topUserHtml += '</ul>';
        topUserHtml += '<div class="clearfix">';
        topUserHtml += '<a class="item-1 jclick-count" href="' + objSite.getUserUrl('/coupon/index/index') + '"target="_blank" data-type="17"><i class="iconfont-x red-color">&#xe673;</i><span>优惠券</span></a>';
        topUserHtml += '<a class="item-2 jclick-count" href="' + objSite.getVipUrl('/privilege.html') + '"target="_blank" data-type="18"><i class="iconfont-x vice-color">&#xe656;</i><span>VIP特权</span></a>';


        if (window.location.host.indexOf('user.') == -1) {
            topUserHtml += '<p class="logout j_logout"><i class="iconfont-x">&#xe69e;</i><span>退出</span></p>';
        } else {
            topUserHtml += '<p class="iconfont-x" onclick="objAdmin.loginoutajax();"><i class="iconfont-x">&#xe69e;</i><span>退出</span></p>';
        }
        topUserHtml += '</div>';
        topUserHtml += '</div>';
        $('.login').html(topUserHtml);

    };

    // 点击登录html赋值
    objSite.loginInHtml = function (res) {
        var user_name = res.data.nick_name;
        var user_img = res.data.user_img;
        var vip_icon = res.data.vip_icon;
        var vip_icon_expire = res.data.vip_icon_expire;
        var star_icon = res.data.star_icon;

        //兼容渲点显示
        if (!res.data.xuan_dian) {
            res.data.xuan_dian = 0;
        }
        //web首页
        $('.user-photo').attr('src', user_img);
        if (res.data.msgcount != 0 && res.data.msgcount) {
            $('#usermsg').html('<span class="dot"></span><i class="iconfont-x" id="j_dot">&#xe60b;</i>');
        }

        $('#user-link').attr('href', objSite.getUserUrl('/'));
        $('.usercontent').html('<dl><dt>溜币</dt><dd>' + res.data.user_lb + '</dd></dl><dl><dt>赠点</dt><dd>' + res.data.zeng_dian + '</dd></dl><dl><dt>渲点</dt><dd>' + res.data.xuan_dian + '</dd></dl><dl><dt>提现点</dt><dd>' + res.data.cash_lb + '</dd></dl>');
        $('.login').addClass("is_logined");
        $('.nav-user-icon').html('<span class="star-member"><a target="_blank" title="用精致的作品展示优秀的自己" href=' + objSite.getUserUrl("#/index/info_form/starlevel") + '><img src="' + objSite.getStaticUrl(star_icon) + '"></a></span>');

        //vip状态

        if (res.data.is_vip >= 0 && res.data.vip_status == 1) {

            $('.nav-user-tip').html('<span class="usertxt">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(vip_icon_expire) + '"></a>');

            $('.jislogin').html('<dl><dt><a href="' + objSite.getUserUrl('/') + '"><img class="user-photo" src="' + user_img + '" alt=""></a></dt><dd><span data-vip_level="' + res.data.is_vip + '">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '"<img src="' + objSite.getStaticUrl(vip_icon_expire) + '"> </a><span class="end-vip">已过期</span></dd></dl>');

        } else if (res.data.is_vip > 0) {
            $('.nav-user-tip').html('<span class="usertxt vice-color">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(vip_icon) + '"></a>');
            $('.jislogin').html('<dl><dt><a href="' + objSite.getUserUrl('/') + '"><img class="user-photo" src="' + user_img + '" alt=""></a></dt><dd><span data-vip_level="' + res.data.is_vip + '">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '"<img  src="' + objSite.getStaticUrl(vip_icon) + '"> </a></dd></dl>');
        } else {
            $('.nav-user-tip').html('<span class="usertxt">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl('/privilege.html') + '" ><img src="' + objSite.getStaticUrl(vip_icon_expire) + '"></a>');
            $('.jislogin').html('<dl><dt><a href="' + objSite.getUserUrl('/') + '"><img class="user-photo" src="' + user_img + '" alt=""></a></dt><dd><span data-vip_level="' + res.data.is_vip + '">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '"<img  src="' + objSite.getStaticUrl(vip_icon) + '"> </a></dd></dl>');
        }

        //添加cookie
        var arr = {
            "user_id": res.data.user_id,
            "user_name": user_name,
            "user_img": user_img,
            "user_lb": res.data.user_lb,
            "zeng_dian": res.data.zeng_dian,
            "xing_dian": res.data.xing_dian,
            "cash_lb": res.data.cash_lb,
            "is_vip": res.data.is_vip,
            "vip_status": res.data.vip_status,
            "vip_icon": vip_icon,
            "vip_icon_expire": vip_icon_expire,
            "star_icon": star_icon,
            "xuan_dian": res.data.xuan_dian,
        };


        $.cookie('userCookieData', JSON.stringify(arr), {expires: 2, path: '/', domain: '3d66.com'});

        //下拉层赋值
        var afterLoginHtml = '<div class="user-name">';
        afterLoginHtml += '<a href="' + objSite.getUserUrl('/') + '" target="_blank">';
        afterLoginHtml += '<img class="user-img" src="' + user_img + '" alt="">';
        if (res.data.is_vip > 0 && res.data.vip_status == 0) {
            afterLoginHtml += '<span class="usertxt vice-color">' + user_name + '</span>';
        } else {
            afterLoginHtml += '<span class="usertxt">' + user_name + '</span>';
        }
        afterLoginHtml += '<a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '">';
        if (res.data.is_vip == 0 || res.data.vip_status == 1) {
            afterLoginHtml += '<img class="top-vip-icon" src="' + objSite.getStaticUrl(vip_icon_expire) + '">';
        } else {
            afterLoginHtml += '<img class="top-vip-icon"  src="' + objSite.getStaticUrl(vip_icon) + '">';
        }
        afterLoginHtml += '</a>';
        afterLoginHtml += '</a>';
        afterLoginHtml += '</div>';
        afterLoginHtml += '<div class="dropmenu user-wraper">';
        afterLoginHtml += '<dl class="clearfix">';
        afterLoginHtml += '<dt><img src="' + user_img + '" alt=""></dt>';
        afterLoginHtml += '<dd>';
        if (res.data.vip_status == 1) {
            afterLoginHtml += '<p><span class="usertxt">' + user_name + '</span><a target="_blank" title="已过期" href="' + objSite.getVipUrl("/privilege.html") + '">';
        } else if (res.data.is_vip > 0) {
            afterLoginHtml += '<p><span class="usertxt vice-color">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '">';
        } else {
            afterLoginHtml += '<p><span class="usertxt">' + user_name + '</span><a target="_blank" title="尽享VIP特权,彰显不一样的你" href="' + objSite.getVipUrl("/privilege.html") + '">';
        }

        if (res.data.is_vip == 0 || res.data.vip_status == 1) {
            afterLoginHtml += '<img class="drop-vip-icon" src="' + objSite.getStaticUrl(vip_icon_expire) + '">';
        } else {
            afterLoginHtml += '<img class="drop-vip-icon" src="' + objSite.getStaticUrl(vip_icon) + '">';
        }
        afterLoginHtml += '</a>';

        afterLoginHtml += '<p><a target="_blank" title="用精致的作品展示优秀的自己" href=' + objSite.getUserUrl("/account/star/index") + '><img src="' + objSite.getStaticUrl(star_icon) + '"></a></p>';
        afterLoginHtml += '</dd>';
        afterLoginHtml += '</dl>';
        afterLoginHtml += '<ul>';
        afterLoginHtml += '<li class="clearfix">';
        afterLoginHtml += '<span><i class="iconfont-x vice-color">&#xe646;</i>溜币</span><i>' + res.data.user_lb + '</i><a href="' + objSite.getUserUrl('/pay/payment_lb/index') + '" target="_blank" class="jclick-count" data-type="113">充值</a>';
        afterLoginHtml += '</li>';
        afterLoginHtml += '<li class="clearfix">';
        afterLoginHtml += '<span><i class="iconfont-x main-color">&#xe64f;</i>赠点</span><i>' + res.data.zeng_dian + '</i><a href="' + objSite.getUserUrl('/') + '"target="_blank" class="jclick-count" data-type="11">签到</a>';
        afterLoginHtml += '</li>';
        afterLoginHtml += '<li class="clearfix">';
        afterLoginHtml += '<span><i class="iconfont-x light-blue">&#xe72b;</i>渲点</span><i>' + res.data.xuan_dian + '</i><a href="' + objSite.getServiceUrl('/buy/xr_web.html') + '"target="_blank" class="jclick-count" data-type="15">充值</a>';
        afterLoginHtml += '</li>';
        afterLoginHtml += '<li class="clearfix">';
        afterLoginHtml += '<span><i class="iconfont-x purple-color">&#xe669;</i>星点</span><i>' + res.data.xing_dian + '</i><a href="' + objSite.getUserUrl('/upload/index/index') + '"target="_blank" class="jclick-count" data-type="12">上传</a>';
        afterLoginHtml += '</li>';
        afterLoginHtml += '<li class="clearfix">';
        afterLoginHtml += '<span><i class="iconfont-x blue-color">&#xe670;</i>提现点</span><i>' + res.data.cash_lb + '</i><a href="' + objSite.getUserUrl('/asset/index/index') + '"target="_blank" class="jclick-count" data-type="13">提现</a>';
        afterLoginHtml += '</li>';
        afterLoginHtml += '</ul>';
        afterLoginHtml += '<div class="clearfix">';
        afterLoginHtml += '<a class="item-1 jclick-count" href="' + objSite.getUserUrl('/coupon/index/index') + '"target="_blank" data-type="14"><i class="iconfont-x red-color">&#xe673;</i><span>优惠券</span></a>';
        afterLoginHtml += '<a class="item-2 jclick-count" target="_blank"  data-type="15" href="' + objSite.getVipUrl('/privilege.html') + '">';
        afterLoginHtml += '<i class="iconfont-x vice-color">&#xe656;</i><span>VIP特权</span></a><p class="logout j_logout"><i class="iconfont-x">&#xe69e;</i><span>退出</span></p></div></div>';
        $('.login').html(afterLoginHtml);

        //vip首页Html
        if (window.location.host.indexOf('vip') > -1) {
            objSite.vipLoginInHtml(res, user_img, user_name);
        }

        //魔术手充值页Html
        if (window.location.host.indexOf('mss') > -1) {
            objSite.mssLoginInHtml(res);
        }


        //活动页
        if (window.location.href.indexOf('/year2019/active2019') > -1) {
            window.location.reload();
        }
    };

    // 登出html
    objSite.loginOutHtml = function () {
        $.cookie("userCookieData", null, {expires: -1, domain: '3d66.com'});//删除用户cookie
        var userCookieData = $.cookie('userCookieData');
        if (!userCookieData || userCookieData === 'null') {
            $('.login').html('<span class="usertxt juser-login">登录</span><span class="j_register">注册</span>');
            $('.user-photo').attr('src', objSite.getStaticUrl('public/images/common/defaultHead.jpg'));
            $('#usermsg').html('<i class="iconfont-x" id="j_dot">&#xe60b;1</i>');
            $('.nav-user-tip').text('3D溜溜网');
            $('.nav-user-icon').text('什么模型都有的网站');
            $('.user .star-member').css('background', 'transparent');
            $('.vip-icon').text('');
            $('.userid').text('');
            $('.usercontent').html('<span class="btn btn-login j_user-login">登录</span><span class="btn btn-register j_user-reg">注册</span>');
        }
    };

    //充值页验证登录
    if (window.location.href.indexOf('recharge/payments/form') > -1 || window.location.href.indexOf('recharge/new_charge') > -1) {
        var userCookieData = $.cookie('userCookieData');
        if (!userCookieData || userCookieData === 'null') {
            $('.login').html('<span class="usertxt juser-login">登录</span><span class="j_register">注册</span>');
        }
    }


    // 验证登录
    if (window.location.host.indexOf('user') == -1) {
        var userCookieData = $.cookie('userCookieData');
        if (!userCookieData || userCookieData === 'null') {
            objSite.loginOutHtml();
        } else {
            userCookieData = JSON.parse(userCookieData);
            if (userCookieData.vip_status == 'undefined') {
                objSite.loginOutHtml();
            }
            //更新cookie信息
            objSite.updateCookie(userCookieData);
        }
    }

    // 退出登录
    $(document).on('click', '.j_logout', function () {
        if (window.location.href.indexOf('user') > -1) {
            return false;
        } else {
            objSite.ajaxUser("/login/index/loginout", {}, function (res) {
                var userCookieData = $.cookie('userCookieData');
                if (userCookieData) {
                    $.cookie("userCookieData", null, {path: "/", domain: '3d66.com'});
                    //$.cookie("userCookieData", 1, {expires: -1, domain: '/'});//删除用户cookie
                }
                if (res.status == 1) {
                    objSite.loginOutHtml();
                    $('.login').html('<span class="usertxt juser-login">登录</span><span class="j_register">注册</span>');
                    $('.login').removeClass("is_logined");
                    $('.user-photo').attr('src', objSite.getStaticUrl('public/images/common/defaultHead.jpg'));
                    $('.user .usertxt').text('3D溜溜网');
                    $('.userid').text('');
                    $('#usermsg').html('<i class="iconfont-x" id="j_dot">&#xe60b;</i>');
                    $('.usercontent').html('<span class="btn btn-login j_user-login">登录</span><span class="btn btn-register j_user-reg">注册</span>');
                    //vip站点
                    if (window.location.href.indexOf('vip') > -1) {
                        objSite.vipLoginOutHtml();
                    }
                    //魔术手站点
                    // if (window.location.href.indexOf('mss') > -1) {
                    //     objSite.mssLoginOutHtml();
                    // }

                } else {
                    layer.msg(res.msg);
                }
            });
        }
    });
});