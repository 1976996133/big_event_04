$(function () {
    var form = layui.form

    // 验证规则
    form.verify({

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 新密码
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新旧密码不能相同！"
            }
        },
        // 验证新密码
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码不一致！"
            }
        }
    })


    // 提交表单
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更改密码失败！")
                }
                layui.layer.msg("更改密码成功！")
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })

})
