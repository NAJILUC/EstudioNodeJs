import { Router } from 'express'
import { validateBody, validateParam, validateUpdateBody } from '../middlewares/validator.handler'
import { deleteSocio, getAllSocios, getParqueadosSocio, getSocioByCorreo, saveSocio, updateSocio } from '../controllers/socio.controller'
import { policySocioDeleteSchema, policySocioSchema, socioSchema, socioUpdateSchema } from '../validators/socio.schema'

const socioRoutes = Router()

socioRoutes.get(
    '/:correo',
    validateParam(policySocioSchema),
    getSocioByCorreo
)

socioRoutes.post(
    '',
    validateBody(socioSchema),
    saveSocio
)
socioRoutes.get(
    '/all/:socio',
    getAllSocios
)
socioRoutes.get(
    '/parqueados/:socio',
    getParqueadosSocio
)
socioRoutes.put(
    '',
    validateBody(socioUpdateSchema),
    updateSocio
)
socioRoutes.delete(
    '/:correo',
    validateParam(policySocioDeleteSchema),
    deleteSocio
)

export default socioRoutes