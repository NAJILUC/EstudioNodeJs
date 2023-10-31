import dontenv from 'dotenv'

dontenv.config()

const config = {
    SERVER_PORT: process.env.HTTP_PORT ?? 8080,
    CONTEXT_PATH: process.env.CONTEXT_PATH ?? '/api-yaydoo-contracts',
    CORS: process.env.CORS ?? '*',
    MONGO_DB_URI: 'mongodb://127.0.0.1:27017/cosmos'
}

export default config
