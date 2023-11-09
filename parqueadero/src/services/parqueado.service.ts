import { error } from 'winston'
import { Parqueado, IParqueado, getParqueadosCollection } from '../models/entities/parqueado.model'
import GeneralError from '../models/errors/general.error'
import HistoricosService from './historico.service'
import { Historico } from '../models/entities/historico.model'

class ParqueadosService {

    async getParqueadoByPlaca(placa: string) {
        const parqueado = await Parqueado.find({ placa: { $regex: placa, $options: 'i' } })
        if (parqueado == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `Placa ${placa} not found`
            })
        }
        return parqueado
    }

    async getAllParqueados(parqueado: string) {
        const collection = getParqueadosCollection(parqueado)
        return await collection.find({}, { 'placa': 1, 'parqueadero': 1, 'fechaIngreso': 1, '_id': 1 })
    }
    async getAllParqueadosByParqueadero(nombreParqueadero: string) {
        const collection = getParqueadosCollection('parqueados')
        return await collection.find({ parqueadero: nombreParqueadero }, { placa: 1, parqueadero: 1, fechaIngreso: 1, _id: 1 })
    }
    
    async saveParqueado(parqueadoReq: IParqueado) {
        let parqueadoDoc = await Parqueado.findOne({
            placa: parqueadoReq.placa
        })
        if (parqueadoDoc == null) {
            parqueadoReq.fechaIngreso = new Date()
            parqueadoDoc = new Parqueado(parqueadoReq)
            await parqueadoDoc.save()
        } else {
            throw new GeneralError({
                code: '400',
                status: 400,
                description: `El vehiculo con placa '${parqueadoDoc.placa}' ya esta dentro del parqueadero`
            })
        }
        return parqueadoDoc
    }

    async updateParqueado(parqueadoReq: IParqueado) {
        let parqueadoDoc = await Parqueado.findOne({
            placa: parqueadoReq.placa
        })
        if (parqueadoDoc == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `El vehiculo con placa '${parqueadoReq.placa}' no se encontro registrado`
            })
        } else {
            if (parqueadoReq.parqueadero == null) {
                parqueadoReq.parqueadero = parqueadoDoc.parqueadero
        } 
        if (parqueadoReq.valorHora == null) {
            parqueadoReq.valorHora = parqueadoDoc.valorHora
    } 
            parqueadoReq.fechaIngreso = parqueadoDoc.fechaIngreso
            parqueadoDoc = new Parqueado(parqueadoReq)
            await Parqueado.deleteOne({ placa: parqueadoDoc.placa })
            await parqueadoDoc.save()
        }
        return parqueadoDoc
    }

    async deleteParqueado(placa: string) {
        const parqueadero = await this.getParqueadoByPlaca(placa)
        await Parqueado.deleteOne({ placa: placa })
    
        if (parqueadero.length === 0) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `Placa ${placa} not found`
            });
        }
    
        const fecha = parqueadero.map((item) => item.fechaIngreso)
        const placaV = parqueadero.map((item) => item.placa)
        const valor = parqueadero.map((item) => item.valorHora)
        const tiempoActual = new Date()
        const diferenciasEnMinutos = fecha.map((fecha) => {
            const diferenciaEnMilisegundos = tiempoActual.getTime() - fecha.getTime()
            return Math.floor(diferenciaEnMilisegundos / 60000) // ESTA EN MINUTOS, PA HORAS PONER 36000000
        })
        const aPagar = diferenciasEnMinutos.map((num, index) => num * Number(valor[index]))
        const historico = new HistoricosService()
        const historicoGuardar = new Historico({
            parqueadero: parqueadero.map((item) => item.parqueadero)[0],
            placa: parqueadero.map((item) => item.placa)[0],
            fechaIngreso: parqueadero.map((item) => item.fechaIngreso)[0],
            fechaSalida: new Date(),
            pago: aPagar.map((item) => item)[0]
        })
        historico.saveHistorico(historicoGuardar)
        var mensaje = `El vehiculo con placa '${placaV}' debe pagar un total de ${aPagar} horas`;

        return {mensaje: mensaje}
    }
}

export default ParqueadosService