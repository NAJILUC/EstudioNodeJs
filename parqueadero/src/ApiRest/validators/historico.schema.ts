import Joi from 'joi'

const pattern: RegExp = /^.{6,6}$/

export const policyHistoricoSchema = Joi.object({
    parqueadero: Joi.string()
        .required()
})

export const policyParqueadoDeleteSchema = Joi.object({
    placa: Joi.string()
        .regex(pattern)
        .required()
})

export const historicoSchema = Joi.object({
    parqueadero: Joi.alternatives().try(Joi.string()).required(),
    placa: Joi.alternatives().try(Joi.string().pattern(pattern)).required(),
    pago: Joi.alternatives().try(Joi.number()).required()
}).options({
    allowUnknown: true
})
export const parqueadoUpdateSchema = Joi.object({
    placa: Joi.alternatives().try(Joi.string().pattern(pattern)).required(),
    parqueadero: Joi.string().default(null),
    valorHora: Joi.number().default(null)
}).options({
    allowUnknown: true
})

