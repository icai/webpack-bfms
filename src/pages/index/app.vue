<template>
  <div id="wrapper">
    <div class="zd-process-bar"></div>
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-header nav-div-header">
            <div class="nav-div-logo"></div>
        </div>
        <div id="menus" class="layout-menu">
            <ul v-if="menus.length" v-for="(v, k) in menus" :key="k" class="nav-ul-menu-bar">
                <li class="nav-li-first">
                    <div class="nav-div-shadow">
                        <div :class="'nav-icon '+ v.navCls"></div>
                    </div>
                    <div class="nav-div-status"></div>
                    <ul class="nav-ul-second-panel" v-if="v.children">
                        <template v-if="v.children[0] && v.children[0].children">
                            <template v-if="v.children[0] && v.children[0].children" v-for="(c, l) in v.children">
                                    <li class="nav-li-third-panel" v-if="c.children" >
                                        <a class="nav-a-second">{{c.moduleName}}</a>
                                        <a v-for="(t,m) in c.children" :key="m" class="nav-a-third J_menuItem" :href="t.url">{{t.moduleName}}</a>
                                    </li>
                            </template>
                        </template>
                        <template v-else>
                            <li class="nav-li-third-panel">
                                <a v-for="(c, l) in v.children" :key="l" class="nav-a-third J_menuItem" :href="c.url">{{c.url}}{{c.moduleName}}</a>
                            </li>
                        </template>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0; height: 60px;">
                <div class="navbar-header">
                    <label class="sys-name">蜘点后台管理系统</label>
                    <label>Backstage Management System</label>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li v-if="[1, 8].contains(it.storageType)" style="margin-right:2px;">
                        <a @click="feedback" href="javascript:;" class="link-co">
                            <Icon type="chatbubble-working" size="15"></Icon><span>我要反馈</span>
                        </a>
                    </li>
                    <li class="">
                        <Poptip placement="bottom" :transfer="true">
                          <a class="dropdown"  aria-haspopup="true" aria-expanded="false">
                              <div class="">
                                  <Icon type="person" size="18"></Icon>  <span class="sUserName">
                                      {{COM_CONFIG.USER.realName || COM_CONFIG.USER.userName}}
                                  </span>
                              </div>
                          </a>
                          <ul slot="content" style="display:block;">
                              <DropdownItem>账号设置</DropdownItem>
                              <!-- <DropdownItem class="clean_cache">刷新菜单缓存</DropdownItem> -->
                              <DropdownItem divided class="modify_password">修改密码</DropdownItem>
                              <DropdownItem class="closelogin" >退出账号</DropdownItem>
                          </ul>
                        </Poptip>
                    </li>
                    <li class="" >
                        <PopupMessage></PopupMessage>
                    </li>
                    <li class="" style="margin-right:2px;">
                        <a title="帮助文档" target="_blank" href="/static/content/handbook.pdf" class="link-co"><Icon type="help-circled" size="15"></Icon><span>帮助文档</span></a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="ui-main-tab">
            <div class="content-tabs">
                <nav class="page-tabs J_menuTabs mini-ztabs" id="mainTabs" plain="false" arrowPosition="side" showNavMenu="true" activeIndex="0" buttons="#tabsButtons" contextMenu="#tabsMenu">
                    <template v-if="it.userType.value == 1 || it.userType.value == 2 || it.userType.value == 5">
                        <div title="首页" name="first" headercls="J_menuTab" url="/home/jicaicenter"></div>
                    </template>
                    <template v-if="it.userType.value == 3">
                        <div title="首页" name="first" headercls="J_menuTab" url="/home/dicaicenter"></div>
                    </template>
                    <template v-if="it.storageType == 1">
                        <div title="首页" name="first" headercls="J_menuTab" url="/home/provincewholesalecenter"></div>
                    </template>
                    <template v-if="it.storageType == 8">
                        <div title="首页" name="first" headercls="J_menuTab" url="/home/wholesalecenter"></div>
                    </template>
                </nav>
                <div class="sr-only">
                    <div id="tabsButtons">
                        <div class="btn-group roll-nav roll-right closebtn">
                            <button class="dropdown J_tabClose" data-toggle="dropdown">
                                关闭操作<span class="caret"></span>
                            </button>
                            <ul role="menu" class="dropdown-menu dropdown-menu-right">
                                <li class="J_tabShowActive">
                                    <a>定位当前选项卡</a>
                                </li>
                                <li class="divider"></li>
                                <li class="J_tabCloseAll">
                                    <a>关闭全部选项卡</a>
                                </li>
                                <li class="J_tabCloseOther">
                                    <a>关闭其他选项卡</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul id="tabsMenu" class="mini-contextmenu" onbeforeopen="onBeforeOpen">
                        <li onclick="closeTab" name="firstMenuItem">关闭标签页</li>
                        <li onclick="closeAll">关闭所有[首页除外]</li>
                        <li onclick="closeAllButFirst">关闭其他[首页除外]</li>
                    </ul>
                </div>
            </div>
            <div class="J_mainContent" id="content-main">
            </div>
        </div>
    </div>
    <div style="position: absolute;bottom: 3px;right: 3px;z-index: 1002;">
        v.1521090299975
    </div>
  </div>
