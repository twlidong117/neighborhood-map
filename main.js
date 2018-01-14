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
    position: [121.503584, 31.296426],
    title: '复旦大学',
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
        mapObj.infoWindow.close();
        mapObj.updateMarkers(filterList);
    }
    onLocClick(location, ev) {
        mapObj.onSelected(location.id);
    }
}

let viewModel = new ViewModel();

ko.applyBindings(viewModel, document.body);