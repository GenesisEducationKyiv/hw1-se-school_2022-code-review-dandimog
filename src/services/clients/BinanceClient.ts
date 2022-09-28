import { BitcoinClient } from './BitcoinClient'
import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../factories/BitcoinClientFactory'
import { BtcClientEnum } from '../../../config'
import { BinanceFactory } from '../../factories/BinanceFactory'

export class BinanceClient extends BitcoinClient {
    API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.BINANCE, new BinanceFactory())
    }

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.price
    }
}
