import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/BitcoinClientFactory'
import { BitcoinClient } from '../abstract/BitcoinClient'
import { BtcClientEnum } from '../../../../config'
import { CoinGeckoFactory } from '../../../factories/CoinGeckoFactory'

export class CoinGeckoClient extends BitcoinClient {
    API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.COIN_GECKO, new CoinGeckoFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.data.bitcoin.uah
    }
}
