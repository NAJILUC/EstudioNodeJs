import mongoose, { Schema } from 'mongoose'

export interface IContract {
    officeId: string,
    productId: string,
    policyNumber: string,
    policyNumberParent: string,
    renovationNumber: string,
    contract: { uuid: string, identifier: string },
    customer: { uuid: string, cdperson: string },
    invoices: [{ uuid: string, identifier: string }]
}

const contractSchema = new Schema<IContract>({
    officeId: { type: String, required: true },
    productId: { type: String, required: true },
    policyNumber: { type: String, required: true },
    policyNumberParent: { type: String, required: false },
    renovationNumber: { type: String, required: false },
    contract: { uuid: { type: String, required: true }, identifier: { type: String, required: true } },
    customer: { uuid: { type: String, required: true }, cdperson: { type: String, required: true } },
    invoices: [{ uuid: { type: String, required: true }, identifier: { type: String, required: true } }]
})

export const getCollection = (contract: string) => {
    return mongoose.model<IContract>(contract, contractSchema)
}

export const Contract = mongoose.model<IContract>('contracts', contractSchema)
