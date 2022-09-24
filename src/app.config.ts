import { Transporter } from "nodemailer"
import { CryptoController } from "./controllers/CryptoController"
import { ICryptoController } from "./controllers/ICryptoController"
import { CryptoRepository } from "./repositories/CryptoRepository"
import { ICryptoRepository } from "./repositories/ICryptoRepository"
import { EmailService } from "./services/EmailService"
import { IEmailService } from "./services/IEmailService"
import nodemailer from "nodemailer"
import { config } from "../config"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { ValidationService } from "./services/ValidationService"
import { BinanceChain } from "./services/chains/BinanceChain"
import { CoinApiChain } from "./services/chains/CoinApiChain"
import { BitcoinClientChain } from "./services/chains/BitcoinClientChain"

const transporter : Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)
const binanceChain : BitcoinClientChain = new BinanceChain()
const coinApiChain : BitcoinClientChain = new CoinApiChain()
binanceChain.setNext(coinApiChain)

const repository : ICryptoRepository = new CryptoRepository()

const emailService : IEmailService = new EmailService(repository, transporter)
const validationService : ValidationService = new ValidationService()
export const controller : ICryptoController = new CryptoController(binanceChain, emailService, validationService)
