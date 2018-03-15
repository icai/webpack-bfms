<template>
  <Poptip popupCls="export-popup" @on-popper-show="handlePopShow" @on-popper-hide="handlePopHide" placement="bottom-end" :transfer="true">
      <a class="count-info" >
          <Badge dot :count="messageCount">
              <Icon type="ios-bell" size="18"></Icon> <span class="label label-success newsmessage"></span> <span>消息</span>
          </Badge>
      </a>
      <div slot="content" style="width:400px;">
          <Tabs v-model="currentTab" >
              <TabPane :label="tabRenderLabel('系统消息', 'noticeNumber')" name="name1">
                  <div  v-if="lazyCurrentTab == 'name1'" style="width:400px; height: 400px; overflow: auto;" ref="scrollwrap1">
                      <div class="card-item" dis-hover v-for="(item, index) in list1" :key="index">
                          <Row v-if="item.msgItemType.value === importStockMsgType">
                              <Col span="12">
                                  <div class="col-content">
                                      <div class="bl" v-html="lineBreak(item.title)">
                                      </div>
                                  </div>
                              </Col>
                              <Col span="12">
                                  <div class="col-content" style="text-align:right;display: block;">
                                      <div  style="height: 100%;">
                                          <div  v-if="item.josnParameter.errNum > 0 || item.josnParameter.totalNum == 0" >
                                              <Icon type="ios-close" color="#f8382c"></Icon>
                                              <span v-if="item.josnParameter.errNum > 0" >
                                                  <a  href="javascript:;" @click="exportDownload($event, item)" target="_blank">下载失败明细</a>
                                              </span>
                                              <span  v-else-if="item.josnParameter.totalNum == 0">
                                                  导入失败
                                              </span>
                                          </div>
                                          <div v-else >
                                              <Icon type="ios-checkmark" color="#19be6b"></Icon>
                                              导入成功
                                          </div>
                                      </div>
                                      <div class="mt-10">
                                          {{ item.createTime | formatDate }}
                                      </div>
                                  </div>
                              </Col>
                          </Row>
                          <Row v-else-if="item.msgItemType.value === updateSaleUnitMsgType">
                              <Col span="12">
                                  <p class="notice-title fs-14">
                                      <span class="bl"> {{item.title}}</span>
                                  </p>
                              </Col>
                              <Col span="12" style="text-align: right;">
                                  <a @click="checkDetail(item)" class="btn-check fs-14" href="javascript:;">点击查看</a>
                                  <p class="notice-content">
                                      <time class="time">{{item.createTime || ''}}</time>
                                  </p>
                              </Col>
                          </Row>
                          <Row v-else>
                              <Col span="10">
                                  <div class="col-content">
                                      {{ item.createTime | formatDate }}
                                  </div>
                              </Col>
                              <Col span="8">
                                  <div class="col-content bl">
                                      {{ item.title }}
                                  </div>
                              </Col>
                              <Col span="6">
                              </Col>
                          </Row>
                      </div>
                      <MugenScroll scroll-container="scrollwrap1" :handle-on-mount="handleOnMount" :handler="handleReachBottom1" :should-handle="!listFlag.type1.loading">
                          <Spin v-if="listFlag.type1.loading">
                              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                              <div>加载中</div>
                          </Spin>
                      </MugenScroll>
                      <div class="text-center pt-10 pb-10" v-if="listFlag.type1.loadend">
                              暂无更多消息
                      </div>
                  </div>
              </TabPane>
              <TabPane :label="tabRenderLabel('业务消息', 'orderNumber')" name="name2">
                  <div v-if="lazyCurrentTab == 'name2'" style="width:400px; height: 400px; overflow: auto;" ref="scrollwrap2">
                      <div class="card-item" dis-hover v-for="(item, index) in list2" :key="index">
                          <Row>
                              <Col span="24">
                                  <p class="notice-title fs-14">
                                      <span class="bl"> {{item.title}}</span>
                                      <a v-if="item.messageType.value === 2" @click="checkDetail(item)" class="btn-check pull-right fs-14" href="javascript:;">点击查看</a>
                                  </p>
                                  <p class="notice-content clearfix">
                                      <span class="pull-left txt">{{item.content || ''}}</span>
                                      <time class="pull-right time">{{item.createTime || ''}}</time>
                                  </p>
                              </Col>
                          </Row>
                      </div>
                      <MugenScroll scroll-container="scrollwrap2" :handle-on-mount="handleOnMount" :handler="handleReachBottom2" :should-handle="!listFlag.type2.loading">
                          <Spin v-if="listFlag.type2.loading">
                              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                              <div>加载中</div>
                          </Spin>
                      </MugenScroll>
                      <div class="text-center pt-10 pb-10" v-if="listFlag.type2.loadend">
                              暂无更多消息
                      </div>
                  </div>
              </TabPane>
              <TabPane :label="tabRenderLabel('导出记录', 'fileDownNumber')" name="name3">
                  <div v-if="lazyCurrentTab == 'name3'" style="width:400px; height: 400px; overflow: auto;" ref="scrollwrap3">
                      <div class="card-item" dis-hover v-for="(item, index) in list3" :key="index" >
                          <Row>
                              <Col span="12">
                                  <div class="col-content">
                                      <p class="bl" v-html="lineBreak(item.title)">
                                      </p>
                                  </div>
                              </Col>
                              <Col span="12">
                                  <div class="col-content" style="text-align:right;display: block;">
                                      <div style="height: 100%;">
                                          <div v-if="item.msgItemType.value ==5" >
                                              <Icon type="ios-checkmark" color="#19be6b"></Icon>
                                              <a href="javascript:;" @click="exportDownload($event, item)" target="_blank">点击下载文档</a>
                                          </div>
                                          <div  v-else >
                                              <Icon type="ios-close" color="#f8382c"></Icon>
                                              <span>
                                                  <a href="javascript:;" @click="retryDownload($event, item)">点击重新生成</a>
                                              </span>
                                          </div>
                                      </div>
                                      <div class="mt-10">
                                          {{ item.createTime | formatDate }}
                                      </div>
                                  </div>
                              </Col>
                          </Row>
                      </div>
                      <MugenScroll scroll-container="scrollwrap3"  :handle-on-mount="handleOnMount" :handler="handleReachBottom3" :should-handle="!listFlag.type3.loading">
                          <Spin v-if="listFlag.type3.loading">
                              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                              <div>加载中</div>
                          </Spin>
                      </MugenScroll>
                      <div class="text-center pt-10 pb-10" v-if="listFlag.type3.loadend">
                              暂无更多消息
                      </div>
                  </div>
              </TabPane>
          </Tabs>
      </div>
  </Poptip>
