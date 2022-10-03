import { BitcoinClient } from "../../services/clients/abstract/BitcoinClient"
import { CoinGeckoClient } from "../../services/clients/concrete/CoinGeckoClient"
import { BitcoinClientFactory } from "../abstract/BitcoinClientFactory"

export class CoinGeckoFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinGeckoClient()
    }
}