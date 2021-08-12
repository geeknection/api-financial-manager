const { PORT } = process.env;
interface configInterface {
    app: {
        PORT: number|string,
        SECRET_KEY: string,
        url: string,
        lang: string,
        DEVMODE: string
    },
    database: {
        host: string;
        user: string;
        pass: string;
        dbName: string;
        authSource: string;
    }
}

const config: configInterface = {
    app: {
        PORT: PORT || 3000,
        SECRET_KEY: process.env.SECRET_KEY,
        url: process.env.API_URL,
        lang: 'pt-br',
        DEVMODE: process.env.DEVMODE || 'disable'
    },
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        authSource: process.env.DB_AUTHSOURCE
    }
}

export default config;