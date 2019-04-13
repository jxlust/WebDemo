// 设置nav状态
function setPosition(position) {
    $('.navbar .nav > li').each(function (index) {
        var liObj = $('a', $(this)).eq(0);
        if (liObj.text().indexOf(position) > -1) {
            liObj.addClass('active');
            return false;
        }

        var liObj = $('span', $(this)).eq(0);
        if (liObj.text().indexOf(position) > -1) {
            liObj.addClass('active');
            return false;
        }
    });
}

// 导航高亮(阿涛)
function setNav(txt) {
    $('.nav li').each(function () {
        var obj = $.extend({}, $(this).children('a').eq(0), $(this).children('span').eq(0));
        if (obj.text().indexOf(txt) > -1) {
            $(this).addClass('active');
        }
    });
}

// 侧栏导航高亮(阿涛)
function setSiteNav(txt) {
    $('.site-nav li').each(function () {
        var obj = $.extend({}, $(this).children('a').eq(0), $(this).children('span').eq(0));
        if (obj.text().indexOf(txt) > -1) {
            $(this).addClass('active');
        }
    });
}

var objSite = objSite || {};

//消息提示
objSite.msg = function (msg, icon) {
    if (typeof(icon) == 'undefined') {
        icon = 1;
    }
    layer.msg(msg, {icon: icon, time: 1000});
};

//提问消息
objSite.confirm = function (msg, callBack) {
    layer.confirm(msg, callBack);
};

//警告提示
objSite.alert = function (msg, icon) {
    if (typeof(icon) == 'undefined') {
        icon = 5;
    }
    layer.alert(msg, {icon: icon, time: 1000});
};

//格式化URL
objSite.formatUrl = function (url, domainUrl) {
    if (url == "") {
        return "";
    }
    if (url.substring(0, 4) == 'http') {
        return url;
    }

    if (url.substring(0, 5) == 'https') {
        return url;
    }

    if (url.substring(0, 1) == '/') {
        url = url.substring(1, url.length);
    }
    return domainUrl + url;

};
//获取用户站点URl
objSite.getUserUrl = function (url) {
    return objSite.formatUrl(url, objSite.user_domain);
};

//获取主站站点URl
objSite.getWwwUrl = function (url) {
    return objSite.formatUrl(url, objSite.index_domain);
};

//获取商城站点URl
objSite.getShopUrl = function (url) {
    return objSite.formatUrl(url, objSite.shop_domain);
};
//获取新商城站点URl
objSite.getMallUrl = function (url) {
    return objSite.formatUrl(url, objSite.mall_domain);
};

//获取服务站点URl
objSite.getServiceUrl = function (url) {
    return objSite.formatUrl(url, objSite.service_domain);
};

//获取搜索站点URl
objSite.getSoUrl = function (url) {
    return objSite.formatUrl(url, objSite.so_domain);
};

//获取api站点URl
objSite.getApiUrl = function (url) {
    return objSite.formatUrl(url, objSite.api_domain);
};

//获取静态站点URl
objSite.getStaticUrl = function (url) {
    return objSite.formatUrl(url, objSite.static_domain);
};

//获取溜云库官网站点URl
objSite.getKuUrl = function (url) {
    return objSite.formatUrl(url, objSite.ku_domain);
};

//获取图片站点URl
objSite.getPicUrl = function (url) {
    return objSite.formatUrl(url, objSite.pic_domain);
};

//获取下载站点URl
objSite.getDownUrl = function (url) {
    return objSite.formatUrl(url, objSite.down_domain);
};

//获取小图站点URl
objSite.getImgUrl = function (url) {
    return objSite.formatUrl(url, objSite.img_domain);
};

//获取vip站点URL
objSite.getVipUrl = function (url) {
    return objSite.formatUrl(url, objSite.vip_domain);
};

// 获取xuanran站点URL
objSite.getXuanranUrl = function (url) {
    return objSite.formatUrl(url, objSite.xuanran_domain);
};

