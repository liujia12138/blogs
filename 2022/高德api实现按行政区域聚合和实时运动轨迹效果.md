### 一、聚合功能描述

根据加氢站的坐标，在地图上对应位置标记出来，并实按省市区级别实现聚合的效果，即地图在不同的缩放等级下，显示不同的行政区级别和该行政区域对应的数据及展示效果。

### 二、实现思路

监听地图的 zoomchange 事件，根据当前缩放等级，设置不同的 marker，按当前显示的行政区域级别统计数据展示到 marker 上。

```js 数据格式
const points = [
  {
    lnglat: [115.995372, 39.743935],
    district: '房山区',
    licenseNumber: 'car34',
    city: '北京',
    name: '房山区环宇京辉制氢厂',
    methods: '天然气制氢、水电解制氢',
    location: '北京市房山区燕山工业区'
  },
  {
    lnglat: [115.959803, 39.728355],
    district: '房山区',
    licenseNumber: 'car115',
    city: '北京',
    name: '中国石化燕山石化制氢厂',
    location: '北京市房山区燕东路'
  },
  {
    lnglat: [115.919837, 40.367847],
    district: '延庆区',
    licenseNumber: 'car116',
    city: '北京',
    name: '中电智慧制氢厂',
    location: '北京市延庆区长城三路八达岭新能源谷内'
  },
  {
    lnglat: [116.623839, 40.147021],
    district: '顺义区',
    licenseNumber: 'car116',
    name: '北京首钢制氢厂',
    city: '北京'
  },
  {
    lnglat: [114.848846, 39.181928],
    district: '莲池区',
    licenseNumber: 'car150',
    city: '保定'
  },
  {
    lnglat: [117.661844, 38.96491],
    district: '滨海新区',
    licenseNumber: 'car150',
    city: '天津'
  },
  {
    lnglat: [117.857474, 38.87516],
    district: '滨海新区',
    licenseNumber: 'car150',
    city: '天津'
  },
  {
    lnglat: [118.002957, 38.115553],
    district: '沾化区',
    licenseNumber: 'car150',
    city: '滨州'
  },
  {
    lnglat: [117.860663, 38.235953],
    district: '沾化区',
    licenseNumber: 'car150',
    city: '滨州'
  },
  {
    lnglat: [117.759426, 38.102852],
    district: '沾化区',
    licenseNumber: 'car150',
    city: '滨州'
  },

  {
    lnglat: [117.98427, 36.330701],
    district: '淄博',
    licenseNumber: 'car150',
    city: '淄博'
  },
  {
    lnglat: [118.482356, 39.370502],
    district: '开平区',
    licenseNumber: 'car150',
    city: '唐山'
  },
  {
    lnglat: [115.539905, 41.441166],
    district: '沽源县',
    licenseNumber: '河北建投（沽源）',
    name: '河北建投（沽源）',
    methods: '电解水',
    city: '张家口'
  },
  {
    lnglat: [115.003014, 40.755835],
    district: '海珀尔',
    licenseNumber: '张家口海珀尔',
    name: '张家口海珀尔',
    methods: '电解水',
    location: '张家口市桥东区盛华化工有限公司西',
    city: '张家口'
  },
  {
    lnglat: [113.338793, 40.760665],
    district: '宜和',
    licenseNumber: '乌兰察布宜和',
    name: '乌兰察布宜和',
    methods: '电解水',
    city: '乌兰察布',
    location: '乌兰察布市察哈尔右翼前旗天皮山冶金化工园区宜和氢气厂'
  },
  {
    lnglat: [116.133823, 38.73321],
    district: '任丘',
    licenseNumber: '中国石油华北石化公司（北环路）',
    name: '中国石油华北石化公司（北环路）',
    city: '沧州',
    methods: '副产氢提纯',
    location: '中国石油华北石化公司（北环路）'
  },
  {
    lnglat: [115.009919, 40.757449],
    district: '桥东区',
    licenseNumber: '交投壳牌',
    name: '交投壳牌',
    city: '张家口',
    methods: '电解水',
    location: '张家口市桥东区望山循环经济示范园区'
  }
]
```

