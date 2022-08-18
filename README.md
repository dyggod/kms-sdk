# 密码服务平台 nodejs 版本 sdk

## 安装

此版本 sdk 预支持以下两种获取方式：

1. 联系工作人员获取 sdk 工具压缩包
2. 安装npm依赖 **（当前暂不可用）**
   ```sh
   # npm
   npm install --save @jnsec/kms-sdk-node

   # yarn
   yarn add --save @jnsec/kms-sdk-node

   # pnpm
   pnpm install --save @jnsec/kms-sdk-node
   ```

## 使用

请先联系我们获得 sdk 工具包，将工具包解压缩到你想要使用的目录下。

在 node 环境中：

- 使用 accessKeyId 结合 accessKeySecret 初始化实例

```javascript
const KmsClient = require("./kms-sdk-node");

const kms = new KmsClient({
  endpoint: "http://127.0.0.1:8080", // 选择指定的地址列表
  accessKeyId: "accessKeyId", // 密码服务平台accessKeyId
  accessKeySecret: "accessKeySecret", // 密码服务平台accessKeySecret
  version: "1.0.0", // 使用api版本
});

kms.generateRandom().then((data) => {
  console.log("random", data.data.random); // random为获取的随机数
});
```

- 使用 credential 初始化实例

```javascript
const KmsClient = require("./kms-sdk-node");

const kms = new KmsClient({
  endpoint: "http://127.0.0.1:8080", // 选择指定的地址列表
  credential: "credential", // 认证凭证
  version: "1.0.0", // 使用api版本
});

kms.generateRandom().then((data) => {
  console.log("random", data.data.random); // random为获取的随机数
});
```

## 接口说明

### 响应状态码

| code   | 含义                |
| ------ | ------------------- |
| 200    | 逻辑正常            |
| 400    | 提交的参数有错误    |
| 401    | 无权限访问当前接口  |
| 500    | 服务器端错误        |
| 400100 | 认证 token 失效     |
| 400200 | 认证 token 即将失效 |

### 响应结构示例

```json5
{
  "code": 200,        // 返回状态码，固定存在
  "msg": "xxxx",      // 返回消息，固定存在
  "status": "xxxx",   // 返回状态, 固定存在
  "data": {           // 返回数据主体
    "requestId": "40944fd2e0a8461c9e951ec2f4d4b694"  // 每个请求都会返回一个唯一id，方便追踪问题
    ...                                              // 其他业务数据
  }
}
```

### Api 列表

**下述列表中描述的返回值只针对与响应结构中的`data`中的内容**

| api 名                | 描述               | 参数                                                                                                                                                                                                            | 返回值                                   |
| --------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| generateSymmetricKey  | 申请对称主密钥     | **keyLen** Number _required_ - 密钥长度<br/>**appId** String required - 应用 Id<br/>**keyType** String _optional_ - 采用密钥算法，默认'SM4'<br/>**validTime** Number _optional_ - 密钥有效期，单位月，默认 6    |                                          |
| generateAsymmetricKey | 申请非对称密钥     | **keyLen** Number _required_ - 密钥长度 <br/>**appId** String required - 应用 Id <br/>**keyType** String _optional_ - 采用密钥算法，默认'SM2' <br/>**validTime** Number _optional_ - 密钥有效期，单位月，默认 6 |                                          |
| revokeKey             | 撤销密钥           | **keyId** String _required_ - 密钥索引                                                                                                                                                                          |                                          |
| restoreKey            | 恢复历史库密钥     | **keyId** String _required_ - 密钥索引                                                                                                                                                                          |                                          |
| archiveKey            | 归档密钥           | **keyId** String _required_ - 密钥索引                                                                                                                                                                          |                                          |
| restoreArchiveKey     | 恢复归档库密钥     | **keyId** String _required_ - 密钥索引                                                                                                                                                                          |                                          |
| generateRandom        | 生成随机数         | **length** Number _required_ - 生成随机数的长度<br/>**appId** String _required_ - 接入应用的 appId                                                                                                              | **random** - 随机数                      |
| sm4Encrypt            | sm4 对称加密       | **keyId** String _required_ - 密钥索引<br/>**appId** String _required_ - 应用 Id<br/>**plaintext** String _required_ - 明文，需进行 base64 编码                                                                 | **ciphertext** - 密文                    |
| sm4Decrypt            | sm4 对称解密       | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**ciphertext**String _required_ - 密文                                                                                   | **plaintext** - 返回明文的 base64 编码值 |
| sm4Mac                | sm4 生成 mac 值    | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**plaintext** String _required_ - 明文，需进行 base64 编码                                                               | **ciphertext** - mac 值密文              |
| sm2Sign               | sm2 私钥签名       | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**plaintext** String _required_ - 明文，需进行 base64 编码                                                               | **signature** - 签名值                   |
| sm2Verify             | sm2 公钥验签       | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**plaintext** String _required_ - 明文，需进行 base64 编码 <br/>**signature** String _required_ - 签名值                  | **result** - 0 成功 \| 1 失败            |
| sm2Encrypt            | sm2 非对称公钥加密 | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**plaintext** String _required_ - 明文，需进行 base64 编码                                                               | **ciphertext** - 密文                    |
| sm2Decrypt            | sm2 非对称私钥加密 | **keyId** String _required_ - 密钥索引 <br/>**appId** String _required_ - 应用 Id <br/>**ciphertext** String _required_ - 密文                                                                                  | **plaintext** - 返回明文的 base64 编码值 |

