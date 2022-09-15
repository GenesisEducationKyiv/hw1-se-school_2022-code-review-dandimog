import { AxiosResponse } from "axios"
import { BitcoinClient } from "./BitcoinClient"

export class CoinGeckoClient extends BitcoinClient {
    API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.bitcoin.uah
    }
}