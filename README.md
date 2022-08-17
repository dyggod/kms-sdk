# 密码服务平台nodejs版本sdk

## 安装

此版本 sdk 预支持以下两种获取方式：

1. 联系工作人员获取sdk工具压缩包
2. 使用 npm 安装（当前暂不可用）
   ```sh
   npm install --save @jnsec/kms-sdk-node
   ```
   
   ## 使用

请先联系我们获得sdk工具包，将工具包解压缩到你想要使用的目录下。

在node环境中：

```javascript
const KmsClient = require('./kms-sdk-node');

const kms = new KmsClient({
  endpoint: 'http://127.0.0.1:8080',  // 选择指定的地址列表
  accessKeyId: 'accessKeyId',         // 密码服务平台accessKeyId
  accessKeySecret: 'accessKeySecret', // 密码服务平台accessKeySecret
  version: '1.0.0',                   // 使用api版本
});

kms.generateRandom().then(data => {
  console.log('random', data.data.random);  // random为获取的随机数
})
```

## 接口说明

### 响应状态码

|code|含义|
|--|--|
|200|逻辑正常|
|400|提交的参数有错误|
|401|无权限访问当前接口|
|500|服务器端错误|
|400100|认证token失效|
|400200|认证token即将失效|

### 响应结构示例

```json5
{
  code: 200,        // 返回状态码，固定存在
  msg: 'xxxx',      // 返回消息，固定存在
  status: 'xxxx',   // 返回状态, 固定存在
  data: {}          // 返回数据主体，根据情况可能不存在该字段
}
```

### Api列表

****下述列表中描述的返回值只针对与响应结构中的`data`中的内容****

|api名|描述|参数|返回值|
|--|--|--|--|
|generateRandom|生成随机数|**length** Number *required* - 生成随机数的长度<br/>**appId** String *required* - 接入应用的appId|**random** - 随机数|
|......||||

## 示例代码

```javascript
sample
```
