import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from "dotenv"
import "reflect-metadata"
import { router } from './routes/Router'
import { Container } from 'typedi'
import { Transporter } from 'nodemailer'
import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { config } from '../config'
import { CryptoController } from './controllers/CryptoController'
import { initRoutes } from './routes/Router'

dotenv.config()

const transporter : Transporter = nodemailer.createTransport(config.transporter as SMTPTransport.Options)
Container.set('transporter', transporter)

const controller : CryptoController = Container.get(CryptoController)
initRoutes(controller)

const port = config.app.port
const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => console.log(`App listening on port: ${port}`))
