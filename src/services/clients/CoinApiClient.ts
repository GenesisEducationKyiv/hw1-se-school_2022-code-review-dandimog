import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"
import { AxiosResponse } from "axios"

@injectable()
export class CoinApiClient extends BitcoinClient {
    API_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'
    API_KEY_NAME = 'X-CoinAPI-Key'
    API_KEY_VALUE = process.env.COIN_API_KEY

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.rate
    }
}