## 高德地图可视化案例-京津冀智慧氢能大数据平台

### 一、功能描述

#### 1、首页-愿景目标

页面整体以地图为背景，

1. 京津冀地区描边高亮显示，且北京的大兴区、经开区、房山区、顺义区、昌平区、延庆区和天津的滨海新区需要背景高亮。
2. 地图上突出两条链，一条产业发展链，途径淄博-保定-天津-北京，一条是氢能供应链，途径滨州-唐山-北京，两条链需要有一点一点画出来和展示氢气运输的效果。
3. 地图渲染完成后，需要在城市/地区的名称上方弹框依次展示出该地的氢能指标，包括用氢规模、加氢站数量、推广规模等；点击城市/地区的名称，弹框定位到点击的城市/地区，且地图自动缩放和移动。弹窗可手动关闭。

#####

1. 渲染城市边界线，使用 AMap.DistrictSearch（行政区划查询） 获取行政区域的区号、城市编码、中心点、边界、下辖区域等信息。这里主要是为了获取边界点，然后使用 AMap.Polygon 多边形覆盖物实现绘制边界线。
   [districtSearch 参考文档](https://lbs.amap.com/api/jsapi-v2/documentation#districtsearch)
   [polygon 参考文档](https://lbs.amap.com/api/jsapi-v2/documentation#polygon)

```js
AMap.plugin(['AMap.DistrictSearch'], () => {
  /**
   * adcode 城市code
   * **/
  let drawBounds = (adcode) => {
    let district = null
    let polygons = []
    if (!district) {
      var opts = {
        // 显示下级行政区级数，0表示不返回下级
        subdistrict: 0,
        // 是否返回行政区边界坐标点，all：返回完整的边界坐标点，base：不返回
        extensions: 'all',
        // 关键字对应的行政区级别，country：国家，province：省，city：市，district：区/县
        level: 'district'
      }
      // 创建行政区查询实例
      district = new AMap.DistrictSearch(opts)

      district.search(adcode, (status, result) => {
        // result：对应的行政区信息
        this.$map.remove(polygons) //清除上次结果
        polygons = []
        var bounds: [] = result.districtList[0].boundaries

        if (bounds) {
          for (var i = 0; i < bounds.length; i++) {
            // 绘制多边形
            let polygon = new AMap.Polygon({
              // 多边形轮廓线节点坐标数组
              path: bounds[i],
              // 填充透明度
              fillOpacity: 0.21,
              // 填充颜色
              fillColor: '#fff',
              // 描边宽度
              strokeWidth: 1,
              // 描边颜色
              strokeColor: '#fff',
              // 描边透明度
              strokeOpacity: 1
            })
            polygons.push(polygon)
          }
        }
      })
    }
  }
})
```

2. 使用 AMap.Polygon 画出氢能产业链，使用 AMap.Marker 给行政区添加 name 和 icon
   因为两条产业链并不是直线，需要有一定的弧度，这里使用贝塞尔曲线函数来获得曲线上每个点的坐标值

```js 贝塞尔曲线
/**
 *
 * @param {Array} anchorpoints
 * @param {Number} pointsAmount 点的个数，越多曲线越平滑
 * @returns
 */
function CreateBezierPoints(anchorpoints, pointsAmount) {
  var points = []
  for (var i = 0; i < pointsAmount; i++) {
    var point = MultiPointBezier(anchorpoints, i / pointsAmount)
    points.push(point)
  }
  return points
}

/**
 *
 * @param {Array} points
 * @param {Number} t
 * @returns
 */
function MultiPointBezier(points, t) {
  var len = points.length
  var x = 0,
    y = 0
  var erxiangshi = function (start, end) {
    var cs = 1,
      bcs = 1
    while (end > 0) {
      cs *= start
      bcs *= end
      start--
      end--
    }
    return cs / bcs
  }
  for (var i = 0; i < len; i++) {
    var point = points[i]
    x += point[0] * Math.pow(1 - t, len - 1 - i) * Math.pow(t, i) * erxiangshi(len - 1, i)
    y += point[1] * Math.pow(1 - t, len - 1 - i) * Math.pow(t, i) * erxiangshi(len - 1, i)
  }
  return [x, y]
}
```

```js 添加运动轨迹
var bezierCurvePath = [
  //两条连线上的点
  [
    //淄博-保定-天津-北京
    ['118.047648', '36.814939'], //淄博
    ['113.47', '38.87'], //控制点坐标
    ['115.47', '38.87'], //保定
    ['116.47', '38.87'], //控制点
    ['117.0', '39.13'], //天津
    ['118.0', '39.43'], //控制点
    ['116.46', '39.92'] //北京
  ],
  [
    //滨州-保定-北京
    ['117.970731', '37.382687'],
    // ['114.97', '38.87'],
    ['119.580149', '39.93068'],
    ['116.407387', '40.204179']
  ]
]

// 延迟休眠函数
function sleep (delay){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      try{
        resolve()
      }catch{
        reject()
      }
    }, delay * 1000)
  })

}

//
AMap.plugin('AMap.MoveAnimation', () => {
  bezierCurvePath.forEach((path, pIdx) => {
    let p = CreateBezierPoints(path, 100);//曲线上的点

    // 创建折线对象
    let bezierCurve = new AMap.Polyline({
      map: this.$map,
      path: [[0, 0]],
      isOutline: true,
      outlineColor: '#1f2d4b',
      borderWeight: 6.5,
      strokeColor: '#0999db',
      strokeOpacity: 1,
      strokeWeight: 8,
      strokeStyle: 'solid',
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 99,
      showDir: false,
      bubble: true
    })

    // 给折线添加路径
    for(let i = 0; i < p.length; i++){
      await sleep(0.01)
      bezierCurve.setPath(p.slice(0, count))
    }
    // 画完线后再加移动的光点
    // 创建点标记对象
    let marker = new AMap.Marker({
      map: this.$map,
      position: ['118.047648', '36.814939'],
      icon: new AMap.Icon({
        image: 'image',
        size: new AMap.Size(15, 45), //图标大小
        imageSize: new AMap.Size(15, 45)
      }),
      offset: new AMap.Pixel(-7, -22),
      angle: 35
    })
    // 给点标记添加移动轨迹
    marker.moveAlong(p, {
      duration: 200,//每一段移动的持续时长
      circlable: true, //循环
      autoRotation: true//沿路径旋转
    })
  })
})
```

3. 加弹窗，包含自动定位到地区，地图自动缩放移动适应视野，弹窗可关闭

```js
// 生成弹窗内html代码
function createInfoWindow(adData) {
  return '<div></div>'
}
// 定位到当前弹窗城市
function currentPopup(adData) {
  this.$map.setZoomAndCenter(8.2, [adData.LngLat[0] - 0.6, adData.LngLat[1]], false, 100)
  this.mapPopup.setContent(this.createInfoWindow(adData))
  this.mapPopup.getIsOpen()
    ? this.mapPopup.setPosition(adData['LngLat'])
    : this.mapPopup.open(this.$map, adData['LngLat'])
}
// 创建信息窗口
function initInfoPopup() {
  this.mapPopup = new AMap.InfoWindow({
    isCustom: true, //使用自定义窗体
    autoMove: true,
    content: this.createInfoWindow(moduleData[0]),
    offset: new AMap.Pixel(0, 0) //位移，防止弹窗显示不全
  })
}

function infoPopupCarousel(index) {
  let datas = moduleData.filter((mo) => mo.content !== undefined)

  if (index) this.activePopupIndex = index
  this.popupTimer = setInterval(() => {
    if (this.activePopupIndex === datas.length) {
      this.activePopupIndex = 0
    }
    let _activeCity = datas[this.activePopupIndex]
    this.activePopupIndex++

    if (this.$route.name === 'stage1') {
      this.currentPopup(_activeCity)
    }
  }, 10 * 1000)
}

// 弹窗关闭，加在 mounted中
$('body').on('click', '.popup-city .close-icon', async () => {
  clearInterval(this.popupTimer)
  this.mapPopup.close && this.mapPopup.close()

  this.infoPopupCarousel()
})
```
