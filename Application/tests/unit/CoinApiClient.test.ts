// import "reflect-metadata"
// import { BinanceClient } from "../../src/services/clients/BinanceClient"
// import axios, { AxiosResponse } from 'axios'
// import { BitcoinClient } from "../../src/services/clients/BitcoinClient"

// jest.mock('axios')

// const bitcoinService: BitcoinClient = new BinanceClient()
// const bitcoinRate = 748545.816255

// afterEach(() => jest.clearAllMocks())

// describe('Testing the BitcoinService.getBitcoinRate().', () => {
//     test('Should return Bitcoin rate on success.', async () => {
//         ;(axios.get as jest.Mock) = jest.fn(() =>
//             Promise.resolve<AxiosResponse>({
//                 status: 200,
//                 statusText: 'OK',
//                 headers: {},
//                 config: {},
//                 data: {
//                     time: '2022-09-09T14:24:05.0000000Z',
//                     asset_id_base: 'BTC',
//                     asset_id_quote: 'UAH',
//                     rate: bitcoinRate,
//                 },
//             })
//         )
//         const result = await bitcoinService.getBitcoinRate()
//         expect(result).toEqual(bitcoinRate)
//     })

//     test('Should throw an error when trying to get the Bitcoin rate.', async () => {
//         const error: Error = new Error(
//             'An error occurred while trying to get the Bitcoin rate.'
//         )
//         ;(axios.get as jest.Mock) = jest.fn(() => {
//             Promise.reject(error)
//         })
//         jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(error))
//         expect(bitcoinService.getBitcoinRate()).rejects.toThrowError(error)
//     })
// })