//获取mss站点URL
objSite.getMssUrl = function (url) {
    return objSite.formatUrl(url, objSite.magic_domain);
};

//获取溜云库站点URL
objSite.getManagerUrl = function (url) {
    return objSite.formatUrl(url, objSite.manager_domain);
};

//获取溜云库站点URL
objSite.getVrUrl = function (url) {
    return objSite.formatUrl(url, objSite.vr_domain);
};

//获取上传站点URL
objSite.getUploadUrl = function (url) {
    return objSite.formatUrl(url, objSite.upload_file_domain);
};

//获取库站点URL
objSite.getKuUrl = function (url) {
    return objSite.formatUrl(url, objSite.ku_domain);
};

//获取工作室站点URL
objSite.getWorkUrl = function (url) {
    return objSite.formatUrl(url, objSite.work_domain);
};

//获取充值链接URl
objSite.getLbPayUrl = function (url) {
    return objSite.formatUrl(url, objSite.pay_link);
};

//判断是否验证
objSite.isLogin = function () {
    if ($(".login").hasClass("is_logined")) {
        return true;
    } else {
        return false;
    }
};

//活动充值页面模板判断是否验证
objSite.activityIsLogin = function () {
    if ($(".is_login").hasClass("logined")) {
        return true;
    } else {
        return false;
    }
};

// 打开用户页面
objSite.openUserWin = function (url, area, options) {
    // 地址
    url = objSite.getUserUrl(url);

    // 尺寸
    var area = area || ['400px', '500px'];
    // 默认配置
    var defaults = {
        type: 2,
        title: false,
        skin: null,
        content: [url, 'no'],
        area: area,
        checkLogin: false
    }

    var options = $.extend(defaults, options);
    // 如果需要检查认证
    if (options.checkLogin) {
        if (!objSite.isLogin()) {
            // 如果没有验证打开登录窗口
            openLogin();
            return false;
        }
    }
    // 标题
    layer.closeAll();
    layer.open(options);
};

/* ajaxUser公用函数
   checkLogin 必须认证为true

   */
objSite.ajaxUser = function (url, data, callBack, checkLogin) {
    url = objSite.getUserUrl(url);
    if (url == "") {
        return false;
    }

    /*
    if (objSite.test_model == "1") {
        try{
            console.log(url);
        }catch(e) {}
        if (typeof(data) != "undefined" && data != "") {
            try{
                console.log(JSON.stringify(data));
            }catch(e) {}
        }
    }
    */

    //Ajax调用处理
    $.ajax({
        type: "POST",
        url: url,
        timeout: 10000,
        data: data,
        dataType: 'jsonp',
        jsonp: 'callback',
        error: function (jqXHR, textStatus, errorThrown) {
            switch (textStatus) {
                case "timeout":
                    objSite.alert("加载超时，请重试!");
                    break;
                case "error":
                    objSite.alert("请求异常，请稍后再试!");
                    break;
                default:
                    objSite.alert(textStatus);
                    break;
            }
        },
        success: function (result) {
            if (objSite.test_model == "1") {
                try {
                    console.log(result);
                } catch (e) {
                }
            }
            if (checkLogin == true && result.status == 100) {
                //打开登录窗口
                openLogin();
                return false;
            }
            if (result.status == "1" || result.code == "1") {
                //操作成功
                if (typeof(callBack) != "undefined" && callBack != "") {
                    if (typeof(callBack) == "function") {
                        //执行闭包
                        callBack(result);
                        return false;
                    } else if (callBack == "reload") {
                        //刷新页面
                        //提示返回信息
                        if (result.msg != "") {
                            objSite.msg(result.msg, 1);
                        }
                        setTimeout(function () {
                            objSite.ajaxReloadPage();
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            objSite.msg(result.msg, 1);
                            objSite.ajaxGoPage(callBack);
                        }, 1000);
                    }
                } else {
                    //提示返回信息
                    if (result.msg != "") {
                        objSite.msg(result.msg, 1);
                    }
                }
            } else {
                callBack(result);
                return false;
            }
        }
    });
}

