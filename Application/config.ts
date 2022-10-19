import { LogLevel } from "./src/models/enums/LogLevel";

export const config = {
    app: {
        port: parseInt(process.env.PORT as string) ?? 3000,
        response_content_type: process.env.RESPONSE_CONTENT_TYPE ?? 'application/json'
    },
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
    logger: {
        path: 'src/resources/logs/AxiosResponseLogs.log',
        level: LogLevel.INFO
    }
}
