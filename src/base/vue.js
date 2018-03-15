
import $ from 'jquery'
import Vue from 'vue'
import BaseViewMixins from 'src/mixins/base'

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

// Vue.use(VuePlugin);
var CustomVue = Vue.extend({
  mixins: BaseViewMixins
});

export default CustomVue

