import { BitcoinClient } from './../abstract/BitcoinClient'
import { AxiosResponse } from 'axios'
import { BitcoinClientFactory } from '../../../factories/abstract/BitcoinClientFactory'
import { BtcClientEnum } from '../../../../config'
import { CoinApiFactory } from '../../../factories/concrete/CoinApiFactory'

export class CoinApiClient extends BitcoinClient {

    API_URL: string
    constructor() {
        super()
        this.API_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'
        this.API_KEY_NAME = 'X-CoinAPI-Key'
        this.API_KEY_VALUE = process.env.COIN_API_KEY
    }

    static {
        BitcoinClientFactory.registerFactory(BtcClientEnum.COIN_API, new CoinApiFactory())
    }

    retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.rate
    }
}
