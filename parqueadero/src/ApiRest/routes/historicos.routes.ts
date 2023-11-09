import { Router } from 'express'
import { validateBody, validateParam, validateUpdateBody } from '../middlewares/validator.handler'
import { policySocioDeleteSchema, policySocioSchema, socioSchema, socioUpdateSchema } from '../validators/socio.schema'
import { getAllHistoricos, getHistoricoByParqueadero, getHistoricosSocio, saveHistorico } from '../controllers/historico.controller'
import { historicoSchema, policyHistoricoSchema } from '../validators/historico.schema'

const historicoRoutes = Router()

historicoRoutes.get(
    '/:parqueadero',
    validateParam(policyHistoricoSchema),
    getHistoricoByParqueadero
)

historicoRoutes.post(
    '',
    validateBody(historicoSchema),
    saveHistorico
)
historicoRoutes.get(
    '/all/:historico',
    getAllHistoricos
)
historicoRoutes.get(
    '/historicos/:socio',
    getHistoricosSocio
)

export default historicoRoutes