import { Router } from 'express'
import { getStatus } from '../controllers/health.controller'

const healthRoutes = Router()

healthRoutes.get('/', getStatus)

export default healthRoutes
