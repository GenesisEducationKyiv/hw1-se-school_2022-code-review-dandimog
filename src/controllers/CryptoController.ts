import { BitcoinService } from "../services/BitcoinService";
import { EmailService } from "../services/EmailService";
import { ValidationService } from "../services/ValidationService";
import { Service } from "typedi";
import * as express from 'express';

@Service()
export class CryptoController {

    public router : express.Router = express.Router();

    constructor(
        public bitcoinService: BitcoinService, 
        public emailService: EmailService, 
        public emailValidator: ValidationService
    ) {
        this.intializeRoutes();
    }

    private intializeRoutes() : void {
        this.router.get('/rate', this.getBitcoinRate);
        this.router.post('/subscribe', this.subscribeEmail);
        this.router.post('/sendEmails', this.sendRateToSubcribers);
    }

    private getBitcoinRate = async (request : express.Request, response : express.Response) => {
        try {
            const result = await this.bitcoinService.getBitcoinRate();
            response.status(200).json({ bitcoinRate : result.toString() + ' UAH' });
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to get the Bitcoin rate.' });
        }
    }

    private subscribeEmail = (request : express.Request, response : express.Response) => {
        const email : string = request.body.email;

        if (!email || !this.emailValidator.isEmailValid(email)) {
            response.status(400).json({ error: 'Invalid format. Please provide the request containing a valid \'email\' field.' });
            return;
        }
        
        try {
            this.emailService.subscribeEmail(email);
            response.status(200).end();
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to subscribe the provided email.' });
        }
    }

    private sendRateToSubcribers = (request : express.Request, response : express.Response) => {
        try {
            this.emailService.sendRateToSubcribers();
            response.status(200).end();
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to broadcast the Bitcoin rate to subscribers.' });
        }
    }
    
}