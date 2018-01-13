/**
 * 地图地点数组
 */
const locArr = [{
    position: [121.471366, 31.190301],
    title: '龙美术馆(西岸馆)',
    isShow: true
}, {
    position: [121.518997, 31.222187],
    title: '上海艺仓美术馆',
    isShow: true
}, {
    position: [121.479416, 31.23735],
    title: '上海当代艺术馆',
    isShow: true
}, {
    position: [121.482571, 31.222296],
    title: '设季荟·拉法耶艺术设计中心',
    isShow: true
}, {
    position: [121.568411, 31.215064],
    title: '喜玛拉雅美术馆',
    isShow: true
}, {
    position: [121.504544, 31.233696],
    title: '上海外滩星空艺术馆',
    isShow: true
}, {
    position: [121.46834, 31.176691],
    title: '余德耀美术馆',
    isShow: true
}, {
    position: [121.425622, 31.21586],
    title: '刘海粟美术馆',
    isShow: true
}, {
    position: [121.632395, 31.217765],
    title: '昊美术馆',
    isShow: true
}];


/**
 * 地图加载函数
 */
function initMap() {
    let mapObj = new LocalMap(locArr);
}

/**
 * ViewModel
 * 
 * @class ViewModel
 */
class ViewModel {
    constructor() {
        this.isShowLocList = ko.observable(false);
        this.filterString = ko.observable('');
        this.locList = ko.observableArray(locArr);
    }
    toggleLocList() {
        this.isShowLocList(!this.isShowLocList());
    }
    onFilter(vm, ev) {
        ev.preventDefault();
        let queryString = this.filterString();
        let filterList = locArr.filter((item) => (item.title.indexOf(queryString) !== -1));
        this.locList(filterList);
    }
}

ko.applyBindings(new ViewModel(), document.body);