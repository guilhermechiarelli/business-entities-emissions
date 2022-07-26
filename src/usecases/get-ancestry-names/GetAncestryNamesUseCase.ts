import { IBusinessEntitiesRepository } from '../../infra/database/repositories/interfaces/IBusinessEntitiesRepository'

class GetAncestryNamesUseCase {
  constructor(
    private businessEntitiesRepository: IBusinessEntitiesRepository
  ) {}

  async execute(id: number): Promise<string[]> {
    const names = await this.businessEntitiesRepository.getAncestryNames(id)
    return names
  }
}

export { GetAncestryNamesUseCase }