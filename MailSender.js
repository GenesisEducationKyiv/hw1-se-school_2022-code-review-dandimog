import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: "sydorevg@gmail.com",
      pass: "Fakepass12345!",
      clientId: "145401125864-69bmb0l2iaf3mkih1heon2k1dkasgrdj.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//040hRGIZmSN_-CgYIARAAGAQSNwF-L9IrYX4wLzoc6Rs8zJ2Vkpzm5LY4jA1yj3sveaIoCDzOL0ZL_EO-oHkGEKrVqss_cNWUPzU"
    }
});

export async function sendEmail(receiverEmail, btcPrice) {

    let info = await transporter.sendMail({
        from: 'sydorevg@gmail.com',
        to: receiverEmail,
        subject: "BTC to UAH Price",
        text: 'The current Bitcoin price is ' + btcPrice + ' UAH.',
        html: '<b>The current Bitcoin price is ' + btcPrice + ' UAH.</b>'
    });

    console.log("Message sent: %s", info.messageId);

}