import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BtcClientEnum } from '../../../models/enums/BtcClientEnum'

export class CoinMarketCapClient extends BitcoinClient {

    constructor() {
        super(
            BtcClientEnum.COIN_MARKET,
            'https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=UAH',
            'X-CMC_PRO_API_KEY',
            process.env.COIN_MARKET_CAP_API_KEY
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
        return response.data[0].quote.UAH.price
    }

}
