import { Request, Response, NextFunction } from 'express'
import CatalogService from '../../services/catalogs.service'

const service = new CatalogService()

export const getCatalog = async (
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { catalog } = req.params
        const rta = await service.getCatalog(catalog)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}
export const postCatalog = async (
    req:Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
        try {
            const { catalog } = req.params
            const { key, description } = req.body 
            const rta = await service.postCatalog(catalog, key, description) 
            return res.status(201).json({ data: rta }) 
        } catch (error) {
            next(error)
        }
}
export const putCatalog = async (
    req:Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
        try {
            const { catalog } = req.params
            const { key, description } = req.body 
            const rta = await service.putCatalog(catalog, key, description) 
            if( !rta ) return res.status(404).json(`El elemento con key '${key}' no fue encontrado`)
            return res.status(200).json({ data: rta }) 
        } catch (error) {
            next(error)
        }
}
export const deleteCatalog = async (
    req:Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
        try {
            const { catalog } = req.params
            const { key } = req.body 
            const rta = await service.deleteCatalog(catalog, key)  
            if(rta.deletedCount === 0) return res.status(404).json(`El elemento con key '${key}' no fue encontrado`)
            return res.status(200).json(`elemento con key '${key}' eliminado`) 
        } catch (error) {
            next(error)
        }
}

export const findCatalogByKey = async (
    req:Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
        try {
            const { catalog, key } = req.params
            const rta = await service.findCatalogByKey(catalog, key)
            if( !rta ) return res.status(404).json(`El elemento con key '${key}' no fue encontrado`)
            return res.status(200).json({ data: rta })
        } catch (error) {
            next(error)
        }
    }