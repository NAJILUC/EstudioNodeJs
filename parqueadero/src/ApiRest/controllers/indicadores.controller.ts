import { Request, Response, NextFunction } from 'express'
import HistoricosService from '../../services/historico.service'
import IndicadoresService from '../../services/indicadores.service'

const serviceH = new HistoricosService()
const service = new IndicadoresService()

export const getFrecuentes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {        
        const { parqueadero } = req.params
        var rta: any[]
        if(parqueadero != null) rta = await service.getFrecuentesParqueadero(parqueadero)
        else rta = await service.getFrecuentes()
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const calcularPago = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { tiempo, parqueadero } = req.params
        var rta: any
        if(tiempo.toLowerCase() === 'dia')  rta = await service.calcularPagoDia(parqueadero)
        if(tiempo.toLowerCase() === 'mes')  rta = await service.calcularPagoMes(parqueadero)
        if(tiempo.toLowerCase() === 'anio')  rta = await service.calcularPagoMes(parqueadero)        
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}
