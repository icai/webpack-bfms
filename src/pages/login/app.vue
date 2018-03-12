<template>
 <div id="main">
    <div class="header" role="header">
        <span class="logo-min"><img src="../../assets/img/login/logo_white.png" /></span>
        <span class="copy-name">蜘点YY管理系统</span>
        <div class="top-nav pull-right">
            <el-button class="a" round size="mini">蜘点官网</el-button>
            <el-button class="a" round size="mini">官方微博</el-button>
            <el-button class="a" round size="mini">客户端下载</el-button>
        </div>
    </div>
    <el-carousel style="z-index: -1;height: 100%;" height="100%" :interval="5000" arrow="never">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="images[item - 1]" :alt="item">
        <div class="litextdiv">
            <p><span class="leftlouth"></span><span>蜘点商业</span></p>
            <p><span class="rightlouth"></span><span>引领电商新时代</span></p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="ui-loginBox" role="main" >
        <p class="text-center user_login">用户登录</p>
        <input id="hdLgoning" type="hidden" value="0" />
        <el-form class="login" :rules="rules" ref="ruleForm" :model="ruleForm" label-width="0" >
          <el-form-item prop="userName">
            <el-input placeholder="手机号/用户名" prefix-icon="el-icon-search" icon="my-phone" v-model="ruleForm.userName" type="tel" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" prefix-icon="el-icon-search" icon="my-password" v-model="ruleForm.password" type="password" @keyup.enter="login"></el-input>
          </el-form-item>
          <el-form-item prop="checkCode">
            <el-input placeholder="验证码" prefix-icon="el-icon-search" style="padding-right:120px" ></el-input>
            <img id="checkCode" :src="checkImage" @click="checkCode" width="117" height="38" alt="">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login">登  录</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="project">
          <span class="copyright">© 2018</span>
    </div>
</div>
</template>

<script>
import ajax from 'ajax';

import logo from 'assets/img/logo.png'
import img1 from 'assets/img/login/1.jpg'
import img2 from 'assets/img/login/2.jpg'
import img3 from 'assets/img/login/3.jpg'
import img4 from 'assets/img/login/4.jpg'
import chImage from './img.jpg'

const _S =  function (v) {
  return chImage //'http://119.xx.xx.xx:xx' + v
}
export default {
  data () {
    return {
      images: [img1, img2, img3, img4],
      logo: logo,
      ruleForm: {
        phone: '',
        password: ''
      },
      checkImage: chImage,
      checkCodeStatus: false,
      rules: {
        userName: [
           { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      login () {
        const me = this;
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            return
          }
          ajax.post('/login', this.ruleForm)
          .then(function(res) {
            let data = res.data;
            if(data.status == 1) {
              location.assign('../user/index.html')
            } else {
              me.$notify({
                message: data.message,
                duration: 3000
              })
            }
          })
        })
      },
      initView: function(){
      },
      checkCode: function(e){
          // var target = $(e.currentTarget);
          const src = _S('/verifycode/img');
          this.checkImage = src;
      },
      queryCheckCodeStatus: function() {
          var v = this.ruleForm.userName;
          var me = this;
          v && ajax
          .get('/login/verifycode/need', {  mno: v })
          .then(function(res) {
            let data = res.data;
            if(data.status) {
                if(data.data == 1) {
                    me.checkCodeStatus = true;
                } else {
                    me.checkCodeStatus = false;
                }
            }
          })
      }
  }
}
</script>

<style lang="postcss">
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
}

:before,:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
}

.text-left {
    text-align: left
}

.text-right {
    text-align: right
}

.text-center {
    text-align: center
}

.text-justify {
    text-align: justify
}

.text-nowrap {
    white-space: nowrap
}

.text-lowercase {
    text-transform: lowercase
}

.text-uppercase {
    text-transform: uppercase
}

.text-capitalize {
    text-transform: capitalize
}

html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: Microsoft YaHei,SimHei,Tahoma !important;
}

#main {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.pull-right {
  float: right;
}

a{
    color:#1D1DFF;
}

.header {
    height: 100px;
    width: 100%;
    position: absolute;
    padding: 0 80px;
    z-index: 999;
}

.project{
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 1000;

}

li {
    list-style: none;
}

