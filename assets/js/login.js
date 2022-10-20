$(function(){
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 校验密码
    let reg = /^[\S]{6,12}$/
    function verifyPassword1() {
        if (!reg.test($('#inputPassword1').val())) {
            return false
        }
        return true
    }
    function verifyPassword2() {
        if (!reg.test($('#inputPassword2').val())) {
            return false
        }
        return true
    }

    //监听登录表单的提交事件
    $('.login-box .form-horizontal').on('submit',function(e) {
        e.preventDefault()
        if (!verifyPassword1()) {
            $('.login-pwd').show()
        } else{
            $('.login-pwd').hide()
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return alert('登录失败')
                    }
                    alert('登录成功!')
                    localStorage.setItem('token',res.token)
                    location.href = 'index.html'
                }
            })
        }
    })
    //发起ajax请求也可以拼接url地址，更简便的是用prefilter函数
    // let gurl = 'http://api-breakingnews-web.itheima.net'
        //监听注册表单提交事件
    $('.reg-box .form-horizontal').on('submit',function(e) {
        e.preventDefault()
        if (!verifyPassword2()) {
            $('.reg-pwd').show()
        } else if ($('#inputPassword2').val() !== $('#inputPassword3').val()) {
            $('.reg-repwd').show()
        } else {
            $('.reg-pwd').hide()
            $('.reg-repwd').hide()
            $.ajax({
                type: 'POST',
                url: '/api/reguser',
                data: {
                    username: $('.reg-box [name=username]').val(),
                    password: $('.reg-box [name=password]').val()
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return alert(res.message)
                    }
                    alert('注册成功，请登录!')
                    //模拟点击，自动跳转登录页面
                    $('#link_login').click( )
                }
            })
        }
    })

})