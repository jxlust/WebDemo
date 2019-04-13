$(function () {
    //询问支付结果
    var jkma = $("input[name='jkma']").val();
    var fee = $("input[name='total_fee']").val();
    var time_expire = 300;
    var pay_success = 3;
    if (window.location.host.indexOf('user') > -1) {
        var source = 1;
    } else {
        var source = 2;
    }

    var loadPay = setInterval(function () {
        var is_vip = $("input[name='is_vip']").val();
        var url = '/pay/check_pay';
        $.post(url, {service: "ll.order.check", jkma: jkma, is_vip: is_vip}, function (res) {
            if (res.status == 500) {
                layer.msg(res.msg);
                clearInterval(loadPay);
            } else if (res.status == 201) {
                //倒计时
                time_expire--;
                <!-- 正在支付 -->
                $('.content').html(
                    "<div class='paying'><h1>" + fee + "</h1><h2>正在支付...</h2>" +
                    "<p>请在&nbsp;<span class='count-donw'>" + time_expire + "</span>&nbsp;秒内，在手机上确认支付</p><span id='refresh-code'><i class='iconfont'>&#xe6a0;</i>&nbsp;刷新二维码</span></div>"
                );
                if (time_expire == 0) {
                    <!-- 支付超时 -->
                    $('.content').html(
                        "<div class='timeout'><i class='iconfont'>&#xe6a2;</i>" +
                        "<h2>付款超时</h2><p id='refresh-code'><i class='iconfont'>&#xe6a0;</i>&nbsp;刷新二维码</p></div>"
                    );
                    clearInterval(loadPay);
                }
            } else if (res.status == 200) {
                var payname = $('#pay-name').text();
                //获取管理器标识
                var client = navigator.userAgent;
                pay_success--;
                if (client == '3DLLManager') {
                    $('.content').html(
                        "<div class='success'><i class='iconfont'>&#xe6a1;</i> <h2>恭喜您，充值成功</h2><p style='text-align: center'><span>" + pay_success + "</span>&nbsp;秒后关闭</p></div>"
                    );
                } else {
                    $('.content').html(
                        "<div class='success'><i class='iconfont'>&#xe6a1;</i> <h2>恭喜您，充值成功</h2><p><span>" + pay_success + "</span>&nbsp;秒后跳到【个人中心 - 购买明细 - " + payname + "】</p></div>"
                    );
                }

                if (pay_success == 0) {
                    clearInterval(loadPay);
                    if (client == '3DLLManager') {
                        //支付成功客户刷新用户信息
                        clientObj.paySuccess();
                        clientObj.closeWindow();
                    } else {
                        parent.layer.closeAll();
                        if (payname.indexOf('活动') > -1) {
                            parent.$(".rev4-recharge-200 .rev4-btn").click();
                        } else if (payname.indexOf('溜币') > -1) {
                            parent.window.location.href = objSite.getUserUrl('/pay/index_list/index');
                        } else if (payname.indexOf('渲染') > -1) {
                            parent.window.location.href = objSite.getUserUrl('pay/xuanran_list/index');
                        } else if (payname.indexOf('VIP') > -1) {
                            parent.window.location.href = objSite.getUserUrl('pay/vip_list/index');
                        }
                    }
                }
            }
        });
    }, 1000);


    //刷新二维码
    $(document).on('click', '#refresh-code', function () {
        //获取管理器标识
        var client = navigator.userAgent;
        if (client == '3DLLManager') {
            var user_token = clientObj.getUserToken();
            var package_id = clientObj.getPackageId();
            var discount_id = clientObj.getDiscountId();
            var url = '/pay/create_order?user_token=' + user_token + '&package_id=' + package_id + '&discount_id=' + discount_id + '&numb=' + Math.ceil(Math.random() * 10);
            window.location.href = url;
        } else {
            clearInterval(loadPay);
            parent.layer.closeAll();
            if (source == 1) {
                parent.$('.pay-scan').click();
            } else {
                parent.$('#pay').click();
            }
        }
    });

    //联系我们
    $(document).on('click', '#talkus', function () {
        //获取管理器标识
        var client = navigator.userAgent;
        var url = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAzNzAwMl80NzU4MTNfODAwMDM3MDAyXzJf";
        if (client == '3DLLManager') {
            clientObj.openDefaultBrowser(url);
            return false;
        } else {
            $('#talkus').attr('href', url);
        }
    });

    //logo
    $(document).on('click', '#logo', function () {
        //获取管理器标识
        var client = navigator.userAgent;
        var url = objSite.getWwwUrl('/');
        if (client == '3DLLManager') {
            clientObj.openDefaultBrowser(url);
            return false;
        } else {
            $('#logo').attr('href', url);
        }
    });

    //支付宝pc端支付
    $(document).on('click', '#alipaysubmit', function () {
        //获取管理器标识
        var client = navigator.userAgent;
        var jkma = $('input[name="jkma"]').val();
        if (client == '3DLLManager') {
            var user_token = clientObj.getUserToken();
            clientObj.openDefaultBrowser(objSite.getManagerUrl('/pay/alipaypc?user_token=' + user_token + '&jkma=' + jkma));
        } else {
            $('#alipaypc').submit();
        }
        return false;
    });

});