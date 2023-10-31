import { StandardResponse } from '../models/responses/standard.response'
import mongoose from 'mongoose'
import GeneralError from '../models/errors/general.error'

class HealthService {
    status(): StandardResponse {

        if (mongoose.connection.readyState !== 1) {
            throw new GeneralError({
                code: 'E-DB',
                description: 'Error HealthCheck DB',
                field: 'mongodb',
                status: 500
            })
        }


        return {
            data: {
                systems: [
                    {
                        system: 'mongo',
                        status: true
                    }
                ]
            }
        }
    }
}

export default HealthService
