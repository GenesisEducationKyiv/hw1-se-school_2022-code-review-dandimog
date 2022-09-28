import { BinanceClient } from "../services/clients/BinanceClient";
import { BitcoinClient } from "../services/clients/BitcoinClient";
import { BitcoinClientFactory } from "./BitcoinClientFactory";

export class BinanceFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new BinanceClient()
    }
}