// 注册弹窗
function openRegister() {
    layer.closeAll();
    objSite.openUserWin('/login/register', ['730px', '385px']);
}

$(document).on('click', '.j_user-reg,.j_register', function () {
    openRegister();
});

// 登录弹窗
openLogin = function () {
    objSite.openUserWin('/login/user_login', ['730px', '385px']);
};
$(document).on('click', '.j_user-login,.juser-login', function () {
    openLogin();
});

// 找回密码弹窗
function openFindback() {
    try {
        layer.closeAll();
    } catch (e) {
    }
    objSite.openUserWin('/login/forget_pass', ['400px', '450px']);
}

$(document).on('click', '.j_findback', function () {
    openFindback();
});

// 跳转我的订单列表
function jumpOrderList() {
    //如果需要检查认证
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    } else {
        window.location.href = '/order.html';
    }
}

// 下载弹窗
function openDownload(ll_id, pay_type, action_id) {
    if (pay_type == 3) {
        objSite.openUserWin('/download/www_vip_form?ll_id=' + ll_id + '&action_id=' + action_id, ['860px', '370px'], {"skin": "layer-download"});
    } else if (pay_type == 0) {
        objSite.openUserWin('/download/www_free_form?ll_id=' + ll_id + '&action_id=' + action_id, ['554px', '370px']);
    } else {
        objSite.openUserWin('/download/www_form?ll_id=' + ll_id + '&action_id=' + action_id, ['860px', '370px'], {"skin": "layer-download"});
    }

    /*if(typeof(res_keyword) == 'undefined'){
        if (pay_type == 3) {
            objSite.openUserWin('/download/www_vip_form?ll_id=' + ll_id, ['860px', '370px'], {"skin": "layer-download"});
        } else if (pay_type == 0) {
            objSite.openUserWin('/download/www_free_form?ll_id=' + ll_id, ['554px', '370px']);
        } else {
            objSite.openUserWin('/download/www_form?ll_id=' + ll_id, ['860px', '370px'], {"skin": "layer-download"});
        }
    }else{
        if (pay_type == 3) {
            objSite.openUserWin('/download/www_vip_form?ll_id=' + ll_id+'&keyword='+res_keyword, ['860px', '370px'], {"skin": "layer-download"});
        } else if (pay_type == 0) {
            objSite.openUserWin('/download/www_free_form?ll_id=' + ll_id+'&keyword='+res_keyword, ['554px', '370px']);
        } else {
            objSite.openUserWin('/download/www_form?ll_id=' + ll_id+'&keyword='+res_keyword, ['860px', '370px'], {"skin": "layer-download"});
        }
    }*/
}

$(document).on('click', '.download-button,.btn-cancel', function () {
    window.open(objSite.getLbPayUrl("/"));
})

$(document).on('click', '.j_download', function () {
    var action_id = $(this).data('action_id');
    if (typeof(action_id) == "undefined") {
        action_id = '';
    }

    var vip_level = $('.jislogin dl dd span').data('vip_level');
    var www_vip_level = $('#vip_level').val();
    var www_vip_level = 0;
    var ll_id = $(this).attr('data-id');
    var pay_type = $(this).attr('data-type');
    //1为收费模型，0为免费
    // if (pay_type > 0 && pay_type != 'undefined') {
    //收费模型判断是否登录
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    // }

    openDownload(ll_id, pay_type, action_id);
});

// 首页上传点击
$(document).on('click', '.jupload', function () {
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    window.location.href = objSite.getUserUrl('/#/upload/index_form');
});

// 首页充值点击
$(document).on('click', '.jcharge', function () {
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    window.location.href = objSite.getLbPayUrl("/");
});

// 首页我的消息点击
$(document).on('click', '.jmymsg', function () {
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    window.location.href = objSite.getUserUrl('/#/msg/index_list');
});

// 首页我的收藏点击
$(document).on('click', '.jmyfav', function () {
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    window.location.href = objSite.getUserUrl('/#/fav/index_list/index');
});

