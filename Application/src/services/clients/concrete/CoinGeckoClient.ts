import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BtcClientEnum } from '../../../models/BtcClientEnum'

export class CoinGeckoClient extends BitcoinClient {

    constructor() {
        super(
            BtcClientEnum.COIN_GECKO,
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'
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
        return response.bitcoin.uah
    }

}
