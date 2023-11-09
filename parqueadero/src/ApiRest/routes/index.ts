import { Router } from 'express'
import parqueadoRoutes from './parqueados.routes'
import healthRoutes from './health.routes'
import socioRoutes from './socios.routes'
import historicoRoutes from './historicos.routes'
import indicadoresRoutes from './indicadores.routes'
const router = Router()

router.use('/v1/status', healthRoutes)
router.use('/v1/parqueados', parqueadoRoutes)
router.use('/v1/socios', socioRoutes)
router.use('/v1/historicos', historicoRoutes)
router.use('/v1/indicadores', indicadoresRoutes)
export default router
