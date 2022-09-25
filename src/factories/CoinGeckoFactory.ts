import { BitcoinClient } from "../services/clients/BitcoinClient";
import { CoinGeckoClient } from "../services/clients/CoinGeckoClient";
import { BitcoinClientFactory } from "./BitcoinClientFactory";

export class CoinGeckoFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinGeckoClient()
    }
}