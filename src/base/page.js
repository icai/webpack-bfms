import $ from 'jquery'
import Vue from 'vue'
import ElementUI from 'element-ui'
import iView from 'iview'
import mini from 'mini'
import BaseViewMixins from 'src/mixins/base'


import "packages/miniui/themes/default/miniui.css"
import "packages/miniui/themes/icons.css"
import "packages/miniui/themes/default/medium-mode.css"
import "packages/miniui/themes/bootstrap/skin.css"
// import "normalize.css/normalize.css"
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'

import "assets/css/common.css"
import "assets/css/bootstrap.css"
import "assets/css/bootstrap-hplus.css"

window.$ = $;
window.jQuery = $;


const Page = function(options) {
  // 定义异步加载component
  // if ($.isPlainObject(depences)) {
  //   View = options;
  //   options = depences;
  //   depences = null;
  // }


  // mixins 自定义方法
  var VuePlugin = {};
  VuePlugin.install = function(Vue, options) {
    // 批量注册过滤器
    var vueFilters = {
      formatDate: function(val, format) {
        format = format || 'yyyy-MM-dd HH:mm:ss';
        return mini.formatDate(new Date(val), format);
      },
      // formatCurrency: function(val, sign) {
      //   sign = sign || '';
      //   return '￥' + (val > 0 ? sign : '') + unit.rounder(val, 2);
      // },
      lineBreak: function(val) {
        return val.replace(/(\/r\/n){1,}/g, '<br>')
      }
    };
    $.each(vueFilters, function(key, value) {
      Vue.filter(key, function(arg) {
        return value.apply(null, arguments);
      })
    });
  }

  Vue.use(VuePlugin);
  var CustomVue = Vue.extend({
    mixins: BaseViewMixins
  });
  Vue.use(ElementUI);
  Vue.use(iView);
  return new CustomVue(options);
};

export default Page;
