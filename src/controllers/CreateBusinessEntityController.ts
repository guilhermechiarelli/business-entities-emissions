import { Request, Response } from 'express'
import { BusinessEntitiesRepository } from '../infra/database/repositories/postgres/BusinessEntitiesRepository'
import { CreateBusinessEntityUseCase } from '../usecases/create-business-entity/CreateBusinessEntityUseCase'

class CreateBusinessEntityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, parentId, emissions } = request.body

    const businessEntitiesRepository = new BusinessEntitiesRepository()

    const createBusinessEntityUseCase = new CreateBusinessEntityUseCase(
      businessEntitiesRepository
    )

    const businessEntity = await createBusinessEntityUseCase.execute({
      name, 
      parentId, 
      emissions 
    })

    return response.status(201).json({ id: businessEntity.id })
  }
}

export { CreateBusinessEntityController }
