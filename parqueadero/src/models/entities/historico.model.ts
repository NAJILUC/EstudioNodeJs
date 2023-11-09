import mongoose, { Schema, Document } from 'mongoose'

export interface IHistorico extends Document {
    parqueadero: string,
    placa: string,
    fechaIngreso: Date,
    fechaSalida: Date,
    pago: number
}

const historicoSchema: Schema = new Schema<IHistorico>({
    parqueadero: { type: String, required: true },
    placa: { type: String, required: true },
    fechaIngreso: { type: Date, required: true },
    fechaSalida: { type: Date, required: true },
    pago: { type: Number, required: true }
})

export const getHistoricosCollection = (historico: string) => {
    return mongoose.model<IHistorico>(historico, historicoSchema)
}

export const Historico = mongoose.model<IHistorico>('historicos', historicoSchema)
