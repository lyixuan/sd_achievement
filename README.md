English | [简体中文](./README.zh-CN.md)

# 

## Features

- :gem: **Neat Design**: Follow [Ant Design specification](http://ant.design/)
- :triangular_ruler: **Common Templates**: Typical templates for enterprise applications
- :rocket: **State of The Art Development**: Newest development stack of React/dva/antd
- :iphone: **Responsive**: Designed for varies of screen size
- :art: **Theming**: Customizable theme with simple config
- :globe_with_meridians: **International**: Built-in i18n solution
- :gear: **Best Practice**: Solid workflow make your code health
- :1234: **Mock development**: Easy to use mock development solution
- :white_check_mark: **UI Test**: Fly safely with unit test and e2e test

## Templates未完待续

```
- layout
 - BaseLayout     用于工程基础页面,涉及页面权限,等页面放在此框
 - Exception      用于页面错误的分发
 - UserLayout     用于用户登录等业务的分发
 - StaticLayout   用于无交互,无权限静态页面的分发,后期可扩展
- model       --model使用jsx格式会报错,使用js文件,
 - gobal      页面全局交互使用
 - user       用户信息数据

- container      工程容器组件,根据页面的业务需求对组件的处理组合

- route
 - Home                 系统首页
   - IndexPage          首页  (根据权限分发对应的首页页面)
      -Boss             boss和院长级别权限首页汇总
        -Monthly        月度绩效
          -index        对boss和学院权限进行判断,涉及到分档和占比的显示
          -proportion   绩效占比页面
          -step         绩效分档页面
        -index          boss和college 权限首页
        -pandect        绩效总览页面
        

      -Teachers         运营长,家族长,权限首页
        -index          运营长班主任权限首页,进行权限分发
        -family         家族长权限首页
        -group          运营长权限首页

 - Level                分档详情页面(boss级别,学院级别)
   - index              分档详情(暂定一个页面)

-  Details
  - index               详情列表页面(暂定))

- History               确认绩效-历史绩效
  -index.jsx            历史绩效根据权限进行页面分发
  - Boss                boss和院长权限历史绩效首页
    - index             boss和院长权限查看历史绩效首页  (暂定一个页面)
  - Teachers            家族长,运营长,班主任 历史绩效首页
    - index             家族长,运营长,班主任 历史绩效首页公共部分数据展示
    - family            家族长权限历史绩效
    - group             运营长...
    - class             班主任.....
  - Details             确认绩效详情页面
    -index              家族或小组历史绩效详情页面

 - Login                用户登录页面相关
   - WeChartLogin       用户登录页面,工程的入口页面
```

## Usage

```bash
$ npm install       # 建议使用cnpm安装依赖
$ npm start         # visit http://localhost:8000
```
##update
2018-8-9
    本次修改优化使用setCurrentUrlParams时点击返回,无法立即返回上一页面的bug
    工具类里增加assignUrlParams方法,用于递归将对象进行合并,优化从url中拿取数据时造成的异常合并

## 页面本地开发条件
2019-07-12 环境需要更换成dev测试环境 文件 config.js
```javascript
  export default {
    NODE_ENV: 'dev', // 测试环境
    // NODE_ENV: 'pro', // 线上环境

    DEBUGGER: true, // 调试环境
    performanceUser: {
      userId: 'zhanglulu02',
    },
  };
```
测试地址 http://172.16.117.64:8093/performance/admin 
地址需要更新为 ip+端口号+/user/wechart进入
performanceUser 如果需要，可以修改用户