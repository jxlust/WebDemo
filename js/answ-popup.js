//关闭窗口
function closeLayer() {
    parent.layer.closeAll();
}


$(function () {

    //富文本编辑器
    layui.use(['form', 'layedit', 'laydate'], function () {
        form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;
        //上传图片,必须放在 创建一个编辑器前面
        layedit.set({
            uploadImage: {
                url: '/soft/ask_question/upload' //接口url
                , type: 'post' //默认post
            }
        });
        index = layedit.build('ques-content', {
            tool: ['face', 'image'],
            height: 398
        }); //建立编辑器
        $('.popup-foot').css('display', 'block');
    });
    //提交回答
    $('.submit').click(function () {
        var detail = layedit.getContent(index);
        if (detail.length <= 0) {
            layer.msg('回答内容不能为空');
            return false;
        }
        var q_id = $('#question_id').val();
        var p_id = $('#parent_answer_id').val();
        var token = $('#token').val();
        var rule = $('#rule').val();

        var data = {
            "question_id": q_id,
            "detail": detail,
            "parent_answer_id": p_id,
            "rule": rule
        };
        data[rule] = token;

        $.ajax(
            {
                type: "POST",
                url: "/soft/answer/insertOne",
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res.code == 100) {
                        layer.msg(res.msg);
                    } else if (res.code == 300) {
                        parent.openLogin();
                    } else if (res.code == 200) {
                        layer.msg(res.msg);
                        setTimeout(function () {
                            closeLayer();
                        }, 1000)
                    }
                }
            }
        )

    })
})
