import { Transporter } from 'nodemailer'
import { CryptoController } from './controllers/CryptoController'
import { CryptoRepository } from './repositories/CryptoRepository'
import { ICryptoRepository } from './repositories/ICryptoRepository'
import { CoinApiClient } from './services/CoinApiClient'
import { EmailService } from './services/EmailService'
import { IBitcoinClient } from './services/IBitcoinClient'
import { IEmailService } from './services/IEmailService'
import { ValidationService } from './services/ValidationService'
import nodemailer from 'nodemailer'
import { config } from '../config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const transporter: Transporter = nodemailer.createTransport(
    config.transporter as SMTPTransport.Options
)
const bitcoinService: IBitcoinClient = new CoinApiClient()
const repository: ICryptoRepository = new CryptoRepository()
const emailService: IEmailService = new EmailService(
    repository,
    bitcoinService,
    transporter
)
const emailValidator: ValidationService = new ValidationService()
export const controller: CryptoController = new CryptoController(
    bitcoinService,
    emailService,
    emailValidator
)
