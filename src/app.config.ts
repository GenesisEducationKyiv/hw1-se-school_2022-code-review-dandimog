import { CryptoController } from './controllers/CryptoController'
import { CryptoRepository } from './repositories/CryptoRepository'
import { ICryptoRepository } from './repositories/ICryptoRepository'
import { BitcoinService } from './services/BitcoinService'
import { EmailService } from './services/EmailService'
import { IBitcoinService } from './services/IBitcoinService'
import { IEmailService } from './services/IEmailService'
import { ValidationService } from './services/ValidationService'

const bitcoinService: IBitcoinService = new BitcoinService()
const repository: ICryptoRepository = new CryptoRepository()
const emailService: IEmailService = new EmailService(repository, bitcoinService)
const emailValidator: ValidationService = new ValidationService()
export const controller: CryptoController = new CryptoController(
    bitcoinService,
    emailService,
    emailValidator
)
