
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}
function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
var inputs = document.getElementsByTagName("input");
for (var i = 0;i<inputs.length; i++) {
    inputs[i].onclick=function(){
        for (var j = 0; j < inputs.length; j++) {
            removeClass(inputs[j],"active");

        }
        addClass(this,"active");
        document.getElementById("ques-input").value=this.value;

    }

}
function closeLayer(){
    parent.layer.closeAll();
}
/*$("#ques-input").bind("input propertychange change",function(event){
	$('.may-related').css('display','block');
});*/
$('.input-box').on('mouseleave',function(){
    $('.may-related').css('display','none');
});
function closeRelated(){
    $('.may-related').css('display','none');
}


// 获取字符长度
function getByte(str) {
    var byte = 0;
    var len = str.length;
    var charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            byte += 1;
        else
            byte += 2;
    }
    return byte;
}
//html拼接
function returnHtml(content) {
    var contentHtml = '';
    contentHtml += '<div class="related-top">';
    contentHtml += '<span class="fl">您的问题可能已经有回答</span>';
    contentHtml += '<i class="iconfont fr" onclick="closeRelated()">&#xe682;</i>';
    contentHtml += '</div>';
    contentHtml += '<ul class="content">';
    contentHtml += content;
    contentHtml += '</ul>';
    return contentHtml;
}

$(function(){

    //富文本框编辑器
    layui.use(['form', 'layedit', 'laydate'], function() {
        form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;
        //上传图片,必须放在 创建一个编辑器前面
        layedit.set({
            uploadImage: {
                url: '/soft/ask_question/upload' //接口url
                ,type: 'post' //默认post
            }
        });
        index = layedit.build('ques-content',{
            tool: ['face', 'image'],
            height:560,
        }); //建立编辑器
        $('.popup-foot').css('display','block');
    });

    //提交审核
    $('#sub').click(function () {
        layedit.sync(index);
        form.on('submit(formDemo)', function(data){
            data = data.field;
            if(data.question_title.length <= 0){
                layer.msg('提问标题不能为空！');
                return false;
            }
            if(data.question_memo.length <= 0){
                layer.msg('提问内容不能为空！');
                return false;
            }
            var titleByte = getByte(data.question_title);
            if(titleByte > 84){
                layer.msg('标题字数不能超过42哦');
                return false;
            }
            $.ajax(
                {
                    type:"POST",
                    url:"/soft/ask_question/index",
                    dataType:"json",
                    data:data,
                    success:function (res)
                    {
                        if(res.code == 100){
                            layer.msg(res.msg);

                        }else if(res.code == 300){
                            parent.openLogin();

                        }else if(res.code == 200){
                            layer.msg(res.msg);
                            setTimeout(function () {
                                closeLayer();
                            },1000)
                        }
                    }
                }
            )
        });
    })

    //搜索相关问题列表
    $('#ques-input').keyup(function(){

        var title = $('#ques-input').val();
        if(title.length <1){
            return false;
        }
        var titleByte = getByte(title);
        if(titleByte > 84){
            return false;
        }

        $.ajax(
            {
                type:"POST",
                url:"/soft/search_question_list" +
                "/ajaxFindList",
                dataType:"json",
                data:{'title':title},
                success:function (res)
                {
                    if(res.code == 200){
                        var list = res.data;
                        var content = '';
                        for(var i=0;i<list.length;i++){
                            var question_title = list[i].question_title;
                            var len = getByte(question_title);
                            if(len>71){
                                question_title = question_title.substr(0,71);
                            }
                            content += '<li class="clearfix">';
                            content += '<a target="_blank" class="fl" onclick="closeLayer();" href="/changjianwenti/tiwen_'+list[i].question_id+'.html">'+question_title+'</a>';
                            content += '<span class="fr">'+list[i].answer_num+'个答案</span>';
                            content += '</li>';
                        }
                        var html = returnHtml(content);
                        $('.may-related').html(html);
                        $('.may-related').css('display','block');
                    }
                }
            }
        )

    });
})

