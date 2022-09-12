import { IBitcoinService } from "./IBitcoinService"
import axios from "axios"
import { CoinApiResponse } from '../models/CoinApiResponse'

const COINAPI_URL = "https://rest.coinapi.io/v1/exchangerate/BTC/UAH"

export class BitcoinService implements IBitcoinService {
    public async getBitcoinRate(): Promise<number> {
        try {
            const result : CoinApiResponse = await axios.get(COINAPI_URL, {
                method: 'GET',
                headers: { 'X-CoinAPI-Key' : process.env.API_KEY! }
            })
            return result.rate
        } catch (err) {
            console.log('An error occorred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
}

