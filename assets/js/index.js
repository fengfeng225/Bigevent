(function () {
    getUserInfo()

    let layer = layui.layer

    //退出登录
    $('#btnLogout').on('click', function() {
        //提示是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title: '提示'}, function(index) {
            //1.清除本地的token
            localStorage.removeItem('token')
            //2.重新回到登录页面
            location.href = 'login.html'
            //关闭弹出框
            layer.close(index)
        })
    })
})()

//获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            renderAvatar(res.data)
        },
        // //没有登录的用户若访问首页，强制跳转回登录页面
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = 'login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let name_pic = name[0].toUpperCase()
        $('.text-avatar').html(name_pic).show()
    }
}