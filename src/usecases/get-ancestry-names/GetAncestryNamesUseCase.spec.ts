import { FakeBusinessEntitiesRepository } from "../../infra/database/repositories/in-memory/FakeBusinessEntitiesRepository"
import { IBusinessEntitiesRepository } from "../../infra/database/repositories/interfaces/IBusinessEntitiesRepository"
import { GetAncestryNamesUseCase } from "./GetAncestryNamesUseCase"

let fakeBusinessEntitiesRepository: IBusinessEntitiesRepository
let sut: GetAncestryNamesUseCase

describe('Gen ancestry names of a business entity use case', () => {
  beforeEach(() => {
    fakeBusinessEntitiesRepository = new FakeBusinessEntitiesRepository()
    sut = new GetAncestryNamesUseCase(fakeBusinessEntitiesRepository)
  })

  it('should be able to get the ancestry names of a business entity', async () => {
    const businessEntity = await fakeBusinessEntitiesRepository.create({
      name: 'fake',
      path: [1, 2],
      emissions: 100
    })

    const ancestryNames = await sut.execute(businessEntity.id as number)

    expect(ancestryNames.length).toBe(2)
    expect(ancestryNames[0]).toBe('fake')
    expect(ancestryNames[1]).toBe('fake')
  })
})
