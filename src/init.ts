import nodemailer, { Transporter } from 'nodemailer'
import { CryptoController } from './controllers/CryptoController'
import { ICryptoController } from './controllers/ICryptoController'
import { EmailRepository } from './repositories/email/EmailRepository'
import { IEmailRepository } from './repositories/email/IEmailRepository'
import { EmailService } from './services/email/EmailService'
import { IEmailService } from './services/email/IEmailService'
import { config } from '../config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ValidationService } from './services/validation/ValidationService'
import { BitcoinClientFactory } from './factories/abstract/BitcoinClientFactory'
import { ErrorHandler } from './services/handlers/ErrorHandler'
import { BtcClientEnum } from './models/BtcClientEnum'
import { BinanceFactory } from './factories/concrete/BinanceFactory'
import { CoinApiFactory } from './factories/concrete/CoinApiFactory'
import { CoinGeckoFactory } from './factories/concrete/CoinGeckoFactory'
import { CoinMarketCapFactory } from './factories/concrete/CoinMarketCapFactory'
import { FactoryRegistrator } from './factories/abstract/FactoryRegistrator'
import { BitcoinClient } from './services/clients/abstract/BitcoinClient'
import { BitcoinCachingProxy } from './services/proxies/BitcoinCachingProxy'

const transporter: Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)

FactoryRegistrator.registerFactory(BtcClientEnum.BINANCE, new BinanceFactory())
FactoryRegistrator.registerFactory(BtcClientEnum.COIN_API, new CoinApiFactory())
FactoryRegistrator.registerFactory(BtcClientEnum.COIN_GECKO, new CoinGeckoFactory())
FactoryRegistrator.registerFactory(BtcClientEnum.COIN_MARKET, new CoinMarketCapFactory())

const binanceClient : BitcoinClient = BitcoinClientFactory.getClient(BtcClientEnum.BINANCE)
const coinApiClient : BitcoinClient = BitcoinClientFactory.getClient(BtcClientEnum.COIN_API)

binanceClient.setNext(coinApiClient)

const bitcoinCachingProxy: BitcoinCachingProxy = new BitcoinCachingProxy(binanceClient)

const repository: IEmailRepository = new EmailRepository()
const emailService: IEmailService = new EmailService(repository, transporter)
const validationService: ValidationService = new ValidationService()
const errorHandler: ErrorHandler = new ErrorHandler()

export const controller: ICryptoController = new CryptoController(
    bitcoinCachingProxy,
    emailService,
    validationService,
    errorHandler
)
