import { CoinApiClient } from "../../src/services/CoinApiClient"
import axios, { AxiosResponse } from 'axios'
import { IBitcoinClient } from "../../src/services/IBitcoinClient"

jest.mock("axios")

const bitcoinService: IBitcoinClient = new CoinApiClient()
const bitcoinRate = 748545.816255

afterEach(() => jest.clearAllMocks())

describe('Testing the BitcoinClient.', () => {
    test('Checking the success scenario for BitcoinClient.getBitcoinRate().', async () => {
        jest.spyOn(axios, 'get').mockReturnValue(
            Promise.resolve<AxiosResponse>(
                {
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config: {},
                    data: {
                        time: '2022-09-09T14:24:05.0000000Z',
                        asset_id_base: 'BTC',
                        asset_id_quote: 'UAH',
                        rate: bitcoinRate
                    }
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