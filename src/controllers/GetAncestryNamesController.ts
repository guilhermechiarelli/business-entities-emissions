import { Request, Response } from 'express'
import { BusinessEntitiesRepository } from '../infra/database/repositories/postgres/BusinessEntitiesRepository'
import { GetAncestryNamesUseCase } from '../usecases/get-ancestry-names/GetAncestryNamesUseCase'

class GetAncestryNamesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const businessEntitiesRepository = new BusinessEntitiesRepository()

    const getAncestryNamesUseCase = new GetAncestryNamesUseCase(
      businessEntitiesRepository
    )

    const ancestryNames = await getAncestryNamesUseCase.execute(Number(id))

    return response.status(200).json({ ancestryNames })
  }
}

export { GetAncestryNamesController }
