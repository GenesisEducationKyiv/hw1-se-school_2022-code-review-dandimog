import { IBitcoinClient } from "./IBitcoinClient"
import { Service } from "typedi"
import axios, { AxiosResponse } from "axios"

const COINAPI_URL = "https://rest.coinapi.io/v1/exchangerate/BTC/UAH"

@Service()
export class CoinApiClient implements IBitcoinClient {

    public async getBitcoinRate(): Promise<number> {
        try {
            const result : AxiosResponse = await axios.get(COINAPI_URL, {
                method: 'GET',
                headers: { 'X-CoinAPI-Key' : process.env.API_KEY! }
            })
            return result.data.rate
        } catch (err) {
            console.log('An error occorred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
}

