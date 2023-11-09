import { Router } from 'express'
import { validateBody, validateParam, validateUpdateBody } from '../middlewares/validator.handler'
import { policySocioDeleteSchema, policySocioSchema, socioSchema, socioUpdateSchema } from '../validators/socio.schema'
import { getAllHistoricos, getHistoricoByParqueadero, getHistoricosSocio, saveHistorico } from '../controllers/historico.controller'
import { calcularPago, getFrecuentes } from '../controllers/indicadores.controller'

const indicadoresRoutes = Router()

indicadoresRoutes.get(
    '/frecuentes/:parqueadero?',
    //validateParam(policySocioSchema),
    getFrecuentes
)
indicadoresRoutes.get(
    '/ganancias/:tiempo/:parqueadero',
    //validateParam(policySocioSchema),
    calcularPago
)

export default indicadoresRoutes