interface KmsClientConfig {
    endpoint: string;
    accessKeyId: string;
    accessKeySecret: string;
    credential?: string;
    version?: string;
}
declare class KmsClient {
    private _request;
    private _config;
    private _endpoint;
    private _apiVersion;
    private _accessKeyId;
    private _accessKeySecret;
    private _credential;
    private add;
    constructor(config: KmsClientConfig);
    get config(): any;
    private _addVersion;
    generateRandom(): Promise<import("axios").AxiosResponse<any, any>>;
}
export default KmsClient;
