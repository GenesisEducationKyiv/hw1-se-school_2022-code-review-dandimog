import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/BitcoinClientFactory'
import { BtcClientEnum } from '../../../../config'
import { BinanceFactory } from '../../../factories/BinanceFactory'

export class BinanceClient extends BitcoinClient {
    API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.BINANCE, new BinanceFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.data.price
    }
}
