import express from 'express'
import { CryptoController } from '../controllers/CryptoController'

export const router : express.Router = express.Router()

export function initRoutes(controller: CryptoController) {
    router.get('/rate', controller.getBitcoinRate)
    router.post('/subscribe', controller.subscribeEmail)
    router.post('/sendEmails', controller.sendRateToSubcribers)
}
