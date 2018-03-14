import $ from 'jQuery'
import Vue from 'vue'
import ElementUI from 'element-ui'
import "normalize.css/normalize.css"
import 'element-ui/lib/theme-chalk/index.css'

window.$ = $;
window.jQuery = $;
function relMethod(target, source, methods) {
  if (typeof methods == 'string') {
    methods = [methods];
  }
  $.each(methods, function(method, index) {
    if (typeof source[method] == 'function') {
      target[method] = function() {
        return source[method].apply(source, arguments);
      }
    }
  })
}

function _defaults(obj, defaults) {
    if (typeof obj !== 'object') {
      if (typeof obj === 'undefined') {
          return defaults;
      } else {
          return obj;
      }
  } else {
      var defaultObjs = [].slice.call(arguments, 1);
      for (var i = defaultObjs.length - 1; i >= 0; i--) {
          var defo = defaultObjs[i];
          for (var j in defo) {
              if (obj[j] === undefined) {
                  obj[j] = defo[j];
              }
          }
      }

      return obj;
  }
}

var bindAll = function(obj) {
  var i, length = arguments.length,
    key;
  if (length <= 1) throw new Error('bindAll must be passed function names');
  for (i = 1; i < length; i++) {
    key = arguments[i];
    obj[key] = obj[key] && obj[key].bind(obj);
  }
  return obj;
};

String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    format = format || "";
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}

var BaseViewMixins = {
  preInit: function() {
    this.relMethod(
      'CloseWindow' // 关闭窗口
    );
  },
  pageIsChanged: function() {
    return false;
  },
  CloseWindow: function(action) {
    if ((action == "close" || action == 'ok') && this.pageIsChanged()) {
      if (!confirm("数据被修改了，确定关闭页面么？")) {
        return false;
      }
    }
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
  }
}

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
      // formatDate: function(val, format) {
      //   format = format || 'yyyy-MM-dd HH:mm:ss';
      //   return mini.formatDate(new Date(val), format);
      // },
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
    mixins: [{
      mounted: function() {
        var vm = this,
          events = vm.$options.events;
        if (events) {
          this.cid = vm._uid;
          this.delegateEvents(events, vm);
        }
      },
      beforeDestroy: function() {
        var vm = this,
          events = vm.$options.events;
        if (events) {
          this.undelegateEvents();
        }
      },
      created: function() {
        this._formatHtmlWrap = "'";
        this.toolbarMoreCls = 'search-more';
        this.preInit();
      },
      methods: BaseViewMixins
    }],
    methods: {
      delegateEvents: function(events, context) {
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        events || (events = {});
        context || (context = this);
        if (!events) return this;
        for (var key in events) {
          var method = events[key];
          if (!$.isFunction(method)) method = context[method];
          if (!method) continue;
          var match = key.match(delegateEventSplitter);
          this.delegate(match[1], match[2], method.bind(this));
        }
        return this;
      },
      delegate: function(eventName, selector, listener) {
        // 假如 $el 是 miniui component ，会抹去事件(mini.parse)， 如  mini-fit
        $('body').on(eventName + '.delegateEvents' + this.cid, selector, listener);
        return this;
      },
      undelegateEvents: function() {
        $('body').off('.delegateEvents' + this.cid);
        return this;
      },
      undelegate: function(eventName, selector, listener) {
        $('body').off(eventName + '.delegateEvents' + this.cid, selector, listener);
        return this;
      },
      getFormatHtmlWrap: function(str, wrap) {
        wrap = wrap || this._formatHtmlWrap;
        return [wrap, str, wrap].join('');
      },
      /**
       * @description
       *   格式化特殊字符串 $$ && 替换成 当前作用域引用, 参数绑定
       * @param  {String} 模板
       * @param  {Array} 参数
       * @param  {Boolean,String} 默认 true, 参数添加单引号
       * @return {String}
       * @example
       *  formatHtml('{0}-{1}', ['零', '一'])  // '\'零\'-\'一\''
       */
      formatHtml: function(tpl, params, wrap) {
        var me = this;
        if ($.type(params) == 'array') {
          wrap = _defaults(wrap, true);
          if (wrap) {
            if (typeof wrap == 'string') {
              params = params.map(function(item) {
                return me.getFormatHtmlWrap(item, wrap);
              })
            } else {
              params = params.map(function(item) {
                return me.getFormatHtmlWrap(item);
              })
            }
          }
          tpl = String.format.apply(null, [tpl].concat(params));
        } else {
          tpl = String.format.apply(null, arguments);
        }
        // format arguments {0}, {1}, then format globalKey
        return tpl
          .replace(/<sp>/g, '&nbsp;&nbsp;');
        // .replace(/((\&nbsp\;){2})/g, '<span class="sp">$1</span>');
      },
      /**
       * 绑定当前作用域
       * @return {[type]} [description]
       */
      bindAll: function() {
        var args = [].slice.call(arguments, 0);
        return bindAll.apply(null, [this].concat(args));
      },
      /**
       * 释放方法到全局
       * @return {[type]} [description]
       */
      relMethod: function( /*methods*/ ) {
        var args = [].slice.call(arguments, 0);
        relMethod(window, this, args);
      }
    }
  });

  Vue.use(ElementUI);
  CustomVue.use(VuePlugin);
  return new CustomVue(options);
};

export default Page;
