import { Router } from 'express'
import contractRoutes from './contracts.routes'
import healthRoutes from './health.routes'
const router = Router()

router.use('/v1/status', healthRoutes)
router.use('/v1/contracts', contractRoutes)
export default router
