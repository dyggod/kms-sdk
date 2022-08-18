import { Request, ApiMethod } from './request';

interface KmsClientConfig {
  endpoint: string;
  accessKeyId: string;
  accessKeySecret: string;
  credential?: string;
  version?: string
}

enum ApiUrl {
  // 生成随机数
  GenerateRandom = '/ciphercompute-service/api/generate-random',
  // sm4加密
  Sm4Encrypt = '/ciphercompute-service/api/symmetric-encrypt/sm4',
  // sm4解密
  Sm4Decrypt = '/ciphercompute-service/api/symmetric-decrypt/sm4',
  // 产生SM4 MAC值
  Sm4Mac = '/ciphercompute-service/api/generate-mac/sm4',
  // sm2私钥签名
  Sm2Sign = '/ciphercompute-service//api/asymmetric-prikey-sign/sm2',
  // sm2公钥验签
  Sm2Verify = '/ciphercompute-service/api/asymmetric-pubkey-verify/sm2',
  // sm2非对称公钥加密
  Sm2Encrypt = '/ciphercompute-service/api/asymmetric-encrypt/sm2',
  // sm2非对称私钥解密
  Sm2Decrypt = '/ciphercompute-service/api/asymmetric-decrypt/sm2',
  // 申请密钥
  GenerateKey = '/key-service/api/keys/spare/key/application',
  // 撤销密钥
  RevokeKey = '/key-service/api/keys/inuse/:id',
  // 恢复历史库密钥
  RestoreKey = '/key-service/api/keys/history/recover/:id',
  // 归档密钥
  ArchiveKey = '/key-service/api/keys/history/:id',
  // 恢复归档库密钥
  RestoreArchiveKey = '/key-service/api/keys/file/:recoverType/:id',

}

enum KeyParamsType {
  SYMMETRIC = '0',
  ASYMMETRIC = '1',
}

enum RecoverType {
  Manual = 'recover',
  Court = 'judicial-recover', // 司法
}

class KmsClient {
  private _request: Request;

  private _config: any;

  private _endpoint: string;

  private _apiVersion: string;

  private _accessKeyId!: string;

  private _accessKeySecret!: string;

  private _credential!: string;

  constructor(config: KmsClientConfig) {
    if (!config) {
      throw new Error('config must be passed in');
    }
    this._config = config;
    const { endpoint, version } = config;
    if (!endpoint) {
      throw new Error('config.endpoint must be passed in');
    }
    this._apiVersion = version || '1.0.0';
    this._endpoint = endpoint;
    this._request = new Request(this._endpoint, config);
    if (config.credential) {
      this._credential = config.credential;
    } else {
      const { accessKeyId } = config;
      if (!accessKeyId) {
        throw new Error('config.accessKeyId must be passed in');
      }
      this._accessKeyId = accessKeyId;

      const { accessKeySecret } = config;
      if (!accessKeySecret) {
        throw new Error('config.accessKeySecret must be passed in');
      }
      this._accessKeySecret = accessKeySecret;
    }
  }

  get config(): any {
    return this._config;
  }

  // 私有方法：给参数添加版本号
  private _addVersion(params: any) {
    return {
      ...params,
      version: this._apiVersion,
    };
  }

  // 公共方法：生成随机数
  public async generateRandom(length: number, appId: string) {
    return this._request.send(
      ApiUrl.GenerateRandom,
      ApiMethod.Post,
      this._addVersion({
        keyLen: length,
        appId,
      }),
    );
  }

  // SM4对称加密
  public async sm4Encrypt(keyId: string, appId: string, plaintext: string) {
    return this._request.send(
      ApiUrl.Sm4Encrypt,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        plaintext,
      }),
    );
  }

  // SM4对称解密
  public async sm4Decrypt(keyId: string, appId: string, ciphertext: string) {
    return this._request.send(
      ApiUrl.Sm4Decrypt,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        ciphertext,
      }),
    );
  }

  // SM4生成MAC值
  public async sm4Mac(keyId: string, appId: string, plaintext: string) {
    return this._request.send(
      ApiUrl.Sm4Mac,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        plaintext,
      }),
    );
  }

  // SM2私钥签名
  public async sm2Sign(keyId: string, appId: string, plaintext: string) {
    return this._request.send(
      ApiUrl.Sm2Sign,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        plaintext,
      }),
    );
  }

  // SM2公钥验签
  public async sm2Verify(keyId: string, appId: string, plaintext: string, signature: string) {
    return this._request.send(
      ApiUrl.Sm2Verify,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        plaintext,
        signature,
      }),
    );
  }

  // SM2非对称公钥加密
  public async sm2Encrypt(keyId: string, appId: string, plaintext: string) {
    return this._request.send(
      ApiUrl.Sm2Encrypt,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        plaintext,
      }),
    );
  }

  // SM2非对称私钥解密
  public async sm2Decrypt(keyId: string, appId: string, ciphertext: string) {
    return this._request.send(
      ApiUrl.Sm2Decrypt,
      ApiMethod.Post,
      this._addVersion({
        keyId,
        appId,
        ciphertext,
      }),
    );
  }

  // 申请对称主密钥
  public async generateSymmetricKey(
    keyLen: number,
    appId: string,
    keyType = 'SM4',
    validTime = 6,
  ) {
    return this._request.send(
      ApiUrl.GenerateKey,
      ApiMethod.Get,
      this._addVersion({
        keyType,
        keyLen,
        appId,
        monthNumber: validTime,
        type: KeyParamsType.SYMMETRIC,
      }),
    );
  }

  // 申请非对称密钥
  public async generateAsymmetricKey(
    keyLen: number,
    appId: string,
    keyType = 'SM2',
    validTime = 6,
  ) {
    return this._request.send(
      ApiUrl.GenerateKey,
      ApiMethod.Post,
      this._addVersion({
        keyType,
        keyLen,
        appId,
        monthNumber: validTime,
        type: KeyParamsType.ASYMMETRIC,
      }),
    );
  }

  // 撤销密钥
  public async revokeKey(keyId: string) {
    return this._request.send(
      ApiUrl.RevokeKey.replace(':id', keyId),
      ApiMethod.Delete,
      this._addVersion({}),
    );
  }

  // 恢复历史库密钥
  public async restoreKey(keyId: string) {
    return this._request.send(
      ApiUrl.RestoreKey.replace(':id', keyId),
      ApiMethod.Put,
      this._addVersion({}),
    );
  }

  // 归档密钥
  public async archiveKey(keyId: string) {
    return this._request.send(
      ApiUrl.ArchiveKey.replace(':id', keyId),
      ApiMethod.Delete,
      this._addVersion({}),
    );
  }

  // 恢复归档库密钥
  public async restoreArchiveKey(keyId: string) {
    return this._request.send(
      ApiUrl.RestoreArchiveKey
        .replace(':recoverType', RecoverType.Manual).replace(':id', keyId),
      ApiMethod.Put,
      this._addVersion({}),
    );
  }
}

export default KmsClient;
