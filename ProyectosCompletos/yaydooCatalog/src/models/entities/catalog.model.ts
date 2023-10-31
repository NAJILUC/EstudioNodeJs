import mongoose, { Schema } from 'mongoose'

export interface ICatalog {
    key: string,
    description: string
}

const catalogSchema = new Schema<ICatalog>({
    key: { type: String, required: true },
    description: { type: String, required: true }
})

export const getCollection = (catalog: string) => {
    return mongoose.model<ICatalog>(catalog, catalogSchema)
}
