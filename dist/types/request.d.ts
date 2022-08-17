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
export declare class Request {
    private _endPoint;
    constructor(endpoint: string);
    get endPoint(): string;
    send(apiurl: string, method: ApiMethod, params: Params, config?: any): Promise<import("axios").AxiosResponse<any, any>>;
}
export default Request;
