import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import logger from '../../config/logger.config'
import {
    StandardErrorResponse
} from '../../models/responses/standard.error.response'

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {

    logger.error(err)
    console.error(err)
    next(err)
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err.isCustomError) {
        const errorResponse: StandardErrorResponse = {
            errors: [
                {
                    code: err.code,
                    description: err.message,
                    field: err.field
                }
            ]
        }

        res.status(err.status).json(errorResponse)
    } else if (err.isAxiosError && err.response) {

        const status = err.response.status || 502
        const errorResponse = err.response.data || 'Bad Gateway'
        res.status(status).json(errorResponse)

    } else {

        const errorResponse: StandardErrorResponse = {
            errors: [
                {
                    code: '500',
                    description: err.message
                }
            ]
        }

        res.status(500).json(errorResponse)
    }
}

