import App from './app.vue'
import Page from '@/base/page'

import $ from 'jquery'
import mini from 'mini'

mini.ZTabs = function () {
    // this._initTabs();
    mini.ZTabs.superclass.constructor.apply(this, arguments);
}
mini.extend(mini.ZTabs, mini.Tabs, {
    uiCls: "mini-ztabs",
    _create: function () {
        this.el = document.createElement("div");
        this.el.className = "mini-ztabs";

        var s = '<table class="mini-tabs-table" cellspacing="0" cellpadding="0"><tr style="width:100%;">'
                    + '<td></td>'
                    + '<td style="text-align:left;vertical-align:top;width:100%;"><div class="mini-tabs-bodys"></div></td>'
                    + '<td></td>'
                + '</tr></table>';
        this.el.innerHTML = s;
        this._tableEl = this.el.firstChild;

        var tds = this.el.getElementsByTagName("td");
        this._td1El = tds[0];
        this._td2El = tds[1];
        this._td3El = tds[2];
        this._bodyEl = $('.J_mainContent')[0]; // this._td2El.firstChild;
        this._borderEl = this._bodyEl;
        this.doUpdate();
    },
    _handleIFrameOverflow: function () {
        var bodyEl = this.getTabBodyEl(this.activeIndex);
        if (bodyEl) {
            mini.addClass(bodyEl, 'mini-tabs-hideOverflow');
        }
    },
    //自定义方法，兼容 mini.open
    getIFrameEl: function () {
        return this.getTabIFrameEl(this.activeIndex);
    },
    activeTab: function (tab) {
        mini.ZTabs.superclass.activeTab.call(this, tab);
    },
    _fixZdLayout: function () {
        if (this.canLayout()) {
            try {
                var tab = this.getTabIFrameEl(this.activeIndex).parentNode;
                if (tab)
                    mini.layoutIFrames(tab);
            } catch (e) { console.info(e)}
        }
    },
    setActiveIndex: function (value, load) {
        mini.ZTabs.superclass.setActiveIndex.call(this, value, load);
        this._fixZdLayout();
    },
    _doLoadTab: function (tab) {
        mini.ZTabs.superclass._doLoadTab.call(this, tab);
    },
    removeTab: function (tab) {
        tab = this.getTab(tab);
        if (!tab || this.tabs.indexOf(tab) == -1) return;

        var acTab = this.getActiveTab();
        var isActive = tab == acTab;
        var autoActive = this._OnTabDestroy(tab);
        this.tabs.remove(tab);

        this._doRemoveIFrame(tab);

        var el = this.getTabBodyEl(tab);
        if (el) this._bodyEl.removeChild(el);

        if (autoActive && isActive) {
            var list = this.getTabs();
            var found = false;
            for (var i = 0; i < list.length; i++) {
                if(list[i].selfwinid == tab.callwinid){
                    this.activeIndex = i;
                    found = true;
                    break;
                }
            }
            if(!found){
                for (i = this.activeIndex; i >= 0; i--) {
                    tab = this.getTab(i);
                    if (tab && tab.enabled && tab.visible) {
                        this.activeIndex = i;
                        break;
                    }
                }
            }
            this.doUpdate();
            this.setActiveIndex(this.activeIndex);
            this.fire("activechanged");
        } else {
            this.activeIndex = this.tabs.indexOf(acTab);
            this.doUpdate();
        }
        return tab;
    },
    doLayout: function () {
        var me = this;
        mini.ZTabs.superclass.doLayout.apply(this, arguments);
        var bodyEl = this._bodyEl;
        bodyEl.style.position = "absolute";
        var top = 103 || this._bodyEl.offsetTop, left = 95, margin = 0; // this._bodyEl.offsetTop
        var clientHeight = window.document.documentElement.clientHeight,
            clientWidth = window.document.documentElement.clientWidth;
        var height = clientHeight - top;
        var width = clientWidth - left;
        bodyEl.style.height = height + 'px';
        bodyEl.style.width = width + 'px';
        bodyEl.style.top = top + 'px';
        bodyEl.style.left = (left - margin) + 'px';
        if (this.__contentLayoutTimer) {
            clearTimeout(this.__contentLayoutTimer);
        }
        this.__contentLayoutTimer = setTimeout(function () {
            var clientHeight = window.document.documentElement.clientHeight,
            clientWidth = window.document.documentElement.clientWidth;
            var height = clientHeight - top;
            var width = clientWidth - left;
            // bodyEl.style.height = height + 'px';
            // bodyEl.style.width = width + 'px';
        }, 300);
        var tabBodyEl = this.getTabBodyEl(this.activeIndex);
        if (tabBodyEl) {
            tabBodyEl.style.height = "100%";
            tabBodyEl.style.width = "100%";
        }
        setTimeout(function () {
            mini.layout(bodyEl);
            me.fire("layout");
        }, 10);
    }
})
mini.regClass(mini.ZTabs, "ztabs");
Page(App)

