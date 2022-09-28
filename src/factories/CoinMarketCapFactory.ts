import { BitcoinClient } from "../services/clients/BitcoinClient";
import { CoinMarketCapClient } from "../services/clients/CoinMarketCapClient";
import { BitcoinClientFactory } from "./BitcoinClientFactory";

export class CoinMarketCapFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinMarketCapClient()
    }
}