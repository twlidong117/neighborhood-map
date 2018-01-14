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
            center: [121.491854, 31.227003],
            zoom: 12
        });
        this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) });
        this.infoWindow.on('close', this.onInfoWindowClose.bind(this));
        this.markers = [];
        for (let i = 0; i < markerList.length; i++) {
            let marker = new AMap.Marker({
                position: markerList[i].position,
                title: markerList[i].title,
                animation: 'AMAP_ANIMATION_DROP',
                map: this.mapObj
            });
            marker.on('click', this.onMarkerClick.bind(this));
            this.markers.push(marker);
        }
    }

    onMarkerClick(ev) {
        this.showInfoWindow(ev);
        let id = this.markers.indexOf(ev.target);
        this.onSelected(id);
    }

    showInfoWindow(ev) {
        this.infoWindow.setContent('Loading');
        let title = ev.target.vh.title;
        this.searchFromBaike(title).then((result) => {
            this.infoWindow.setContent(`<h3>${result.title}</h3><p>${result.abstract.substring(0,80)}</p>`);
        }, (msg) => {
            this.infoWindow.setContent(`<p>An error occured, infomation:</p><p>${msg.statusText}</p>`);
        });
        this.infoWindow.open(this.mapObj, ev.target.getPosition());
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

    onInfoWindowClose() {
        this.resetMarkerAnimation();
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
        });
    }

    searchFromBaike(key) {
        let url = `http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=${key}&bk_length=600`;
        return new Promise((resolve, reject) => {
            console.log('in');
            console.log(url);
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                success: (result) => {
                    resolve(result);
                },
                error: (msg) => {
                    reject(msg);
                }
            });
        });
    }
}