</template>
<script>
import ajax from 'ajax'
import mini from 'mini'
import Page from '@/base/page'

import PopupMessage from 'components/message/popup.vue'



const _S =  function (v) {
  return chImage //'http://119.xx.xx.xx:xx' + v
}
export default {
    data: function() {
        return {
            menus: [],
            COM_CONFIG: window.COM_CONFIG,
            it: window.COM_CONFIG.USER,
            // messageCount: 0
            unreadmessage: {
                noticeNumber: 0,
                fileDownNumber: 0,
                orderNumber: 0,
                total: 0
            },
            notReadList: [],
            handleOnMount: true,
            list1: [],
            list2: [],
            list3: [],
            currentTab: '',
            lazyCurrentTab: '',
            listFlag: {
                type1: {
                    loading: false,
                    loadend: false,
                },
                type2: {
                    loading: false,
                    loadend: false,
                },
                type3: {
                    loading: false,
                    loadend: false,
                }
            },
            listParams: {
                type1: {
                    messageType: 1,
                    pageIndex: 0,
                    pageSize: 10
                },
                type2: {
                    messageType: 2,
                    pageIndex: 0,
                    pageSize: 10
                },
                type3: {
                    messageType: 3,
                    pageIndex: 0,
                    pageSize: 10
                }
            },
            msgQueue: [],
            audioSource: { // 2新订单消息，3订单通知发货，4客服关闭订单
                2: 'neworder.mp3',
                3: 'agreeshipping.mp3',
                4: 'cancelorder.mp3',
            },
            importStockMsgType: 7, // 导入库存消息类型
            updateSaleUnitMsgType: 8, // 销售单位变更消息类型
        }
    },
    computed: {
        messageCount: function() {
            return this.unreadmessage.total;
        }
    },
    events: {
        'click .J_tabShowActive': function () {
            var tabs = mini.get("mainTabs");
            var tab = tabs.getTab(tabs.activeIndex);
            tabs.activeTab(tab);
        },
        'click .showmodel2': 'messageHistory',
        'click .showmodel': 'messageHistory',
        'click .modify_password': 'modifyPassword',
        'click .J_tabCloseAll': 'closeAll',
        'click .J_tabCloseOther': 'closeAllButFirst',
        'click .closelogin': 'exitAccount',
        'click .J_menuItem[href]': 'menuItem',
        'click .clean_cache': 'refreshMenu',
        'mouseenter .navbar-static-side .nav-li-first': 'enterMainMenu',
        'mouseleave .navbar-static-side .nav-li-first': 'leaveMainMenu'
    },
    components: {
        // MugenScroll: MugenScroll,
        PopupMessage: PopupMessage
    },
    created: function(){
        $('body').addClass('fixed-sidebar full-height-layout gray-bg skin-1');
        this.$mount('#app');
        this.initView();
    },
    mounted: function(){

    },
    watch: {
        'currentTab': function(value) {
            // wait for animation
            setTimeout(function(){
                this.lazyCurrentTab = value;
            }.bind(this), 300);
        }
    },
    methods: {
        feedback: function () {
            var config = {
                url: '/setting/feedbackdetail',
                title: '新增用户反馈',
                data: {
                    type: 'add'
                },
            };

            com.window(config);
        },
        initView: function () {
            this.relMethod('closeTab', 'closeAll', 'closeAllButFirst', 'showTab', 'reloadTab', 'getCallerTab', 'CreateMenuItem', 'onBeforeOpen');
            var data = mini.clone(COM_CONFIG.USER);
            if(typeof data.userType.value == "undefined"){
                Page.fire('logout');
                return;
            }

            this.menuCache = false;
            mini.parse();
            this.loadMenu(function () {})
            this.loadTask();
            this.count = 0;
            // this.initNoticeModule();
            // this.newMessage();
        },
        loadTask: function(){
            // mini.use(['com/home/task'], function(initFn){
            //  initFn();
            // });
        },
        getMenuUid: function(){
            return COM_CONFIG.ckName + '_menu';
        },
        loadMenu: function (callback) {
            if(this.menuCache && window.localStorage){
                var data = mini.store.get(this.getMenuUid());
                if(data){
                    this._renderMenu(data);
                    callback();
                } else {
                    this._loadMenu(callback);
                }
            } else {
                this._loadMenu(callback);
            }
        },
        _loadMenu: function(callback){
            var me = this;
            mini.rest.read({
                url: '/module/usermenu'
            })
            .done(function (res) {
                if(res.status == 1){
                    me._renderMenu(res);
                    if(window.localStorage){
                        mini.store.set(me.getMenuUid(), res);
                    }
                }
                callback();
            })
            .fail(function () {
                callback();
            })
            .always(function () {
                console.log("complete");
            });
        },
        _renderMenu: function(res){
            var data = mini.arrayToTree(res.data, 'children', 'moduleId', 'parentId');
            this.menus = data;
            // var template = doT.renderTemplate('#menu_template', { menus: data });
            // template = mini.formatText(template, COM_CONFIG.USER);
            // $('#menus').html(template);
        },
        refreshMenu: function(){
            mini.store.del(this.getMenuUid());
        },
        modifyPassword: function (e) {
            mini.use(['com/home/password'], function(initFn){
                initFn();
            });
        },
        // 刷新当前标签
        reloadTab: function(url, tab){
            var tabs = mini.get("mainTabs");
            var tab = tab || tabs.getActiveTab();
            tab.url = url || tab.url;
            tabs.reloadTab(tab);
        },
        getCallerTab: function(tab){
            var tabs = mini.get("mainTabs");
            tab = tab || tabs.getActiveTab();
            var list = tabs.getTabs();
            for (var i = 0; i < list.length; i++) {
                if(list[i].selfwinid == tab.callwinid){
                    return list[i];
                }
            }
        },
        showTab: function (node) {
            var tabs = mini.get("mainTabs");

            var id = "tab$" + (node.id || node.url);
            var tab = tabs.getTab(id);
            if (!tab) {
                tab = {};
                tab._nodeid = (node.id || node.url);
                tab.name = id;
                tab.title = node.title;
                tab.showCloseButton = true;
                tab.headerCls = "J_menuTab";
                tab.url = (node.id || node.url);
                if(node.callwinid){
                    tab.callwinid = node.callwinid;
                }
                var oldload = node.onload || function () { };
                node.onload = function () {
                    var iframe = this.getIFrameEl();
                    try {
                        var body = iframe.contentWindow.document.body;
                        body.className = body.className + ' animated fadeInRight';
                        setTimeout(function () {
                            body.className = body.className.replace(' animated fadeInRight', ''); // position fixed cannot action
                        }, 700);
                    } catch (e) { }
                    oldload.call(this);
                }
                if (node.onload) {
                    tab.onload = node.onload;
                }
                if (node.ondestroy) {
                    tab.ondestroy = node.ondestroy;
                }

                tabs.addTab(tab);
            }
            tabs.activeTab(tab);
        },
        enterMainMenu: function (e) {
            var target = $(e.currentTarget);
            var index = target.parent().index();
            $(".nav-ul-second-panel").hide();
            var panel = target.find(".nav-ul-second-panel");
            panel.show();
            var lSon = target.find(".nav-li-third-panel").last();
            var pWidth = lSon.position().left + lSon.outerWidth();
            panel.css("width", pWidth + 10 + "px");
            var pHeight = panel.outerHeight();
            if (index == 1 || index == 0) {
                panel.css({ top: "0px" });
            } else if (index == $(".navbar-static-side .nav-li-first").length) {
                panel.css({ bottom: "0px" });
            } else {
                panel.css({ top: - pHeight / 2 + 40 + "px" });
            }
        },
        leaveMainMenu: function () {
            $(".nav-ul-second-panel").hide();
        },
        menuItem: function (e) {
            var target = $(e.currentTarget);
            // 获取标识数据
            var dataUrl = target.attr('href'),
                dataIndex = target.data('index'),
                menuName = $.trim(target.text());
            this.showTab({
                title: menuName,
                id: dataUrl
            });
            return false;
        },
        // alias
        CreateMenuItem: function (dataUrl, menuName) {
            return this.showTab({
                title: menuName,
                id: dataUrl
            });
        },
        onBeforeOpen: function (e) {
            var menu = e.sender;
            var tabs = mini.get("mainTabs");
            var currentTab = tabs.getTabByEvent(e.htmlEvent);
            var menu0 = mini.getbyName("firstMenuItem", menu);
            if (menu0) {
                if (currentTab && currentTab.name == 'first') {
                    menu0.hide();
                } else {
                    menu0.show();
                }
            }
            if (!currentTab) {
                e.cancel = true;
            }
        },
        closeTab: function () {
            var tabs = mini.get("mainTabs");
            var currentTab = tabs.getActiveTab();
            tabs.removeTab(currentTab);
        },
        closeAll: function () {
            var tabs = mini.get("mainTabs");
            var but = [];
            but.push(tabs.getTab("first"));
            tabs.removeAll(but);
        },
        closeAllButFirst: function () {
            var tabs = mini.get("mainTabs");
            var currentTab = tabs.getActiveTab();
            var but = [currentTab];
            but.push(tabs.getTab("first"));
            tabs.removeAll(but);
        },
        exitAccount: function () {
            var me = this;
            mini.confirm({
                message: "您确定要退出吗？",
                title: "温馨提示",
                modalCls: "mini-modal-gray",
                animCls: "mini-window-anim",
                callback: function (action) {
                    if (action == 'ok') {
                        // Page.fire('logout');
                        me.refreshMenu();
                    }
                }
            })
        }
    }
}
</script>

