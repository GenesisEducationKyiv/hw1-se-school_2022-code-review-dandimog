import { BinanceClient } from "../clients/BinanceClient"
import { BitcoinClientChain } from "./BitcoinClientChain"

export class BinanceChain extends BitcoinClientChain {
    constructor(binanceClient? : BinanceClient) {
        if (binanceClient !== undefined) {
            super(binanceClient)
        } else {
            super(new BinanceClient())
        }
    }
}