import { BitcoinClient } from "../services/clients/abstract/BitcoinClient";
import { CoinMarketCapClient } from "../services/clients/concrete/CoinMarketCapClient";
import { BitcoinClientFactory } from "./BitcoinClientFactory";

export class CoinMarketCapFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinMarketCapClient()
    }
}