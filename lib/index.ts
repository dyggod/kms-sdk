import { Request, ApiMethod } from './request';

interface KmsClientConfig {
  endpoint: string;
  accessKeyId: string;
  accessKeySecret: string;
  credential?: string;
  version?: string
}

enum ApiUrl {
  GenerateRandom = '/ciphercompute-service/api/generate-random',
}

class KmsClient {
  private _request: Request;

  private _config: any;

  private _endpoint: string;

  private _apiVersion: string;

  private _accessKeyId!: string;

  private _accessKeySecret!: string;

  private _credential!: string;

  private add() {
    console.log('add');
    console.log('this._endpoint: ', this._endpoint);
    console.log('this._apiVersion: ', this._apiVersion);
    console.log('this._accessKeyId: ', this._accessKeyId);
    console.log('this._accessKeySecret: ', this._accessKeySecret);
    console.log('this._credential: ', this._credential);
  }

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
    this._request = new Request(this._endpoint);
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
  public async generateRandom() {
    return this._request.send(
      ApiUrl.GenerateRandom,
      ApiMethod.Post,
      this._addVersion({}),
    );
  }
}

export default KmsClient;
