import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import logger from '../../config/logger.config'
import {
    StandardErrorResponse
} from '../../models/responses/standard.error.response'

export const logErrors: ErrorRequestHandler = (err, _req, _res, next) => {

    logger.error(err)
    if (!(err.isAxiosError && err.response)) {
        console.error(err)
    }
    next(err)
}

export const errorHandler: ErrorRequestHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

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
        if(err.response.data?.errors){
            res.status(status).json(err.response.data.errors)
        }

        const errorResponse: StandardErrorResponse = {
            errors: [
                {
                    code: 'UNKNOWN',
                    description: err.message
                }
            ]
        }

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

