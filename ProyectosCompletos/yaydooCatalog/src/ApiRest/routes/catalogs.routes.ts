import { Router } from 'express'
import { deleteCatalog, findCatalogByKey, getCatalog, postCatalog, putCatalog } from '../controllers/catalogs.controller'
import { validateParam } from '../middlewares/validator.handler'
import { catalogSchema } from '../validators/catalog.schema'


const router = Router()

router.get(
    '/:catalog',
    validateParam(catalogSchema),
    getCatalog
)
router.post(
    '/:catalog',
    validateParam(catalogSchema),
    postCatalog
)
router.put(
    '/:catalog',
    validateParam(catalogSchema),
    putCatalog
)
router.delete(
    '/:catalog',
    validateParam(catalogSchema),
    deleteCatalog
)
router.get(
    '/:catalog/:key',
    //validateParamKey(catalogSchema),
    findCatalogByKey
)

export default router
