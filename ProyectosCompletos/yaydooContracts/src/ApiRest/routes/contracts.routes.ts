import { Router } from 'express'
import { validateBody, validateParam } from '../middlewares/validator.handler'
import { deleteContract, getContracts, getContractsByPolicy, saveContract, updateContract } from '../controllers/contracts.controller'
import { contractSchema, policySchema } from '../validators/policy.schema'

const contractRoutes = Router()

contractRoutes.get(
    '/:policy',
    validateParam(policySchema),
    getContractsByPolicy
)

contractRoutes.post(
    '',
    validateBody(contractSchema),
    saveContract
)
contractRoutes.get(
    '/all/:contract',
    getContracts
)
contractRoutes.put(
    '',
    updateContract
)
contractRoutes.delete(
    '/:policy',
    validateParam(policySchema),
    deleteContract
)

export default contractRoutes
