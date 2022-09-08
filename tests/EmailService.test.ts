import { CryptoRepository } from "../src/repositories/CryptoRepository"
import { BitcoinService } from "../src/services/BitcoinService"
import { EmailService } from "../src/services/EmailService"

const bitcoinRate = 748545.816255

afterEach(() => jest.resetAllMocks())

const repository: CryptoRepository = new CryptoRepository()
const bitcoinService: BitcoinService = new BitcoinService()
const emailService: EmailService = new EmailService(repository, bitcoinService)

describe('Testing the EmailService.', () => {
    test('Checking the success scenario for EmailService.sendRateToSubcribers():', async () => {
        const emailsArray = ['test.email@gmail.com', 'mock.email@yahoo.com']

        jest.spyOn(repository, 'getAllEmails').mockReturnValue(emailsArray)
        jest.spyOn(bitcoinService, 'getBitcoinRate').mockReturnValue(Promise.resolve(bitcoinRate))
        jest.spyOn(emailService, 'sendRateToSubcribers')

        expect(emailService.sendRateToSubcribers()).resolves.not.toThrow()
        expect(emailService.sendRateToSubcribers).toBeCalledTimes(1)
        expect(bitcoinService.getBitcoinRate).toBeCalledTimes(1)
        expect(repository.getAllEmails).toBeCalledTimes(1)
    })
})