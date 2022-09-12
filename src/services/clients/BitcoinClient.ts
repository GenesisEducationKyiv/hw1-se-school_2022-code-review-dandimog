import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { injectable } from "inversify-props"
import { IBitcoinClient } from "./IBitcoinClient"

@injectable()
export abstract class BitcoinClient implements IBitcoinClient {

    abstract API_URL: string
    API_KEY?: string

    async getBitcoinRate(): Promise<number> {
        try {
            console.log(this.API_KEY)
            const headers = (this.API_KEY !== undefined) ? { headers: { 'X-CoinAPI-Key' : this.API_KEY } } as AxiosRequestConfig : undefined
            const result : AxiosResponse = await axios.get(this.API_URL, headers) 
            return result.data.rate || result.data.price
        } catch (err) {
            console.log('An error occurred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
}