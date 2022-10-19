import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BtcClientEnum } from '../../../models/enums/BtcClientEnum'

export class BinanceClient extends BitcoinClient {

    constructor() {
        super(
            BtcClientEnum.BINANCE,
            'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'
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
        return response.price
    }

}
