import BusinessEntity from '../../../../domain/business-entity'
import { IBusinessEntitiesRepository } from '../interfaces/IBusinessEntitiesRepository'

class FakeBusinessEntitiesRepository implements IBusinessEntitiesRepository {
  private client: any[]

  constructor() {
    this.client = [{
      id: 1,
      name: 'fake',
      path: [1],
      emissions: 100,
    }]
  }

  async totalEmissions(id: number): Promise<number> {
    const filtered = this.client.filter(el => el.path.indexOf(id) >= 0)

    const sum = filtered.reduce((previous, current) => previous + current.emissions, 0)

    return sum
  }

  async getAncestryNames(id: number): Promise<string[]> {
    const element = this.client.find(el => el.id === id)

    const filtered = this.client.filter(el => element.path.indexOf(el.id) >= 0)

    return filtered.map(el => el.name)
  }

  async create(data: BusinessEntity): Promise<BusinessEntity> {
    const id = this.client.length + 1
    const path = data.path
    path.push(id)

    const newElement = {
      ...data,
      id,
      path,
    }

    this.client.push(newElement)
    
    return newElement
  }

  async updateEmissions(id: number, emissions: number): Promise<BusinessEntity> {
    const index = this.client.findIndex(el => el.id === id)

    if (index >= 0) {
      this.client[index].emissions = emissions
    }

    return this.client[index]
  }

  async findById(id: number): Promise<BusinessEntity | null> {
    const element = this.client.find(el => el.id === id)
    return element
  }
}

export { FakeBusinessEntitiesRepository }
