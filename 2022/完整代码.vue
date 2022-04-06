<template>
  <div class="stage1" :class="{ showLeft }">
    <!-- 顶端TAB -->
    <b-tab class="main-tab" :tabs="['第一年度', '第二年度', '第三年度', '第四年度']" v-model="year"></b-tab>
    <!-- 右上角 -->
    <div class="right-top content">
      <div class="data-item">
        <div class="row row--has-icon clear">
          <div class="left-icon content-icon t-ml1" style="top:10px;">
           总积分
          </div>
          <div id="animateNumber2" class="animateNumber animateNumber1 t-mt15 t-mb10 fl" style="height: 60px"></div>
          <div class="fl t-mt42" style="color: #bcd2f0; font-size: 20px">
            分
          </div>
        </div>
      </div>
    </div>
    <div class="leftPannel">
      <div class="titleBar titleBar1">
        <div
          v-for="tab in topTabs"
          :key="tab.index"
          class="flashSquare"
          :class="{ active: activeTopTabName === tab.name }"
          @click="handleTab(tab)"
        >
          <div class="top corner"></div>
          <div class="right corner"></div>
          <div class="bottom corner"></div>
          <div class="left corner"></div>
          <span>{{ tab.name }}</span>
        </div>
      </div>
      <div class="content">
        <img class="line" src="~@/assets/img/index_ling.png" alt="" />
        <div class="swiper-container">
          <div class="swiper-wrapper">
           
            <div class="swiper-slide">
              <tab2 />
            </div>
            <div class="swiper-slide">
              <tab3 />
            </div>
             <div class="swiper-slide">
              <tab1 />
            </div>
            <div class="swiper-slide">
              <tab4 />
            </div>
          </div>
        </div>

        <img class="line" src="~@/assets/img/index_ling.png" alt="" />

        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>

      <div class="base">
        <div class="pedestal"></div>
        <div class="base-content">
          <div class="words">
            <div>制</div>
            <div>储</div>
            <div>运</div>
            <div>加</div>
            <div>用</div>
          </div>
          <div class="cars">
            <div><span>制氢厂</span><img src="~@/assets/img/zhi.png" /></div>
            <div><span>储氢罐</span><img src="~@/assets/img/chu.png" /></div>
            <div><span>运氢车</span><img src="~@/assets/img/yun.png" /></div>
            <div><span>加氢站</span><img src="~@/assets/img/jqz.png" /></div>
            <div><span>氢燃料车</span><img src="~@/assets/img/qrl.png" /></div>
          </div>
          <div class="tip-words">
            <!-- 工业PLC数据，国标32969，GIS时空分布，加氢运单 -->
            <div class="tip-left">
              <div data-index="1">GIS时空分布</div>
              <div data-index="2">加氢运单</div>
            </div>
            <div class="tip-right">
              <div data-index="1">工业PLC数据</div>
              <div data-index="2">国标32969</div>
            </div>
          </div>
          <div class="base-title"></div>
          <!--光圈-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts-liquidfill'

import { CreateBezierPoints } from '@/utils/index'
import { toThousands } from '@/utils/index'
import { moduleData, mapOptions, mapConfig, citys, areas } from '@/utils/stage1.js'

// 轮播tabs
import Tab1 from './tabs/tab1.vue'
import Tab2 from './tabs/tab2.vue'
import Tab3 from './tabs/tab3.vue'
import Tab4 from './tabs/tab4.vue'

// 地图icons
let imgs = {
  110000: require('@/assets/img/110000.png'),
  130200: require('@/assets/img/130200.png'),
  130700: require('@/assets/img/130700.png'),
  130600: require('@/assets/img/130600.png'),
  120000: require('@/assets/img/120000.png'),
  371600: require('@/assets/img/371600.png'),
  370300: require('@/assets/img/370300.png'),
  xiongan: require('@/assets/img/xiongan.png'),
  light: require('@/assets/img/line_light.png'),

  icon1: require('@/assets/img/function.png'),
  icon2: require('@/assets/img/plane_line.png'),
  icon3: require('@/assets/img/inject_line.png'),
  icon4: require('@/assets/img/heart_line.png'),
  icon5: require('@/assets/img/accu_line.png'),
  icon6: require('@/assets/img/lvqing_rate.png'),
  icon7: require('@/assets/img/zhiqing_product.png')
}

