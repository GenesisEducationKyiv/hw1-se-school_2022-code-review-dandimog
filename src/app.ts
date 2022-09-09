import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from "dotenv"
import "reflect-metadata"
import { CryptoController } from './controllers/CryptoController'
import { Container } from 'typedi'

dotenv.config()

const PORT : number = parseInt(process.env.PORT as string) || 3000
const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Container.get(CryptoController).router)

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
