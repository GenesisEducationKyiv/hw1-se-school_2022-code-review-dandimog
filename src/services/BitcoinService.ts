import { IBitcoinService } from "./IBitcoinService";
import { Service } from "typedi";
import axios from "axios";

const COINAPI_URL = "https://rest.coinapi.io/v1/exchangerate/BTC/UAH";

@Service()
export class BitcoinService implements IBitcoinService {
    public async getBitcoinRate(): Promise<number> {
        try {
            const result = await axios.get(COINAPI_URL, {
                method: 'GET',
                headers: { 'X-CoinAPI-Key' : process.env.API_KEY! }
            });
            
            return result?.data?.rate;
        } catch (err) {
            console.log('An error occurred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
}

