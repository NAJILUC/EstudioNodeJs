import mongoose, { Schema, Document } from 'mongoose'

interface IParqueadero{
    nombre: string
}

export interface ISocio extends Document {
    nombre: string,
    correo: string,
    fechaIngreso: Date,
    parqueaderos : IParqueadero[]
}

const socioSchema: Schema = new Schema<ISocio>({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    fechaIngreso: { type: Date, required: true },
    parqueaderos: [{ nombre: { type: String, required: true } }]
})

export const getSociosCollection = (socio: string) => {
    return mongoose.model<ISocio>(socio, socioSchema)
}

export const Socio = mongoose.model<ISocio>('socios', socioSchema)
