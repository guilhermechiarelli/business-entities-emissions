import { FakeBusinessEntitiesRepository } from "../../infra/database/repositories/in-memory/FakeBusinessEntitiesRepository"
import { IBusinessEntitiesRepository } from "../../infra/database/repositories/interfaces/IBusinessEntitiesRepository"
import { UpdateBusinessEntityUseCase } from "./UpdateBusinessEntityUseCase"

let fakeBusinessEntitiesRepository: IBusinessEntitiesRepository
let sut: UpdateBusinessEntityUseCase

describe('Get total emissions use case', () => {
  beforeEach(() => {
    fakeBusinessEntitiesRepository = new FakeBusinessEntitiesRepository()
    sut = new UpdateBusinessEntityUseCase(fakeBusinessEntitiesRepository)
  })

  it('should be able to sum all emissions from the given business entity and all of its descendants.', async () => {
    const businessEntity = await fakeBusinessEntitiesRepository.create({
      name: 'fake',
      path: [1, 2],
      emissions: 100
    })

    const updated = await sut.execute(businessEntity.id as number, 200)

    expect(updated.id).toBe(2)
  })
})
