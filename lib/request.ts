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

export class Request {
  private _endPoint: string;

  constructor(endpoint: string) {
    this._endPoint = endpoint;
  }

  get endPoint(): string {
    return this._endPoint;
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
