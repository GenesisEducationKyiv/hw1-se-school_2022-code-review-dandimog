import { BitcoinClient } from '../abstract/BitcoinClient'
import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/BitcoinClientFactory'
import { BtcClientEnum } from '../../../../config'
import { CoinApiFactory } from '../../../factories/CoinApiFactory'

export class CoinApiClient extends BitcoinClient {
    API_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'
    API_KEY_NAME = 'X-CoinAPI-Key'
    API_KEY_VALUE = process.env.COIN_API_KEY

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.COIN_API, new CoinApiFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.data.rate
    }
}
