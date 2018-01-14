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
        this.infoWindow.on('close', this.resetMarkerAnimation.bind(this));
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
        this.resetMarkerAnimation();
        this.infoWindow.setContent('Test'); //TODO: 第三方查询
        this.infoWindow.open(this.mapObj, ev.target.getPosition());
        ev.target.setAnimation('AMAP_ANIMATION_BOUNCE');
    }

    onSelected(id) {
        this.markers.map((item, index) => {
            if (index === id) {
                item.setAnimation('AMAP_ANIMATION_BOUNCE');
            } else {
                item.setAnimation('AMAP_ANIMATION_NONE');
            }
        });
    }

    updateMarkers(newList) {
        this.markers.map((item, index) => {
            let res = newList.every((loc) => (loc.id !== index));
            if (res) {
                item.hide();
            } else {
                item.show();
            }
        });
    }

    resetMarkerAnimation() {
        this.markers.map((item) => {
            item.setAnimation('AMAP_ANIMATION_NONE');
            item.show();
        });
    }
}