// 首页我的主页点击
$(document).on('click', '.jmypage', function () {
    if (!objSite.isLogin()) {
        //如果没有验证打开登录窗口
        openLogin();
        return false;
    }
    window.location.href = objSite.getUserUrl('/#/index/index/main');
});

// 收藏弹窗
function openCollect(ll_id) {
    objSite.openUserWin('/fav/www_form?ll_id=' + ll_id, ['600px', '410px'], {"title": "收藏素材", checkLogin: true});
}

$(document).on('click', '.j_collect', function () {
    var ll_id = $(this).attr('data-id');
    openCollect(ll_id);
});

// 获取当前时间
objSite.getNowTime = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};

// 彩蛋弹窗
function openCaidan(assets, width, height) {
    var width = width || 750;
    var height = height || 526
    layer.closeAll();
    layer.open({
        skin: 'layer-nobg',
        type: 2,
        title: false,
        resize: false,
        area: [width + 'px', height + 'px'],
        content: [objSite.getWwwUrl('/caidan_' + assets + '.html'), 'no']
    });
}

// 公钥
objSite.csrfToken = function () {
    var pubkey = '-----BEGIN PUBLIC KEY-----';
    pubkey += 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIKHrSGDj+e1bLD1GdIa0idrme';
    pubkey += '108lw0cLVA6LC4NWVKyBpioNvx95K4iDUK2Fb+39cAIm099AKsYPPIEmP6vVbaW0';
    pubkey += '161LSmZAKYe6gflgc+3Mp8bTCPS32P7XInnWo7Nyb2Gc1DRhN4yezIBeQCpVsumK';
    pubkey += 'BXYUPiYfW6dcTghsawIDAQAB';
    pubkey += '-----END PUBLIC KEY-----';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    var data = {
        t: '3d66login'
    };
    var rsadata = JSON.stringify(data);
    var encryptData = encrypt.encrypt(rsadata);
    return encryptData;
};

// 封装更新cookie方法
objSite.updateCookie = function (userCookieData) {
    var get_cookie_time = $.cookie('get_cookie_time');

    //新增更新cookie到期时间
    if (!get_cookie_time) {
        var timestamp = (Date.parse(new Date()) / 1000) + 12 * 60 * 60;
        $.cookie('get_cookie_time', timestamp, {expires: 2, path: '/', domain: '3d66.com'});
    } else {
        var now = Date.parse(new Date()) / 1000;
        //过期重新获取
        if (now >= get_cookie_time) {
            //重新设置过去cookie
            var timestamp = (Date.parse(new Date()) / 1000) + 12 * 60 * 60;
            $.cookie('get_cookie_time', timestamp, {expires: 2, path: '/', domain: '3d66.com'});
            //登录请求cookie
            objSite.ajaxUser("/login/index/userinfo", {}, function (res) {
                if (res.status == 1) {
                    //替换user_name的key
                    res.data.user_name = res.data.nick_name;
                    objSite.loginTopHtml(res.data);

                    //设置cookie
                    $.cookie('userCookieData', JSON.stringify(res.data), {
                        expires: 2,
                        path: '/',
                        domain: '3d66.com'
                    });
                    return false;
                } else {
                    objSite.loginOutHtml(res);
                }
            });
        }
    }
    objSite.loginTopHtml(userCookieData);
};

// 封装前端手机号码正则
// telAreaCode:区号
objSite.phoneRegular = function (telAreaCode) {
    var regular = /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;
    if (telAreaCode === '+86') {
        regular = /^1[3-9]{1}[0-9]{9}$/;
    }
    return regular;
};

// 点击日志
$(document).on('click', '.jclick-count', function () {
    var type = $(this).data('type');
    var logurl = objSite.getUserUrl('download/add_click_pay_log');
    $.get(logurl, {type: type}, function (r) {
    });
});

