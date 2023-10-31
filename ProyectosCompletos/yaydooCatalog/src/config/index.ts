import dontenv from 'dotenv'

dontenv.config()

const config = {
    SERVER_PORT: process.env.HTTP_PORT ?? 8080,
    CONTEXT_PATH:  process.env.CONTEXT_PATH ?? '/api-yaydoo-catalogs',
    CORS: process.env.CORS ?? '*',
    MONGO_DB_URI: 'mongodb://127.0.0.1:27017/CatalogosDb',
    BASIC_AUTH: {
        USER: process.env.BASIC_AUTH_USER ?? 'user',
        PASS: process.env.BASIC_AUTH_PASS ?? 'pass'
    },
    CATALOGS_ALLOWED: process.env.CATALOGS_ALLOWED ?? 'catalog,1,prueba,2,3'
}

export default config
