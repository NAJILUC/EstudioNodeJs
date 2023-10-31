import { Contract, IContract, getCollection } from '../models/entities/contract.model'
import GeneralError from '../models/errors/general.error'

class ContractsService {

    async getContractsByPolicy(officeId: string, productId: string, policyNumber: string) {
        let contract = await Contract.findOne({ officeId: officeId, productId: productId, policyNumber: policyNumber })
        if (contract == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `Contract ${officeId}-${productId}-${policyNumber} not found`
            })
        }
        return contract
    }

    async saveContract(contractReq: IContract) {
        let contractDoc = await Contract.findOne({
            officeId: contractReq.officeId,
            productId: contractReq.productId,
            policyNumber: contractReq.policyNumber
        })
        if (contractDoc == null) {
            contractDoc = new Contract(contractReq)
            await contractDoc.save()
        } else {
            let newInvoices = []
            for (let contractRqInvoice of contractReq.invoices) {
                let exist = false
                for (let contractInvoice of contractDoc.invoices) {
                    if (contractRqInvoice.uuid === contractInvoice.uuid) {
                        exist = true
                        break
                    }
                }
                if (!exist) {
                    newInvoices.push(contractRqInvoice)
                }
            }
            for (let newInvoice of newInvoices) {
                contractDoc.invoices.push(newInvoice)
            }
            contractDoc.contract = contractReq.contract
            contractDoc.customer = contractReq.customer
            await contractDoc.save()
        }
        return contractDoc
    }

    async getContracts(contract: string) {
        const collection = getCollection(contract)
        return await collection.find({}, { 'officeId': 1, 'productId': 1, 'policyNumber': 1, 'policyNumberParent': 1,
                                    'renovationNumber': 1, 'contract': { 'uuid': 1,'identifier': 1}, 
                                    'customer': {'uuid': 1, 'cdperson': 1}, 'invoices': { 'uuid': 1, 'identifier':1}, '_id': 0 })
    }

    async deleteContracts( officeId: string, productId: string, policyNumber: string) {
        let contract = await Contract.deleteOne({ officeId: officeId, productId: productId, policyNumber: policyNumber })
        if (contract == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `Contract ${officeId}-${productId}-${policyNumber} not found`
            })
        }
        return contract
    }
}

export default ContractsService
