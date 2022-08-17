interface KmsClientConfig {
  endPoint: string;
  accessKeyId: string;
  accessKeySecret: string;
}

class KmsClient {
  private _config: KmsClientConfig;

  private _axios: any;

  static add() {
    console.log('add');
  }

  constructor(config: KmsClientConfig) {
    this._config = config;
    KmsClient.add();
  }

  get config(): any {
    return this._config;
  }
}

export default KmsClient;
