### Egg+Vue+webpack 服务端渲染

##### 1.安装nodeJS

##### 2.初始化egg项目
`npm i egg-init -g`

`egg-init`

- 选择 `Simple egg app boilerplate` project初始化egg项目
- 新建 在app目录下新建view文件夹
- 新建 在view文件夹内新建layout.html文件，用于服务端渲染失败后的客户端渲染

##### 3.安装依赖
- 服务端渲染需要的依赖：vue-server-renderer、egg-view-vue-ssr

`npm install vue vue-server-renderer vuex axios egg-view-vue-ssr --save`

- 构建开发依赖

`npm i cross-env easywebpack-cli easywebpack-vue egg-webpack egg-webpack-vue --save-dev`

`npm i vue-template-compiler uglifyjs-webpack-plugin webpack-manifest-resource-plugin --save-dev`

- 安装全部依赖

`npm install`

##### 4.添加配置
- 添加 ${app_root}/config/plugin.local.js 配置
``` js
exports.webpack = {
  enable: true,
  package: 'egg-webpack'
};

exports.webpackvue = {
  enable: true,
  package: 'egg-webpack-vue'
};

```
- 添加 ${app_root}/config/plugin.js 配置
```
exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};
```
- 添加 ${app_root}/config/config.default.js 配置
注意，只添加path和config.static就行
```
'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // 保证构建的静态资源文件能够被访问到
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };
  return config;
}
```
- 添加 ${app_root}/config/config.local.js 配置
```
'use strict';
module.exports = () => {
  const config = exports = {};
  config.vuessr = {
    // 本地开发 css 采用 inline 方式, 无需注入 css 链接。
    injectCss: false,
  };
  return config;
};
```
- 添加 easywebpack-cli 配置文件 ${app_root}/webpack.config.js
```
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '/', dir);
}
module.exports = {
  egg: true,
  framework: 'vue', // 使用 easywebpack-vue 构建解决方案
  entry: {
    include: ['app/web/page'], // 自动遍历 app/web/page 目录下的 js 文件入口
    exclude: ['app/web/page/[a-z]+/component'],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '#': resolve('app/web/util'),
      '@': resolve('app/web/page/view')
    }
  },
  alias: {
    '~': __dirname,
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store'
  },
  dll: ['vue/dist/vue.common.js', 'axios'], // webpack dll 构建
  install:{
   npm: 'npm', // 默认是 npm, 可以是 cnpm
   check: true // 默认为禁用，自动安装缺少的 loader 和 plugin，建议首次 运行成功后，改成 false，加快构建速度
  },
  loaders: {
    eslint: false
  },
  plugins: {},
  done() { // 编译完成回调

  }
};
```

- 添加 ${app_root}/.babelrc 文件
```js
{
  "presets": [["env",{ "modules": false }]],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-object-assign"
  ],
  "comments": false
}
```
安装babel相关依赖

**注意**

需要babel-loader@7.1.5版本，否则会报错

`npm i babel-core babel-loader  --save-dev`

`npm i babel-preset-env babel-plugin-syntax-dynamic-import babel-plugin-transform-object-assign babel-plugin-transform-object-rest-spread --save-dev`

- 添加 ${app_root}/postcss.config.js 文件
```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```
安装autoprefixer依赖

`npm install autoprefixer --save-dev`

- 添加 ${app_root}/.gitignore 配置
```
.DS_Store
.happypack/
node_modules/
npm-debug.log
.idea/
dist
static
public
private
run
*.iml
*tmp
_site
logs
.vscode
config/manifest.json
app/view/*
!app/view/layout.html
!app/view/.gitkeep
package-lock.json
```

