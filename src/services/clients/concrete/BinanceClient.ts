import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/abstract/BitcoinClientFactory'
import { BinanceFactory } from '../../../factories/concrete/BinanceFactory'
import { BtcClientEnum } from '../../../models/BtcClientEnum'

export class BinanceClient extends BitcoinClient {

    API_URL: string
    constructor() {
        super()
        this.API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'
    }

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.BINANCE, new BinanceFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.price
    }
}
