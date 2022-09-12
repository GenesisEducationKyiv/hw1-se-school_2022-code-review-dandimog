import { BitcoinClient } from "./BitcoinClient"
import { injectable } from "inversify-props"

@injectable()
export class BinanceClient extends BitcoinClient {
    API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH'
}