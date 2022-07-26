import { FakeBusinessEntitiesRepository } from "../../infra/database/repositories/in-memory/FakeBusinessEntitiesRepository"
import { IBusinessEntitiesRepository } from "../../infra/database/repositories/interfaces/IBusinessEntitiesRepository"
import { GetTotalEmissionsUseCase } from "./GetTotalEmissionsUseCase"

let fakeBusinessEntitiesRepository: IBusinessEntitiesRepository
let sut: GetTotalEmissionsUseCase

describe('Get total emissions use case', () => {
  beforeEach(() => {
    fakeBusinessEntitiesRepository = new FakeBusinessEntitiesRepository()
    sut = new GetTotalEmissionsUseCase(fakeBusinessEntitiesRepository)
  })

  it('should be able to sum all emissions from the given business entity and all of its descendants', async () => {
    await fakeBusinessEntitiesRepository.create({
      name: 'fake',
      path: [1, 2],
      emissions: 100
    })

    const total = await sut.execute(1)

    expect(total).toBe(200)
  })
})
