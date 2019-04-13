$(function () {
    //判断浏览器支付方式
    if (is_weixin()) {
        var channel = 'wx';
    } else if (is_alipay()) {
        var channel = 'alipay';
    }
    var charge_url = "/recharge/pay_event/creatPay";
    var order_sn = $("input[name='order_sn']").val();
    $('#order_submit').on('click', function () {
        $.post(charge_url, {order_sn: order_sn, channel: channel}, function (data) {
            //调用ping++ H5支付
            pingpp.createPayment(data, function (result, err) {
                //暂时不做任何操作，ping++会自动回到到webhooks地址
            });
        });
    });

    //判断是否为微信浏览器
    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    //判断是否为支付宝浏览器
    function is_alipay() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/AlipayClient/i) == 'alipayclient') {
            return true;
        } else {
            return false;
        }
    }
});
