import { BitcoinClient } from './../abstract/BitcoinClient'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BtcClientEnum } from '../../../models/BtcClientEnum'

export class CoinApiClient extends BitcoinClient {

    constructor() {
        super(
            BtcClientEnum.COIN_API,
            'https://rest.coinapi.io/v1/exchangerate/BTC/UAH',
            'X-CoinAPI-Key',
            process.env.COIN_API_KEY
        )
    }

    public buildAxiosRequest(): AxiosRequestConfig {
        const headers =
            (this.API_KEY_NAME !== undefined && this.API_KEY_VALUE !== undefined) ?
                ({ headers: { [this.API_KEY_NAME]: this.API_KEY_VALUE } }) :
                undefined
        return headers as AxiosRequestConfig
    }

    public retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.rate
    }
    
}
