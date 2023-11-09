import { error } from 'winston'
import { Socio, ISocio, getSociosCollection } from '../models/entities/socio.model'
import GeneralError from '../models/errors/general.error'
import { Historico, IHistorico, getHistoricosCollection } from '../models/entities/historico.model'

class HistoricosService {

    async getHistoricoByParqueadero(nombreParqueadero: string) {
        const historico = await Historico.find({ parqueadero: { $regex: nombreParqueadero, $options: 'i' } })
        if (historico == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `EL parqueadero '${nombreParqueadero}' no tiene registros`
            })
        }
        return historico
    }

    async getAllHistoricos(historico: string) {
        const collection = getHistoricosCollection(historico)
        return await collection.find({}, {
            'parqueadero': 1, 'placa': 1, 'fechaIngreso': 1,
            'fechaSalida': 1, 'pago': 1
        })
    }

    async getHistoricosSocio(socio: string) {
        let socioDoc = await Socio.findOne({
            correo: socio
        })
        if (socioDoc == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `El correo '${socio}' no se encuentra registrado`
            })
        }
        var historicosTotal: any[] = []
        for (let i = 0; i < socioDoc.parqueaderos.length; i++) {
            const element = socioDoc.parqueaderos[i]
            let historicos = await this.getHistoricoByParqueadero(element.nombre)
            if (historicos.length != 0)
                historicosTotal.push(historicos)
        }
        if (historicosTotal.length == 0)
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `No se encontraron registros de historicos del socio`
            })

        return historicosTotal
    }

    async saveHistorico(historicoReq: IHistorico) {
        let historicoDoc = new Historico(historicoReq)
        await historicoDoc.save()
        return historicoDoc
    }
}

export default HistoricosService