<style lang="postcss">
@charset "utf-8";

html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: #fff;
    font-size: 12px;
    font-family: '宋体', Arial, Helvetica, sans-serif;
}

.zd-process-bar {
    height: 2px;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: #fff;
    z-index: 1050;
}

#wrapper {
    padding-top: 2px;
}

body.fixed-sidebar .navbar-static-side ul,li {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
}

body.fixed-sidebar .navbar-static-side {
    width: 95px;
    margin: 0px;
    padding: 0px;
    background: #2f4050;
}

body.skin-1.fixed-sidebar .navbar-static-side {
    /*background: #1f4d8f;*/
    background: #ffffff;
}

body.skin-3.fixed-sidebar .navbar-static-side {
    background: #38283c;
}

.layout-menu {
    height: 100%;
    box-shadow: 1px 0px 0px #d7e8f8;
}

#page-wrapper {
    margin: 0 0 0 95px;
    padding: 0px;
}

.navbar-static-side .nav-div-header {
    margin: 0;
    padding: 0;
    /**/
    background: #fff;
    border-bottom: 0px solid #1763d0;
    height: 99px;
}

.navbar-static-side .nav-div-logo {
    width: 100%;
    height: 75px;
    background: url(../../assets/img/logo_1x.png?11) center center no-repeat;
    background-size: 55px;
    padding-top: 5px;
}

