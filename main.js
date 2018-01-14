/**
 * 地图地点数组
 */
const locArr = [{
    position: [121.471366, 31.190301],
    title: '龙美术馆(西岸馆)',
    id: 0
}, {
    position: [121.518997, 31.222187],
    title: '上海艺仓美术馆',
    id: 1
}, {
    position: [121.479416, 31.23735],
    title: '上海当代艺术馆',
    id: 2
}, {
    position: [121.482571, 31.222296],
    title: '设季荟·拉法耶艺术设计中心',
    id: 3
}, {
    position: [121.568411, 31.215064],
    title: '喜玛拉雅美术馆',
    id: 4
}, {
    position: [121.504544, 31.233696],
    title: '上海外滩星空艺术馆',
    id: 5
}, {
    position: [121.46834, 31.176691],
    title: '余德耀美术馆',
    id: 6
}, {
    position: [121.425622, 31.21586],
    title: '刘海粟美术馆',
    id: 7
}, {
    position: [121.632395, 31.217765],
    title: '昊美术馆',
    id: 8
}];


/**
 * 地图加载函数
 */
let mapObj;

function initMap() {
    mapObj = new LocalMap(locArr);
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
        mapObj.resetMarkerAnimation();
        mapObj.updateMarkers(filterList);
    }
    onLocClick(location) {
        mapObj.onSelected(location.id);
    }
}

ko.applyBindings(new ViewModel(), document.body);