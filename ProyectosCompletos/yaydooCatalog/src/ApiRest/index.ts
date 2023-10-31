import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'
import config from '../config'
import logger from '../config/logger.config'
import * as errorHandler from './middlewares/error.handler'
import { basicAuthHandler } from './middlewares/basicAuth.handler'
import { connect } from 'mongoose'

class ApiRest {
    app: Express
    port: string | number
    contextPath: string

    constructor() {
        this.port = config.SERVER_PORT
        this.contextPath = config.CONTEXT_PATH
        this.app = express()
        this.middleware()
        this.basicAuthConf()
        this.routes()
        this.errors()
        this.connect()
    }

    middleware() {
        // parse json request body
        this.app.use(express.json())
        // parse urlencoded request body
        this.app.use(
            express.urlencoded({
                extended: true
            })
        )

        /**
         * Cors
         *
         * CORS is a node.js package for providing a Connect/Express middleware that
         * can be used to enable CORS with various options.
         */
        let options: any = {}
        let urls = config.CORS.split(',')
        if (urls.length === 1) {
            options.origin = urls[0]
        } else {
            options.origin = urls
        }
        this.app.use(cors(options))

        /**
         * Helmet
         *
         * Helmet helps you secure your Express apps by setting various HTTP headers.
         * It's not a silver bullet, but it can help!
         */
        this.app.use(helmet())
    }

    routes() {
        this.app.use(this.contextPath, routes)
    }

    errors() {
        this.app.use(errorHandler.logErrors)
        this.app.use(errorHandler.errorHandler)
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`***ApiRest Listening on port ${this.port} with context-path ${this.contextPath}`)
        })
    }

    basicAuthConf() {
        this.app.use(basicAuthHandler)
    }

    connect() {
        connect(`${config.MONGO_DB_URI}`)
            .then(() => logger.info('***ApiRest Connected to MongoDB'))
            .catch((err: any) => logger.error(err))
    }

}

export default ApiRest
