import { Transporter } from 'nodemailer'
import { CryptoController } from './controllers/CryptoController'
import { ICryptoController } from './controllers/ICryptoController'
import { EmailRepository } from './repositories/email/EmailRepository'
import { IEmailRepository } from './repositories/email/IEmailRepository'
import { EmailService } from './services/email/EmailService'
import { IEmailService } from './services/email/IEmailService'
import nodemailer from 'nodemailer'
import { BtcClientEnum, config } from '../config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ValidationService } from './services/validation/ValidationService'
import { BitcoinClientChain } from './services/chains/abstract/BitcoinClientChain'
import { BitcoinClientFactory } from './factories/abstract/BitcoinClientFactory'
import { BinanceClient } from './services/clients/concrete/BinanceClient'
import { CoinApiClient } from './services/clients/concrete/CoinApiClient'

const transporter: Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)

const binance: BinanceClient = new BinanceClient()
const coinApi: CoinApiClient = new CoinApiClient()

const binanceClient : BinanceClient = 
    BitcoinClientFactory.getClient(BtcClientEnum.BINANCE)

const coinApiClient : CoinApiClient = 
    BitcoinClientFactory.getClient(BtcClientEnum.COIN_API)

const binanceChain: BitcoinClientChain = new BitcoinClientChain(binanceClient)
const coinApiChain: BitcoinClientChain = new BitcoinClientChain(coinApiClient)

binanceChain.setNext(coinApiChain)

const repository: IEmailRepository = new EmailRepository()

const emailService: IEmailService = new EmailService(repository, transporter)
const validationService: ValidationService = new ValidationService()

export const controller: ICryptoController = new CryptoController(
    binanceChain,
    emailService,
    validationService
)
