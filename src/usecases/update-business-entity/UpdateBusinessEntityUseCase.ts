import BusinessEntity from '../../domain/business-entity'
import { IBusinessEntitiesRepository } from '../../infra/database/repositories/interfaces/IBusinessEntitiesRepository'

class UpdateBusinessEntityUseCase {
  constructor(
    private businessEntitiesRepository: IBusinessEntitiesRepository
  ) {}

  async execute(id: number, emissions: number): Promise<BusinessEntity> {
    const updated = await this.businessEntitiesRepository.updateEmissions(id, emissions)
    return updated
  }
}

export { UpdateBusinessEntityUseCase }