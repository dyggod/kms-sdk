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
    generateRandom(length: number, appId: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm4Encrypt(keyId: string, appId: string, plaintext: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm4Decrypt(keyId: string, appId: string, ciphertext: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm4Mac(keyId: string, appId: string, plaintext: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm2Sign(keyId: string, appId: string, plaintext: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm2Verify(keyId: string, appId: string, plaintext: string, signature: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm2Encrypt(keyId: string, appId: string, plaintext: string): Promise<import("axios").AxiosResponse<any, any>>;
    sm2Decrypt(keyId: string, appId: string, ciphertext: string): Promise<import("axios").AxiosResponse<any, any>>;
    generateSymmetricKey(keyLen: number, appId: string, keyType?: string, validTime?: number): Promise<import("axios").AxiosResponse<any, any>>;
    generateAsymmetricKey(keyLen: number, appId: string, keyType?: string, validTime?: number): Promise<import("axios").AxiosResponse<any, any>>;
    revokeKey(keyId: string): Promise<import("axios").AxiosResponse<any, any>>;
    restoreKey(keyId: string): Promise<import("axios").AxiosResponse<any, any>>;
    archiveKey(keyId: string): Promise<import("axios").AxiosResponse<any, any>>;
    restoreArchiveKey(keyId: string): Promise<import("axios").AxiosResponse<any, any>>;
}
export default KmsClient;
