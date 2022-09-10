import { CryptoRepository } from "../../src/repositories/CryptoRepository"
import { ICryptoRepository } from "../../src/repositories/ICryptoRepository"
import { CoinApiClient } from "../../src/services/CoinApiClient"
import { EmailService } from "../../src/services/EmailService"
import { IBitcoinClient } from "../../src/services/IBitcoinClient"
import { IEmailService } from "../../src/services/IEmailService"
import { config } from '../../config'
import { Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import nodemailer from "nodemailer"

const bitcoinRate = 748545.816255

afterEach(() => jest.resetAllMocks())

const repository: ICryptoRepository = new CryptoRepository()
const bitcoinService: IBitcoinClient = new CoinApiClient()
const transporter : Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)
const emailService: IEmailService = new EmailService(repository, bitcoinService, transporter)

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