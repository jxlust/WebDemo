$(function () {
    //询问支付结果
    var jkma = $("input[name='jkma']").val();
    var fee = $("input[name='total_fee']").val();
    var time_expire = 300;
    var pay_success = 3;
    var pay_status = 0;
    var loadPay_wait_1 = null;
    var loadPay_success_1 = null;
    var source = $("input[name='pay_source']").val();
    var websocket = null;

    // 打开一个 web socket
    newWebSocket();

    <!-- 正在支付 -->
    function loadPay_wait() {
        loadPay_wait_1 = setInterval(function () {
            time_expire--;
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
                clearInterval(loadPay_wait_1);
            }
        }, 1000);
    }

    <!-- 支付成功 -->
    function loadPay_success() {
        clearInterval(loadPay_wait_1);
        loadPay_success_1 = setInterval(function () {
            pay_success--;
            var payname = $('#pay-name').text();
            //获取管理器标识
            var client = navigator.userAgent;
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
                clearInterval(loadPay_success);
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
        }, 1000);
    }

    // websocket连接
    var websocket_connected_count = 0;
    var onclose_connected_count = 0;

    function newWebSocket() {
        // 判断当前环境是否支持websocket
        if (window.WebSocket) {
            if (!websocket) {
                var ws_url = "wss://xxx.3d66.com:443";
                websocket = new WebSocket(ws_url);
            }
        } else {
            //console.log("not support websocket");
        }

        // 连接成功建立的回调方法
        websocket.onopen = function (e) {
            heartCheck.reset().start();   // 成功建立连接后，重置心跳检测
            //console.log("connected successfully");
            //发送数据
            var send_data = JSON.stringify({
                service: 1,//服务
                data: {
                    jkma: jkma,
                    pay_source: source
                }
            });
            websocket.send(send_data);
        };

        // 连接发生错误，连接错误时会继续尝试发起连接（尝试5次）
        websocket.onerror = function () {
            //console.log("onerror连接发生错误");
            websocket_connected_count++;
            if (websocket_connected_count <= 5) {
                // console.log("onerror连接发生错误");
                newWebSocket()
            }
        };

        // 接受到消息的回调方法
        websocket.onmessage = function (e) {
            //console.log("接受到消息了");
            heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
            var message = e.data;
            var pay_data = JSON.parse(message);
            pay_status = pay_data['status'];
            if (pay_status == 201) {
                loadPay_wait();
            } else if (pay_status == 200) {
                loadPay_success();
            }
        };

        // 接受到服务端关闭连接时的回调方法
        websocket.onclose = function () {
            parent.layer.closeAll();
            parent.$('#pay').click();
            //console.log("onclose断开连接");
        };

        // 监听窗口事件，当窗口关闭时，主动断开websocket连接，防止连接没断开就关闭窗口，server端报错
        window.onbeforeunload = function () {
            websocket.close();
        };

        // 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
        var heartCheck = {
            timeout: 55000,        // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
            serverTimeoutObj: null,
            reset: function () {
                clearTimeout(this.timeoutObj);
                clearTimeout(this.serverTimeoutObj);
                return this;
            },
            start: function () {
                var self = this;
                this.serverTimeoutObj = setInterval(function () {
                    if (websocket.readyState == 1) {
                        //console.log("连接状态，发送消息保持连接");
                        websocket.send("ping");
                        heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
                    } else {
                        //console.log("断开状态，尝试重连");
                        newWebSocket();

                    }
                }, this.timeout)
            }
        };

    };

});

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
        //clearInterval(loadPay);
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

