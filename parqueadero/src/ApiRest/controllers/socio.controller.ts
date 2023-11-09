import { Request, Response, NextFunction } from 'express'
import SociosService from '../../services/socio.service'
import { ISocio } from '../../models/entities/socio.model'

const service = new SociosService()

export const getSocioByCorreo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { correo } = req.params
        const rta = await service.getSocioByCorreo(correo)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const saveSocio = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const socioReq = req.body as unknown as ISocio
        const rta = await service.saveSocio(socioReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getAllSocios = async (
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { socio } = req.params
        const rta = await service.getAllSocios(socio)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getParqueadosSocio = async(
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { socio } = req.params
        const rta = await service.getParqueadosSocio(socio)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const updateSocio = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const socioReq = req.body as unknown as ISocio
        const rta = await service.updateSocio(socioReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const deleteSocio = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { correo } = req.params

        const rta = await service.deleteSocio(correo)
        return res.status(200).json(rta) 
    } catch (error) {
        next(error)
    }
}