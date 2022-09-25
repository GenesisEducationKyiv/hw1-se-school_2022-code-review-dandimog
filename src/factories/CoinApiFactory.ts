import { BitcoinClient } from "../services/clients/BitcoinClient";
import { CoinApiClient } from "../services/clients/CoinApiClient";
import { BitcoinClientFactory } from "./BitcoinClientFactory";

export class CoinApiFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new CoinApiClient()
    }
}