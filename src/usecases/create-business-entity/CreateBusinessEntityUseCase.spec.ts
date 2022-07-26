import { FakeBusinessEntitiesRepository } from "../../infra/database/repositories/in-memory/FakeBusinessEntitiesRepository"
import { IBusinessEntitiesRepository } from "../../infra/database/repositories/interfaces/IBusinessEntitiesRepository"
import { CreateBusinessEntityUseCase } from "./CreateBusinessEntityUseCase"

let fakeBusinessEntitiesRepository: IBusinessEntitiesRepository
let sut: CreateBusinessEntityUseCase

describe('Create business entity use case', () => {
  beforeEach(() => {
    fakeBusinessEntitiesRepository = new FakeBusinessEntitiesRepository()
    sut = new CreateBusinessEntityUseCase(fakeBusinessEntitiesRepository)
  })

  it('should be able to create a new business entity', async () => {
    const businessEntity = await sut.execute({
      name: 'fake',
      parentId: 1,
      emissions: 100
    })

    expect(businessEntity.id).toBe(2)
    expect(businessEntity.path.length).toBe(2)
  })

  it('should be able to create a new business if a parent does not exist', async () => {
    const businessEntity = await sut.execute({
      name: 'fake',
      parentId: 5,
      emissions: 100
    })

    expect(businessEntity.id).toBe(2)
    expect(businessEntity.path.length).toBe(1)
  })
})
