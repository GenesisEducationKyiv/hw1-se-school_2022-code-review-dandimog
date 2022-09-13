
import { IBitcoinClient } from "./IBitcoinClient"
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const COINAPI_URL = 'https://rest.coinapi.io/v1/exchangerate/BTC/UAH'

export class CoinApiClient implements IBitcoinClient {
    async getBitcoinRate(): Promise<number> {
        try {
            const API_KEY = process.env.API_KEY
            console.log(API_KEY)
            const headers =
                API_KEY !== undefined
                    ? ({
                          headers: { 'X-CoinAPI-Key': API_KEY },
                      } as AxiosRequestConfig)
                    : undefined
            const result: AxiosResponse = await axios.get(COINAPI_URL, headers)
            return result.data.rate || result.data.price
        } catch (err) {
            console.log(
                'An error occurred while trying to get the Bitcoin rate.',
                err
            )
            throw err
        }
    }
}
