$(function () {
    layer = layui.layer

    let options = {
        //纵横比
        aspectRatio: 1,
        //指定预览区域
        preview: '.img-preview'
    }
    $('#image').cropper(options)

    //上传图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    //更换裁剪区域图片 绑定change事件
    $('#file').on('change', function (e) {
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择图片')
        }

        let file = filelist[0]
        let imgUrl = URL.createObjectURL(file)
        $('#image').cropper('destroy').attr('src', imgUrl).cropper(options)
    })

    //为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        let dataURL = $('#image').cropper('getCroppedCanvas',{
            width: 100,
            height: 100
        }).toDataURL('image/png')

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!')
                window.parent.getUserInfo()
            }
        })
    })
})