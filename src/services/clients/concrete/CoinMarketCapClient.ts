import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/abstract/BitcoinClientFactory'
import { CoinMarketCapFactory } from '../../../factories/concrete/CoinMarketCapFactory'
import { BtcClientEnum } from '../../../models/BtcClientEnum'
import { BitcoinClient } from '../abstract/BitcoinClient'

export class CoinMarketCapClient extends BitcoinClient {

    API_URL: string
    constructor() {
        super()
        this.API_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=UAH'
        this.API_KEY_NAME = 'X-CMC_PRO_API_KEY'
        this.API_KEY_VALUE = process.env.COIN_MARKET_CAP_API_KEY
    }

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.COIN_MARKET, new CoinMarketCapFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.data[0].quote.UAH.price
    }
}
