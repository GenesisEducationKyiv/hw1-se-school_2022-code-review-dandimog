export const config = {
    transporter: {
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.USER,
            pass: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        },
    },
    app: {
        port: parseInt(process.env.PORT as string) || 3000,
    },
}
