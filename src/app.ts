import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { controller } from './app.config'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string) || 3000
const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(controller.router)

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
