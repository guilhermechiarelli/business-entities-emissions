import { Request, Response } from 'express'
import { BusinessEntitiesRepository } from '../infra/database/repositories/postgres/BusinessEntitiesRepository'
import { UpdateBusinessEntityUseCase } from '../usecases/update-business-entity/UpdateBusinessEntityUseCase'

class UpdateBusinessEntityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { emissions } = request.body

    const businessEntitiesRepository = new BusinessEntitiesRepository()

    const updateBusinessEntityUseCase = new UpdateBusinessEntityUseCase(
      businessEntitiesRepository
    )

    const updatedBusinessEntity = await updateBusinessEntityUseCase.execute(Number(id), emissions)

    return response.status(200).json({ id: updatedBusinessEntity.id })
  }
}

export { UpdateBusinessEntityController }
