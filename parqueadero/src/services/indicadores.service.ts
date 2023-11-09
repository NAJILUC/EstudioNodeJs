import { error } from 'winston'
import { Parqueado, IParqueado, getParqueadosCollection } from '../models/entities/parqueado.model'
import GeneralError from '../models/errors/general.error'
import HistoricosService from './historico.service'
import { Historico } from '../models/entities/historico.model'

class IndicadoresService {

    async getFrecuentes() {
        const result = await Historico.aggregate([
            {
                $group: {
                    _id: "$placa",
                    visitas: { $sum: 1 }
                }
            },
            { $sort: { visitas: -1 } },
            { $project: { _id: 0, placa: "$_id", visitas: 1 } }
        ]);
        return result;
    }
    async getFrecuentesParqueadero(parqueaderoDeseado: string) {
        const result = await Historico.aggregate([
            { $match: { parqueadero: parqueaderoDeseado } },
            { $group: { _id: "$placa", visitas: { $sum: 1 } } },
            { $sort: { visitas: -1 } },
            { $project: { _id: 0, placa: "$_id", visitas: 1 } }
        ]);
        return result;
    }
    async calcularPagoDia(parqueaderoDeseado: string) {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);

        const result = await Historico.aggregate([
            {
                $match: {
                    fechaSalida: {
                        $gte: new Date(ayer),
                        $lt: new Date()
                    },
                    parqueadero : parqueaderoDeseado
                }
            },
            {
                $group: {
                    _id: 'Ganancias',
                    total: { $sum: "$pago" }
                }
            }
        ])

        return result
    }
    async calcularPagoMes(parqueaderoDeseado: string) {
        const mes = new Date();
        mes.setDate(mes.getDate() - 30);

        const result = await Historico.aggregate([
            {
                $match: {
                    fechaSalida: {
                        $gte: new Date(mes),
                        $lt: new Date()
                    },
                    parqueadero : parqueaderoDeseado
                }
            },
            {
                $group: {
                    _id: 'Ganancias',
                    total: { $sum: "$pago" }
                }
            }
        ])

        return result
    }
    async calcularPagoAnio(parqueaderoDeseado: string) {
        const mes = new Date();
        mes.setDate(mes.getDate() - 365);

        const result = await Historico.aggregate([
            {
                $match: {
                    fechaSalida: {
                        $gte: new Date(mes),
                        $lt: new Date()
                    },
                    parqueadero : parqueaderoDeseado
                }
            },
            {
                $group: {
                    _id: 'Ganancias',
                    total: { $sum: "$pago" }
                }
            }
        ])

        return result
    }
}

export default IndicadoresService