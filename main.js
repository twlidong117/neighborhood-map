/**
 * 地图地点数组
 */
const locArr = [{
    position: [121.47519, 31.228833],
    title: '上海人民广场',
    id: 0
}, {
    position: [121.491854, 31.227003],
    title: '豫园',
    id: 1
}, {
    position: [121.499854, 31.239528],
    title: '东方明珠',
    id: 2
}, {
    position: [121.433117, 31.199008],
    title: '上海交通大学',
    id: 3
}, {
    position: [121.40468, 31.227938],
    title: '华东师范大学',
    id: 4
}, {
    position: [121.505614, 31.235299],
    title: '金茂大厦',
    id: 5
}, {
    position: [121.552556, 31.215723],
    title: '世纪公园',
    id: 6
}, {
    position: [121.494725, 31.184385],
    title: '中华艺术宫',
    id: 7
}];

/**
 * 地图对象，全局变量
 */
let mapObj;
/**
 * 地图加载函数
 */
function initMap() {
    mapObj = new LocalMap(locArr);
}

/**
 * ViewModel
 * 
 * @class ViewModel
 */
class ViewModel {
    /**
     * 构造函数
     */
    constructor() {
        // 是否展示地点列表
        this.isShowLocList = ko.observable(false);
        // 输入的筛选文字
        this.filterString = ko.observable('');
        // 地点数组
        this.locList = ko.observableArray(locArr);
    }

    /**
     * 展开/回收地点列表
     */
    toggleLocList() {
        this.isShowLocList(!this.isShowLocList());
    }

    /**
     * 过滤地点列表函数
     * @param {Object} vm 数据模型viewmodel
     * @param {Object} ev 事件 
     */
    onFilter(vm, ev) {
        ev.preventDefault();
        let queryString = this.filterString();
        let filterList = locArr.filter((item) => (item.title.indexOf(queryString) !== -1));
        this.locList(filterList);
        mapObj.resetMarkerAnimation();
        mapObj.infoWindow.close();
        mapObj.updateMarkers(filterList);
    }

    /**
     * 地点项的click事件回调
     * @param {Object} location 地点数组项
     */
    onLocClick(location) {
        mapObj.onSelected(location.id);
    }
}

ko.applyBindings(new ViewModel(), document.body);