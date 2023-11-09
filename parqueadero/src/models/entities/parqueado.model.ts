import mongoose, { Schema, Document } from 'mongoose'

export interface IParqueado extends Document {
    placa: string,
    parqueadero: string,
    fechaIngreso: Date,
    valorHora: Number
}

const parqueadoSchema: Schema = new Schema<IParqueado>({
    placa: { type: String, required: true },
    parqueadero: { type: String, required: true },
    fechaIngreso: { type: Date, required: true } ,
    valorHora: { type: Number, required: true}
})

export const getParqueadosCollection = (parqueado: string) => {
    return mongoose.model<IParqueado>(parqueado, parqueadoSchema)
}

export const Parqueado = mongoose.model<IParqueado>('parqueados', parqueadoSchema)