```js 聚合
let _this = this
let points = JSON.parse(JSON.stringify(this.points))
let count = points.length
let district = this.district

// 设置缩放显示级别
let clusterMarkers = {
  city: {
    minZoom: 2,
    maxZoom: 9
  },
  district: {
    minZoom: 9,
    maxZoom: 11.5
  },
  item: {
    minZoom: 11.5,
    maxZoom: 40
  }
}

//
function getStyle(context) {
  // clusterData:聚合中包含数据
  // index:聚合的条件
  // count:聚合点数
  // marker:聚合点marker
  let { clusterData, index, count, marker } = context

  let color = ['9,55,138', '66,130,198']

  var indexs = ['city', 'district', 'item']

  var i = indexs.indexOf(index['mainKey'])
  // var text = clusterData[0][index['mainKey']];
  var text = ''
  var size = Math.round(38 + Math.pow(count / points.length, 1 / 5) * 70)
  if (i <= 1) {
    var extra = '<span class="showCount">' + context.count + '座</span>'
    text += extra
  } else {
    size = 12 * text.length + 20
  }

  let style = {
    bgColor: 'rgba(' + color[i] + ',.5)',
    borderColor: 'rgba(' + color[i] + ',1)',
    text: text,
    size: size,
    index: i,
    color: '#efea42',
    textAlign: 'center',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
  }

  return style
}

// 自定义聚合点样式
function _renderClusterMarker(context) {
  AMap.plugin(['AMap.MoveAnimation'], () => {
    let clusterData = context.clusterData // 聚合中包含数据
    let index = context.index // 聚合的条件
    let count = context.count // 聚合中点的总数
    let marker = context.marker // 聚合点标记对象
    let styleObj = getStyle(context)
    // 自定义聚合点标记显示位置
    var position = getPosition(context)
    // 自定义点标记样式
    var dom
    if (styleObj.index <= 1 && position) {
      dom = `
            <div class="amap-cluster" 
              style="font-size:20px;text-align:center;border-radius:50%;background-color:${styleObj.bgColor};width:${styleObj.size}px;height:${styleObj.size}px;border: 4px solid ${styleObj.borderColor};box-shadow: 0 0 10px ${styleObj.borderColor};color:${styleObj.color}">
              <img src="${_this.mapIconImg['white']}" style="width: 32px;" />
              ${styleObj.text}  
            </div>
            `
      // 点击事件
      marker.on('click', function (e) {
        let p = marker.getPosition()
        _this.$map.setCenter([p.lng, p.lat])
        _this.$map.setZoom(styleObj.index == 0 ? 10 : 12)
      })
    } else {
      dom = document.createElement('div')
      dom.className = 'amap-cluster'
      dom.style.width = '0px'
      dom.style.height = '0px'
      dom.innerHTML = ''
    }

    // div.style.boxShadow = styleObj.boxShadow;
    context.marker.setContent(dom)

    if (position) {
      context.marker.setPosition(position)
    }
    context.marker.setAnchor('center')
  })
}

AMap.plugin(['AMap.IndexCluster'], () => {
  _this.cluster = new AMap.IndexCluster(_this.$map, _this.points, {
    renderClusterMarker: _renderClusterMarker,
    clusterIndexSet: clusterIndexSet
  })
})
```

```js zoomchange事件
// 最小层级静态展示
function zoomEvent(e) {
  let currentZoom = this.$map.getZoom() //当前缩放级别

  if (currentZoom < 11.5) {
    this.$map.remove(this.zhiQingZhanAllMarkers)
    this.zhiQingZhanAllMarkers = []
    this.$map.add(this.areaPolygon) //添加面层
    this.activeMarkerData = {}
  }

  // zoom >= 9.5  显示制氢厂坐标
  if (currentZoom >= 11.5) {
    if (this.zhiQingZhanAllMarkers.length > 0) {
      return
    }

    this.zhiQingZhanAllMarkers = []
    this.$map.remove(this.areaPolygon) //删掉面层
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i]
      // 车 marker
      let marker = new AMap.Marker({
        map: this.$map,
        position: point.lnglat,
        icon: new AMap.Icon({
          image: this.mapIconImg['blue'],
          size: new AMap.Size(43, 39), //图标大小
          imageSize: new AMap.Size(43, 39)
        }),
        offset: new AMap.Pixel(-12, -7),
        angle: 0
      })

      marker.on('click', () => {
        this.showDialog = true
        this.activeMarkerData = point
      })

      this.zhiQingZhanAllMarkers.push(marker)
    }

    // })
  }
}
```

