import axios from 'axios';

axios.interceptors.response.use((response) => response.data);

export enum ApiMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  Head = 'head',
  Options = 'options',
  Patch = 'patch',
  BatchDelete = 'batchDelete',
  DownloadGet = 'downloadGet',
  DownloadPost = 'downloadPost',
}

interface Params {
  [key: string]: any
}

interface InitConfig {
  accessKeyId: string;
  accessKeySecret: string;
  credential?: string;
}

const headerAuthorization = 'Authorization';

export class Request {
  private _endPoint: string;

  private _authorization: string;

  constructor(endpoint: string, config: InitConfig) {
    this._endPoint = endpoint;
    if (!config) {
      throw new Error('config must be passed in at request init');
    }
    if (config.credential) {
      this._authorization = config.credential;
    } else {
      this._authorization = Request.generateAuthorization(
        config.accessKeyId,
        config.accessKeySecret,
      );
    }
    // 请求拦截器
    axios.interceptors.request.use((configAxios) => {
      if (configAxios.headers) {
        // eslint-disable-next-line no-param-reassign
        configAxios.headers[headerAuthorization] = this._authorization;
      }
      return configAxios;
    });
  }

  get endPoint(): string {
    return this._endPoint;
  }

  static generateAuthorization(accessKeyId: string, accessKeySecret: string): string {
    // TODO: 根据accessKeyId和accessKeySecret生成authorization
    return `app:${accessKeyId}`;
  }

  public async send(apiurl: string, method: ApiMethod, params: Params, config?: any) {
    // 拼接url
    const url = `${this._endPoint}${apiurl}`;

    switch (method) {
      case ApiMethod.Get:
        return axios.get(url, { params, ...config });
      case ApiMethod.Post:
        return axios.post(url, params, config);
      case ApiMethod.Put:
        return axios.put(url, params, config);
      case ApiMethod.Patch:
        return axios.patch(url, params, config);
      case ApiMethod.Delete:
        return axios.delete(url, params);
      case ApiMethod.BatchDelete:
        return axios({
          ApiMethod: 'delete',
          url,
          data: params,
          ...config,
        });
      case ApiMethod.DownloadGet:
        return axios.get(url, { params, responseType: 'blob', ...config });
      case ApiMethod.DownloadPost:
        return axios.post(url, params, { responseType: 'blob', ...config });
      default:
        return axios.get(url, { params, ...config });
    }
  }
}

export default Request;
