
$('.pay-code').empty();

var DEFAULT_VERSION = "8.0";
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie") > -1;
var safariVersion;
if (isIE) {
    safariVersion = ua.match(/msie ([\d.]+)/)[1];
}
//判断IE8浏览器，qrcode使用table,其他版本使用canves
if (safariVersion <= DEFAULT_VERSION) {
    //生成二维码
    $('.pay-code').qrcode({
        render: 'table',
        width: 150,
        height: 150,
        text: url
    });
} else {
    //生成二维码
    $('.pay-code').qrcode({
        width: 150,
        height: 150,
        text: url

    });
}