import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"
import { AxiosResponse } from "axios"
import { BitcoinClientFactory } from "../../factories/BitcoinClientFactory"
import { BitcoinClients } from "../../../config"

@injectable()
export class CoinApiClient extends BitcoinClient {

    API_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'
    API_KEY_NAME = 'X-CoinAPI-Key'
    API_KEY_VALUE = process.env.COIN_API_KEY
    
    static {
        BitcoinClientFactory.registerClient(BitcoinClients.COIN_API, new CoinApiClient())
    }

    createBitcoinClient(): CoinApiClient {
        return new CoinApiClient()
    }

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.rate
    }
}