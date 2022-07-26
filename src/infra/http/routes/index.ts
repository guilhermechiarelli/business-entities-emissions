
import { Router } from 'express'
import { CreateBusinessEntityController } from '../../../controllers/CreateBusinessEntityController'
import { GetAncestryNamesController } from '../../../controllers/GetAncestryNamesController'
import { GetTotalEmissionsController } from '../../../controllers/GetTotalEmissionsController'
import { UpdateBusinessEntityController } from '../../../controllers/UpdateBusinessEntityController'

const routes = Router()
const getTotalEmissionsController = new GetTotalEmissionsController()
const getAncestryNamesController = new GetAncestryNamesController()
const createBusinessEntityController = new CreateBusinessEntityController()
const updateBusinessEntityController = new UpdateBusinessEntityController()

routes.get('/total-emissions/:id', getTotalEmissionsController.handle)
routes.get('/ancestry-names/:id', getAncestryNamesController.handle)
routes.post('/create', createBusinessEntityController.handle)
routes.put('/update/:id', updateBusinessEntityController.handle)

export { routes }
