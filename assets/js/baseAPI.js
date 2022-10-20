//每次调用get post ajax请求 都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})