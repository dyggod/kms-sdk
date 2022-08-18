export declare enum ApiMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete",
    Head = "head",
    Options = "options",
    Patch = "patch",
    BatchDelete = "batchDelete",
    DownloadGet = "downloadGet",
    DownloadPost = "downloadPost"
}
interface Params {
    [key: string]: any;
}
interface InitConfig {
    accessKeyId: string;
    accessKeySecret: string;
    credential?: string;
}
export declare class Request {
    private _endPoint;
    private _authorization;
    constructor(endpoint: string, config: InitConfig);
    get endPoint(): string;
    static generateAuthorization(accessKeyId: string, accessKeySecret: string): string;
    send(apiurl: string, method: ApiMethod, params: Params, config?: any): Promise<import("axios").AxiosResponse<any, any>>;
}
export default Request;
