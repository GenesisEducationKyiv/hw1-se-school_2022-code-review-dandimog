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
import { CryptoChain } from "./services/chains/CryptoChain"

const transporter : Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)
const binanceChain : CryptoChain = new BinanceChain()
const coinApiChain : CryptoChain = new CoinApiChain()
binanceChain.setNext(coinApiChain)

const repository : ICryptoRepository = new CryptoRepository()

const emailService : IEmailService = new EmailService(repository, binanceChain, transporter)
const validationService : ValidationService = new ValidationService()
export const controller : ICryptoController = new CryptoController(binanceChain, emailService, validationService)