.skin-1 .border-bottom {
    border-bottom: 0 !important;
}

.skin-1 .content-tabs {
    border-bottom: solid 0px #D7E8F8;
    border-top: 0px solid #eee;
    height: auto;
    border-top-left-radius: 12px;
    background-color: transparent;
}

.content-tabs .roll-left {
    border-left: 1px solid #eee;
    border-top-left-radius: 12px;
}

.content-tabs .roll-right.J_tabRight {
    right: 136px;
}

.viewBtn {
    width: 60px !important;
    /*    right: 0px !important;
    text-align: center !important;*/
}

.skin-1 .page-tabs a.active {
    /*background: #0b73da;*/
    color: #1763d0;
    background: #eee;
    font-weight: 600;
}

.navbar-static-side .nav-ul-menu-bar {
    width: 100%;
    position: relative;
}

.navbar-static-side .nav-li-first {
    width: 100%;
    height: 85px;
    display: block;
}

.navbar-static-side .nav-div-status {
    width: 100%;
    height: 100%;
    /*// background: url("../../assets/img/nav-closed.png") 72px 40px no-repeat;*/
    z-index: 1;
    position: absolute;
}

.navbar-static-side .nav-li-first:hover .nav-div-shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #F3F7FB;
    cursor: pointer;
}

