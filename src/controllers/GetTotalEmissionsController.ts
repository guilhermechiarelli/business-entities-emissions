import { Request, Response } from 'express'
import { BusinessEntitiesRepository } from '../infra/database/repositories/postgres/BusinessEntitiesRepository'
import { GetTotalEmissionsUseCase } from '../usecases/get-total-emissions/GetTotalEmissionsUseCase'

class GetTotalEmissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const businessEntitiesRepository = new BusinessEntitiesRepository()

    const getTotalEmissionsUseCase = new GetTotalEmissionsUseCase(
      businessEntitiesRepository
    )

    const totalEmissions = await getTotalEmissionsUseCase.execute(Number(id))

    return response.status(200).json({ totalEmissions })
  }
}

export { GetTotalEmissionsController }
