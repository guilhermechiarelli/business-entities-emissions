import BusinessEntity from '../../domain/business-entity'
import { IBusinessEntitiesRepository } from '../../infra/database/repositories/interfaces/IBusinessEntitiesRepository'

interface IUseCaseRequest {
  name: string
  parentId: number
  emissions: number
}

class CreateBusinessEntityUseCase {
  constructor(
    private businessEntitiesRepository: IBusinessEntitiesRepository
  ) {}

  async execute({ name, parentId, emissions }: IUseCaseRequest): Promise<BusinessEntity> {
    const parent = await this.businessEntitiesRepository.findById(parentId)

    const businessEntity = BusinessEntity.create({ name, emissions, parentPath: parent?.path })

    const created = await this.businessEntitiesRepository.create(businessEntity)

    return created
  }
}

export { CreateBusinessEntityUseCase }