// miniUseBuildPath = function (){}
//debugger
mini_debugger = false;

var hash = "";
if (debug) {
    hash = new Date().getTime();
    var mini_use_suffix = 't=' + hash;
}
var mini_use_alias = {
	'root': '/javascripts',
    'com': '/javascripts/com',
    'plugins': '/javascripts/plugins',
    'template': '/template'
};

var mini_OnDrawCell = function(cellHtml, e) {
	var value = e.value;
	if(value && value.name && value.description){
		cellHtml = value.description;
		return cellHtml;
	}
    if (~['action'].indexOf(e.column.name)) { // setting white list, improve performance
        return cellHtml.replace(/((\&nbsp\;?)\2)(?!<\/span>)/g, '<span class="sp">$1</span>');
    } else {
        return cellHtml;
    }
}

var mini_doload = function(e) {
    var sender = e.sender;
    if (e.text.status == 1) {
        var result = e.text;
        if (mini.isArray(result.data)) {
        	e.result = mini.decode(result.data);
        } else if (result.data && mini.isArray(result.data.list)) {
            e.result = {
                total: result.data.total,
                data: mini.decode(result.data.list)
            };
        }
    } else if(e.text.status == 0){
    	toast.danger(e.text.message);
    }
}

// var mini_pageIndex_offset = true;
// var mini_pageIndex_start = 1;
// var mini_onbeforeLoad = function(e){
//     if(e.params && typeof e.params.pageIndex != 'undefined'){
//         e.params.pageIndex = e.params.pageIndex + mini_pageIndex_start;
//     }
// }
// var mini_onpreload = function(ex){
//     if(ex && ex.pageIndex != 'undefined'){
//         ex.pageIndex = ex.pageIndex - mini_pageIndex_start;
//     }
// }

var mini_use_paths = {
    'GalleryWindow': 'com/dialog/GalleryWindow',
    'GoodSelWindow': 'com/dialog/GoodSelWindow',
    'BranchSelWindow': 'com/dialog/BranchSelWindow',
    'ManagerSelWindow': 'com/dialog/ManagerSelWindow',
    'OrderSelWindow': 'com/dialog/OrderSelWindow',
    'ShipmentSelWindow': 'com/dialog/ShipmentSelWindow',
    'StoreSelWindow': 'com/dialog/StoreSelWindow',
    'ScanFormWindow': 'com/dialog/ScanFormWindow',
    'AssignOrderWindow': 'com/dialog/AssignOrderWindow',
    'LogisticsInfoWindow': 'com/dialog/LogisticsInfoWindow',
    'AddressSelWindow': 'com/dialog/AddressSelWindow',
    'ProviderSelWindow': 'com/dialog/ProviderSelWindow',

    'baseSelectWindow': 'com/component/baseSelectWindow',
    'baseFormWindow': 'com/component/baseFormWindow',


    'treeSelectWindow': 'com/component/treeSelectWindow',
    'multiupload': 'com/component/multiupload/multiupload',
    'multiUploadWindow': 'com/component/multiUploadWindow',
    'uploadWindow': 'com/component/uploadWindow',



    'mini.ToolTip': 'com/component/mini.ToolTip',
    'mini.FilterEdit': 'com/component/mini.FilterEdit',
    'mini.OutlookBar': 'com/component/mini.OutlookBar',
    'mini.OutlookMenu': 'com/component/mini.OutlookMenu',
    'mini.OutlookTree': 'com/component/mini.OutlookTree',

    'mini.TextBoxList': 'com/component/mini.TextBoxList',
    'mini.AutoComplete': 'com/component/mini.AutoComplete',
    'mini.Lookup': 'com/component/mini.Lookup',

    'mini.EditGrid': 'com/component/mini.EditGrid',
    'mini.UEditor': 'com/component/mini.UEditor',
    'mini.WebuploadPanel': 'com/component/mini.WebuploadPanel',

    'mini.PayPass': 'com/component/mini.PayPass',

    'mini.WebuploadList': 'com/component/mini.WebuploadList',
    'mini.PagerTree': 'com/component/mini.PagerTree'
};

var mini_use_deps = {
    'GoodSelWindow': ['baseSelectWindow'],
    'BranchSelWindow': ['baseSelectWindow'],
    'ManagerSelWindow': ['baseSelectWindow'],
    'OrderSelWindow': ['baseSelectWindow'],
    'ShipmentSelWindow': ['baseSelectWindow'],
    'StoreSelWindow': ['baseSelectWindow'],
    'ProviderSelWindow': ['baseSelectWindow'],
    'LogisticsInfoWindow': ['css!/css/logistics.css'],


    'multiupload': ['css!com/component/multiupload/multiupload.css', 'plugins/webuploader/webuploader.min.js'],
    'multiUploadWindow': ['multiupload'],
    'uploadWindow': ['plugins/swfupload/swfupload.js', 'root/ajaxfileupload.js'],

    'mini.OutlookTree': ['mini.OutlookBar'],
    'mini.OutlookMenu': ['mini.OutlookBar'],

    'mini.WebuploadPanel': ['css!com/component/webuploadpanel.css'],
    'mini.PayPass': ['css!com/component/paypass.css'],

    'mini.WebuploadList': ['css!com/component/webuploadlist.css']


};


window.COM_CONFIG = window.COM_CONFIG || {};
window.mini_query_server = window.COM_CONFIG.SERVER || location.origin;
window.mini_use_restful = true;
window.mini_rest_token = window.COM_CONFIG.TOKEN;
window.mini_rest_param = "token";
if(typeof mini_withCredentials === 'undefined'){
    var mini_withCredentials = false;
}

if(typeof miniUseBuildPath === 'undefined'){
    var miniUseBuildPath = function(a) { return a};
}
// var mini_searchField = "queryKey";
