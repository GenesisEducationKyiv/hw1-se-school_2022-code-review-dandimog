import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../factories/BitcoinClientFactory'
import { BitcoinClient } from './BitcoinClient'
import { BtcClientEnum } from '../../../config'
import { CoinGeckoFactory } from '../../factories/CoinGeckoFactory'

export class CoinGeckoClient extends BitcoinClient {
    API_URL =
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.COIN_GECKO, new CoinGeckoFactory())
    }

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.bitcoin.uah
    }
}
