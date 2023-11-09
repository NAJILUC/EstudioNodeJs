import { Request, Response } from 'express'
import HealthService from '../../services/health.service'

const healthService = new HealthService()
export function getStatus(_req: Request, res: Response) {
    res.json(healthService.status())
}
