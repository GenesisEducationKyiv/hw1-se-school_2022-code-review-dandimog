import { BitcoinService } from "../src/services/BitcoinService"
import { CoinApiResponse } from "../src/models/CoinApiResponse"
import axios from 'axios'

jest.mock("axios")

const bitcoinService: BitcoinService = new BitcoinService()
const bitcoinRate = 748545.816255

afterEach(() => jest.clearAllMocks())

describe('Testing the BitcoinService.', () => {
    test('Checking the success scenario for BitcoinService.getBitcoinRate().', async () => {
        jest.spyOn(axios, 'get').mockReturnValue(
            Promise.resolve<CoinApiResponse>(
                {
                    time: "2022-09-06T22:32:24.0000000Z",
                    asset_id_base: "BTC",
                    asset_id_quote: "UAH",
                    rate: bitcoinRate
                }
            )
        )

        const result = await bitcoinService.getBitcoinRate()
        expect(result).toEqual(bitcoinRate)
    })

    test('Checking the failure scenario for BitcoinService.getBitcoinRate().', async () => {
        const error: Error = new Error('An error occurred while trying to get the Bitcoin rate.')
        jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(error))
        expect(bitcoinService.getBitcoinRate()).rejects.toThrowError(error)
    })
})