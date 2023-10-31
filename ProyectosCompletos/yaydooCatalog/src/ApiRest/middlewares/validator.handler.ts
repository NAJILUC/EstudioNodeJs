import { NextFunction, Request, Response } from 'express'
import Joi, { ValidationResult } from 'joi'

export function validate(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            const errors = error.details.map((detail) => ({
                code: 'E-001',
                description: detail.message,
                field: detail.context?.key ?? ''
            }))
            return res.status(400).json({ errors })
        }

        next()
    }
}

export function validateQuery(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.query, {
            abortEarly: false
        })

        if (error) {
            const errors = error.details.map((detail) => ({
                code: 'E-001',
                description: detail.message,
                field: detail.context?.key ?? ''
            }))
            return res.status(400).json({ errors })
        }
        next()
    }
}

export function validateParam(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.params, {
            abortEarly: false
        })

        if (error) {
            const errors = error.details.map((detail) => ({
                code: 'E-001',
                description: detail.message,
                field: detail.context?.key ?? ''
            }))
            return res.status(400).json({ errors })
        }
        next()
    }
}
