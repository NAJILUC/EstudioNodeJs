import Joi from 'joi'

const pattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const policySocioSchema = Joi.object({
    correo: Joi.string()
        .regex(pattern)
        .required()
})

export const policySocioDeleteSchema = Joi.object({
    correo: Joi.string()
        .regex(pattern)
        .required()
})

export const socioSchema = Joi.object({
    correo: Joi.alternatives().try(Joi.string().pattern(pattern)).required(),
    nombre: Joi.alternatives().try(Joi.string()).required()
}).options({
    allowUnknown: true
})

export const socioUpdateSchema = Joi.object({
    correo: Joi.alternatives().try(Joi.string().pattern(pattern)).required(),
    nombre: Joi.alternatives().try(Joi.string())
}).options({
    allowUnknown: true
})