.navbar-static-side .nav-li-first:hover .nav-div-status {
    width: 101%;
    height: 100%;
    background: url("../../assets/img/nav-open-blue.png") center right no-repeat;
    cursor: pointer;
}

.ui-main-tab {
}

.navbar-static-side .nav-div-shadow {
    height: 100%;
}

.navbar-static-side .nav-icon {
    width: 34px;
    height: 63px;
    background-image: url("../../assets/img/nav_spr_simple.png?1502423148");
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    margin-top: -32px;
    left: 50%;
    margin-left: -17px;
}

.navbar-static-side .nav-set {
    background-position: -32px -103px;
}

.navbar-static-side .nav-goods {
    background-position: -132px -104px;
}

.navbar-static-side .nav-activity {
    background-position: -324px -105px;
}

.navbar-static-side .nav-charge {
    background-position: -226px -199px;
}

.navbar-static-side .nav-quotation {
    background-position: -226px -104px;
}

.navbar-static-side .nav-order {
    background-position: -618px -103px;
}

.navbar-static-side .nav-stock {
    background-position: -421px -194px;
}

.navbar-static-side .nav-audit {
    background-position: -325px -192px;
}

.navbar-static-side .nav-report {
    background-position: -422px -103px;
}

.navbar-static-side .nav-purchase {
    background-position: -521px -102px;
}

/*// hover*/
.nav-li-first:hover .nav-set {
    background-position: -32px -281px;
}

.nav-li-first:hover .nav-goods {
    background-position: -132px -282px;
}

.nav-li-first:hover .nav-activity {
    background-position: -324px -283px;
}

.nav-li-first:hover .nav-charge {
    background-position: -226px -376px;
}

.nav-li-first:hover .nav-quotation {
    background-position: -226px -282px;
}

.nav-li-first:hover .nav-order {
    background-position: -618px -281px;
}

.nav-li-first:hover .nav-stock {
    background-position: -421px -371px;
}

.nav-li-first:hover .nav-audit {
    background-position: -325px -370px;
}

.nav-li-first:hover .nav-report {
    background-position: -422px -281px;
}

.nav-li-first:hover .nav-purchase {
    background-position: -521px -280px;
}

.navbar-static-side .nav-ul-second-panel {
    position: absolute;
    left: 100%;
    display: none;
    background: #fff;
    width: 760px;
    border: 1px solid #D7E8F8;
    /* border-left: none; */
    /* border-bottom-right-radius: 4px; */
    /* border-top-right-radius: 4px; */
}

