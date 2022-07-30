import { Router } from 'express';
import { addMail, fetchMails } from './Repository.js';
import { sendEmail } from './MailSender.js'
import https from 'https';

const router = Router()

router.get('/rate', (req, res) => {
    retrieveBtcPrice()
        .then((data) => res.status(200).send(JSON.parse(data).rate.toString()))
        .catch((error) => {
            console.log("Error: ", error)
            res.status(400).send('')
        })
})

router.post('/subscribe', (req, res) => {
    addMail(req.body, res)
})

router.post('/sendEmails', (req, res) => {
    fetchMails()
        .then((mails) => {
            sendMails(mails, retrieveBtcPrice()
                .then((data) => JSON.parse(data).rate.toString())
                .catch((error) => {
                    console.log("Error: ", error)
                }))
            res.status(200).send('')
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(500).send('')
        })
})

var options = {
    "method": "GET",
    "hostname": "rest.coinapi.io",
    "path": "/v1/exchangerate/BTC/UAH",
    "headers": { 'X-CoinAPI-Key': 'B566AD61-01B1-40FF-BAA0-E30D37E5033B' }
};

async function retrieveBtcPrice() {
    return new Promise(async (resolve, reject) => {
        let body = [];
        const req = https.request(options, res => {
            res.on('data', chunk => body.push(chunk));
            res.on('end', () => {
                const data = Buffer.concat(body).toString();
                resolve(data);
            });
        });
        req.on('error', e => {
            console.log('ERROR: ${e}');
            reject(e);
        });
        req.end();
    });
}

function sendMails(mails, btcPrice) {
    console.log('this is method:' + mails)
    var array = mails.emails
    console.log(array)
    array.forEach(element => { sendEmail(element, btcPrice) })
}

export default router