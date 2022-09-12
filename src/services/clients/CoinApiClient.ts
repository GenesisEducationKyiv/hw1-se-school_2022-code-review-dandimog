import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"

@injectable()
export class CoinApiClient extends BitcoinClient {

    API_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'
    API_KEY = process.env.COIN_API_KEY

    getBitcoinRate(): Promise<number> {
        return super.getBitcoinRate()
    }
}