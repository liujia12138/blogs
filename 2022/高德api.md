## 高德地图可视化案例-京津冀智慧氢能大数据平台
### 一、功能描述
#### 1、首页-愿景目标
页面整体以地图为背景，
1. 京津冀地区描边高亮显示，且北京的大兴区、经开区、房山区、顺义区、昌平区、延庆区和天津的滨海新区需要背景高亮。
2. 地图上突出两条链，一条产业发展链，途径淄博-保定-天津-北京，一条是氢能供应链，途径滨州-唐山-北京，两条链需要有一点一点画出来和展示氢气运输的效果。
3. 地图渲染完成后，需要在城市/地区的名称上方弹框依次展示出该地的氢能指标，包括用氢规模、加氢站数量、推广规模等；点击城市/地区的名称，弹框定位到点击的城市/地区，且地图自动缩放和移动。弹窗可手动关闭。

##### 
1. 渲染城市边界线，使用AMap.DistrictSearch（行政区划查询） 获取行政区域的区号、城市编码、中心点、边界、下辖区域等信息。这里主要是为了获取边界点，然后使用Polygon 多边形覆盖物实现绘制边界线。
[districtSearch 参考文档](https://lbs.amap.com/api/jsapi-v2/documentation#districtsearch)
``` js
AMap.plugin(['AMap.DistrictSearch'], ()=>{
  /**
   * adcode 城市code
   * **/
  let drawBounds = (adcode)=>{
    let district = null
    let polygons = []
    if(!district){
      var opts = {
        // 显示下级行政区级数，0表示不返回下级
        subdistrict:0,
        // 是否返回行政区边界坐标点，all：返回完整的边界坐标点，base：不返回
        extensions: 'all',
        // 关键字对应的行政区级别，country：国家，province：省，city：市，district：区/县
        level: 'district'
      }
      // 创建行政区查询实例
      district = new AMap.DistrictSearch(opts)

      district.search(adcode, (status, result)=>{
        // result：对应的行政区信息
        this.$map.remove(polygons);//清除上次结果
        polygons=[];
        var bounds:[] = result.districtList[0].boundaries
        
        if(bounds){
          for(var i = 0; i <bounds.length; i++){
            let polygon = new AMap.Polygon({
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



#### 2、全链监测-制氢、运氢、加氢、用氢