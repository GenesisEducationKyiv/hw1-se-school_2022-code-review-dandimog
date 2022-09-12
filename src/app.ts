/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import "reflect-metadata"
import { router } from './routes/Router'
import { config } from '../config'
import { initRoutes } from './routes/Router'
import { controller } from './app.config'

initRoutes(controller)

const port = config.app.port
const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => console.log(`App listening on port: ${port}`))