import Joi from 'joi'

const pattern: RegExp = /^.{1,6}$/
const patternDelete: RegExp = /^.{6,6}$/

export const policyParqueadoSchema = Joi.object({
    placa: Joi.string()
        .regex(pattern)
        .required()
})

export const policyParqueadoDeleteSchema = Joi.object({
    placa: Joi.string()
        .regex(patternDelete)
        .required()
})

export const parqueadoSchema = Joi.object({
    placa: Joi.alternatives().try(Joi.string().pattern(patternDelete)).required(),
    parqueadero: Joi.alternatives().try(Joi.string()).required(),
    valorHora: Joi.alternatives().try(Joi.number()).required()
}).options({
    allowUnknown: true
})
export const parqueadoUpdateSchema = Joi.object({
    placa: Joi.alternatives().try(Joi.string().pattern(patternDelete)).required(),
    parqueadero: Joi.string().default(null),
    valorHora: Joi.number().default(null)
}).options({
    allowUnknown: true
})