## api 示例代码

```javascript
const kms = new KmsClient({
  endpoint: "http://191.80.1.205:30001",
  accessKeyId: "accessKeyId",
  accessKeySecret: "accessKeySecret",
  // credential: 'credential',
  version: "1.0.0",
});

async function demo() {
  // 申请对称主密钥
  const keyId = await kms.generateSymmetricKey(128, "demoAppId", "SM4", "6");

  // 申请非对称密钥
  const keyId2 = await kms.generateAsymmetricKey(128, "demoAppId", "SM2", "6");

  // 撤销密钥
  const revokeRes = await kms.revokeKey("demoKeyId");

  // 恢复历史库密钥
  const restoreRes = await kms.restoreKey("demoKeyId");

  // 归档密钥
  const archiveRes = await kms.archiveKey("demoKeyId");

  // 恢复归档库密钥
  const restoreArchiveRes = await kms.restoreArchiveKey("demoKeyId");

  // 生成随机数
  const randomRes = await kms.generateRandom(12, "demoAppId");
  console.log("random:", randomRes.data.random);

  // sm4加密
  const sm4EncryptRes = await kms.sm4Encrypt(
    "demoKeyId",
    "demoAppId",
    "plaintext"
  );
  console.log("sm4Encrypt: ", sm4EncryptRes.data.ciphertext);

  // sm4解密
  const sm4DecryptRes = await kms.sm4Decrypt(
    "demoKeyId",
    "demoAppId",
    "ciphertext"
  );
  console.log("sm4Decrypt: ", sm4DecryptRes.data.plaintext);

  // 产生SM4 MAC值
  const sm4MacRes = await kms.sm4Mac("demoKeyId", "demoAppId", "plaintext");
  console.log("sm4Mac: ", sm4MacRes.data.ciphertext);

  // sm2私钥签名
  const sm2SignRes = await kms.sm2Sign("demoKeyId", "demoAppId", "plaintext");
  console.log("sm2Sign: ", sm2SignRes.data.signature);

  // sm2公钥验证签名
  const sm2VerifyRes = await kms.sm2Verify(
    "demoKeyId",
    "demoAppId",
    "plaintext",
    "signature"
  );
  console.log("sm2Verify: ", sm2VerifyRes.data.result);

  // sm2公钥加密
  const sm2EncryptRes = await kms.sm2Encrypt(
    "demoKeyId",
    "demoAppId",
    "plaintext"
  );
  console.log("sm2Encrypt: ", sm2EncryptRes.data.ciphertext);

  // sm2私钥解密
  const sm2DecryptRes = await kms.sm2Decrypt(
    "demoKeyId",
    "demoAppId",
    "ciphertext"
  );
  console.log("sm2Decrypt: ", sm2DecryptRes.data.plaintext);
}
```
