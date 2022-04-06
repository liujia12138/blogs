APP端的升级，可分为整包更新和资源热更新两种
- 整包更新：常规的整个app安装包重新下载安装（比较繁琐，每次更新都要重新打包，更新整包）
- 资源热更新：无需跳转到应用市场或者浏览器去重新更包，无感更新


###### 本文主要来记录一下整包更新的流程
参考:[uni-app 整包升级/更新方案](https://ask.dcloud.net.cn/article/34972)

android：APP启动后检查到有新版本，跳转到应用市场或者浏览器直接下载新的apk，只要保证包名和证书不变，就可以覆盖安装

ios：app启动后有新版本，只能跳转到apptsore，然后用户在appstore详情页进行更新

#### 一、使用uniCloud实现整包更新
为什么用uniCloud？

- 可以把apk存放到uniCloud的cnd上，免费试用
- 有现成的插件，不用写升级逻辑，配好地址、版本、更新日志等参数就能直接使用。[云函数实现App的升级检查](https://ext.dcloud.net.cn/plugin?id=2226)

##### 如何使用uniCloud
##### # uniCloud云函数 实现app升级检查
（注意：hbuilderX，appid，uniCloud必须同一个账号）
1. DCloud插件市场中导入插件[云函数实现App的升级检查](https://ext.dcloud.net.cn/plugin?id=2226)
2. 导入插件之后右击cloudfunctions目录，绑定服务空间。（没有的话先上uniCloud创建一下）
3. 绑定云服务空间后右击cloudfunctions目录，上传所有云函数
4. 如果cloudfunctions目录下有db_init.json，将appid改成自己项目的appid后点击右键，初始化云数据库。
5. 在App.vue的onLaunch中调用云函数，进行升级检测。
6. 每次升级打包之前修改manifest.json中的版本号（注意：版本号要高于上一次的），打包之后将uniCloud的云数据库中同步版本号，更新内容和安装包地址

完成上述操作后，用户启动app时就可以进行检查更新啦




#### 二、不使用uniCloud
如果不使用uniCloud，自己写升级逻辑也可以。

##### 约定接口，用来检测是否需要升级
在App.vue的onLaunch中，发起升级检测请求
```js
onLaunch:function(){
    //#ifdef APP-PLUS
    //app升级检测代码需要使用条件编译，否则在非app环境会报错
    uni.request({
        url: "api",
        data:{
            appid: plus.runtime.appid,
            version: plus.runtime.version
        },
        success: (res)=>{
            if(res.statusCode === 200 && res.data.status === 1){
                uni.showModal({//提示用户可更新
                    title: "更新提示",
                    content: res.data.content,
                    success:(res)=>{
                        if(res.confirm){//用户确认更新
                            plus.runtime.openURL(res.data.url);
                        }
                    }
                })
            }
        }
    })
    //#endif
}
```