// 延迟休眠
function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1)
      } catch (e) {
        reject(0)
      }
    }, delay * 1000)
  })
}

export default {
  data() {
    return {
      year: 0,
      showPopupIntervel: null,
      mapPopup: {},
      topTabs: [
       
        {
          name: '应用推广',
          index: 0
        },
        {
          name: '氢能供应',
          index: 1
        },
         {
          name: '技术创新',
          index: 2
        },
        {
          name: '政策环境',
          index: 3
        }
      ],
      activeTopTabName: '应用推广',
      showLeft: false,
      movingLight: [],
      activePopupIndex: 0,
      markers: [],
      popupTimer: null
    }
  },
  components: { Tab1, Tab2, Tab3, Tab4 },
  created() {
    this.$map.remove(this.$map.getAllOverlays()) //移除所有标记，防止重复

    this.$map.setStatus(mapOptions)

    this.$map.panBy(-300, -800)
    this.$map.setZoom(7)
    this.$map.setRotation(mapConfig.startRotation) //旋转
    this.$map.setZoom(mapConfig.startZoom)
    this.$map.setPitch(mapConfig.startPitch)

    this.$map.setCenter(mapConfig.startCenter)

    this.initInfoPopup()

    // 自动移动地图
    let lX = 0,
      lY = 0,
      zoom = this.$map.getZoom()

    let timePan = setInterval(() => {
      if (lX >= 320) {
        clearInterval(timePan)
        mapOptions.animateEnable = true
        this.$map.setStatus(mapOptions)
      } else {
        lX = lX + 2
      }

      if (this.$route.name === 'stage1') this.$map.panBy(1, 0.5)
    }, 30)

    this.$map.setZoom(8.2)

    this.initMap()
  },
  async mounted() {
    // 自动弹出弹窗

    if (this.$route.name !== 'stage1') {
      this.$map.clearInfoWindow()
      return
    }

    // 弹窗关闭
    $('body').on('click', '.popup-city .close-icon', async () => {
      clearInterval(this.popupTimer)
      this.mapPopup.close && this.mapPopup.close()

      this.infoPopupCarousel()
    })

    setTimeout(() => {
      this.showLeft = true
    
      $('#animateNumber2').animateNumber(
        {
          easing: 'easeInQuad',
          number: 600000,
          // numberStep: comma_separator_number_step,
          numberStep: function(now, tween) {
            let target = $(tween.elem)

            // var nowString = parseInt(now).toString();
            let nowString = toThousands(parseInt(now)).toString()
            let newNowString = ''
            for (var i = 0; i < nowString.split('').length; i++) {
              if (nowString[i] == ',') {
                newNowString = newNowString + '<span class="number dot">' + nowString[i] + '</span>'
              } else {
                newNowString =
                  newNowString + '<span class="number num' + nowString[i] + ' flip">' + nowString[i] + '</span>'
              }
            }
            target.html(newNowString)
          }
        },
        6000
      )
      this.initSwiper()
    }, 5 * 1000)
  },
  beforeDestroy() {
    this.movingLight.forEach((marker) => {
      marker.stopMove()
    })
    // this.$map.remove(this.movingLight)
    this.$map.remove(this.$map.getAllOverlays())
    this.mapPopup && this.$map.clearInfoWindow(this.mapPopup)
    this.mapPopup.close()
    this.$map.clearMap()
    this.movingLight = []
    clearInterval(this.popupTimer)
  },
  methods: {
    // 地图弹窗html
    createInfoWindow(adData, cb) {
      let content = adData.content
      let html = ''
      if (content.position) {
        let tags = content.position.map((tag) => {
          return `
              <span>${tag}</span>
            `
        })
        html += ` <div class="row">
              <span class="data-title tags-con" style="width:100%;"><img src="${imgs.icon1}"/>功能定位：${tags.join(
          ''
        )}</span >
           </div>`
      }
      html += `<div class="row">
              <span class="data-title"><img src="${imgs.icon5}"/>核算积分：</span>
              <span class="data-content"><span class="ds-font">${content.integral[0]}</span><span class="white-font">分 / </span><span class="ds-font white-font"> ${content.integral[1]}</span><span class="white-font">分</span></span>
            </div>`

      html += ` <div class="row">
              <span class="data-title"><img src="${imgs.icon2}"/>推广规模：</span>
              <span class="data-content"><span class="ds-font">${content.extend}</span><span class="unit">辆</span></span>
            </div>`

      html += ` <div class="row">
              <span class="data-title"><img src="${imgs.icon3}"/>加氢站数量：</span>
              <span class="data-content"><span class="ds-font">${content.inject[0]}</span><span class="unit">座</span> <span class="white-font"> / <span><span class="b-font ds-font">${content.inject[1]}</span>吨</span>
            </div>`

      html += ` <div class="row">
              <span class="data-title"><img src="${imgs.icon4}"/>用氢规模：</span>
              <span class="data-content "><span class="white-font">累计</span><span class="ds-font">${content.used}</span><span class="unit">吨</span></span>
            </div>`
      html += ` <div class="row">
          <span class="data-title"><img src="${imgs.icon6}"/>制氢产能：</span>
          <span class="data-content "><span class="ds-font">${content.used}</span><span class="unit">吨/年</span></span>
        </div>`
      html += ` <div class="row">
          <span class="data-title"><img src="${imgs.icon7}"/>绿氢比例：</span>
          <span class="data-content "><span class="ds-font">${content.used}</span><span class="unit">%</span></span>
        </div>`

      return `
        <div class="popup-city">
        <div>
          <div class="popup-header">
          <div class="popup-title">${adData.name}</div>
          <div class="close-icon close1">
            <i class="el-icon-close"></i>
          </div>
          </div>
          <div class="popup-content">
           ${html}
          </div>
        </div>
      </div>
        `
    },
    // 定位到当前弹窗城市
    currentPopup(adData) {
      if (this.$route.name !== 'stage1') return
      this.$map.setZoomAndCenter(8.2, [adData.LngLat[0] - 0.6, adData.LngLat[1]], false, 100)
      this.mapPopup.setContent(this.createInfoWindow(adData))
      this.mapPopup.getIsOpen()
        ? this.mapPopup.setPosition(adData['LngLat'])
        : this.mapPopup.open(this.$map, adData['LngLat'])
    },
    // 创建信息窗口
    initInfoPopup() {
      this.mapPopup = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        autoMove: true,
        content: this.createInfoWindow(moduleData[0]),
        offset: new AMap.Pixel(0, 0) //位移，防止弹窗显示不全
      })
    },

    // 播放地图信息弹窗
    async infoPopupCarousel(index) {
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
      // while (this.activePopupIndex <= datas.length && this.$route.name === 'stage1') {
      //   if (this.activePopupIndex === datas.length) {
      //     this.activePopupIndex = 0
      //   }
      //   let _activeCity = datas[this.activePopupIndex]
      //   // console.log(this.activePopupIndex)
      //   // this.popupTimer = setTimeout(() => {
      //   this.activePopupIndex++
      //   // }, 10 * 1000)

      //   if (this.$route.name === 'stage1') {
      //     this.currentPopup(_activeCity)
      //     await sleep(10)
      //   }
      // }
    },
    // 添加城市icon图片
    addMarker(adcode) {
      let cityIndex = moduleData.findIndex((city) => city.adcode == adcode)
      if (this.$route.name === 'stage1') {
        let marker = new AMap.Marker({
          map: this.$map,
          content: `<div style='width:75px;position:relative;'>
            <div style='position:absolute;animation:movingImg 3s  linear  infinite'>
              <img src='${imgs[adcode]}' style='width:75px;height:60px;'/>
            </div>
            </div>`,
          position: moduleData[cityIndex]['LngLat'],
          offset: new AMap.Pixel(moduleData[cityIndex]['offset'][0], moduleData[cityIndex]['offset'][1]),
          zIndex: 9
        })
        marker.on('click', this.handleClickMapMarker(cityIndex))
        this.markers.push(marker)
      }
    },
    // marker点击事件，更新弹窗数据
    handleClickMapMarker(index) {
      return () => {
        if (!moduleData[index].content) return
        clearInterval(this.popupTimer)
        this.activePopupIndex = index
        this.currentPopup(moduleData[index])

        this.infoPopupCarousel()
      }
    },

    async initMap() {
      this.$map.remove(this.$map.getAllOverlays()) //移除所有标记，防止重复

      var bezierCurvePath = [
        //两条连线上的点
        [
          //淄博-保定-天津-北京
          ['118.047648', '36.814939'],
          ['113.47', '38.87'],
          ['115.47', '38.87'],
          ['116.47', '38.87'],
          ['117.0', '39.13'],
          ['118.0', '39.43'],
          ['116.46', '39.92']
        ],
        [
          //滨州-保定-北京
          ['117.970731', '37.382687'],
          // ['114.97', '38.87'],
          ['119.580149', '39.93068'],
          ['116.407387', '40.204179']
        ]
      ]

      var colors = {
        110000: '#2c99a6',

        130700: '#3076c4',

        120000: '#3076c4',
        370300: '#3076c4',
        130600: '#3076c4',

        371600: '#3076c4',
        130200: '#3076c4'
      }

      let initMap = () => {
        return new Promise((resolve, reject) => {
          // 渲染城市边界线
          AMap.plugin(['AMap.DistrictSearch'], async () => {
            //
            let drawBounds = (adcode) => {
              let district = null
              let polygons = []

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
              this.$matomo.setCustomUrl(location.protocol + '//' + location.host + '/' + this.$route.name)
              this.$matomo.trackPageView(this.$route.name)
              //行政区查询
              district.setLevel('district')
              if (adcode === '110200') {
                polygons = []
                let jingKaiBounds = require('@/geoJson/110200.json')
                setTimeout(() => {
                  var bounds = jingKaiBounds['features'][0]['geometry']['coordinates']
                  if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                      //生成行政区划polygon
                      var polygon = new AMap.Polygon({
                        strokeWeight: 1,
                        path: bounds[i],
                        fillOpacity: 0.21,
                        fillColor: '#2c99a6',
                        strokeColor: '#2c99a6'
                      })
                      polygons.push(polygon)
                    }
                  }
                  if (this.$route.name === 'stage1') this.$map.add(polygons)
                }, 1000)
              } else {
                district.search(adcode, (status, result) => {
                  this.$map.remove(polygons) //清除上次结果
                  polygons = []
                  var bounds = result.districtList[0].boundaries

                  if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                      //生成行政区划polygon
                      var polygon = new AMap.Polygon({
                        strokeWeight: 1,
                        path: bounds[i],
                        fillOpacity: 0.21,
                        fillColor: '#2c99a6',
                        strokeColor: '#2c99a6'
                      })
                      polygons.push(polygon)
                    }
                  }
                  if (this.$route.name === 'stage1') this.$map.add(polygons)
                })
              }
            }

            //遍历城市
            citys.forEach((area) => {
              let adcode = area.adcode
              let district = null
              let polygons = []

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
              //行政区查询
              district.setLevel('district')
              district.search(adcode, (status, result) => {
                this.$map.remove(polygons) //清除上次结果
                polygons = []
                var bounds = result.districtList[0].boundaries

                if (bounds) {
                  for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                      strokeWeight: 5,
                      path: bounds[i],
                      fillOpacity: 0,
                      fillColor: colors[adcode],
                      strokeColor: colors[adcode],
                      strokeOpacity: 0.8
                    })
                    polygons.push(polygon)
                  }
                }
                if (this.$route.name === 'stage1') {
                  this.$map.add(polygons)
                  // 添加city name
                  if (area.name === '张家口市') return
                  let sectionTextMarker = new AMap.Marker({
                    map: this.$map,
                    content:
                      "<div style='width:65px;'><div style='background:none;color:white;font-size:" +
                      (area.fontSize ? area.fontSize : 16) +
                      "px;text-align:center;margin-top:25px;'>" +
                      area.name +
                      '</div></div>',

                    position: new AMap.LngLat(area.center.lng, area.center.lat),
                    offset: new AMap.Pixel(area.iconOffset[0], area.iconOffset[1] + 20),
                    title: area.name,
                    zIndex: 8
                    // zoom:2
                  })
                  this.markers.push(sectionTextMarker)
                }
              })
            })

            // 遍历市区
            areas.forEach((area) => {
              let cityIndex = moduleData.findIndex((city) => city.adcode == area.adcode)
              if (this.$route.name === 'stage1') {
                drawBounds(area.adcode)

                // 加市区name marker
                setTimeout(() => {
                  if (this.$route.name === 'stage1') {
                    let sectionTextMarker = new AMap.Marker({
                      map: this.$map,
                      content: `
                        <span style='display:inline-block;width:65px;text-align:center;'>
                        <span style='background:none;color:white;font-size:12px;text-align:center;'>${area.name}</span>
                        </span>
                      `,

                      position: new AMap.LngLat(area.center.lng, area.center.lat),
                      offset: new AMap.Pixel(area.iconOffset[0], area.iconOffset[1] + 60),
                      title: area.name,
                      zIndex: 88
                    })
                    sectionTextMarker.on('click', this.handleClickMapMarker(cityIndex))
                  }
                }, 5000)
              }
            })

            await sleep(3)
            resolve({ complete: true })
          })
        })
      }
      initMap()
        .then(async (res) => {
          await sleep(4)

          AMap.plugin('AMap.MoveAnimation', async () => {
            bezierCurvePath.forEach(async (path, pIdx) => {
              let p = CreateBezierPoints(path, 100)

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

              this.markers.push(bezierCurve)

              new Promise(async (resolve, reject) => {
                for (let count = 1; count <= p.length; count++) {
                  await sleep(0.01)
                  if (this.$route.name === 'stage1') bezierCurve.setPath(p.slice(0, count))

                  if (pIdx === 0) {
                    if (count === 1) {
                      this.addMarker('370300')
                    }
                    if (count === 20) {
                      // 产业发展链
                      if (this.$route.name === 'stage1') {
                        let lineName = new AMap.Marker({
                          map: this.$map,
                          content: "<div style='color: #fff;width:70px;font-size:14px;'>产业发展链</div>",
                          position: ['116.10873', '38.09442'],
                          offset: new AMap.Pixel(-20, -20),
                          // title: city.name,
                          zIndex: 9
                          // zoom:2
                        })
                      }
                    }
                    if (count === 30) {
                      // 保定图标
                      this.addMarker('130600')
                      // 添加雄安icon
                      // ['116.10873','38.99442']
                      if (this.$route.name === 'stage1') {
                        let sectionTextMarker = new AMap.Marker({
                          map: this.$map,
                          // anchor: 'center',
                          content:
                            "<div style='width:60px;text-align:center;'><img src=" +
                            imgs['xiongan'] +
                            " style='width: 60px;' /><div style='background:none;color:white;font-size:12px;'>雄安</div></div>",
                          position: ['116.10873', '38.99442'],
                          offset: new AMap.Pixel(-40, -50),
                          zIndex: 9
                        })
                        this.markers.push(sectionTextMarker)
                      }
                    }
                    if (count === 75) {
                      // 天津图标
                      this.addMarker('120000')
                    }
                    if (count === 100) {
                      // 北京图标
                      this.addMarker('110000')
                    }
                  } else {
                    if (count === 1) {
                      this.addMarker('371600')
                    }
                    if (count === 20) {
                      // 氢能供给
                      if (this.$route.name === 'stage1') {
                        let lineName2 = new AMap.Marker({
                          map: this.$map,
                          content: "<div style='color: #fff;width:70px;font-size:14px;'>氢能供给链</div>",
                          position: ['118.470731', '38.282687'],
                          offset: new AMap.Pixel(-10, -20),
                          // title: city.name,
                          zIndex: 9
                          // zoom:2
                        })
                      }
                    }
                    if (count === 60) {
                      this.addMarker('130200')
                    }
                  }

                  if (count === p.length) resolve()
                }
              }).then(() => {
                // 画完线再加点
                // 移动光点
                if (this.$route.name === 'stage1') {
                  let marker = new AMap.Marker({
                    map: this.$map,
                    position: ['118.047648', '36.814939'],
                    icon: new AMap.Icon({
                      image: imgs['light'],
                      size: new AMap.Size(15, 45), //图标大小
                      imageSize: new AMap.Size(15, 45)
                    }),
                    offset: new AMap.Pixel(-7, -22),
                    angle: 35
                  })

                  marker.moveAlong(p, {
                    duration: 200,
                    circlable: true,
                    autoRotation: true
                  })

                  this.movingLight.push(marker)
                }
              })
            })

            // 播放弹窗
            await sleep(0)
            this.infoPopupCarousel()
          })
        })
        .catch(() => {})
    },
    initSwiper() {
      let _this = this
      const swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 1000 * 7,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange: function() {
            let index = this.activeIndex

            let thisTab = _this.topTabs.find((tab) => tab.index === index)
            _this.activeTopTabName = thisTab.name
          }
        }
      })
      this.swiper = swiper
    },
    handleTab(tab) {
      this.swiper.slideTo(tab.index, 1000, false)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-tab {
  position: absolute;
  right: 20px;
  top: 70px;
  z-index: 10;
}
</style>
