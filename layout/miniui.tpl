<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>首页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="dns-prefetch" href="//oriyxfsn2.bkt.clouddn.com" />
    <link rel="dns-prefetch" href="//img.zhidianlife.com" />
    <link rel="dns-prefetch" href="//img2.zhidianlife.com" />
    <script>
        var debug = true;
    // var mini_withCredentials = true;
      var getCookie = function (sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) {
        lastMatch = aCrumb;
      }
    }
    if (lastMatch) {
      var v = lastMatch[1];
      if (v === undefined) return v;
      return unescape(v);
    }
    return null;
  }

  window.COM_CONFIG = {
    ckName: 'xx',
    SERVER: "http://xx.xx.x.x:xx"
  };



  var cookies = getCookie(COM_CONFIG.ckName);
  if(cookies){
    cookies = JSON.parse(cookies);
    COM_CONFIG.TOKEN = cookies.token;
    COM_CONFIG.USER = cookies;
    COM_CONFIG.IMG_SERVER = 'http://xx.bkt.clouddn.com';
    COM_CONFIG.STATIC_SERVER = location.origin;
  }

  var topHref = window.top.location.href;
  var pathName = window.top.location.pathname;
  //  白名单
  var whiteList = [
      '/register',
      '/bsjoinus',
      '/registers/storage',
      '/registers/wholesale',
      '/registers/payment',
      '/resetpassword',
  ]
  if(!COM_CONFIG.TOKEN){
    if(!~topHref.indexOf("/login") && (!~whiteList.indexOf(pathName))){
      window.top.location.href = "/login";
    }
  } else {
    if (~window.top.location.href.indexOf("/login")){
      window.top.location.href = "/";
    }
  }
</script>

</head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
