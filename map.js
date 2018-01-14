/**
 * LocalMap类，使用高德地图api
 * 第三方API：百度百科查询api
 */
class LocalMap {
    /**
     * 构造函数
     * @param {Array} markerList marker数据列表 
     */
    constructor(markerList) {
        // map实例
        this.mapObj = new AMap.Map('map', {
            center: [121.491854, 31.227003],
            zoom: 12
        });
        // 信息窗体
        this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) });
        this.infoWindow.on('close', this.onInfoWindowClose.bind(this));
        // Marker数组
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

    /**
     * Marker的Click事件回调函数
     * @param {Object} ev 事件
     */
    onMarkerClick(ev) {
        this.showInfoWindow(ev);
        let id = this.markers.indexOf(ev.target);
        this.onSelected(id);
    }

    /**
     * 显示信息窗体
     * 发起异步请求获取地点百科信息
     * @param {Object} ev 事件
     */
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

    /**
     * 根据选中地点项的id值设置Marker动画
     * @param {number} id 地点数组项的id值
     */
    onSelected(id) {
        this.markers.map((item, index) => {
            if (index === id) {
                item.setAnimation('AMAP_ANIMATION_BOUNCE');
            } else {
                item.setAnimation('AMAP_ANIMATION_NONE');
            }
        });
    }

    /**
     * 信息窗体关闭时的回调函数
     */
    onInfoWindowClose() {
        this.resetMarkerAnimation();
    }

    /**
     * 根据地点列表的变化更新地图的Marker
     * @param {Array} newList 过滤后的地点列表
     */
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

    /**
     * 重置Marker动画
     */
    resetMarkerAnimation() {
        this.markers.map((item) => {
            item.setAnimation('AMAP_ANIMATION_NONE');
        });
    }

    /**
     * 发起百科查询请求，处理响应和错误
     * @param {string} key 查找关键字
     */
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