.navbar-static-side .nav-ul-second-panel a {
    display: inline-block;
    clear: both;
    float: left;
    padding: 4px 12px;
    margin: 3px 6px;
    color: #666;
    font-size: 13px;
}

.navbar-static-side .nav-li-third-panel {
    display: block;
    float: left;
    margin: 19px 0 12px 0;
}

.navbar-static-side .nav-li-third-panel+.nav-li-third-panel {
    border-left: 1px dashed #D7E8F8;
}

.navbar-static-side .nav-li-third-panel a.nav-a-second {
    font-weight: 600;
    color: #333;
    padding-top: 0;
    margin-top: 0;
}

.navbar-static-side .nav-li-third-panel a.nav-a-third:hover {
    background-color: #EFF4F8;
}

#page-wrapper .border-bottom .navbar-header label {
    font-family: 'Microsoft Yahei', Tahoma, Arial;
    line-height: 40px;
    padding-top: 10px;
}

.sys-name {
    font-size: 22px;
    color: #333;
    font-weight: 600;
    letter-spacing: 3px;
    margin-right: 5px;
}

.navbar-right {
    margin-right: 5px;
}

.navbar-right .dropdown {
    float: right;
    display: block;
}

.nav>li>a:hover,
.nav>li>a:focus {
    text-decoration: none;
    background-color: #F8FBFF;
}

.sidebar-container .sidebar-title {
    background-color: #fff;
}

.skin-setttings .title {
    background: #f8fbff;
}

.skin-setttings .setings-item {
    border-bottom: 1px solid #EFF6FC;
    text-align: center;
    font-size: 14px;
    padding: 15px 20px;
}

.skin-setttings .setings-item a {
    color: #666;
}

.sidebar-container {
    position: relative;
}

.arrow-dropdown:before {
    position: absolute;
    top: -15px;
    left: 70%;
    margin-left: -6px;
    content: '';
    border: solid 8px rgba(0, 0, 0, 0);
    border-bottom-color: #F6EEF0;
}

.arrow-dropdown:after {
    position: absolute;
    top: -14px;
    left: 70%;
    margin-left: -6px;
    content: '';
    border: solid 8px rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}

.link-co {
    color: #208DFA;
}

.open-small-chat {
    background: #1c84c6;
}

.disableCss {
    display: none;
    pointer-events: none;
    color: #afafaf;
    cursor: default;
    text-decoration: line-through;
}

a:hover {
    text-decoration: none;
}

.content-tabs {
    /* position: relative; */
    height: 42px;
    background: #fafafa;
    line-height: 40px;
}

.content-tabs .roll-nav {
    /*position: absolute;*/
    width: 40px;
    height: 38px;
    text-align: center;
    color: #999;
    /*z-index: 2;*/
    /*top: 0;*/
}

.content-tabs .roll-left {
    left: 0;
    border-right: solid 1px #eee;
}

.content-tabs .roll-right {
    /*right: 0;*/
    /* border-left: solid 1px #eee; */
}

.content-tabs button {
    background: #fff;
    border: 0;
    height: 36px;
    width: 40px;
    outline: none;
}

.content-tabs button:hover {
    background: #f8fbff;
}

.content-tabs .roll-nav:hover {
    color: #777;
    background: #f8fbff;
    cursor: pointer;
}

.roll-right.J_tabRight {
    right: 140px;
}

.roll-right.btn-group {
    /* right: 60px; */
    width: 84px;
    /* padding: 0; */
    border: solid 1px #d7e8f8!important;
    background-color: #fff;
    cursor: pointer;
    margin-right: 1px;
    margin-bottom: -2px;
}

.roll-right .J_tabClose {
    color: #208dfa;
}

.roll-right.btn-group button {
    width: 80px;
}

.roll-right.J_tabExit {
    background: #fff;
    height: 40px;
    width: 60px;
    outline: none;
}

.dropdown-menu-right {
    left: auto;
}

#content-main {
    height: calc(100% - 104px);
    overflow: hidden;
}

.fixed-nav #content-main {
    height: calc(100% - 80px);
    overflow: hidden;
}

