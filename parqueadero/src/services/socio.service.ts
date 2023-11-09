import { error } from 'winston'
import { Socio, ISocio, getSociosCollection } from '../models/entities/socio.model'
import GeneralError from '../models/errors/general.error'
import ParqueadosService from './parqueado.service'

class SociosService {

    async getSocioByCorreo(correo: string) {
        const socio = await Socio.find({ correo: { $regex: correo, $options: 'i' } })
        if (socio == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `EL correo ${correo} no esta asignado a un socio`
            })
        }
        return socio
    }

    async getAllSocios(socio: string) {
        const collection = getSociosCollection(socio)
        return await collection.find({}, {
            'nombre': 1, 'correo': 1, 'fechaIngreso': 1,
            'parqueaderos': { 'nombre': 1, }, '_id': 1
        })
    }

    async getParqueadosSocio(socio: string) {
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
        var parqueadosTotal: any[] = []

        const serviceParqueadero = new ParqueadosService()

        for (let i = 0; i < socioDoc.parqueaderos.length; i++) {
            const element = socioDoc.parqueaderos[i]
            let parqueados = await serviceParqueadero.getAllParqueadosByParqueadero(element.nombre)
            parqueados.forEach((aux) => {
                parqueadosTotal.push(aux)
            })
        }
        if (parqueadosTotal.length == 0)
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `No se encontraron registros de vehiculos en algun parqueadero del socio`
            })

        return parqueadosTotal
    }

    async saveSocio(socioReq: ISocio) {
        let socioDoc = await Socio.findOne({
            correo: socioReq.correo
        })
        if (socioDoc == null) {
            socioReq.fechaIngreso = new Date()
            socioDoc = new Socio(socioReq)
            await socioDoc.save()
        } else {
            throw new GeneralError({
                code: '400',
                status: 400,
                description: `El correo '${socioDoc.correo}' ya esta registrado`
            })
        }
        return socioDoc
    }

    async updateSocio(socioReq: ISocio) {
        let socioDoc = await Socio.findOne({
            correo: socioReq.correo
        })
        if (socioDoc == null) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `El correo '${socioReq.correo}' no se encuentra registrado`
            })
        } else {
            if (socioReq.nombre == null) {
                socioReq.nombre = socioDoc.nombre
            }
            if (socioReq.parqueaderos == null) {
                socioReq.parqueaderos = socioDoc.parqueaderos
            } else {
                if (socioDoc.parqueaderos != null) {
                    socioDoc.parqueaderos.forEach((element) => {
                        if (!socioReq.parqueaderos.find(parqueadero => parqueadero.nombre == element.nombre))
                            socioReq.parqueaderos.push(element)
                    });
                }
            }
            socioReq.fechaIngreso = socioDoc.fechaIngreso
            socioDoc = new Socio(socioReq)
            await Socio.deleteOne({ correo: socioDoc.correo })
            await socioDoc.save()
        }
        return socioDoc
    }

    async deleteSocio(correo: string) {
        const socio = await this.getSocioByCorreo(correo)
        await Socio.deleteOne({ correo: correo })

        if (socio.length === 0) {
            throw new GeneralError({
                code: '404',
                status: 404,
                description: `El correo ${correo} no se encontro`
            });
        }
        var mensaje = `El socio con el correo '${correo}' fue eliminado`;

        return { mensaje: mensaje }
    }
}

export default SociosService