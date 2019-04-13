var rbarhtml = "<div class='right-act sysFocusImgSing' data-id='124'></div>";
rbarhtml += "<ul class='rightbar'>";
rbarhtml += "    <li class='dropdown'><span><i class='iconfont'>&#xe65b;</i>客服</span>";
rbarhtml += "        <div class='dropmenu'>";
rbarhtml += "            <div class='qq'>";
rbarhtml += "                <p class='qqbox'><a rel='nofollow' href='http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAzNzAwMl80NzU4MTNfODAwMDM3MDAyXzJf' target='_blank'>客服QQ<span class='btn-qq'><i class='bg-qq'></i>800037002</span></a></p>";
rbarhtml += "                <p class='tell'>电话:0755-21006465</p>";
rbarhtml += "                <p class='juser' id='userid'></p>";
rbarhtml += "                <p class='juser'>(反馈时告知客服您的ID)</p>";
rbarhtml += "                <p class='worktime'>周一至周五：9:00-21:00</p>";
rbarhtml += "                <p class='worktime'>周末及节日：9:00-18:00</p>";
rbarhtml += "            </div>";
rbarhtml += "        </div>";
rbarhtml += "    </li>";
//rbarhtml += "    <li><a class='jclick-count' data-type='11' rel='nofollow' href='" + objSite.getUserUrl('recharge/new_charge.html') + "' target='_blank'><i class='iconfont'>&#xe675;</i>充值</a></li>";
rbarhtml += "    <li><a class='jclick-count' data-type='11' rel='nofollow' href='" + objSite.getLbPayUrl('/') + "' target='_blank'><i class='iconfont'>&#xe675;</i>充值</a></li>";
rbarhtml += "    <li><a class='jclick-count' data-type='12' rel='nofollow' href='" + objSite.getVipUrl('/') + "' target='_blank'><i class='iconfont'>&#xe656;</i>VIP</a></li>";

//rbarhtml+="    <li class='dropdown'><span><i class='iconfont'>&#xe680;</i>微信</span>";
//rbarhtml+="        <div class='dropmenu qr-code'><div class='bg-codell'></div></div>";
//rbarhtml+="    </li>";
rbarhtml += "    <li><a class='jclick-count' data-type='12' rel='nofollow' href='" + objSite.getServiceUrl('/upload.html') + "' target='_blank'><i class='iconfont'>&#xe670;</i>赚钱</a></li>";

rbarhtml+="    <li class='feedback'><span><i class='iconfont'>&#xe68f;</i>反馈</span></li>";
rbarhtml += "    <li class='gotop'><span><i class='iconfont'>&#xe64d;</i></span></li>";
rbarhtml += "</ul>";
document.write(rbarhtml);

$(document).ready(function () {
    var userid = '';
    if (objSite.isLogin()) {
        var userInfo = $.cookie('userCookieData');
        if (!userInfo || userInfo === 'null') {
            userid = '您还未登录';
        } else {
            var obj = JSON.parse(userInfo);
            userid = '您的用户ID:' + obj.user_id;
        }
    } else {
        userid = '您还未登录';
    }

    $('#userid').text(userid);

    // rightbar 右侧栏固定
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 200) {
            $('.gotop').fadeIn(300);
        } else {
            $('.gotop').hide();
        }
    });

//点击回到顶部
    $('.gotop').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 300);
    });
});




