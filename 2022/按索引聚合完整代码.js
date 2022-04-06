export default {

  data() {
    return {
      colors: {
        110000: '#3076c4',

        120000: '#3076c4',
        370300: '#3076c4',
        130600: '#3076c4',

        371600: '#3076c4',
        130200: '#3076c4',
      },

      cluster: null, //聚合
      markerList: [],
      zhiQingZhanAllMarkers: [], //车marker list
      areaPolygon: []
    }
  },
  created() {
    this.$map.setStatus(this.$page.mapOptions)
    this.$map.setPitch(20)

    if (this.$route.name === 'stage9') {
      // 运氢
      this.$map.setZoom(7.41);
      this.$map.setCenter([117.733188, 37.662657])
    } else {
      this.$map.setCenter([117.386198, 38.27217])
      this.$map.setZoom(7.8)
    }

    this.mapCluster();
    this.initMap();


  },
  beforeDestroy() {
    this.$map.off('zoomchange', this.zoomEvent);
    this.$map.remove(this.$map.getAllOverlays());
    this.$map.clearMap()
  },
  methods: {
    // 聚合
    mapCluster() {
      let _this = this;
      let points = JSON.parse(JSON.stringify(this.points))
      let dataList = this.dataList;
      let count = points.length;
      let district = this.district

      function clusterMarkers() {
        var markerList = [];
        var marker = new AMap.Marker({
          map: this.$map,
        })
        markerList.push(marker);
        return markerList;
      }

      let clusterIndexSet = {
        city: {
          minZoom: 2,
          maxZoom: 9,
        },
        district: {
          minZoom: 9,
          maxZoom: 11.5,
        },
        licenseNumber: {
          minZoom: 11.5,
          maxZoom: 40,
        },
      }

      function getStyle(context) {
        // clusterData:聚合中包含数据
        // index:聚合的条件
        // count:聚合点数
        // marker:聚合点marker
        let {
          clusterData,
          index,
          count,
          marker
        } = context

        let color = [
          '9,55,138',
          '66,130,198',
        ];
        var indexs = ['city', 'district', 'licenseNumber'];
        var i = indexs.indexOf(index['mainKey']);
        // var text = clusterData[0][index['mainKey']];
        var text = ''
        var size = Math.round(38 + Math.pow(count / points.length, 1 / 5) * 70);
        if (i <= 1) {
          var extra = '<span class="showCount">' + context.count + '座</span>';
          // text = '<span class="showName">' + text + '</span>';
          text += extra;
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

      function getPosition(context) {
        var key = context.index.mainKey;
        var dataItem = context.clusterData && context.clusterData[0];
        var districtName = dataItem[key];
        if (!district[districtName]) {
          return null;
        }
        var center = district[districtName].center.split(',');
        var centerLnglat = new AMap.LngLat(center[0], center[1]);
        return centerLnglat;
      }

      function _customRender(data) {
        const keys = Object.keys(data.clusterData);
        let markers = [];
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var cluster = data.clusterData[key];
          var position = cluster.data[0].lnglat;
          var marker = new AMap.Marker({
            position: position,
            text: {
              content: cluster.data.length.toString(),
              style: {
                fillColor: '#ffffff'
              }
            },
            zIndex: 12
          });
          markers.push(marker)
        }
        return {
          type: 'type',
          layer: null,
          markers: markers,
        };
      }

      // 自定义聚合点样式
      function _renderClusterMarker(context) {
        AMap.plugin(['AMap.MoveAnimation'], () => {
          let clusterData = context.clusterData; // 聚合中包含数据
          let index = context.index; // 聚合的条件
          let count = context.count; // 聚合中点的总数
          let marker = context.marker; // 聚合点标记对象
          let styleObj = getStyle(context);
          // 自定义聚合点标记显示位置
          var position = getPosition(context);
          // 自定义点标记样式
          var dom;
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
              _this.$map.setZoom(styleObj.index == 0 ? 10 : 12);

            });

          } else {
            dom = document.createElement('div');
            dom.className = 'amap-cluster';
            dom.style.width = '0px';
            dom.style.height = '0px';
            dom.innerHTML = '';
          }


          // div.style.boxShadow = styleObj.boxShadow;
          context.marker.setContent(dom)

          if (position) {
            context.marker.setPosition(position);
          }
          context.marker.setAnchor('center');
        })


      };
      AMap.plugin(['AMap.IndexCluster'], () => {
        _this.cluster = new AMap.IndexCluster(_this.$map, _this.points, {
          renderClusterMarker: _renderClusterMarker,
          clusterIndexSet: clusterIndexSet,
        })
      })

    },
    initMap() {
      // 渲染城市边界线
      AMap.plugin(['AMap.DistrictSearch'], async () => {

        let drawBounds = (area, strokeColor, fillColor) => {
          let district = null
          let polygons = []
          let adcode = area.adcode

          //加载行政区划插件
          if (!district) {
            //实例化DistrictSearch
            var opts = {
              subdistrict: 0, //获取边界不需要返回下级行政区
              extensions: 'all', //返回行政区边界坐标组等具体信息
              level: 'district' //查询行政级别为 市
            }
            district = new AMap.DistrictSearch(opts)
          }
          district.setLevel('district')
          district.search(adcode, (status, result) => {
            // this.$map.remove(polygons) //清除上次结果
            polygons = []
            var bounds = result.districtList[0].boundaries

            var polygon;

            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                polygon = new AMap.Polygon({
                  strokeWeight: 2,
                  path: bounds[i],
                  fillOpacity: 0.4,
                  fillColor: fillColor,
                  strokeColor: fillColor
                })
                this.areaPolygon.push(polygon)
                polygons.push(polygon)
              }

            }
            this.$map.add(polygons);
          })
        }



        //遍历城市 市区
        let initBounds = () => {
          for (let i = 0; i < this.dataList.length; i++) {
            let area = this.dataList[i];
            let adcode = area.adcode
            drawBounds(area, this.colors[adcode] || '#2c99a6', this.colors[adcode] || '#2c99a6')
          }
        }
        initBounds();
      })

      // 监听地图缩放
      this.$map.on('zoomchange', this.zoomEvent)
    },
    zoomEvent(e) {
      let currentZoom = this.$map.getZoom(); //当前缩放级别

      if (currentZoom < 11.5) {
        this.$map.remove(this.zhiQingZhanAllMarkers);
        this.zhiQingZhanAllMarkers = [];
        this.$map.add(this.areaPolygon); //添加面层
        this.activeMarkerData = {}
      }

      // zoom >= 9.5  显示制氢厂坐标
      if (currentZoom >= 11.5) {
        if (this.zhiQingZhanAllMarkers.length > 0) {
          return;
        }

        this.zhiQingZhanAllMarkers = []
        this.$map.remove(this.areaPolygon); //删掉面层
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
            angle: 0,
          })

          marker.on('click', () => {
            this.showDialog = true;
            this.activeMarkerData = point;
          })

          this.zhiQingZhanAllMarkers.push(marker)

        }

        // })
      }
    },
    handleClickAreaName(center) {
      this.$map.setZoom(8.2);
      this.$map.setCenter([center.lng, center.lat])
    }
  }
}