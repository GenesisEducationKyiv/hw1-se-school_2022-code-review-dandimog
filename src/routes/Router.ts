import express from 'express'
import { ICryptoController } from '../controllers/ICryptoController'

export const router : express.Router = express.Router()

export function initRoutes(controller: ICryptoController) {
    router.get('/rate', controller.getBitcoinRate)
    router.post('/subscribe', controller.subscribeEmail)
    router.post('/sendEmails', controller.sendRateToSubcribers)
}
