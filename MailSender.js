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

export async function sendEmail(receiverEmail) {

    let info = await transporter.sendMail({
        from: 'sydorevg@gmail.com', // sender address
        to: receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}