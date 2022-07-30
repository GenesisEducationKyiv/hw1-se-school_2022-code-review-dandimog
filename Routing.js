import { Router } from 'express';
import { addMail, getMails } from './Repository.js';
import { sendEmail } from './MailSender.js'

const router = Router()

router.get('/rate', (req, res) => {
    res.status(200).send('');
})

router.post('/subscribe', (req, res) => {
    addMail(req.body, res)
})

router.post('/sendEmails', (req, res) => {
    getMails()
    .then((mails) => {
        sendMails(mails)
        res.status(200).send('')
    })
    .catch((error) => { 
        console.log("Catched error: ", error)
        res.status(500).send('')
    })
})

function sendMails(mails) {
    console.log('this is method:' + mails)
    var array = mails.emails
    console.log(array)
    array.forEach(element => { sendEmail(element) })
}

export default router