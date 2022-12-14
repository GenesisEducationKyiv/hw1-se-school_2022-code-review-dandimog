import { BitcoinClient } from "../../services/clients/abstract/BitcoinClient"
import { CoinApiClient } from "../../services/clients/concrete/CoinApiClient"
import { BitcoinClientFactory } from "../abstract/BitcoinClientFactory"

export class CoinApiFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinApiClient()
    }
}