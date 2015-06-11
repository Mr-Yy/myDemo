/**
 * map.js
 * @authors Your Name (you@example.org)
 * @date    2015-05-21 10:18:00
 * @version $Id$
 */

window.onload = myMap;

function myMap() {
    var map = new BMap.Map("container");
    var tip = new BMap.Point(121.479765, 31.24040);
    
    map.enableScrollWheelZoom();
    //设置放大缩小
    var opts = {
        type: BMAP_NAVIGATION_CONTROL_ZOOM
    };
    map.addControl(new BMap.NavigationControl(opts));
    map.addControl(new BMap.ScaleControl());
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint("上海市黄浦区南京西路88号", function(point) {
        if (point) {
            map.centerAndZoom(point, 20);
            map.addOverlay(new BMap.Marker(point));
        }
    }, "上海市");
    //位置提示
    var tips = new BMap.Label("新世界丽笙大酒店2楼");
    tips.setStyle({fontSize:"12px", color: "#fff", backgroundColor: "#ff3e3e",lineHight: "1.414"});
    tips.setPosition(tip);
    map.addOverlay(tips);
    /*var marker = new BMap.Marker(tip); // 创建标注    
    map.addOverlay(marker);
    var opts2 = {
        width: 250, // 信息窗口宽度    
        height: 100, // 信息窗口高度    
        title: "Hello" // 信息窗口标题   
    }
    var infoWindow = new BMap.InfoWindow("World", opts2); // 创建信息窗口对象    
    map.openInfoWindow(infoWindow, map.getCenter());*/
    /*var polyline = new BMap.Polyline([
        new BMap.Point(116.399, 39.910),
        new BMap.Point(116.405, 39.920)
    ], {
        strokeColor: "blue",
        strokeWeight: 6,
        strokeOpacity: 0.5
    });
    map.addOverlay(polyline);*/


}