// 获取拼团group_id
function GetGroupId() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 抽奖弹窗
function openLottery() {
    var href = window.location.href;
    if (href.indexOf('user') > -1) {
        $.post('/user/check_login/index', {}, function (res) {
            var drawUrl = objSite.getUserUrl('/draw/index/index');
            layer.open({
                skin: 'layer-nobg',
                type: 2,
                title: false,
                resize: false,
                fixed: false,
                area: ['790px', '800px'],
                content: [drawUrl, 'no'],
                success: function (layero, index) {
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin.runPrizeList();
                }
            });
        });
    } else {
        objSite.ajaxUser('/user/check_login/index', {}, function (res) {
            // 抽奖弹窗
            var drawUrl = objSite.getUserUrl('/draw/index/index');
            layer.open({
                skin: 'layer-nobg',
                type: 2,
                title: false,
                resize: false,
                fixed: false,
                area: ['790px', '800px'],
                content: [drawUrl, 'no'],
                success: function (layero, index) {
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin.runPrizeList();
                }
            });
        }, 1);
    }
}

$(document).on('click', '.js-lottery', function () {
    layer.closeAll();
    openLottery();
});
$(document).on('click', '.js-open-lottery', function () {
    parent.layer.closeAll();
    parent.openLottery();
});

// 签到弹窗
function openSign() {
    $.post('/sign/index/signIn', {}, function (res) {
        if (res.status == 1) {
            try {
                $(".sign-msg").html('已签到');
            } catch (e) {
            }
            if (res.data.signed_six > 1) {
                try {
                    var currentObj = $(".current");
                    currentObj.addClass('active').removeClass('current');
                    currentObj.next().addClass('current');
                } catch (e) {
                }
            } else {
                try {
                    $(".sign-days > ul").children().first().addClass('current');
                } catch (e) {
                }
            }
            try {
                $(".allSignDays").html(res.data.signNums);
            } catch (e) {
            }
        }
        layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['328px', '358px'],
            content: ['/sign/index/index', 'no']
        });
    });
}

$(document).on('click', '.js-sign', function () {
    layer.closeAll();
    openSign();
});
$(document).on('click', '.js-open-sign', function () {
    parent.layer.closeAll();
    parent.openSign();
});

// 国家区号选择
function getNumber() {
    var tel_area = $('.selected-dial-code').text();
    $('.tel-area-code').attr('value', tel_area);
}

// 溜云库下载点击
$(document).on('click', '.click-log', function () {
    var click_type = $(this).data('click_type');
    var down_type = $(this).data('down_type');
    $.post(objSite.getKuUrl('/activity/index/clickLog'), {click_type: click_type, down_type: down_type});
});

// 活动支付弹窗
function openActPay(bg, color, package_id, activity_id, cz_channel) {
    //判断是否有登录
    if (!objSite.isLogin()) {
        openLogin();
        return false;
    }
    layer.open({
        type: 2,
        title: false,
        resize: false,
        area: ['800px', '430px'],
        content: objSite.getServiceUrl('/pay/activity_pay_page?package_id=' + package_id + '&activity_id=' + activity_id + '&cz_channel=' + cz_channel),
        success: function (layero, index) {
            var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']];
            body.find('.left').css('background-image', 'url(' + bg + ')');
            body.find('.left h2').css('color', color);
        }
    });
}

// 正常支付弹窗
// 充值渠道(1溜币充值，2渲点充值，3vip充值，4魔术手)
var loadPay = '';

