import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"
import { AxiosResponse } from "axios"

@injectable()
export class BinanceClient extends BitcoinClient {
    API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.price
    }
}