</template>
<script>
  export default {
    name: 'PopupMessage',
    data() {
      return {
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
    components: {
        // MugenScroll: MugenScroll
    },
    computed: {
        messageCount: function() {
            return this.unreadmessage.total;
        }
    },
    mounted() {
      this.initNoticeModule();
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
      lineBreak: function(val) {
          return val.replace(/(\/r\/n){1,}/g, '<br>');
      },
      tabRenderLabel: function(type, name) {
          var me = this;
          return function (h) {
              return h('div', [
                  h('span', type),
                  h('Badge', {
                      props:  {
                          dot: true,
                          count: me.unreadmessage[name]
                      }
                  })
              ])
          }
      },
      checkDetail: function(item) {
        var data = item.josnParameter //JSON.parse();
        var msgType = item.msgItemType && item.msgItemType.value || 0;
        var isOrderMsg = Object.hasOwnProperty.call(this.audioSource, msgType);

        if (isOrderMsg) {
            var module = '';

            if (this.it.storageType === 1) {
                module = 'myWholesaleOrderDetail'
            } else if (this.it.storageType === 8) {
                module = 'wholesaleOrderDetail'
            }

            ecom.tab.window[module]({ data: data });
        }

        if (this.importStockMsgType === msgType) {
            if ($('.export-popup').is(':hidden')) {
                setTimeout(function () {
                    $('.count-info')[0].click();
                }, 100)
            }
        }

        if (this.updateSaleUnitMsgType === msgType) {
            var opt = {
                action: 'edit',
                title: '编辑活动',
            }
            opt.id = data.activityId || data.id

            ecom.tab.window.reserveDetail(opt, function () {})
        }
      },
      initNoticeModule: function () {
          $('body').on('click', '.ivu-notice-bottom', function (e) {
              e.stopPropagation();
          });
          window.addEventListener('message', function (e) {
              if (e.origin !== window.location.origin) return false

              var data = e.data || {}

              // 未读消息列表
              if ((data.type === 'msg') && ($.type(data.list) === 'array')) {
                  this.notReadList = data.list
                  this.showNoticeDialogInEveryPage()
              }

              // 未读消息数量对象
              if ((data.type === 'msgInfo') && ($.type(data.info) === 'object')) {
                  this.unreadmessage = data.info
              }
          }.bind(this))
      },
      showNoticeDialogInEveryPage: function () {
          if (0 === this.notReadList.length) return false

          var self = this;
          var audioSource = this.audioSource;
          var msgQueue = this.msgQueue;
          var prevMsgQueueLen = msgQueue.length;
          var msgInterval = 500;

          this.notReadList.forEach(function (item) {
              msgQueue.push({
                  handle: function (next) {
                      var msgType = item.msgItemType && item.msgItemType.value || 0;
                      var isOrderMsg = Object.hasOwnProperty.call(audioSource, msgType);
                      var isImportStockMsg = msgType === self.importStockMsgType;
                      var isUpdateSaleUnitMsg = msgType === self.updateSaleUnitMsgType;
                      var checkDetailBtnIsVisible = isOrderMsg || isImportStockMsg || isUpdateSaleUnitMsg;
                      var msgAudio = null;
                      var showNextOne = function () {
                          setTimeout(next, msgInterval)
                      }

                      item.josnParameter = JSON.parse(item.josnParameter || '{}');
                      self.$Notice.info({
                          duration: isOrderMsg ? 0 : 5,
                          name: 'noticeDialog',
                          render: function (h) {
                              return h(
                                  'div',
                                  {
                                      'class': 'notice-dialog-content'
                                  },
                                  [
                                      h('p', item.title || ''),
                                      h('p', item.createTime || ''),
                                      checkDetailBtnIsVisible && h(
                                          'a',
                                          {
                                              'class': 'btn-check',
                                              attrs: {
                                                  href: 'javascript:;'
                                              },
                                              on: {
                                                  click: function (e) {
                                                      self.checkDetail(item);
                                                      self.$Notice.close('noticeDialog');
                                                      showNextOne();
                                                  }
                                              }
                                          },
                                          '点击查看'
                                      ),
                                  ]
                              )
                          },
                          onClose: function () {
                              showNextOne();
                              msgAudio && msgAudio.pause();
                              msgAudio && document.body.removeChild(msgAudio);
                          }
                      });
                      $('.ivu-notice:not(.ivu-notice-bottom)').addClass('ivu-notice-bottom');

                      if (!isOrderMsg) return false;

                      msgAudio = utils.playAudio(audioSource[msgType]);
                      msgAudio && msgAudio.addEventListener('ended', function () {
                          self.$Notice.close('noticeDialog');
                          showNextOne();
                      });
                  }
              })
          })
          msgQueue.push({
              handle: function (next) {
                  self.$Notice.close('noticeDialog');
                  $('.ivu-notice').removeClass('ivu-notice-bottom');
                  next();
              }
          })

          try {
              // 提示所有的消息，推入队列
              (0 === prevMsgQueueLen) && mini.queue(msgQueue);
          } catch (e) {}
      },
      retryDownload: function(e, item) {
          var id = item.josnParameter.id;
          mini.rest.create({
              url: '/dwonload/retry',
              data: {
                  id: id
              }
          }).done(function(res){
              if(res.status == 1) {
                  toast.success(res.message);
                  // item.resultStatus = {name: "未执行", value: 0, description: "生成中"};
              } else {
                  toast.error(res.message);
              }
          })
      },
      exportDownload: function(e, item) {
          var j = item.josnParameter;
          var url = j.url || j.fileUrl;  //item.dwonloadFileName;
          e.preventDefault();
          utils._downloadLink(url);
      },
      handlePopShow: function() {
          this.list1 = [];
          this.list2 = [];
          this.list3 = [];
          this.currentTab = 'name1';
          this.lazyCurrentTab = 'name1';
          setTimeout(function(){
              this.handleReachBottom(1);
          }.bind(this), 100);
      },
      handlePopHide: function() {
          this.listFlag['type1'].loading = false;
          this.listFlag['type2'].loading = false;
          this.listFlag['type3'].loading = false;
          this.listFlag['type1'].loadend = false;
          this.listFlag['type2'].loadend = false;
          this.listFlag['type3'].loadend = false;

          for(var i in this.listParams) {
              mini.copyTo(this.listParams[i], {
                  pageIndex: 0,
                  pageSize: 10
              })
          }
          this.currentTab = '';
      },
      handleReachBottom1: function() {
          var me = this;
          var type = 1;
          var flag = this.listFlag['type1'];
          var list = this.list1;
          var params = this.listParams['type1'];
          if(flag.loadend) {
              return false;
          }
          if(flag.loading) {
              return false;
          }
          flag.loading = true;
          mini.rest.create({
              url: '/message/list',
              data: params
          }).done(function(res){
              var data = res.data;
              if(res.status == 1) {
                  for (var i = 0; i < data.list.length; i++) {
                      data.list[i].josnParameter = JSON.parse(data.list[i].josnParameter);
                      list.push(data.list[i]);
                  }
                  if(data.total < data.pageSize || data.list.length < data.pageSize){
                      flag.loadend = true;
                  }
                  ++ params.pageIndex;
                  if(list.length >= me.unreadmessage.noticeNumber) {
                      me.messageCount > 0 && me.readedCount('noticeNumber');
                  }
              }
              flag.loading = false;
          })
      },
      handleReachBottom2: function() {
          var me = this;
          var type = 2;
          var flag = this.listFlag['type2'];
          var list = this.list2;
          var params = this.listParams['type2'];
          if(flag.loadend) {
              return false;
          }
          if(flag.loading) {
              return false;
          }
          flag.loading = true;
          mini.rest.create({
              url: '/message/list',
              data: params
          }).done(function(res){
              var data = res.data;
              if(res.status == 1) {
                  for (var i = 0; i < data.list.length; i++) {
                      data.list[i].josnParameter = JSON.parse(data.list[i].josnParameter);
                      list.push(data.list[i]);
                  }
                  if(data.total < data.pageSize || data.list.length < data.pageSize){
                      flag.loadend = true;
                  }
                  ++ params.pageIndex;
                  if(list.length >= me.unreadmessage.orderNumber) {
                      me.messageCount > 0 && me.readedCount('orderNumber');
                  }
              }
              flag.loading = false;
          })
      },
      handleReachBottom3: function (type) {
          var me = this;
          var type = 3;
          var flag = this.listFlag['type3'];
          var list = this.list3;
          var params = this.listParams['type3'];
          if(flag.loadend) {
              return false;
          }
          if(flag.loading) {
              return false;
          }
          flag.loading = true;
          mini.rest.create({
              url: '/message/list',
              data: params
          }).done(function(res){
              var data = res.data;
              if(res.status == 1) {
                  for (var i = 0; i < data.list.length; i++) {
                      data.list[i].josnParameter = JSON.parse(data.list[i].josnParameter);
                      list.push(data.list[i]);
                  }
                  if(data.total < data.pageSize || data.list.length < data.pageSize){
                      flag.loadend = true;
                  }
                  ++ params.pageIndex;
                  if(list.length >= me.unreadmessage.fileDownNumber) {
                      me.messageCount > 0 && me.readedCount('fileDownNumber');
                  }
              }
              flag.loading = false;
          })
      },
      handleReachBottom: function(value) {
          this['handleReachBottom'+ value]();
      },
      readedCount: function(name){
          this.unreadmessage[name] = 0;
          // mini.rest.create({
          //     url: '/dwonload/read'
          // }).done(function(res){

          // })
      },

    }
  }
</script>

<style lang="css">
  .modal {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }
</style>
