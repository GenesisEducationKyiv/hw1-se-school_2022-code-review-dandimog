import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'sydorevg@gmail.com',
    pass: 'Fakepass12345!',
    clientId: '145401125864-69bmb0l2iaf3mkih1heon2k1dkasgrdj.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04O7DtpIkA6ZkCgYIARAAGAQSNwF-L9Ir2xt76pOFBQZpi7zkrA3wPPVy9wiW9PAlUfd9Da2eKP2GzXyiQTUp3wC219HsJBKmgHs'
  }
})

export async function sendEmail (receiverEmail, btcPrice) {
  const info = await transporter.sendMail({
    from: 'sydorevg@gmail.com',
    to: receiverEmail,
    subject: 'BTC to UAH Price',
    text: 'The current Bitcoin price is ' + btcPrice + ' UAH.',
    html: '<b>The current Bitcoin price is ' + btcPrice + ' UAH.</b>'
  })

  console.log('Message sent: %s', info.messageId)
}
