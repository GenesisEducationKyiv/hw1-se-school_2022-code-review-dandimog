import { AxiosResponse } from "axios"
import { BitcoinClients } from "../../../config"
import { BitcoinClientFactory } from "../../factories/BitcoinClientFactory"
import { BitcoinClient } from "./BitcoinClient"

export class CoinMarketCapClient extends BitcoinClient {

    API_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=UAH'
    API_KEY_NAME = 'X-CMC_PRO_API_KEY'
    API_KEY_VALUE = process.env.COIN_MARKET_CAP_API_KEY

    static {
        BitcoinClientFactory.registerClient(BitcoinClients.COIN_MARKET, new CoinMarketCapClient())
    }

    createBitcoinClient(): CoinMarketCapClient {
        return new CoinMarketCapClient()
    }

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.data[0].quote.UAH.price
    }
}