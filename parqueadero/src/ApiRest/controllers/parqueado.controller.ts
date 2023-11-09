import { Request, Response, NextFunction } from 'express'
import ParqueadosService from '../../services/parqueado.service'
import { IParqueado } from '../../models/entities/parqueado.model'

const service = new ParqueadosService()

export const getParqueadoByPlaca = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { placa } = req.params

        const rta = await service.getParqueadoByPlaca(placa)

        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}
export const getAllParqueadosByParqueadero = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { parqueadero } = req.params

        const rta = await service.getAllParqueadosByParqueadero(parqueadero)

        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const saveParqueado = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const parqueadoReq = req.body as unknown as IParqueado
        const rta = await service.saveParqueado(parqueadoReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getAllParqueados = async (
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { parqueado } = req.params
        const rta = await service.getAllParqueados(parqueado)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const updateParqueado = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const parqueadoReq = req.body as unknown as IParqueado
        const rta = await service.updateParqueado(parqueadoReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const deleteParqueado = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { placa } = req.params

        const rta = await service.deleteParqueado(placa)
        //if(rta.deletedCount===0) return res.status(404).json(`El elemento con officeId: ${policy} no fue encontrado`)
        return res.status(200).json(rta) 
    } catch (error) {
        next(error)
    }
}