function openNormalPay(package_id, cz_channel, cz_type, cz_source, cz_month, discount_id) {
    //获取渲染客户端标识
    var client = navigator.userAgent;
    if (client == '3d66') {
        //获取用户token
        var user_token = ThirdPlatformWebView.getTokenKey();

        if (!user_token) {
            layer.msg('请先登录');
            return false;
        }
        var data = {
            package_id: package_id,
            cz_channel: cz_channel,
            cz_source: cz_source,
            cz_type: cz_type,
            user_token: user_token
        };
        var create_order_url = objSite.getServiceUrl('/pay/xr_client_create_order');
    } else {
        //判断是否有登录
        if (!objSite.isLogin()) {
            openLogin();
            return false;
        }
        var data = {
            package_id: package_id,
            cz_channel: cz_channel,
            cz_source: cz_source,
            cz_type: cz_type
        };
        var create_order_url = objSite.getServiceUrl('/pay/normal_create_order');
    }

    //魔术手
    if (cz_channel == 4) {
        var data = {
            package_id: package_id,
            cz_channel: cz_channel,
            cz_source: cz_source,
            cz_type: cz_type,
            cz_month: cz_month,
            discount_id: discount_id
        };
    }

    $.ajax({
        type: "POST",
        url: create_order_url,
        data: data,
        async: false,
        success: function (res) {
            if (res.status == 0) {
                layer.msg(res.msg);
                return false;
            }
            var result = JSON.parse(res.msg);
            $('#jkma').val(result.data);
            switch (cz_type) {
                case 0:
                    if (res.status == 0) {
                        layer.msg(res.msg);
                        return false;
                    }
                    layer.open({
                        type: 2,
                        title: false,
                        resize: false,
                        area: ['315px', '373px'],
                        content: objSite.getServiceUrl('/pay/normal_qr_code_page?data=' + result.data)
                    });
                    return false;
                    break;
                case 2:
                    $('.pay-click').attr('action', objSite.getServiceUrl('/pay/create_alipay_pc'));
                    $('.pay-click').submit();
                    checkPay(result, cz_channel);
                    break;
                case 3:
                    $('.pay-click').attr('action', objSite.getServiceUrl('/pay/create_paypal'));
                    $('.pay-click').submit();
                    checkPay(result, cz_channel);
                    break;
                    break;
                default:
                    break;
            }
        }
    });
}

// 检查是否支付
function checkPay(result, cz_channel) {
    clearInterval(loadPay);
    loadPay = setInterval(function () {
        var url = objSite.getServiceUrl('/pay/check_pay');
        $.post(url, {
            service: "ll.order.check",
            jkma: result.original_jkma,
            cz_channel: cz_channel
        }, function (res) {
            if (res.status === 200) {
                layer.msg('支付成功');
                clearInterval(loadPay);
                switch (cz_channel) {
                    case 1:
                        var return_url = objSite.getUserUrl('pay/index_list/index');
                        break;
                    case 2:
                        var return_url = objSite.getUserUrl('/pay/vip_list/index');
                        break;
                    case 3:
                        var return_url = objSite.getUserUrl('/pay/xuanran_list/index');
                        break;
                    case 4:
                        var return_url = objSite.getUserUrl('/pay/plug_list/index');
                        break;
                    case 5:
                        var return_url = objSite.getShopUrl('/order_1_2.html');
                        break;
                    default:
                        var return_url = objSite.getUserUrl('/pay/index_list/index');
                        break;
                }
                console.log(return_url);
                setInterval(function () {
                    parent.window.location.href = return_url;
                }, 1000);

            }
        })
    }, 2000);
}

