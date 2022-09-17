import { AxiosResponse } from "axios"
import { BitcoinClientFactory } from "../../factories/BitcoinClientFactory"
import { BitcoinClient } from "./BitcoinClient"
import { BitcoinClients } from "../../../config"

export class CoinGeckoClient extends BitcoinClient {

    API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'

    static {
        BitcoinClientFactory.registerClient(BitcoinClients.COIN_GECKO, new CoinGeckoClient())
    }

    createBitcoinClient(): CoinGeckoClient {
        return new CoinGeckoClient()
    }

    retrieveRateFromResponse(result: AxiosResponse): number {
        return result.data.bitcoin.uah
    }
}