```js
// 最小层级为实时运动的小车
function zoomEvent(e) {
  let _that = this
  let currentZoom = this.$map.getZoom() //当前缩放级别

  // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
  // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
  function parseRouteToPath(route) {
    var path = []

    for (var i = 0, l = route.steps.length; i < l; i++) {
      var step = route.steps[i]

      for (var j = 0, n = step.path.length; j < n; j++) {
        path.push(step.path[j])
      }
    }

    return path
  }

  if (currentZoom < 12) {
    this.$map.add(this.areaPolygon)
    // 清掉 小车
    this.cars_one_marker.forEach((marker, i) => {
      marker.hide()
      // this.cars_path[i].hide()
    })
  }

  // zoom > 9.5 跑小车
  if (currentZoom >= 12) {
    // 获取地图可视区域
    let visibleMapRing = this.createVisibleMapBounds()

    // 去掉面层
    this.$map.remove(this.areaPolygon)

    if (this.cars_one_marker.length > 0) {
      this.cars_one_marker.forEach((marker, i) => {
        marker.show()
        // this.cars_path[i].show()
      })
      return
    }

    // 小车  跑
    AMap.plugin(['AMap.MoveAnimation', 'AMap.Driving'], () => {
      for (let i = 0; i < this.points.length; i++) {
        // return;
        let point = this.points[i]
        // 车 marker
        let marker = new AMap.Marker({
          position: point.lnglat,
          icon: new AMap.Icon({
            image: this.imgs['carY'],
            size: new AMap.Size(21, 42),
            imageSize: new AMap.Size(21, 42)
          }),
          offset: this.$route.name === 'stage8' ? new AMap.Pixel(-9, -25) : new AMap.Pixel(-10, -21),
          angle: 0
        })
        this.cars_one_marker.push(marker)

        marker.on('click', () => {
          this.showDialog = true
        })

        let _thisCarPath = []

        let driving = new AMap.Driving({
          // map: this.$map,
          autoFitView: false,
          hideMarkers: true,
          showTraffic: false,
          isOutline: false
        })

        // 根据起终点经纬度规划驾车导航路线
        driving.search(point.lnglat, [+point.lnglat.lng + 0.02, +point.lnglat.lat], function (status, result) {
          if (status === 'complete') {
            marker.add(_that.$map)
            let path = parseRouteToPath(result.routes[0])
            marker.moveAlong(path, {
              duration: 5000,
              circlable: false,
              autoRotation: true
            })
          }
        })
      }
    })
  }
}
// 拖拽地图，用来判断拖拽后小车是否在可视范围内
//
function dragendEvent(e) {
  if (this.cars_one_marker.length === 0) return
  let carList = this.cars_one_marker
  // 获取地图可视区域
  let visibleMapRing = this.createVisibleMapBounds()
  for (let i = 0; i < carList.length; i++) {
    let carMarker = carList[i]

    const isPointInRing = AMap.GeometryUtil.isPointInRing(carMarker.getPosition(), visibleMapRing)

    // if (isPointInRing) {
    //   // 在可视范围内的小车，添加运动轨迹
    //   carMarker.on('moving', this.movingEvent(i))
    // }
  }
}
// 获取地图可视区域，用于判断point是否在可视区域内
function createVisibleMapBounds() {
  const bounds = this.$map.getBounds() //获取当前地图视图范围/可视区域

  const NorthEast = bounds.getNorthEast() //可视区域东北角坐标
  const SouthWest = bounds.getSouthWest() //可视区域西南角坐标
  const SouthEast = [NorthEast.lng, SouthWest.lat]
  const NorthWest = [SouthWest.lng, NorthEast.lat]

  const boundsPath = [[NorthEast.lng, NorthEast.lat], SouthEast, [SouthWest.lng, SouthWest.lat], NorthWest] //绘制可视区域path，用于判断point是否在path内

  return boundsPath
}
// 监听地图拖拽
this.$map.on('dragend', this.dragendEvent)
```

```js
// 在 created 中给map添加zoomchange事件
this.$map.on('zoomchange', this.zoomEvent)
```