// 检测ie低版本提示升级
$(function () {
    var ieDom = '<div class="mss-ie-bg" style="z-index:29891015;position: fixed;top: 0px;left: 0px;bottom: 0px;right: 0px;width: 100%;height: 100%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000,endColorstr=#7f000000);"><div class="mss-ie" style="width: 530px;height: 400px;background: url(https://static.3d66.com/public/images/ieUpdate/bg.png) center no-repeat;z-index: 99;box-sizing: border-box;position: fixed;top: 50%;left: 50%;margin: -200px 0px 0px -265px;">' +
        '<div class="mss-ie-title" style="padding-top: 200px;">' +
        '<h2 style="font-size: 22px;line-height: 22px;color: #027848;text-align: center;">浏览器版本过低，请升级您的浏览器</h2>' +
        '<p style="line-height: 12px;font-size: 12px;color: #04b26c;padding: 15px 0 25px;text-align: center;">为了不影响您的浏览体验，建议您选择比较新的浏览器访问本站</p>' +
        '<h5 style="color: #24aa6f;font-size: 12px;line-height: 12px;padding:0px 0px 8px 100px;">您可以选择：</h5>' +
        '</div>' +
        '<div class="mss-ie-browser" style="width: 390px;text-align: center;margin: 0px auto;">' +
        '<a style="display: inline-block;width: 92px;height: 100px;color: #05a464;" href="http://down.360safe.com/se/360se10.0.1581.0.exe" target="_blank"><img src="https://static.3d66.com/public/images/ieUpdate/logo1.png" style="display: inline-block;" alt=""><span style="display: block;width: 92px;font-size: 12px;">360浏览器</span></a>' +
        '<a style="display: inline-block;width: 92px;height: 100px;color: #05a464;" href="https://dl.softmgr.qq.com/original/Browser/70.0.3538.110_chrome_installer.exe" target="_blank"><img src="https://static.3d66.com/public/images/ieUpdate/logo2.png" style="display: inline-block;" alt=""><span style="display: block;width: 92px;font-size: 12px;">谷歌浏览器</span></a>' +
        '<a style="display: inline-block;width: 92px;height: 100px;color: #05a464;" href="https://dldir1.qq.com/invc/tt/QQBrowser_Setup_QB10.exe" target="_blank"><img src="https://static.3d66.com/public/images/ieUpdate/logo3.png" style="display: inline-block;" alt=""><span style="display: block;width: 92px;font-size: 12px;">QQ浏览器</span></a>' +
        '<a style="display: inline-block;width: 92px;height: 100px;color: #05a464;" href="http://down.360safe.com/cse/360cse_9.5.0.138.exe" target="_blank"><img src="https://static.3d66.com/public/images/ieUpdate/logo4.png" style="display: inline-block;" alt=""><span style="display: block;width: 92px;font-size: 12px;">360急速浏览器</span></a>' +
        '</div>' +
        '</div></div>';
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        console.log(fIEVersion);
        if (fIEVersion <= 8) {
            $('body').append(ieDom);
            return;
        } else {
            //IE版本>8
            return;
        }
    } else if (isEdge) {
        //edge
        return;
    } else if (isIE11) {
        //IE11
        return;
    } else {
        return;//不是ie浏览器
    }
});

//行为触发事件
function codeVeri(msg) {
    //多窗口模式，层叠置顶
    layer.open({
        type: 1
        , title: msg
        , area: ['390px', '280px']
        , content: $('#cbox').html(),
        success: function (layero, index) {
            var layerClass = layero[0].childNodes[1];
            new YpRiddler({
                expired: 10,
                mode: 'flat',
                container: layerClass,
                appId: '0cc0c95b979b44b0a53126be94ae77ec',
                version: 'v1',
                winWidth: 350,
                onError: function (param) {
                    if (param.code == 429) {
                        layer.msg('请求过于频繁，请稍后再试！')
                        return
                    }
                    // 异常回调
                    layer.msg('验证服务异常')
                },
                onSuccess: function (validInfo, close) {
                    // 成功回调
                    console.log("验证通过!");
                    var token = validInfo.token;
                    var authenticate = validInfo.authenticate;
                    layer.load(1);
                    var url = objSite.getUserUrl('/vericode/download_Code_Check');
                    $.post(url, {token: token, authenticate: authenticate}, function (res) {
                        layer.closeAll('loading');
                        layer.msg(res.msg);
                        if (res.code == 1) {
                            setTimeout(function () {
                                layer.closeAll();
                            }, 1000);
                        }
                        return false;
                    });
                    close()
                },
                onFail: function (code, msg, retry) {
                    // 失败回调
                    console.log('出错啦：' + msg + ' code: ' + code);
                    layer.msg('验证失败，请重新验证');
                    retry()
                },
                beforeStart: function (next) {
                    console.log('验证马上开始')
                    next()
                },
                onExit: function () {
                    // 退出验证 （仅限dialog模式有效）
                    console.log('退出验证')
                }
            })
        }
    });
};
