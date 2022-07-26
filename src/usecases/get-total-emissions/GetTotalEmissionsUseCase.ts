import { IBusinessEntitiesRepository } from '../../infra/database/repositories/interfaces/IBusinessEntitiesRepository'

class GetTotalEmissionsUseCase {
  constructor(
    private businessEntitiesRepository: IBusinessEntitiesRepository
  ) {}

  async execute(id: number): Promise<number> {
    const total = await this.businessEntitiesRepository.totalEmissions(id)
    return total
  }
}

export { GetTotalEmissionsUseCase }