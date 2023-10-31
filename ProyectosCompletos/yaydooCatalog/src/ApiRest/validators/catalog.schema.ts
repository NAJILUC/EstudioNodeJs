import Joi from 'joi'
import config from '../../config'

export const catalogSchema = Joi.object({
    catalog: Joi.string()
        .required().custom((value, helper) => {
                if (config.CATALOGS_ALLOWED.split(',').indexOf(value) === -1) {
                    return helper.message({ custom: 'Catalogo no permitido' })
                }
                return true
            }
        )
})
