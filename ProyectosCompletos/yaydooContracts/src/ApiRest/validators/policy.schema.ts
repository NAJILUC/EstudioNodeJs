import Joi from 'joi'

const pattern: RegExp = /\d{0,3}-\d{0,3}-\d{0,10}$/

export const policySchema = Joi.object({
    policy: Joi.string()
        .regex(pattern)
        .required()
})

let genericIdentifier = Joi.object().keys({
    uuid: Joi.string().required(),
    identifier: Joi.alternatives().try(Joi.string(), Joi.number()).required()
}).required()

export const contractSchema = Joi.object({
    officeId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    productId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    policyNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    contract: genericIdentifier,
    customer: Joi.object().keys({
        uuid: Joi.string().required(),
        cdperson: Joi.alternatives().try(Joi.string(), Joi.number()).required()
    }).required(),
    invoices: Joi.array().items(genericIdentifier).required()
}).options({
    allowUnknown: true
})
