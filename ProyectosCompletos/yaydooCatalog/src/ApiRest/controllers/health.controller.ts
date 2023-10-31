import { Request, RequestHandler, Response } from 'express'
import HealthService from '../../services/health.service'

const healthService = new HealthService()
export function getStatus(req: Request, res: Response) {
    res.json(healthService.status())
}
