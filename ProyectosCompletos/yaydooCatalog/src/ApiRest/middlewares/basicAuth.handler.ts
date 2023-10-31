import { RequestHandler } from 'express'
import config from '../../config'
import { StandardErrorResponse } from '../../models/responses/standard.error.response'

export const basicAuthHandler: RequestHandler = (req, res, next) => {

    const auth = req.headers.authorization

    if (!auth) {
        const errorResponse: StandardErrorResponse = {
            errors: [
                {
                    code: '401',
                    description: 'Unauthorized'
                }
            ]
        }
        res.status(401).json(errorResponse)
        return;
    }

    const base64Auth = auth.split(' ')[1]
    const decoded = Buffer.from(base64Auth, 'base64').toString('ascii')
    const [username, password] = decoded.split(':')
    if (
        !(config.BASIC_AUTH.USER === username && config.BASIC_AUTH.PASS === password)
    ) {

        const errorResponse: StandardErrorResponse = {
            errors: [
                {
                    code: '401',
                    description: 'Unauthorized'
                }
            ]
        }
        res.status(401).json(errorResponse)
        return
    }

    next()

}