##### 5.vue前端代码部分
- 编写vue服务端公共入口 ${app_root}/app/web/framework/vue/entry/server.js
```js
import Vue from 'vue';
export default function render(options) {
  if (options.store && options.router) {
    return context => {
      options.router.push(context.state.url);
      const matchedComponents = options.router.getMatchedComponents();
      if (!matchedComponents) {
        return Promise.reject({ code: '404' });
      }
      return Promise.all(
        matchedComponents.map(component => {
          if (component.preFetch) {
            return component.preFetch(options.store);
          }
          return null;
        })
      ).then(() => {
        context.state = options.store.state;
        return new Vue(options);
      });
    };
  }
  return context => {
    const VueApp = Vue.extend(options);
    const app = new VueApp({ data: context.state });
    return new Promise(resolve => {
      resolve(app);
    });
  };
}
```

- 编写vue客户端入口文件${app_root}/app/web/framework/vue/entry/client.js
```js
import Vue from 'vue';
export default function(options) {
  Vue.prototype.$http = require('axios');
  if (options.store) {
    options.store.replaceState(window.__INITIAL_STATE__ || {});
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data());
  }
  const app = new Vue(options);
  app.$mount('#app');
}
```

- 安装vue-router `npm install vue-router@3.0.7 --save`


- 新建 ${app_root}/app/web/page/index/index.vue 文件
```html
<template>
  <div>index
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export default {
  VueRouter,
  computed: {},
  methods: {},
  mounted() {
  }
};
</script>
```

- 新建 ${app_root}/app/web/page/index/index.js 页面文件
```
import Index from './index.vue';
import serverRender from '~/app/web/framework/vue/entry/server.js';
import clientRender from '~/app/web/framework/vue/entry/client.js';
export default EASY_ENV_IS_NODE ? serverRender({ ...Index }) : clientRender({ ...Index });
```

- vue部分,新建${app_root}/app/web/page/report/report.vue 文件
```html
<template>
  <div>report...</div>
</template>
<script>
export default {
  computed: {},
  methods: {},
  mounted() {
  }
};
</script>
```

- vue-router部分，修改vue客户端入口文件${app_root}/app/web/framework/vue/entry/client.js
 
安装element-ui, `npm install element-ui`

引入element-ui css文件，asset文件夹放在web目录下。

``` js
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from "element-ui";
import axios from 'axios'; //先安装axios， npm install axios --save

import "../../../asset/theme/index.css"; //引入element-ui css文件，asset文件夹放在web目录下。

Vue.prototype.$axios = axios;
Vue.use(ElementUI);

//开始配置vueRouter
const Report = () => import("@/report/report.vue");//引入report组件，@的配置在webpack.config.js中

const routes = [
    {
        path:'/report',
        name:"report",
        component: Report
    }
]

const router = new VueRouter({
    routes
})

export default function(options) {
  Vue.prototype.$http = require('axios');
  if (options.store) {
    options.store.replaceState(window.__INITIAL_STATE__ || {});
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data());
  }
  options.router = router;
  options.axios = axios;
  const app = new Vue(options);
  app.$mount('#app');
}
```

##### 6.node后端代码
- 创建 controller 文件 ${app_root}/app/controller/index.js
```
module.exports = app => {
  return class IndexController extends app.Controller {
    async server() {
      const { ctx } = this;
      // render 实现是服务端渲染 vue 组件
      await ctx.render('index/index.js', { message: 'egg vue server side render' });
    }

    async client() {
      const { ctx } = this;
      // renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。与服务端渲染的差别你可以通过查看运行后页面源代码即可明白两者之间的差异
      await ctx.renderClient('index/index.js', { message: 'egg vue client side render' });
    }
  };
};
```

- 添加egg路由配置
```
app.get('/', app.controller.home.client);
app.get('/client', app.controller.home.client);
```

##### 7.运行项目 `npm run dev` ，打开http://127.0.0.1:7001/#/report即可看到report页面


#### 注意

1. 运行报错`nodejs.SyntaxError: Unexpected token ~`,需要给webpack.config.js中的~加引号

2. 报错`nodejs.unhandledExceptionError: Cannot find module '@babel/core'`

