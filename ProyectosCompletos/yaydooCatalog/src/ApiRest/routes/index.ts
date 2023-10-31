import { Router } from 'express'
import catalogRoutes from './catalogs.routes'
import healthRoutes from './health.routes'
const router = Router()

router.use('/v1/status', healthRoutes)
router.use('/v1/catalogs', catalogRoutes)
export default router
