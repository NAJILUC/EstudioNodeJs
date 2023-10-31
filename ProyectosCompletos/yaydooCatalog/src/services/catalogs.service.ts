import { getCollection } from '../models/entities/catalog.model'

class CatalogsService {

    async getCatalog(catalog: string) {

        const collection = getCollection(catalog)
        return await collection.find({}, { 'key': 1, 'description': 1, '_id': 0 })
    }

    async postCatalog(catalog: string, key: string, description: string) {
        const collection = getCollection(catalog)
        return await collection.create({ key, description })
    }

    async putCatalog(catalog: string, key: string, description: string) {
        const collection = getCollection(catalog)
        return await collection.findOneAndUpdate({ key }, { description: description })
    }

    async deleteCatalog(catalog: string, key: string) {
        const collection = getCollection(catalog)
        return await collection.deleteOne({ key })
    }

    async findCatalogByKey(catalog: string, key: string) {
        const collection = getCollection(catalog)
        return await collection.findOne({ key })
    }
}

export default CatalogsService
