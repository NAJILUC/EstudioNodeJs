import { Request, Response, NextFunction } from 'express'
import ContractsService from '../../services/contracts.service'
import { IContract } from '../../models/entities/contract.model'

const service = new ContractsService()

export const getContractsByPolicy = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { policy } = req.params
        const policyArr = policy.split("-");

        let officeId = policyArr[0]
        let productId = policyArr[1]
        let policyNumber = policyArr[2]

        const rta = await service.getContractsByPolicy(officeId, productId, policyNumber)

        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const saveContract = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const contractReq = req.body as unknown as IContract
        const rta = await service.saveContract(contractReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const getContracts = async (
    req: Request,
    res: Response,
    next: NextFunction): 
    Promise<Response | void> => {
    try {
        const { contract } = req.params
        const rta = await service.getContracts(contract)
        return res.status(200).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const updateContract = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const contractReq = req.body as unknown as IContract
        const rta = await service.saveContract(contractReq)

        return res.status(201).json({ data: rta })
    } catch (error) {
        next(error)
    }
}

export const deleteContract = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { policy } = req.params
        const policyArr = policy.split("-");

        let officeId = policyArr[0]
        let productId = policyArr[1]
        let policyNumber = policyArr[2]

        const rta = await service.deleteContracts(officeId, productId, policyNumber)
        if(rta.deletedCount===0) return res.status(404).json(`El elemento con officeId: ${officeId}, productId: ${productId} y policyNumber: ${policyNumber} no fue encontrado`)
        return res.status(200).json(`El elemento con officeId: ${officeId}, productId: ${productId} y policyNumber: ${policyNumber} fue eliminado`) 
    } catch (error) {
        next(error)
    }
}