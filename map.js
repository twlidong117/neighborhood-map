/**
 * LocalMap类
 */
class LocalMap {
    /**
     * 构造函数
     * @param {Array} markerList marker数据列表 
     */
    constructor(markerList) {
        this.mapObj = new AMap.Map('map', {
            center: [121.500754, 31.213797],
            zoom: 12
        });
        this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) });
        this.markers = [];
        for (let i = 0; i < markerList.length; i++) {
            let marker = new AMap.Marker({
                position: markerList[i].position,
                title: markerList[i].title,
                animation: 'AMAP_ANIMATION_DROP',
                map: this.mapObj
            });
            marker.on('click', this.onShowInfoWindow.bind(this));
            this.markers.push(marker);
        }
    }

    onShowInfoWindow(ev) {
        this.infoWindow.setContent('Test'); //TODO: 第三方查询
        this.infoWindow.open(this.mapObj, ev.target.getPosition());
    }
}