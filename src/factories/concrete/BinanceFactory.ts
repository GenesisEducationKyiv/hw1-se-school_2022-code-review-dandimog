import { BinanceClient } from "../../services/clients/concrete/BinanceClient"
import { BitcoinClient } from "../../services/clients/abstract/BitcoinClient"
import { BitcoinClientFactory } from "../abstract/BitcoinClientFactory"

export class BinanceFactory extends BitcoinClientFactory {
    public createBitcoinClient(): BitcoinClient {
        return new BinanceClient()
    }
}