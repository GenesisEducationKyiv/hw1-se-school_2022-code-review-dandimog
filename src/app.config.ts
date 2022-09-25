import { Transporter } from 'nodemailer'
import { CryptoController } from './controllers/CryptoController'
import { ICryptoController } from './controllers/ICryptoController'
import { CryptoRepository } from './repositories/CryptoRepository'
import { ICryptoRepository } from './repositories/ICryptoRepository'
import { EmailService } from './services/EmailService'
import { IEmailService } from './services/IEmailService'
import nodemailer from 'nodemailer'
import { BtcClientEnum, config } from '../config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ValidationService } from './services/ValidationService'
import { BinanceChain } from './services/chains/BinanceChain'
import { CoinApiChain } from './services/chains/CoinApiChain'
import { BitcoinClientChain } from './services/chains/BitcoinClientChain'
import { BitcoinClientFactory } from './factories/BitcoinClientFactory'
import { BinanceClient } from './services/clients/BinanceClient'

const transporter: Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)

const binanceChain: BitcoinClientChain = new BinanceChain()
const coinApiChain: BitcoinClientChain = new CoinApiChain()
binanceChain.setNext(coinApiChain)

const binanceClient_1 : BinanceClient = 
    BitcoinClientFactory.btcFactories.get(BtcClientEnum.BINANCE)!.createBitcoinClient()

const binanceClient_2 : BinanceClient = 
    BitcoinClientFactory.getClient(BtcClientEnum.BINANCE)

const repository: ICryptoRepository = new CryptoRepository()

const emailService: IEmailService = new EmailService(repository, transporter)
const validationService: ValidationService = new ValidationService()
export const controller: ICryptoController = new CryptoController(
    binanceChain,
    emailService,
    validationService
)