.mini-ztabs .mini-tabs-scrollCt {
    border: 0px;
    background: #F8FBFF;
    border-bottom: 1px solid #D7E8F8;
}

.mini-ztabs .mini-tabs-header-top .J_menuTab {
    height: 40px;
    border-radius: 0px;
    border: 0px;
    color: #999;
    border-right: solid 1px #eee;
    font-weight: normal;
    border-left: solid 1px #eee;
    color: #999;
    background-color: #fff;
    /*border: solid 1px #d7e8f8;*/
    border: solid 1px #E6EAED;
    border-radius: 5px 5px 0 0;
}

.mini-ztabs .mini-tabs-buttons {
    padding-top: 0px;
    margin-top: -3px;
    padding-right: 0px;
}

.mini-ztabs {
    background-color: #fff;
}

.mini-ztabs .J_menuTab {
}

.mini-ztabs .J_menuTab:hover {
    color: #777;
    background: #f8fbff;
    cursor: pointer;
}

.mini-ztabs .J_menuTab.mini-tab-active {
    color: #1763d0;
    background: #eee;
    font-weight: 600;
    color: #fff;
    background-color: #208dfa;
    /* border: solid 1px #d7e8f8; */
    /* border-bottom-color: #d7e8f8; */
}

.mini-ztabs .J_menuTab.mini-tab-active:hover {
    background: #0e9aef;
    color: #fff;
}

.mini-ztabs .mini-tabs-headers .mini-tabs-header {
    margin-top: 0px;
}

.mini-ztabs .mini-tabs-space {
    width: 0px;
    border-bottom: 0px;
}

.mini-ztabs .mini-tabs-space div {
    width: 0px;
}

.mini-ztabs .mini-tabs-space2 {
    width: 5px;
}

.mini-ztabs .mini-tabs-space2 div {
    width: 5px;
}

.mini-ztabs .mini-tab-close {
    background: none;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 1;
    color: #ccc;
    margin-top: 0px;
    font-size: 20px;
    line-height: 14px;
    vertical-align: middle;
    padding: 0px;
    width: auto;
    height: auto;
}

.mini-ztabs .mini-tab-close:before {
    content: "×";
    font-size: 20px;
    font-family: "Microsoft Yahei";
}

.mini-ztabs .mini-tab-close:hover {
    color: #fff;
}

.mini-ztabs .mini-tab-close {
    -webkit-transition: -webkit-transform 0.3s;
    -moz-transition: -moz-transform 0.3s;
    -o-transition: -o-transform 0.3s;
    transition: transform 0.3s;
}

.mini-ztabs .mini-tab-close.mini-tab-close-hover {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
}

.mini-ztabs .mini-tabs-tabmenu {
    top: 11px;
}

.navbar-top-links > li {
    display: inline-block;
    float: left;
}

.skin-1 .nav > li  .ivu-poptip-rel a {
    color: #6A7795;
    font-family: microsoft yahei;
    display: inline-block;
}

.skin-1 .nav > li .ivu-poptip-rel a:hover {
    color: #248dfa;
}

.skin-1 .nav>li .ivu-poptip-rel a:hover,
.skin-1 .nav>li .ivu-poptip-rel a:focus {
    text-decoration: none;
    background-color: #F8FBFF;
}

.skin-1 .nav>li .ivu-poptip-rel .ivu-badge {
    vertical-align: inherit;
}

.export-popup .ivu-poptip-body {
    padding: 0px 0;
}

.export-popup .ivu-poptip-body {
    padding: 0px 0;
}

.export-popup .ivu-tabs-nav {
    width: 100%;
}

.export-popup  .ivu-tabs-tab {
    width: 33.333%;
    margin-right: 0px;
    text-align: center;
}

.export-popup  .ivu-tabs-ink-bar {
    display: none!important;
}

.export-popup .ivu-tabs-nav .ivu-tabs-tab-active {
    background: #208DFA;
    color: #fff;
}

.export-popup .ivu-tabs-bar {
    border-bottom: 1px solid #D4E7F8;
}

.export-popup .ivu-poptip-inner {
    overflow: hidden;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