.logo-min {
    width: 55px;
    height: 55px;
    display: block;
    float: left;
    position: absolute;
    top: 50%;
    margin-top: -30px;
}

.logo-min img,
.copy-name img {
    width: 100%;
    height: 100%;
}

.copy-name {
    /*width: 285px;*/
    height: 46px;
    display: block;
    float: left;
    top: 50%;
    font-size: 30px;
    font-family: "微软雅黑" !important;
    font-weight: 800;
    position: absolute;
    margin-top: -23px;
    line-height: 46px;
    color: #fff;
    margin-left: 80px;
}
/*carousel start*/
/* main */
#main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*position: absolute;*/
}

#main .box {
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 5px #ddd;
    margin: 0px auto;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: all 0.6s;
}

#main .box li {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ccc;
    left: 0px;
    opacity: 0;
    filter: alpha(opacity=0);
}
.litextdiv {
    position: absolute;
    left: 10%;
    bottom: 130px;
    font-size: 40px;
    color: #fff;
}

.litextdiv p {
    position: relative;
    padding: 10px 100px;
    margin: 0;
}

.leftlouth {
    display: inline-block;
    background: url(../../assets/img/login/leftquote.png) top no-repeat;
    height: 32px;
    width: 46px;
    overflow: hidden;
    position: absolute;
    left: 40px;
    top: 8px;
}

.rightlouth {
    background: url(../../assets/img/login/rightquote.png) no-repeat top;
    display: inline-block;
    position: absolute;
    height: 32px;
    width: 46px;
    overflow: hidden;
    right: 40px;
    top: 20px;
}

.boxchange {
    transform: scale(1.06, 1.06);
    -webkit-transform: scale(1.06, 1.06);
    -moz-transform: scale(1.06, 1.06);
    -ms-transform: scale(1.06, 1.06);
    -o-transform: scale(1.06, 1.06);
}



#main .btnLeft {
    width: 35px;
    height: 57px;
    position: absolute;
    left: 50px;
    top: 185px;
    z-index: 1;
}

#main .btnRight {
    width: 35px;
    height: 57px;
    position: absolute;
    right: 50px;
    top: 185px;
    z-index: 1;
}



#checkCode {
    outline: none;
    height: 100%;
    width: 117px;
    border: 1px solid #e5e6e7;
    vertical-align: top;
    /* margin-left: 2px; */
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0px;
}

.ui-loginBox {
    position: absolute;
    top: 50%;
    margin-top: -200px;
    /*width: 354px;*/
    width: 310px;
    /* height: 360px; */
    right: 10%;
    background: #fff;
    background-size: cover;
    border-radius: 10px;
    padding: 30px 20px 40px 20px;
    font-size: 14px;
}

.ui-loginBox .field{
    position: relative;
    /* margin-top: -1px; */
}

.ui-loginBox input {
    width: 100%;
    padding: 8px 1px;
    font-size: 14px;
    outline: none;
    border: 1px solid #eaeaea;
    vertical-align: middle;
    /*text-indent: 30px;*/
    padding-left: 30px;
    /*margin-top: -1px;*/
}

.ui-loginBox .checkbox-field input{
    padding-right: 120px;
}

.icon_span {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    margin-top: -11px;
    left: 10px;
}

.icon_span img {
    /*width: 100%;*/
    /*height: 100%;*/
}

/*input.J_code {
    width: 150px;
}*/

.J_login {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    line-height: 36px;
    font-size: 18px;
    background-color: #3171f4;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 3px;
}

.J_login:active {
    background-color: #1872ab;
}

.zhidian {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    text-align: center;
    font-size: 15px;
    color: #787878;
}

.user_login {
    font-size: 20px;
    color: #353535;
    margin-bottom: 24px;
}

.J_login_div {
    margin: 0 auto;
}


.footertext {
    color: #666;
    letter-spacing: 3px;
    margin-left: 2px;
    line-height: 22px;
    font-size: 16px;
}



.validationMsg {
    color: red;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.top-nav{
    margin-top: 15px;
}

.top-nav .a {
    background: transparent;
    color: #fff;
    border-color: transparent;
}

.top-nav .a:hover,
.top-nav .a:active{
    background-color: #E35A53;
    border-color: #E35A53;
    color: #fff;
}
</style>
