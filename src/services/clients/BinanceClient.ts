import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"
import { AxiosResponse } from "axios"
import { BitcoinClientFactory } from "../../factories/BitcoinClientFactory"
import { BitcoinClients } from "../../../config"

@injectable()
export class BinanceClient extends BitcoinClient {

    API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'

    static {
        BitcoinClientFactory.registerClient(BitcoinClients.BINANCE, new BinanceClient())
    }

    createBitcoinClient(): BinanceClient {
        return new BinanceClient()
    }
    
    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.price
    }
}