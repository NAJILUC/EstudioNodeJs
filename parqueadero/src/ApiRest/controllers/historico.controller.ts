import { Request, Response, NextFunction } from 'express'
import { ISocio } from '../../models/entities/socio.model'
import HistoricosService from '../../services/historico.service'
import { IHistorico } from '../../models/entities/historico.model'

const service = new HistoricosService()

export const getHistoricoByParqueadero = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { parqueadero } = req.params
        const rta = await service.getHistoricoByParqueadero(parqueadero)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const saveHistorico = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const historicoReq = req.body as unknown as IHistorico
        const rta = await service.saveHistorico(historicoReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getAllHistoricos = async (
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { historico } = req.params
        const rta = await service.getAllHistoricos(historico)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getHistoricosSocio = async(
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { socio } = req.params
        const rta = await service.getHistoricosSocio(socio)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}