查看package.json发现装了babel-core和babel-loader，但是babel-loader版本是8.0.0，之前用的是7.1.5版本

解决办法：装回@7.1.5版本
`npm uninstall babel-loader` 

`npm install babel-loader@7.1.5`

运行正常~



##### 8.nodeJS service接口配置
- app/service目录下新建service_caller.js

(先安装md5)
``` js
const request = require('request');
const md5 = require('md5');
const BASE_URL = 'http://server-test.elecredit.com';

function ServiceResponse() {

}

const cRequest = request.defaults({
  json: true
});

function generateHeader(body) {
  let sortObjStr = function (obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    var str = "";
    for (var i = 0, len = newkey.length; i < len; i++) {
      var k = newkey[i],
        val = obj[newkey[i]];
      newObj[k] = val;
      if (i === len - 1) {
        str += k + ":" + val;
      } else {
        str += k + ":" + val + ",";
      }
    }
    return str; //返回排好序的新对象
  };
  const userid = "CcIPQ59H";
  const userkey = "o2zQLNa";
  const stringdata = sortObjStr(body);
  const mddata = userid + stringdata + userkey;
  let sign = md5(mddata);
  return {
    "userid": userid,
    'sign': sign
  };
}

async function get(url, params) {
  return new Promise((resolve, reject) => {
    const body = trim(params) || {};
    cRequest({
      url: BASE_URL + url,
      method: 'GET',
      body: body,
      json: true,
      header: generateHeader(body)
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const response = new ServiceResponse();
      if (body) {
        response.data = body.data;
        response.code = body.code;
        response.msg = body.msg;
      }
      resolve(response);
    });
  });
}

async function post(url, params) {
  return new Promise((resolve, reject) => {
    const body = trim(params) || {};
    console.log(BASE_URL + url, "BASE_URL + url")
    cRequest({
      url: BASE_URL + url,
      method: 'POST',
      body: body,
      json: true,
      header: generateHeader(body)
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const response = new ServiceResponse();
      if (body) {
        response.body = body;
        // response.data = body.data;
        // response.code = body.code;
        // response.msg = body.msg;
      }
      resolve(response);
    });
  });
}

async function httpGet(url, params) {
  return new Promise((resolve, reject) => {
    cRequest({
      url: url,
      method: 'GET',
      body: trim(params) || {}
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

async function httpPost(url, params) {
  return new Promise((resolve, reject) => {
    cRequest({
      url: url,
      method: 'POST',
      body: trim(params) || {}
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

function trim(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
  }
  return obj;
}

module.exports = {
  get: get,
  post: post,
  httpGet: httpGet,
  httpPost: httpPost
};

```

- app/service目录下新建report.js，用来写node服务层代码
```js
const Service = require('egg').Service;
const ServiceCaller = require("./service_caller");

class ReportService extends Service {
  async reportApi(params) {
    return await ServiceCaller.post("/report_api/", params);
  }
}

module.exports = ReportService;
```

- app/controller目录下新建report.js，controller负责解析用户的输入，处理后返回相应的结果
```js
'use strict';

const Controller = require('egg').Controller;

class ReportController extends Controller {
  async index() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params,"params")
    // const params = {
    //   nodetype: "B1006",
    //   entid: "VST3wFB3Ye",
    //   page: 1
    // };
    const result = await ctx.service.report.reportApi(params);
    ctx.body = result;
  }
}

module.exports = ReportController;
```

- 在router.js文件中加入reportApi接口
```
router.post('/reportApi', controller.report.index);
```

- 调用`/reportApi`,在report.vue文件中加入
```js
    this.$axios.post("/reportApi", 
    {
        nodetype: "B1006",
        entid: "VST3wFB3Ye",
        page: 1
    }).then(res => {
    
    })
```

### Egg post 失败 { message: 'invalid csrf token' } 解决方案

在config.default.js中加入
```
config.security= {
   csrf: {
     enable: false,
   }
}
```
