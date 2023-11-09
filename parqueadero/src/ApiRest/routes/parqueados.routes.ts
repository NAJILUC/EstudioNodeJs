import { Router } from 'express'
import { validateBody, validateParam, validateUpdateBody } from '../middlewares/validator.handler'
import { deleteParqueado, getAllParqueados, getAllParqueadosByParqueadero, getParqueadoByPlaca, saveParqueado, updateParqueado } from '../controllers/parqueado.controller'
import { parqueadoSchema, parqueadoUpdateSchema, policyParqueadoDeleteSchema, policyParqueadoSchema } from '../validators/parqueado.schema'

const parqueadoRoutes = Router()

parqueadoRoutes.get(
    '/:placa',
    validateParam(policyParqueadoSchema),
    getParqueadoByPlaca
)

parqueadoRoutes.post(
    '',
    validateBody(parqueadoSchema),
    saveParqueado
)
parqueadoRoutes.get(
    '/all/:parqueado',
    getAllParqueados
)
parqueadoRoutes.get(
    '/socio/:parqueadero',
    getAllParqueadosByParqueadero
)
parqueadoRoutes.put(
    '',
    validateUpdateBody(parqueadoUpdateSchema),
    updateParqueado
)
parqueadoRoutes.delete(
    '/:placa',
    validateParam(policyParqueadoDeleteSchema),
    deleteParqueado
)

export default parqueadoRoutes
